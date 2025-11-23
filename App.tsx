
import React, { useState } from 'react';
import Home from './components/Home';
import BookingCalendar from './components/BookingCalendar';
import VoiceGenerator from './components/VoiceGenerator';
import { AppTab } from './types';
import { Terminal, Home as HomeIcon, Menu, X, CalendarDays, Mic } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Cairo']" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab(AppTab.HOME)}
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">المومني والحياصات</h1>
              <p className="text-xs font-medium text-blue-600 mt-1">للتسويق والبرمجة</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={() => setActiveTab(AppTab.HOME)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                ${activeTab === AppTab.HOME 
                  ? 'bg-white text-blue-700 shadow-md shadow-slate-200/50 ring-1 ring-slate-100' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <HomeIcon className="w-4 h-4" />
              الرئيسية
            </button>
             <button
              onClick={() => setActiveTab(AppTab.BOOKING)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                ${activeTab === AppTab.BOOKING 
                  ? 'bg-white text-blue-700 shadow-md shadow-slate-200/50 ring-1 ring-slate-100' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <CalendarDays className="w-4 h-4" />
              حجز موعد
            </button>
            <button
              onClick={() => setActiveTab(AppTab.VOICE)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                ${activeTab === AppTab.VOICE 
                  ? 'bg-white text-blue-700 shadow-md shadow-slate-200/50 ring-1 ring-slate-100' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <Mic className="w-4 h-4" />
              ستوديو الصوت
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-2 absolute w-full shadow-xl z-50">
            <button
              onClick={() => { setActiveTab(AppTab.HOME); setMobileMenuOpen(false); }}
              className={`w-full p-4 rounded-xl text-right font-bold transition-colors flex items-center gap-3
                ${activeTab === AppTab.HOME ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <HomeIcon className="w-5 h-5" />
              الرئيسية
            </button>
             <button
              onClick={() => { setActiveTab(AppTab.BOOKING); setMobileMenuOpen(false); }}
              className={`w-full p-4 rounded-xl text-right font-bold transition-colors flex items-center gap-3
                ${activeTab === AppTab.BOOKING ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CalendarDays className="w-5 h-5" />
              حجز موعد
            </button>
            <button
              onClick={() => { setActiveTab(AppTab.VOICE); setMobileMenuOpen(false); }}
              className={`w-full p-4 rounded-xl text-right font-bold transition-colors flex items-center gap-3
                ${activeTab === AppTab.VOICE ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Mic className="w-5 h-5" />
              ستوديو الصوت
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 animate-fade-in">
        {activeTab === AppTab.HOME && (
          <Home onNavigate={setActiveTab} />
        )}

        {activeTab === AppTab.BOOKING && (
          <div className="h-[calc(100vh-80px)] p-4 md:p-6 bg-slate-50">
             <div className="max-w-4xl mx-auto h-full">
                <BookingCalendar />
             </div>
          </div>
        )}

        {activeTab === AppTab.VOICE && (
          <VoiceGenerator />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <Terminal className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-lg">المومني والحياصات</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                نحو مستقبل رقمي متكامل. نقدم حلولاً برمجية وتسويقية مبتكرة تساعد شركتك على النمو والمنافسة في السوق الرقمي.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab(AppTab.HOME)} className="hover:text-blue-400 transition-colors">الرئيسية</button></li>
                <li><button onClick={() => setActiveTab(AppTab.BOOKING)} className="hover:text-blue-400 transition-colors">حجز موعد</button></li>
                <li><button onClick={() => setActiveTab(AppTab.VOICE)} className="hover:text-blue-400 transition-colors">ستوديو الصوت</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-sm">
                <li>الأردن، عمان</li>
                <li dir="ltr">+962 79 000 0000</li>
                <li>info@momenihyasat.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
            © {new Date().getFullYear()} مؤسسة المومني والحياصات للتسويق والبرمجة. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
