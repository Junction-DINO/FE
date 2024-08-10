import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';

const ImageClassifier: React.FC = () => {
  const camera = useRef<HTMLVideoElement | null>(null);
  const figures = useRef<HTMLDivElement | null>(null);
  const [net, setNet] = useState<mobilenet.MobileNet | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedNet = await mobilenet.load();
      setNet(loadedNet);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (camera.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          camera.current.srcObject = stream;
        } catch (err) {
          console.error('Error accessing the webcam: ', err);
        }
      }
    };

    setupCamera();
  }, [camera]);

  const captureImage = async () => {
    if (net && camera.current) {
      const webcam = await tf.data.webcam(camera.current);
      const img = await webcam.capture();
      const result = await net.classify(img);

      if (figures.current) {
        figures.current.innerText = `Prediction: ${result[0].className}\nProbability: ${result[0].probability}`;
      }

      img.dispose();
    }
  };

  return (
    <>
      <div ref={figures}></div>
      <video autoPlay playsInline muted ref={camera} width="870" height="534" />
      <button onClick={captureImage}>Capture Image</button>
    </>
  );
};

export default ImageClassifier;
