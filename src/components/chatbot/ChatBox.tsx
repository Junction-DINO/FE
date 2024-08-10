import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToOpenAI } from '@/services/openai';
import { ReactTyped } from 'react-typed';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const botResponse = await sendMessageToOpenAI(input);

      const botMessage = {
        sender: 'bot',
        text: botResponse,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('OpenAI API 요청 중 오류 발생:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: '오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatbotRef]);

  return (
    <div className="relative">
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? '닫기' : '챗봇 열기'}
      </button>

      {/* 챗봇 창 */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-16 right-4 w-full h-[400px] md:h-[500px] max-w-xs bg-white shadow-lg border border-gray-300 rounded-lg flex flex-col"
        >
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {message.sender === 'bot' ? (
                    <ReactTyped strings={[message.text]} typeSpeed={40} showCursor={false} />
                  ) : (
                    message.text
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border rounded-lg"
              placeholder="메시지를 입력하세요..."
              ref={inputRef}
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
