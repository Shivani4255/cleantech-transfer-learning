import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setActiveSection }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          Welcome to <span className="text-green-400">municipal waste classification</span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-12 leading-relaxed text-gray-200">
          This platform allows you to upload images of waste materials, and our advanced machine learning 
          model will classify them into appropriate categories. Proper waste classification helps in efficient 
          recycling and waste management, making our environment cleaner and more sustainable.
        </p>
        
        <button
          onClick={() => setActiveSection('predict')}
          className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          GET STARTED
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;