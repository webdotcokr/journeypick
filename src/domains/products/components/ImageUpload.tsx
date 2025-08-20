'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/domains/users/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const uploadImage = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${user.id}/experiences/${fileName}`;

    const { data, error } = await supabase.storage
      .from('experience-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('experience-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (filesToUpload.length === 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = filesToUpload.map(uploadImage);
      const uploadedUrls = await Promise.all(uploadPromises);
      
      onImagesChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    onImagesChange(updatedImages);
  };

  const canUploadMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canUploadMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            disabled={uploading}
          />
          
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-warm-gray">Uploading images...</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-warm-gray">
                  Drag and drop images here, or{' '}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  {images.length}/{maxImages} images uploaded
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button (alternative to drag & drop) */}
      {canUploadMore && !uploading && (
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add More Images ({images.length}/{maxImages})
        </Button>
      )}
    </div>
  );
}