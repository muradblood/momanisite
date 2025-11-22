
import React, { useState } from 'react';
import { generateLogo } from '../services/geminiService';
import { Download, RefreshCw, Wand2, Image as ImageIcon, Ratio, Palette, Layers, ChevronDown } from 'lucide-react';

const DEFAULT_PROMPT = "شعار حديث واحترافي لمؤسسة 'المومني والحياصات للتسويق والبرمجة'. يجمع التصميم بين الرموز التقنية المجردة (مثل عقد الدوائر أو أقواس الكود) مع رسم بياني للنمو التسويقي. تصميم مسطح بسيط، لوحة ألوان باللون الأزرق الداكن والفيروزي، خلفية بيضاء.";

const ASPECT_RATIOS = [
  { value: '1:1', label: 'مربع (1:1)' },
  { value: '16:9', label: 'عريض (16:9)' },
  { value: '4:3', label: 'قياسي (4:3)' },
  { value: '3:4', label: 'طولي (3:4)' },
  { value: '9:16', label: 'قصة (9:16)' },
];

const STYLE_OPTIONS = [
  { value: '', label: 'تلقائي (AI Choice)' },
  { value: 'modern, sleek, futuristic, clean lines', label: 'عصري (Modern)' },
  { value: 'minimalist, simple, flat design, negative space', label: 'بسيط (Minimalist)' },
  { value: 'classic, vintage, retro, elegant, serif fonts', label: 'كلاسيكي (Classic)' },
  { value: 'abstract, geometric shapes, creative, artistic', label: 'تجريدي (Abstract)' },
  { value: 'playful, fun, cartoonish, rounded, friendly', label: 'مرح (Playful)' },
];

const COLOR_OPTIONS = [
  { value: '', label: 'تلقائي (AI Choice)' },
  { value: 'modern cold colors, shades of blue, teal, white, professional', label: 'أزرق عصري (Modern Blues)' },
  { value: 'earthy tones, olive green, brown, beige, organic', label: 'ألوان ترابية (Earthy Tones)' },
  { value: 'vibrant gradients, neon purple to pink, bright cyan, glowing', label: 'تدرجات حيوية (Vibrant Gradients)' },
  { value: 'black and gold luxury color scheme, metallic', label: 'أسود وذهبي (Luxury)' },
  { value: 'monochrome black and white, high contrast', label: 'أبيض وأسود (Monochrome)' },
  { value: 'custom', label: 'مخصص (أكواد Hex)' },
];

const LogoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [stylePreset, setStylePreset] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [customHex, setCustomHex] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);

    // Construct enhanced prompt with color info
    let enhancedPrompt = prompt;
    
    if (stylePreset) {
      enhancedPrompt += `, style: ${stylePreset}`;
    }

    let colorDesc = colorPalette;
    
    if (colorPalette === 'custom') {
      colorDesc = `custom color palette using hex codes: ${customHex}`;
    }

    if (colorDesc) {
      enhancedPrompt += `, color palette: ${colorDesc}`;
    }

    try {
      const imageUrl = await generateLogo(enhancedPrompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError("فشل إنشاء الشعار. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">استوديو تصميم الشعارات (AI)</h2>
        <p className="text-slate-600">
          ابتكر هوية بصرية فريدة لمشروعك باستخدام تقنية Imagen 3 المتطورة.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              وصف الشعار
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-700 text-sm leading-relaxed text-right"
              placeholder="وصف فكرتك للشعار هنا..."
            />
          </div>

          {/* Style Selection - Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              نمط الشعار
            </label>
            <div className="relative">
              <select
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer"
              >
                {STYLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Color Palette Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              لوحة الألوان
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setColorPalette(option.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border text-right
                      ${colorPalette === option.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {colorPalette === 'custom' && (
                <div className="animate-fade-in">
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    placeholder="أدخل أكواد الألوان (مثال: #1E40AF, #F59E0B)"
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-left"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 text-right">سيحاول النموذج الالتزام بالأكواد المحددة بدقة.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Ratio className="w-4 h-4" />
              أبعاد الصورة
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio.value}
                  onClick={() => setAspectRatio(ratio.value)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all border
                    ${aspectRatio === ratio.value
                      ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-l from-blue-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02]'
              }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                جاري التصميم...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                إنشاء الشعار
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="text-xs text-slate-400">
            <p>نصيحة: دمج وصف دقيق مع نمط ولوحة ألوان مناسبة يعطي أفضل النتائج.</p>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center bg-slate-100 rounded-2xl border border-slate-200 min-h-[400px] relative overflow-hidden">
          {generatedImage ? (
            <div className="relative group w-full h-full flex items-center justify-center p-8">
              <img 
                src={generatedImage} 
                alt="Generated Logo" 
                className="max-w-full max-h-full shadow-2xl rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
                style={{
                  aspectRatio: aspectRatio.replace(':', '/')
                }}
              />
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={generatedImage} 
                  download={`momeni-hyasat-logo-${aspectRatio}.jpg`}
                  className="bg-white text-slate-800 p-2 rounded-full shadow-lg hover:bg-slate-50"
                  title="تحميل"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 p-8">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
              <p>سيظهر شعارك هنا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoCreator;
