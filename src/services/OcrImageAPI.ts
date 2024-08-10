import { api } from './client';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

type OCRImageDTO = {
  ocrImage: string;
};

export const postOCRImage = async (OcrData: OCRImageDTO) => {
  const formData = new FormData();
  // const url = `${import.meta.env.VITE_REACT_APP_SERVER}/api/v1/search/ocr`;
  const url = `https://e44f-211-168-232-133.ngrok-free.app/api/v1/search/ocr`;

  if (OcrData.ocrImage && OcrData.ocrImage.includes(',')) {
    const contentType = OcrData.ocrImage.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(OcrData.ocrImage, contentType);
    formData.append('ocrImage', blob, 'ocrImage.jpg'); // Adjust file name as needed
  } else {
    throw new Error('Invalid image data');
  }

  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting OCR image data:', error);
    throw error;
  }
};
