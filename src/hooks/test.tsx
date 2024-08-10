import React, { useState } from 'react';
import { sendMessageToOpenAI } from '@/services/openai';

const TestOpenAIComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiResponse = await sendMessageToOpenAI(input);
      setResponse(apiResponse);
    } catch (err) {
      setError('API 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">OpenAI GPT-4 테스트</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border p-2 mb-4 w-full"
        placeholder="메시지를 입력하세요"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? '전송 중...' : '전송'}
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="font-bold mb-2">응답:</h2>
          <p>{response}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border rounded border-red-500">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TestOpenAIComponent;
