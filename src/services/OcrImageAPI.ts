// import { api } from './client';
// import { Base64ToBlob } from '@/utils/Base64ToBlob';

// type OCRImageDTO = {
//   image: string;
// };

// export const postOCRImage = async (OcrData: OCRImageDTO) => {
//   const formData = new FormData();
//   const url = `${import.meta.env.VITE_REACT_APP_SERVER_JK}/api/v1/머시기머시기`;

//   if (OcrData.profileImage && OcrData.profileImage.includes(',')) {
//     const contentType = OcrData.profileImage.split(';')[0].split(':')[1];
//     const blob = Base64ToBlob(OcrData.profileImage, contentType);
//     formData.append('profileImage', blob, 'profileImage.jpg'); // Adjust file name as needed
//   }

//   try {
//     const response = await api.patch(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error patching user info data:', error);
//     throw error;
//   }
// };
