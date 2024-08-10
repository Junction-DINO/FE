import ImportImageIcon from '@/assets/importImage.svg';
import CameraIcon from '@/assets/Camera.svg';
import { useState } from 'react';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

const ImageSelectButton = () => {
  const [imageData, setImageData] = useState<string | null>(null);

  const handleImageImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageData(base64String);
        processImage(base64String); // 이미지를 처리 (Base64 -> Blob 변환 등)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // 여기에서 사진을 캡처하고 base64 형식으로 변환하는 로직을 추가할 수 있습니다.
        // 예: 캔버스를 사용하여 비디오 프레임을 캡처
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement('canvas');
        canvas.width = 640; // 원하는 해상도
        canvas.height = 480;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const base64String = canvas.toDataURL('image/png');
          setImageData(base64String);
          processImage(base64String); // 캡처한 이미지를 처리 (Base64 -> Blob 변환 등)
        }

        // 스트림 정리
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => console.error('카메라 접근 오류:', err));
  };

  const processImage = (base64String: string) => {
    const contentType = base64String.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(base64String, contentType);
    // 이후 Blob을 서버로 전송하는 로직을 추가합니다.
  };

  return (
    <div className="mx-2">
      <div className="flex w-full justify-center items-center space-x-2 mt-3 bg-customYellow rounded-3xl p-4 py-7 shadow-custom">
        <div className="inline-flex flex-1">
          {/* 이미지 불러오기 버튼 */}
          <div className="flex-1 flex justify-center items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img src={ImportImageIcon} alt="Import Image" className="w-10 h-10" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageImport}
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
