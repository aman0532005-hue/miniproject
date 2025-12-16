import React from 'react';
import { Heart, Shield, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col fade-in">
      {/* Navbar Placeholder (for aesthetics) */}
      <nav className="p-6 flex items-center gap-2">
         <div className="bg-gradient-to-tr from-brand-pink to-brand-purple w-8 h-8 rounded-lg flex items-center justify-center text-white">
            <Heart size={18} fill="currentColor" />
         </div>
         <span className="font-bold text-xl tracking-tight text-gray-800">WellBot</span>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl space-y-10 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Mental Health Chatbot</span>
          </h1>

          {/* Quote Bubble Section */}
          <div className="flex items-center gap-4 justify-center lg:justify-start">
             {/* Robot Avatar Image */}
             <div className="relative w-24 h-24 flex-shrink-0">
                <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse opacity-50"></div>
                <img 
                    src="https://picsum.photos/seed/friendlyrobot/200/200" 
                    alt="Robot Avatar" 
                    className="w-full h-full rounded-full object-cover shadow-md border-4 border-white relative z-10"
                />
             </div>
             
             {/* Speech Bubble */}
             <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm relative max-w-xs text-left">
                <p className="text-gray-600 italic text-sm font-medium">
                    "If you want to live a happy life, tie it to a goal, not to people or things!!"
                </p>
             </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button 
                onClick={onStartChat}
                className="bg-gradient-to-r from-brand-pink to-brand-purple text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(217,70,239,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
                TRY CHATBOT
            </button>
          </div>
        </div>

        {/* Right Content - Illustration */}
        <div className="flex-1 order-1 lg:order-2 flex justify-center w-full">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-brand-purple/10">
                <img 
                    src="https://picsum.photos/seed/meditate/800/600" 
                    alt="Mental Wellness Illustration" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl"></div>
            </div>
        </div>
      </main>

      {/* About Chatbot Section */}
      <section className="py-16 bg-brand-light/30">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">About Chatbot</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-pink to-brand-purple mx-auto rounded-full mb-12"></div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Shield size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Safe Space</h3>
                    <p className="text-gray-500 text-sm">A judgment-free zone to express your thoughts and feelings confidentially.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-pink-100 text-brand-pink rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Heart size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Compassionate</h3>
                    <p className="text-gray-500 text-sm">Trained to respond with empathy, kindness, and active listening skills.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 text-brand-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Available 24/7</h3>
                    <p className="text-gray-500 text-sm">Always here to chat whenever you need support, day or night.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm bg-white">
        <p>© {new Date().getFullYear()} MindfulBot. Not a replacement for professional help.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
