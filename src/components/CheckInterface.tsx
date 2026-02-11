import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, ArrowLeft, Check } from 'lucide-react';
import { ImageType, UploadedImage } from '../types';

interface CheckInterfaceProps {
  onSubmit: (images: UploadedImage[]) => void;
  onBack: () => void;
}

const imageTypes: { type: ImageType; label: string; description: string }[] = [
  { type: 'side', label: 'Side Profile', description: 'Outer side view of the sneaker' },
  { type: 'label', label: 'Inner Label', description: 'Size tag and manufacturing details' },
  { type: 'box', label: 'Box Label', description: 'Shoe box label with SKU' },
  { type: 'sole', label: 'Sole Stitching', description: 'Bottom sole and stitching pattern' },
  { type: 'heel', label: 'Heel Tab', description: 'Back heel tab and branding' },
];

export default function CheckInterface({ onSubmit, onBack }: CheckInterfaceProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragOver, setDragOver] = useState<ImageType | null>(null);

  const handleFileSelect = (type: ImageType, file: File) => {
    if (!file.type.startsWith('image/')) return;

    const preview = URL.createObjectURL(file);
    setUploadedImages(prev => {
      const filtered = prev.filter(img => img.type !== type);
      return [...filtered, { type, file, preview }];
    });
  };

  const handleDrop = (type: ImageType, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(type, file);
  };

  const handleRemove = (type: ImageType) => {
    setUploadedImages(prev => prev.filter(img => img.type !== type));
  };

  const handleSubmit = () => {
    if (uploadedImages.length === 5) {
      onSubmit(uploadedImages);
    }
  };

  const isUploaded = (type: ImageType) => uploadedImages.some(img => img.type === type);
  const getImage = (type: ImageType) => uploadedImages.find(img => img.type === type);

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Your Photos</h1>
            <p className="text-xl text-gray-400">
              We need 5 specific images for accurate authentication
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-[#00FF41]/10 border border-[#00FF41]/20 rounded-full">
              <span className="text-sm font-medium text-[#00FF41]">
                {uploadedImages.length} / 5 Images Uploaded
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {imageTypes.map((imageType, index) => {
              const uploaded = isUploaded(imageType.type);
              const image = getImage(imageType.type);

              return (
                <motion.div
                  key={imageType.type}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <input
                    type="file"
                    id={`file-${imageType.type}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(imageType.type, file);
                    }}
                  />

                  <label
                    htmlFor={`file-${imageType.type}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(imageType.type);
                    }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => handleDrop(imageType.type, e)}
                    className={`block cursor-pointer transition-all ${
                      uploaded ? 'ring-2 ring-[#00FF41]' : ''
                    }`}
                  >
                    <div
                      className={`relative h-48 rounded-xl border-2 border-dashed overflow-hidden transition-all ${
                        dragOver === imageType.type
                          ? 'border-[#00FF41] bg-[#00FF41]/10'
                          : uploaded
                          ? 'border-[#00FF41] bg-[#00FF41]/5'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {uploaded && image ? (
                        <div className="relative w-full h-full">
                          <img
                            src={image.preview}
                            alt={imageType.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(imageType.type);
                            }}
                            className="absolute top-2 right-2 p-2 bg-[#FF3B30] rounded-lg hover:bg-[#FF3B30]/80 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                            <div className="p-1 bg-[#00FF41] rounded-full">
                              <Check className="w-4 h-4 text-black" />
                            </div>
                            <span className="font-semibold">{imageType.label}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-3" />
                          <p className="font-semibold mb-1">{imageType.label}</p>
                          <p className="text-sm text-gray-400">{imageType.description}</p>
                        </div>
                      )}
                    </div>
                  </label>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: uploadedImages.length === 5 ? 1.02 : 1 }}
            whileTap={{ scale: uploadedImages.length === 5 ? 0.98 : 1 }}
            onClick={handleSubmit}
            disabled={uploadedImages.length !== 5}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all ${
              uploadedImages.length === 5
                ? 'bg-gradient-to-r from-[#00FF41] to-[#00CC33] text-black hover:shadow-2xl hover:shadow-[#00FF41]/50'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            {uploadedImages.length === 5 ? 'Start Authentication' : 'Upload All 5 Images to Continue'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
