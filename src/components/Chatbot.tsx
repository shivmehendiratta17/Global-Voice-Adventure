import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Question } from '../data/questions';
import { clsx } from 'clsx';

interface ChatbotProps {
  currentQuestion: Question | null;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Chatbot({ currentQuestion }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings, Scholar. I am the Oracle. Seek my guidance if the path ahead is obscured.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let context = "You are a wise, cryptic scholar providing hints for a trivia game called Global Voice. Keep hints brief, mysterious, and helpful without giving away the exact answer. Do not use markdown formatting.";
      
      if (currentQuestion) {
        context += `\n\nThe user is currently looking at this question:\n"${currentQuestion.text}"\nOptions: ${currentQuestion.options.join(', ')}\nCorrect Answer: ${currentQuestion.options[currentQuestion.correctAnswer]}\n\nDo NOT reveal the correct answer directly.`;
      }

      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction: context,
          temperature: 0.7,
        }
      });

      // Send previous conversation history to give context
      for (const msg of messages) {
        if (msg.role === 'user') {
          await chat.sendMessage({ message: msg.text });
        }
      }

      const response = await chat.sendMessage({ message: userMessage });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || "The mists obscure my vision..." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "My connection to the ether is severed. I cannot answer right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-40 group",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
        )}
      >
        <Sparkles size={24} className="text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-violet-400" />
                <h3 className="font-serif font-bold text-white">The Oracle</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.role === 'user'
                      ? "bg-blue-600 text-white ml-auto rounded-tr-sm"
                      : "bg-zinc-800 border border-white/5 text-zinc-200 mr-auto rounded-tl-sm"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-zinc-800 border border-white/5 text-zinc-400 mr-auto rounded-tl-sm p-3 rounded-2xl w-fit flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs">Consulting the ether...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for guidance..."
                  className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
