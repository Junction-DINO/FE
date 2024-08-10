import axios from 'axios';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

type OCRImageDTO = {
  ocrImage: string;
};

type OCRResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    foodCode: string;
    foodName: string;
  }[];
};

export const postOCRImage = async (OcrData: OCRImageDTO): Promise<OCRResponse> => {
  const formData = new FormData();
  const url = `${import.meta.env.VITE_REACT_APP_SERVER}/api/v1/search/ocr`;

  if (OcrData.ocrImage && OcrData.ocrImage.includes(',')) {
    const contentType = OcrData.ocrImage.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(OcrData.ocrImage, contentType);
    formData.append('ocrImage', blob, 'ocrImage.jpg'); // Adjust file name as needed
  } else {
    throw new Error('Invalid image data');
  }

  try {
    const response = await axios.post<OCRResponse>(url, formData, {
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
