import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      text: "Advanced AI-powered analysis and classification of municipal waste with 90%+ accuracy based on visual patterns and material recognition."
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      text: "Real-time processing and continuous learning from user feedback to improve classification accuracy over time."
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      text: "Comprehensive disposal guidelines and environmental impact information to promote sustainable waste management practices."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-4">
            ABOUT
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Learn More <span className="text-green-600">About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            CleanTech is a pioneering organization dedicated to transforming waste management 
            through advanced AI technology and sustainable practices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our team comprises innovative data scientists, AI engineers, and environmental experts 
                committed to leveraging cutting-edge machine learning technologies for accurate waste 
                classification and sustainable environmental solutions.
              </h3>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="text-green-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Our Technology</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our AI-powered waste classification system uses advanced computer vision and 
                machine learning algorithms trained on thousands of waste images. The system 
                continuously learns and improves its accuracy through transfer learning techniques, 
                ensuring reliable classification results for better waste management decisions.
              </p>
              <button className="inline-flex items-center px-6 py-3 text-green-600 border-2 border-green-600 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-300">
                Learn More
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="text-green-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">92%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Award className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Images Processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;