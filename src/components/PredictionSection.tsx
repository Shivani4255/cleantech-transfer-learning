import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, Recycle, Leaf, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { WasteImageClassifier, PredictionResult } from '../utils/imageClassifier';

const PredictionSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classifier] = useState(new WasteImageClassifier());

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB.');
        return;
      }

      setSelectedFile(file);
      setPrediction(null);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    try {
      const result = await classifier.classifyImage(selectedFile);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('An error occurred during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setPrediction(null);
    setIsLoading(false);
  };

  const getPredictionIcon = (category: string) => {
    switch (category) {
      case 'biodegradable':
        return <Leaf className="text-green-600" size={48} />;
      case 'recyclable':
        return <Recycle className="text-blue-600" size={48} />;
      case 'trash':
        return <Trash2 className="text-red-600" size={48} />;
      default:
        return <AlertCircle className="text-gray-600" size={48} />;
    }
  };

  const getPredictionColor = (category: string) => {
    switch (category) {
      case 'biodegradable':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'recyclable':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'trash':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getDisposalInstructions = (category: string) => {
    switch (category) {
      case 'biodegradable':
        return {
          title: 'Biodegradable Waste',
          instructions: [
            'Can be composted in your backyard compost bin',
            'Suitable for municipal organic waste collection',
            'Will decompose naturally within 2-6 months',
            'Helps create nutrient-rich soil when composted properly'
          ]
        };
      case 'recyclable':
        return {
          title: 'Recyclable Material',
          instructions: [
            'Clean the item before placing in recycling bin',
            'Check local recycling guidelines for specific requirements',
            'Can be processed into new products',
            'Helps reduce landfill waste and conserve resources'
          ]
        };
      case 'trash':
        return {
          title: 'General Waste',
          instructions: [
            'Dispose of in regular household waste bin',
            'Cannot be recycled through standard programs',
            'Will go to landfill or waste-to-energy facility',
            'Consider if item can be reused before disposal'
          ]
        };
      default:
        return { title: '', instructions: [] };
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            AI-Powered Waste Classification
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image of waste material and our advanced machine learning model will classify it with high accuracy
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Upload Your Image:
            </label>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-gray-600">
                    {selectedFile ? selectedFile.name : 'Choose File or Drag & Drop'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: JPG, PNG, GIF (Max 10MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Preview:</h3>
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-md max-h-64 rounded-lg shadow-md object-cover"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200"
                    title="Remove image"
                  >
                    <AlertCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedFile && (
            <div className="text-center mb-8 space-x-4">
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2" size={20} />
                    Classify Waste
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="inline-flex items-center px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300"
              >
                Reset
              </button>
            </div>
          )}

          {/* Prediction Result */}
          {prediction && (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`inline-block px-8 py-6 rounded-2xl border-2 ${getPredictionColor(prediction.category)}`}>
                  <div className="flex items-center justify-center mb-4">
                    {getPredictionIcon(prediction.category)}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 capitalize">
                    {prediction.category}
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="mr-2" size={16} />
                    <span className="text-lg font-medium">
                      {prediction.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-sm opacity-75">
                    {prediction.reasoning}
                  </p>
                </div>
              </div>

              {/* Disposal Instructions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Info className="text-blue-600 mr-2" size={24} />
                  <h4 className="text-xl font-semibold text-gray-800">
                    {getDisposalInstructions(prediction.category).title} - Disposal Guidelines
                  </h4>
                </div>
                <ul className="space-y-2">
                  {getDisposalInstructions(prediction.category).instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Confidence Meter */}
              <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
                  <span className="text-sm font-bold text-gray-900">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      prediction.confidence >= 90 ? 'bg-green-500' :
                      prediction.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {prediction.confidence >= 90 ? 'Very High Confidence' :
                   prediction.confidence >= 75 ? 'Good Confidence' : 'Moderate Confidence'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips for Better Classification:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start">
              <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>Use clear, well-lit images</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>Focus on a single item</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>Avoid blurry or dark images</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>Include the entire object in frame</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionSection;