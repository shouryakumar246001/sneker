export type ViewType = 'landing' | 'check' | 'scanning' | 'result';

export type ImageType = 'side' | 'label' | 'box' | 'sole' | 'heel';

export interface UploadedImage {
  type: ImageType;
  file: File;
  preview: string;
}

export interface CheckResult {
  isAuthentic: boolean;
  confidence: number;
  issues?: string[];
  checkId: string;
  timestamp: Date;
  sneakerModel?: string;
}

export interface LiveCheckItem {
  id: string;
  location: string;
  sneaker: string;
  result: 'Authentic' | 'Fake';
}
