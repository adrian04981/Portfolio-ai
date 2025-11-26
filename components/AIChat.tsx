/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola. Soy la IA de Adrian. Pregúntame sobre su experiencia, habilidades o proyectos. 💻' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Slight delay to allow state update to render before scrolling
    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#0f172a]/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900/50 p-4 flex justify-between items-center border-b border-blue-500/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <h3 className="font-heading font-bold text-white tracking-wider text-sm">ADRIAN_BOT_V1</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5 font-mono text-xs md:text-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg rounded-tl-none flex gap-1 items-center border border-white/5">
                    <span className="text-xs text-blue-400 font-mono animate-pulse">PROCESANDO...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Pregunta sobre proyectos..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600/80 hover:bg-blue-500 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10 z-50 group hover:bg-blue-500 transition-colors"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;