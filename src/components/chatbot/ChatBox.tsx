import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToOpenAI } from '@/services/openai';
import { ReactTyped } from 'react-typed';
import Spinner from '@/assets/Spinner.gif';
import ChatbotHome from '@/assets/ChatbotHome.svg';
import ChatbotSendButton from '@/assets/ChatboxSendButton.svg';
import { encodeHTML } from '@/hooks/useEncodeHTML';

type ChatbotProps = {
  position?: 'default' | 'bottom-right';
};

const Chatbot: React.FC<ChatbotProps> = ({ position = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const openChatbot = () => {
    setIsAnimating(false);
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeChatbot = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // 애니메이션과 동일한 시간
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // 키보드가 열릴 때 뷰포트 높이가 줄어들므로 이를 감지
      const currentHeight = window.innerHeight;
      const initialHeight = window.outerHeight;
      setKeyboardHeight(initialHeight - currentHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행 시에도 높이 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(e.target as Node)) {
        closeChatbot();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatbotRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buttonPositionClass =
    position === 'bottom-right'
      ? 'fixed bottom-5 left-1/2 transform translate-x-[250px]' // 중앙에서 오른쪽으로 이동
      : 'absolute bottom-[-20px] left-[-20px]';

  return (
    <div className="relative">
      <button onClick={openChatbot} className={`${buttonPositionClass} z-50`}>
        <img src={ChatbotHome} alt="Chatbot" className="w-14 h-14" />
      </button>

      {isOpen && (
        <div
          className={`fixed z-50 inset-0 flex justify-center items-end bg-black bg-opacity-50`}
          onClick={closeChatbot}
        >
          <div
            ref={chatbotRef}
            className={`w-[430px] max-h-[85vh] md:h-[800px] bg-customChatBackground shadow-lg border border-gray-300 rounded-t-lg flex flex-col transform ${
              isAnimating ? 'animate-slide-down' : 'animate-slide-up'
            }`}
            onClick={(e) => e.stopPropagation()} // 내부 콘텐츠 클릭 시 이벤트 전파 차단
            style={{ minHeight: `calc(85vh - ${keyboardHeight}px)`, paddingBottom: keyboardHeight }} // 기본 높이를 설정하고 키보드 높이만큼 패딩 추가
          >
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block p-2 ${
                      message.sender === 'user'
                        ? 'bg-customMint text-white p-3 px-5 rounded-3xl rounded-br-none'
                        : 'bg-white text-customMint p-3 px-5 rounded-3xl rounded-bl-none '
                    }`}
                  >
                    {message.sender === 'bot' ? (
                      <>
                        <ReactTyped
                          strings={[encodeHTML(message.text)]}
                          typeSpeed={40}
                          showCursor={false}
                          onStringTyped={scrollToBottom}
                          onComplete={scrollToBottom}
                        />
                        {isLoading && (
                          <img
                            src={Spinner}
                            alt="Loading..."
                            className="inline-block ml-2 w-4 h-4"
                          />
                        )}
                      </>
                    ) : (
                      message.text
                    )}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-2">
                  <span className="inline-block p-2 rounded-lg text-black">
                    <img src={Spinner} alt="Loading..." className="inline-block w-4 h-4" />
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="relative w-full mt-1">
              <div className="mx-4">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full p-4 pr-10 border rounded-full"
                  ref={inputRef}
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2"
                >
                  <img src={ChatbotSendButton} alt="Send" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
