import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello there. I'm here to listen. How are you feeling today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Create a placeholder for the bot response
      const botMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, role: 'model', text: '', isStreaming: true },
      ]);

      const stream = await geminiService.sendMessageStream(userMessage.text);
      let accumulatedText = '';

      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      }
      
      // Finalize message
       setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: "I'm having a little trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-brand-light fade-in">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center gap-4 z-10 sticky top-0">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-brand-pink to-brand-purple p-2 rounded-full text-white">
                <Sparkles size={18} />
            </div>
            <div>
                <h1 className="font-bold text-lg text-gray-800">MindfulBot</h1>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
                    Online
                </p>
            </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
                {/* Avatar */}
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' 
                    ? 'bg-gray-200 text-gray-600' 
                    : 'bg-gradient-to-tr from-brand-pink to-brand-purple text-white shadow-md'
                }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={20} />}
                </div>

                {/* Bubble */}
                <div
                className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                    ? 'bg-gray-800 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
                >
                {msg.text}
                {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-brand-pink animate-pulse align-middle"></span>
                )}
                </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-10">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-pink/50 focus-within:border-brand-pink transition-all shadow-sm"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your feelings here..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2 rounded-full transition-all duration-300 ${
              inputText.trim() && !isLoading
                ? 'bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-md transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
