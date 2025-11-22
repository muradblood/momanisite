import React, { useState, useEffect, useRef } from 'react';
import { sendMapMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, MapPin, Navigation, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LocationAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "أهلاً بك! هل تحتاج مساعدة في العثور على موقعنا أو لديك استفسارات حول المنطقة؟ أنا هنا للمساعدة." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [locationError, setLocationError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.warn("Geolocation access denied or failed", err);
          setLocationError("تم تعطيل الوصول للموقع.");
        }
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMapMessage(userMsg.text, location);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text,
        groundingChunks: response.groundingChunks 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "عذراً، واجهت مشكلة في الاتصال بخدمة الخرائط.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <h3 className="font-semibold text-slate-700">المساعد الذكي للموقع</h3>
        </div>
        {location ? (
            <span className="text-xs text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
              <Navigation className="w-3 h-3" /> GPS نشط
            </span>
        ) : (
          <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {locationError || "جاري تحديد الموقع..."}
            </span>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tl-none' 
                  : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tr-none'
              }`}
            >
              <div className={`prose ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'} max-w-none text-sm`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {/* Map Sources */}
              {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200/50 grid gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">المصادر والخرائط</p>
                  {msg.groundingChunks.map((chunk, i) => {
                    if (chunk.maps) {
                      return (
                        <a 
                          key={i}
                          href={chunk.maps.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                        >
                          <div className="mt-0.5 min-w-[20px] w-5 h-5 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100">
                            <MapPin className="w-3 h-3 text-red-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-blue-700 group-hover:underline truncate">
                              {chunk.maps.title}
                            </div>
                          </div>
                        </a>
                      );
                    } else if (chunk.web) {
                      return (
                        <a 
                          key={i}
                          href={chunk.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-blue-600 hover:underline truncate"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                            <span className="truncate">{chunk.web.title}</span>
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-3 rounded-2xl rounded-tr-none border border-slate-100 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span className="text-xs text-slate-400">جاري التفكير...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
            disabled={loading}
            className="w-full pr-4 pl-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute left-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors rotate-180"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAssistant;