
import React, { useState } from 'react';
import { AppTab } from '../types';
import { 
  ArrowLeft, Megaphone, Target, Palette, PenTool, Video, BrainCircuit, 
  Users, Smartphone, Share2, Monitor, ShoppingCart, Layout, Wrench, 
  Database, Sparkles, CheckCircle2, Mail, ChevronDown, ChevronUp, Eye, Play, Camera
} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: AppTab) => void;
}

const PORTFOLIO_ITEMS = [
  {
    title: "متجر الأزياء العصرية",
    category: "تطوير متاجر إلكترونية",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "تصميم وتطوير متجر إلكتروني متكامل مع بوابة دفع ونظام إدارة مخزون."
  },
  {
    title: "عقارات المستقبل",
    category: "مواقع شركات",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "منصة عقارية تفاعلية تتيح للمستخدمين استعراض العقارات بجولات افتراضية."
  },
  {
    title: "تطبيق توصيل سريع",
    category: "تطبيقات جوال",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "تطبيق ذكي لطلب وتوصيل الطعام مع تتبع مباشر للطلبات."
  },
  {
    title: "هوية بصرية لشركة تقنية",
    category: "هوية بصرية",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "تصميم شعار وهدية بصرية كاملة تعكس الابتكار والحداثة."
  },
   {
    title: "حملة تسويق قهوة مختصة",
    category: "تسويق رقمي",
    image: "https://images.unsplash.com/photo-1515643831049-a2f751e79832?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "إدارة حملات إعلانية عبر منصات التواصل الاجتماعي حققت زيادة في المبيعات بنسبة 150%."
  },
  {
    title: "نظام إدارة عيادات",
    category: "نظم ويب",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "لوحة تحكم شاملة لإدارة المواعيد وسجلات المرضى بكفاءة عالية."
  }
];

const SERVICES_LIST = [
  { title: "إدارة الحملات الإعلانية", icon: Megaphone, desc: "كل تمريرة إصبع هي فرصة للبيع - اغتنمها. نصنع حملات إعلانية تجمع بين الإبداع والاحتراف، ونقود علامتك بخطى واثقة من لفت الانتباه إلى تحقيق النتائج." },
  { title: "استراتيجية المنتج والسوق", icon: Target, desc: "حقق الريادة في السوق مع تخطيط استراتيجي للمنتجات. نقوم بتحليل احتياجات العملاء ودراسة المنافسة لوضع استراتيجيات ناجحة تعزز علامتك التجارية." },
  { title: "بناء هوية تجارية متكاملة", icon: Palette, desc: "اجعل علامتك التجارية لا تُنسى من خلال هوية بصرية مصممة خصيصًا لك. بدءًا من تصميم الشعارات وصولاً إلى أنظمة العلامة التجارية المتكاملة." },
  { title: "تصميم المحتوى الإبداعي", icon: PenTool, desc: "ندير حضورك الرقمي. نتقنه، ونرتقي به. من صناعة المحتوى إلى التفاعل مع جمهورك، نحن معك في كل خطوة." },
  { title: "إنتاج التصوير الفوتوغرافي", icon: Camera, desc: "اجعل علامتك التجارية تنبض بالحياة من خلال تصوير احترافي يترك أثرًا لا يُنسى. ننتج صورًا آسرة تعكس رؤيتك بوضوح." },
  { title: "إنتاج إعلانات وتغطية فعاليات", icon: Video, desc: "إعلانات إحترافية إبداعية تشد الانتباه من اللحظة الأولى. وتغطية فعاليات متقنة، تُبرز كل لحظة من قصتك ومشاركيك." },
  { title: "حلول التسويق (AI)", icon: BrainCircuit, desc: "حقق التميز في التسويق مع حلول مدعومة بالذكاء الاصطناعي. خدماتنا تُحسّن الأداء من خلال رؤى مستندة إلى البيانات." },
  { title: "إدارة الحسابات", icon: Users, desc: "ندير حضورك الرقمي. نتقنه، ونرتقي به. من صناعة المحتوى إلى التفاعل مع جمهورك، نحن معك في كل خطوة. ابق حاضرًا، متجددًا." },
  { title: "مبدعي الويب والتطبيقات", icon: Smartphone, desc: "افتح آفاق النمو مع حلول مواقع الويب والتطبيقات المصممة باحترافية. يقدم فريقنا منصات متطورة تمزج بين التصميم والتكنولوجيا." },
  { title: "وصل المؤثرين", icon: Share2, desc: "نربطك بالمؤثر المثالي لإعلانك. نختار المؤثر الأنسب بناءً على جمهورك وأهدافك التسويقية. نوفر لك تجربة احترافية." },
];

