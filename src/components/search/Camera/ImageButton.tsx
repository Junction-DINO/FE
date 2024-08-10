import React, { useState } from 'react';
import ImportImageIcon from '@/assets/importImage.svg';
import CameraIcon from '@/assets/Camera.svg';
import { postOCRImage } from '@/services/OcrImageAPI';

const ImageSelectButton = () => {
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageData(base64String);
        processImage(base64String); // Base64 문자열을 그대로 서버로 전달
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement('canvas');
        canvas.width = 420;
        canvas.height = 920;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const base64String = canvas.toDataURL('image/png');
          setImageData(base64String);
          processImage(base64String); // Base64 문자열을 그대로 서버로 전달
        }

        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => console.error('Camera access error:', err));
  };

  const processImage = async (base64String: string) => {
    try {
      const response = await postOCRImage({ ocrImage: base64String });
      console.log('OCR Response:', response);
      // OCR API의 응답을 처리하는 로직 추가 (예: 사용자에게 결과 표시)
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };
  console.log('imageData:', imageData);
  return (
    <div className="mx-2">
      <div className="flex w-full justify-center items-center space-x-2 mt-3 bg-customYellow rounded-3xl p-4 py-7 shadow-custom">
        <div className="inline-flex flex-1">
          {/* 이미지 업로드 버튼 */}
          <div className="flex-1 flex justify-center items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img src={ImportImageIcon} alt="Import Image" className="w-10 h-10" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageImport} // 이미지 업로드 핸들러
            />
          </div>

          {/* 구분선 */}
          <div className="w-px h-12 bg-white"></div>

          {/* 카메라 촬영 버튼 */}
          <div className="flex-1 flex justify-center items-center">
            <button onClick={handleCameraClick} className="cursor-pointer">
              <img src={CameraIcon} alt="Camera" className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelectButton;
