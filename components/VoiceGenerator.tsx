
import React, { useState, useRef, useEffect } from 'react';
import { generateSpeech } from '../services/geminiService';
import { Mic, Play, Square, RefreshCw, Volume2, Wand2, Download, Users } from 'lucide-react';

const VOICE_OPTIONS = [
  { value: 'Puck', label: 'Puck (صوت هادئ)', gender: 'Male' },
  { value: 'Charon', label: 'Charon (صوت عميق)', gender: 'Male' },
  { value: 'Kore', label: 'Kore (صوت دافئ)', gender: 'Female' },
  { value: 'Fenrir', label: 'Fenrir (صوت قوي)', gender: 'Male' },
  { value: 'Zephyr', label: 'Zephyr (صوت ناعم)', gender: 'Female' },
];

const DEFAULT_TEXT = "مرحباً بكم في مؤسسة المومني والحياصات. نحن نقدم أفضل الحلول الرقمية لتطوير أعمالكم.";

const VoiceGenerator: React.FC = () => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [currentSource, setCurrentSource] = useState<AudioBufferSourceNode | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const stopAudio = () => {
    if (currentSource) {
      currentSource.stop();
      setCurrentSource(null);
    }
    setIsPlaying(false);
  };

  const playAudio = async () => {
    if (!audioBuffer) return;

    // Ensure AudioContext is active (needed for browser autoplay policies)
    let ctx = audioContext;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setAudioContext(ctx);
    }

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    stopAudio();

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.onended = () => setIsPlaying(false);
    
    setCurrentSource(source);
    source.start();
    setIsPlaying(true);
  };

  // Helper to decode raw PCM data
  const decodeAudioData = async (base64String: string, ctx: AudioContext): Promise<AudioBuffer> => {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const dataInt16 = new Int16Array(bytes.buffer);
    const numChannels = 1;
    const sampleRate = 24000;
    const frameCount = dataInt16.length;
    
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    
    return buffer;
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    stopAudio();
    setLoading(true);
    setError(null);
    setAudioBuffer(null);

    try {
      const base64Audio = await generateSpeech(text, selectedVoice);
      
      // Initialize context if needed to decode
      let ctx = audioContext;
      if (!ctx) {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        setAudioContext(ctx);
      }

      const buffer = await decodeAudioData(base64Audio, ctx);
      setAudioBuffer(buffer);
      
      // Auto play
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      setCurrentSource(source);
      source.start();
      setIsPlaying(true);

    } catch (err) {
      console.error(err);
      setError("فشل توليد الصوت. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Mic className="w-8 h-8 text-blue-600" />
          استوديو التعليق الصوتي
        </h2>
        <p className="text-slate-600">
          حول نصوصك إلى تعليق صوتي احترافي باستخدام أحدث تقنيات الذكاء الاصطناعي (Gemini 2.5).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              النص المراد تحويله
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-800 leading-relaxed text-right"
              placeholder="أدخل النص هنا..."
              dir="auto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              اختر المعلق الصوتي
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VOICE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedVoice(option.value)}
                  className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-1
                    ${selectedVoice === option.value
                      ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-lg">{option.gender === 'Male' ? '👨' : '👩'}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold shadow-md flex items-center justify-center gap-3 transition-all
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02]'
              }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                توليد الصوت
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Preview / Player */}
        <div className="flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 min-h-[400px] relative overflow-hidden p-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-xs space-y-8 text-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all duration-500 border-4 ${isPlaying ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110' : 'border-slate-700 bg-slate-800'}`}>
               {isPlaying ? (
                 <div className="flex gap-1 h-12 items-end">
                    <span className="w-1.5 bg-blue-400 animate-[bounce_1s_infinite] rounded-full"></span>
                    <span className="w-1.5 bg-blue-400 animate-[bounce_1.2s_infinite] rounded-full h-8"></span>
                    <span className="w-1.5 bg-blue-400 animate-[bounce_0.8s_infinite] rounded-full h-10"></span>
                    <span className="w-1.5 bg-blue-400 animate-[bounce_1.1s_infinite] rounded-full h-6"></span>
                 </div>
               ) : (
                 <Volume2 className="w-12 h-12 text-slate-500" />
               )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {audioBuffer ? "جاهز للتشغيل" : "بانتظار التوليد"}
              </h3>
              <p className="text-sm text-slate-400">
                {selectedVoice} • {VOICE_OPTIONS.find(v => v.value === selectedVoice)?.gender === 'Male' ? 'ذكر' : 'أنثى'}
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              {audioBuffer ? (
                <>
                  <button
                    onClick={isPlaying ? stopAudio : playAudio}
                    className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
                  >
                    {isPlaying ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                </>
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center cursor-not-allowed border border-slate-700">
                  <Play className="w-6 h-6 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGenerator;
