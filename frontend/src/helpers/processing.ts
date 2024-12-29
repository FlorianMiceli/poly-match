import imageCompression from 'browser-image-compression';
import { error as displayError } from './display';

export async function processProfilePicture(file: File) {
  try {
    const SIZE = 512;
    
    // First create a canvas to resize to exact dimensions
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Set canvas size to desired dimensions
    canvas.width = SIZE;
    canvas.height = SIZE;

    // Create a promise to handle the image loading and resizing
    const resizedImage = await new Promise<Blob>((resolve, reject) => {
      img.onload = () => {
        // Calculate dimensions to center and crop the image
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;

        // Draw the image centered and cropped
        ctx.drawImage(img, x, y, size, size, 0, 0, SIZE, SIZE);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        }, 'image/jpeg', 0.9);
      };

      img.onerror = () => reject(new Error('Image loading failed'));
      
      img.src = URL.createObjectURL(file);
    });

    // Now compress the resized image
    const targetSizeInBytes = 0.005 * 1024 * 1024;
    const maxIterations = 10;
    const initialQuality = 0.9;
    const minQuality = 0.1;

    let currentFile = new File([resizedImage], 'resized.jpg', { type: 'image/jpeg' });
    let currentQuality = initialQuality;
    let iterations = 0;
    let currentWidth = SIZE;

    while (currentFile.size > targetSizeInBytes && iterations < maxIterations) {
      if (iterations > 0) {
        currentQuality = Math.max(currentQuality - 0.1, minQuality);
        if (currentQuality === minQuality) {
          currentWidth = Math.floor(currentWidth * 0.9);
        }
      }

      const options = {
        maxSizeMB: targetSizeInBytes / (1024 * 1024),
        maxWidthOrHeight: currentWidth,
        initialQuality: currentQuality,
        useWebWorker: true,
      };

      try {
        currentFile = await imageCompression(currentFile, options);
      } catch (error) {
        console.error('Error compressing image:', error);
        break;
      }

      iterations++;
    }

    // Final aggressive compression if still over target size
    if (currentFile.size > targetSizeInBytes) {
      const finalOptions = {
        maxSizeMB: targetSizeInBytes / (1024 * 1024),
        maxWidthOrHeight: Math.floor(currentWidth * 0.8),
        initialQuality: minQuality,
        useWebWorker: true,
      };
      try {
        currentFile = await imageCompression(currentFile, finalOptions);
      } catch (error) {
        console.error('Error in final compression:', error);
      }
    }
    
    return currentFile;

  } catch (error) {
    console.error('Error processing image:', error);
    displayError('Error', 'Erreur lors du traitement de l\'image');
    return null;
  }
}