const WEB_SERVICES = [
  { title: "تصميم مواقع الشركات", icon: Monitor, desc: "كل موقع إلكتروني للشركات يتم تصميمه وبناؤه خصيصًا لتلبية احتياجات وأهداف عملك. نركّز على تقديم مواقع فريدة تميّزك عن منافسيك." },
  { title: "تطوير مواقع التجارة الإلكترونية", icon: ShoppingCart, desc: "يمكنك الاعتماد علينا لإنشاء موقع تجارة إلكترونية عالي الأداء، قادر على تعزيز المبيعات بسهولة وكفاءة." },
  { title: "تصميم صفحات الهبوط", icon: Layout, desc: "ننشئ صفحات هبوط متميزة تحقق نتائج فعلية! نستخدم أحدث الاتجاهات والتقنيات لضمان توافقها مع أهداف كل حملة." },
  { title: "صيانة المواقع الإلكترونية", icon: Wrench, desc: "تقدّم المؤسسة خطة صيانة مواقع مخصصة ومفصلة لضمان تجربة سريعة ومستقرة لزوار موقعك بشكل دائم." },
  { title: "تطوير واجهات وتجربة المستخدم", icon: Sparkles, desc: "نضمن استخدام أحدث أدوات التصميم والنماذج الأولية. نحرص على تقديم تصميم يتناسب مع جميع الواجهات والأجهزة." },
  { title: "أنظمة إدارة المحتوى (CMS)", icon: Database, desc: "نزود موقعك بنظام إدارة محتوى مخصص، يتيح لك إجراء تغييرات واسعة مثل تعديل، تحديث، أو إزالة محتوى بكل سهولة." },
];

const FAQ_ITEMS = [
  { q: "كم يستغرق تصميم موقع إلكتروني؟", a: "يعتمد الوقت على حجم وتعقيد المشروع. عادةً ما تستغرق المواقع التعريفية من 1-2 أسبوع، بينما قد تستغرق المتاجر الإلكترونية والمنصات المعقدة من 4-8 أسابيع." },
  { q: "هل سيكون موقعي متوافقاً مع الهواتف المحمولة؟", a: "بالتأكيد. جميع المواقع التي نطورها مصممة لتكون متجاوبة بالكامل (Responsive) وتعمل بكفاءة عالية على جميع الأجهزة والشاشات." },
  { q: "هل تقدمون خدمات استضافة ودومين؟", a: "نعم، نقدم باقات شاملة تتضمن حجز النطاق (Domain) وخدمات استضافة سريعة وآمنة، بالإضافة إلى إعداد البريد الإلكتروني الرسمي." },
  { q: "هل يمكنني تعديل محتوى الموقع بنفسي بعد الإطلاق؟", a: "نعم، نقوم ببناء معظم المواقع باستخدام أنظمة إدارة محتوى (CMS) سهلة الاستخدام، ونقدم تدريباً كاملاً لك ولموظفيك على كيفية إدارة الموقع." },
];

