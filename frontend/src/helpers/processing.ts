import imageCompression from 'browser-image-compression';

export async function processProfilePicture(file: File) {
  const options = {
    maxSizeMB: 0.0025,
    maxWidthOrHeight: 256,
    useWebWorker: true,
    fileType: 'image/jpeg',
    quality: 0.8
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
  }
}
