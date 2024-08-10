import { useEffect, useRef } from 'react';

type CameraOCRDTO = {
  onCapture: (imageData: string) => void;
  onClose: () => void;
};

const CameraOCR = ({ onCapture, onClose }: CameraOCRDTO) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('웹 캠 에러 : ', err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/png');
      onCapture(imageData);
      onClose();
    }
  };

  return (
    <div className="relative">
      <video ref={videoRef} autoPlay className="w-full h-full" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        onClick={capturePhoto}
        className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded"
      >
        사진 찍기
      </button>
      <button
        onClick={onClose}
        className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded"
      >
        닫기
      </button>
    </div>
  );
};

export default CameraOCR;
