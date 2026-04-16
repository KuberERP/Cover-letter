import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Plane, Loader2, Copy, CheckCircle2, Sparkles } from 'lucide-react';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [formData, setFormData] = useState({
    name: 'Reni Maharabam',
    position: 'Cabin Crew',
    experience: 'assisted patients in healthcare as a physiotherapist',
    skills: 'Good communication skills, teamwork, problem-solving, adaptability',
    achievements: 'Kinesio Tapping, Cupping therapy, dry needling therapy',
    why: 'i want to work at virgin atlantic for its high quality service , innovation , and a focus on sustainability. They also provide strong mental health support for their staffs.'
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedLetter('');
    
    try {
      const prompt = `Write a professional and engaging cover letter for a position at Virgin Atlantic. The tone should reflect the brand’s personality—customer-focused, energetic, and slightly bold.

Here are my details:
Name: ${formData.name}
Position applying for: ${formData.position}
Relevant experience: ${formData.experience}
Key skills: ${formData.skills}
Achievements: ${formData.achievements}
Why I want to work at Virgin Atlantic: ${formData.why}

In the cover letter:
- Start with a compelling opening that shows enthusiasm for Virgin Atlantic
- Highlight how my skills align with the role and company values
- Include at least one example of delivering excellent customer service or handling a challenging situation (based on the experience provided)
- Reflect Virgin Atlantic’s brand voice—warm, confident, and people-oriented
- Keep it concise (around 250–350 words)
- End with a strong closing statement expressing eagerness for an interview

Please output ONLY the cover letter text, without any markdown formatting blocks like \`\`\` or extra conversational text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });

      setGeneratedLetter(response.text || 'No content generated.');
    } catch (error) {
      console.error("Error generating letter:", error);
      setGeneratedLetter("An error occurred while generating the cover letter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VA';

  return (
    <div className="min-h-screen bg-[#D2122E] font-sans flex justify-center items-center p-4 lg:p-8 text-[#1F2937]">
      <div className="w-full max-w-[1024px] bg-white rounded-[40px] flex flex-col lg:flex-row shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden lg:h-[768px]">
        
        {/* Left Panel: Profile Data / Form */}
        <div className="w-full lg:w-[340px] bg-[#4A154B] text-white p-8 lg:p-10 flex flex-col shrink-0">
          <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#D2122E] to-[#F2C94C] rounded-[30px] mb-6 flex items-center justify-center text-[40px] font-bold shrink-0 shadow-lg">
            {initials}
          </div>
          <h2 className="text-[24px] font-extrabold mb-1 shrink-0">{formData.name || 'Applicant'}</h2>
          <p className="text-[14px] opacity-80 mb-6 uppercase tracking-[1px] shrink-0">
            {formData.position || 'Aspiring Cabin Crew'}
          </p>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors placeholder-white/40"
                placeholder="e.g. Richard Branson"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors placeholder-white/40"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Core Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors placeholder-white/40"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Certifications / Achievements</label>
              <input
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors placeholder-white/40"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors resize-none h-20 placeholder-white/40"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-[#F2C94C] mb-2 block">Motivation</label>
              <textarea
                name="why"
                value={formData.why}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#F2C94C] transition-colors resize-none h-24 placeholder-white/40"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-6 w-full bg-[#D2122E] hover:bg-[#b00f26] text-white font-semibold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shrink-0 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Letter
              </>
            )}
          </button>
        </div>

        {/* Right Panel: Cover Letter Content */}
        <div className="flex-1 p-8 lg:p-10 bg-[#F9FAFB] flex flex-col overflow-hidden">
          <div className="border-b-2 border-[#D2122E] pb-4 mb-6 flex justify-between items-end shrink-0">
            <div>
              <span className="text-[20px] font-black italic text-[#D2122E]">virgin atlantic</span>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-bold text-[#1F2937]">COVER LETTER</p>
              <p className="text-[12px] text-[#6B7280]">APPLICATION ID: #VA-2024-{initials}</p>
            </div>
          </div>

          <h1 className="text-[32px] mb-5 tracking-tight text-[#1F2937] font-bold shrink-0">
            Ready for <span className="text-[#D2122E] font-bold">Take-off</span>.
          </h1>

          <div className="bg-white flex-1 rounded-[24px] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E5E7EB] leading-relaxed overflow-y-auto relative">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#6B7280]">
                <Plane className="w-12 h-12 animate-bounce mb-4 text-[#D2122E]" />
                <p className="font-medium">Crafting your perfect pitch...</p>
              </div>
            ) : generatedLetter ? (
              <div className="text-[14px] text-[#1F2937] whitespace-pre-wrap font-sans">
                {generatedLetter}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#6B7280] text-center px-6">
                <Plane className="w-16 h-16 mb-4 opacity-20 text-[#D2122E]" />
                <p className="font-medium">Your letter will appear here</p>
                <p className="text-[13px] mt-2 max-w-[250px]">Fill out your details in the sidebar and click generate to get started.</p>
              </div>
            )}
          </div>

          {/* Button Group */}
          <div className="mt-6 flex gap-3 shrink-0">
            <button
              onClick={handleCopy}
              disabled={!generatedLetter || isLoading}
              className="px-6 py-3 rounded-full font-semibold text-[14px] bg-[#D2122E] text-white hover:bg-[#b00f26] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Letter
                </>
              )}
            </button>
            <button
              disabled={!generatedLetter || isLoading}
              className="px-6 py-3 rounded-full font-semibold text-[14px] bg-[#E5E7EB] text-[#1F2937] hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