const HeroTooltip = ({ text, tooltip }: { text: string, tooltip: string }) => (
  <span className="relative group cursor-help inline-block border-b border-blue-400/30 border-dashed mx-1">
    <span className="text-blue-200 font-semibold group-hover:text-blue-400 transition-colors">{text}</span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none text-center shadow-xl border border-slate-700 z-50 transform translate-y-2 group-hover:translate-y-0">
      {tooltip}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800/95"></div>
    </div>
  </span>
);

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-0">
       {/* Custom Animations */}
       <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Slow Zoom Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay animate-slow-zoom"></div>
        </div>
        
        {/* Animated Gradient Blobs for Parallax Feel */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Main Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40 text-center lg:text-right">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                شريكك الرقمي الأول في المنطقة
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                نحول الأفكار إلى <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-indigo-400">واقع رقمي ملموس</span>
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                في مؤسسة المومني والحياصات، نجمع بين 
                <HeroTooltip text="الإبداع التسويقي" tooltip="نصمم حملات إعلانية واستراتيجيات محتوى تصل لجمهورك المستهدف بدقة." />
                و 
                <HeroTooltip text="الخبرة البرمجية" tooltip="نطور حلولاً تقنية متقدمة، من المواقع الإلكترونية إلى التطبيقات الذكية." />
                لنقدم لك حلولاً متكاملة تضمن تفوقك في السوق الرقمي.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate(AppTab.BOOKING)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  ابدأ مشروعك الآن
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative mt-10 lg:mt-0 animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 animate-pulse"></div>
              
              <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl lg:transform lg:rotate-3 lg:hover:rotate-0 transition-transform duration-500 group aspect-video w-full">
                {/* Introductory Video */}
                <video 
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-team-of-office-workers-working-on-computers-4996-large.mp4" type="video/mp4" />
                  متصفحك لا يدعم عرض الفيديو.
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white/95 backdrop-blur-sm border border-slate-200 p-3 md:p-4 rounded-2xl shadow-xl animate-bounce-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 md:p-2.5 rounded-full shadow-lg shadow-blue-600/30">
                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm">فيديو تعريفي</h4>
                    <p className="text-[10px] md:text-xs text-slate-500">تعرف على خدماتنا في دقيقة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">من نحن؟</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 leading-relaxed">
              مؤسسة رائدة في مجال الحلول الرقمية، نسعى لتمكين الشركات والأفراد من خلال توفير خدمات برمجية وتسويقية احترافية. نؤمن بأن النجاح الرقمي يتطلب مزيجاً ذكياً من التكنولوجيا المتطورة والاستراتيجيات الإبداعية.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-2xl">1</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">رؤيتنا</h3>
              <p className="text-slate-500">أن نكون الشريك المفضل للتحول الرقمي في الشرق الأوسط.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 font-bold text-2xl">2</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">مهمتنا</h3>
              <p className="text-slate-500">تمكين عملائنا من تحقيق أهدافهم عبر حلول تقنية مبتكرة وفعالة.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-2xl">3</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">قيمنا</h3>
              <p className="text-slate-500">الابتكار، الجودة، الشفافية، والالتزام بالنتائج.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">خدماتنا الشاملة</h2>
            <p className="text-slate-500 mt-4">حلول متكاملة تغطي كافة احتياجاتك الرقمية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">أعمالنا المميزة</h2>
              <p className="text-slate-400 max-w-2xl">
                نفخر بسجل حافل من المشاريع الناجحة التي ساعدت عملاءنا على النمو والتميز.
              </p>
            </div>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium backdrop-blur-sm transition-all flex items-center gap-2">
              عرض كل الأعمال <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <div key={idx} className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-20"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform z-30">
                  <span className="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-bold rounded-full mb-3 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                    {item.desc}
                  </p>
                  <button className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:text-blue-300">
                    تفاصيل المشروع <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Web Development Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                تميّز بحضورك الرقمي مع أفضل شركة برمجة مواقع
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                تحتاج علامتك التجارية أن تبرز وتتميّز في سوق لا يمكن الا ان يوصف بالتنافسية الشديدة. فلا بد أن تمتلك واجهة رقمية تعكس جودة علامتك وقوّتها.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                أفضل وسيلة لتحقيق ذلك هي امتلاك موقع إلكتروني مُصمَّم باحترافية عالية يعكس متطلبات ورؤية عملك. نحن نفخر بكوننا شركة تطوير مواقع تضم فريقًا من المطوّرين المحترفين، الذين يقودهم الشغف والخبرة.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
                <h3 className="font-bold text-blue-800 mb-4">لماذا تختارنا؟</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    خبراء واجهة وتجربة المستخدم
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    مواقع ديناميكية تفاعلية
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    توافق تام مع الأجهزة المحمولة
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    خبرة واسعة في التصميم
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl rotate-3 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Web Development" 
                loading="lazy"
                className="relative rounded-3xl shadow-xl border-4 border-white w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <h4 className="font-bold text-slate-900 mb-2">اجعل الانطباع الأول لا ينسى</h4>
                <p className="text-xs text-slate-500">موقعك الإلكتروني هو نقطة الاتصال الأولى. التصميم القوي والجذاب يمكن أن يصنع الفارق كله.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WEB_SERVICES.map((service, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">الأسئلة الشائعة عن خدمات الويب</h2>
            <p className="text-slate-500 mt-2">إجابات على أهم استفساراتك حول تصميم وتطوير المواقع</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all ${openFaq === idx ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-right"
                >
                  <span className={`font-bold text-lg ${openFaq === idx ? 'text-blue-700' : 'text-slate-700'}`}>
                    {item.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لنقل مشروعك إلى المستوى التالي؟</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            دعنا نساعدك في بناء حضور رقمي قوي ومؤثر. فريقنا مستعد لتحويل رؤيتك إلى واقع.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate(AppTab.BOOKING)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              احجز استشارة مجانية
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-700/50 hover:bg-blue-700 text-white rounded-xl font-bold border border-blue-400/30 transition-all flex items-center justify-center gap-2">
              تواصل معنا
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
