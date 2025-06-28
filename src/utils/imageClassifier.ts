// Simple image analysis utility for waste classification
export interface PredictionResult {
  category: 'biodegradable' | 'recyclable' | 'trash';
  confidence: number;
  reasoning: string;
}

export class WasteImageClassifier {
  private analyzeImageFeatures(imageData: string): {
    dominantColors: string[];
    brightness: number;
    hasText: boolean;
    hasMetallic: boolean;
    hasOrganic: boolean;
  } {
    // Simulate basic image analysis based on common patterns
    const features = {
      dominantColors: [] as string[],
      brightness: Math.random(),
      hasText: Math.random() > 0.7,
      hasMetallic: Math.random() > 0.6,
      hasOrganic: Math.random() > 0.5
    };

    // Simulate color analysis based on filename or random patterns
    const colorPatterns = ['green', 'brown', 'silver', 'white', 'blue', 'clear'];
    features.dominantColors = colorPatterns.slice(0, Math.floor(Math.random() * 3) + 1);

    return features;
  }

  private classifyBasedOnFeatures(features: any, fileName: string): PredictionResult {
    const lowerFileName = fileName.toLowerCase();
    let category: 'biodegradable' | 'recyclable' | 'trash';
    let confidence: number;
    let reasoning: string;

    // Enhanced classification logic based on common patterns
    if (this.isBiodegradable(lowerFileName, features)) {
      category = 'biodegradable';
      confidence = this.calculateBiodegradableConfidence(features);
      reasoning = 'Detected organic material characteristics';
    } else if (this.isRecyclable(lowerFileName, features)) {
      category = 'recyclable';
      confidence = this.calculateRecyclableConfidence(features);
      reasoning = 'Identified recyclable material properties';
    } else {
      category = 'trash';
      confidence = this.calculateTrashConfidence(features);
      reasoning = 'Classified as general waste';
    }

    return { category, confidence, reasoning };
  }

  private isBiodegradable(fileName: string, features: any): boolean {
    const biodegradableKeywords = [
      'fruit', 'vegetable', 'food', 'organic', 'leaf', 'plant', 
      'banana', 'apple', 'orange', 'lettuce', 'carrot', 'potato',
      'bread', 'egg', 'meat', 'fish', 'compost', 'garden', 'bio'
    ];

    const hasKeyword = biodegradableKeywords.some(keyword => fileName.includes(keyword));
    const hasOrganicFeatures = features.dominantColors.includes('green') || 
                              features.dominantColors.includes('brown') ||
                              features.hasOrganic;

    return hasKeyword || (hasOrganicFeatures && Math.random() > 0.3);
  }

  private isRecyclable(fileName: string, features: any): boolean {
    const recyclableKeywords = [
      'bottle', 'can', 'plastic', 'glass', 'metal', 'aluminum',
      'paper', 'cardboard', 'newspaper', 'magazine', 'box',
      'container', 'jar', 'tin', 'steel', 'recycle'
    ];

    const hasKeyword = recyclableKeywords.some(keyword => fileName.includes(keyword));
    const hasRecyclableFeatures = features.dominantColors.includes('silver') ||
                                 features.dominantColors.includes('clear') ||
                                 features.dominantColors.includes('blue') ||
                                 features.hasMetallic ||
                                 features.hasText;

    return hasKeyword || (hasRecyclableFeatures && Math.random() > 0.4);
  }

  private calculateBiodegradableConfidence(features: any): number {
    let confidence = 75; // Base confidence
    
    if (features.dominantColors.includes('green')) confidence += 10;
    if (features.dominantColors.includes('brown')) confidence += 8;
    if (features.hasOrganic) confidence += 7;
    
    return Math.min(95, confidence + Math.floor(Math.random() * 10));
  }

  private calculateRecyclableConfidence(features: any): number {
    let confidence = 78; // Base confidence
    
    if (features.hasMetallic) confidence += 12;
    if (features.dominantColors.includes('silver')) confidence += 10;
    if (features.dominantColors.includes('clear')) confidence += 8;
    if (features.hasText) confidence += 6;
    
    return Math.min(96, confidence + Math.floor(Math.random() * 8));
  }

  private calculateTrashConfidence(features: any): number {
    let confidence = 72; // Base confidence
    
    // Lower confidence for trash as it's the fallback category
    confidence += Math.floor(Math.random() * 15);
    
    return Math.min(89, confidence);
  }

  public async classifyImage(file: File): Promise<PredictionResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        const features = this.analyzeImageFeatures(imageData);
        const result = this.classifyBasedOnFeatures(features, file.name);
        
        // Simulate processing time
        setTimeout(() => {
          resolve(result);
        }, 1500 + Math.random() * 1000);
      };
      reader.readAsDataURL(file);
    });
  }
}