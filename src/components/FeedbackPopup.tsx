import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackPopup({ isOpen, onClose }: FeedbackPopupProps) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && !submitted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !submitted) {
      onClose();
    }
    return () => clearTimeout(timer);
  }, [isOpen, submitted, timeLeft, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFeedback('');
      setSubmitted(false);
      setTimeLeft(30);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // In a real app, send to backend here
    console.log('Popup Feedback Submitted:', feedback);
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500">
              <motion.div 
                className="h-full bg-white/50" 
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
              />
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-emerald-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-zinc-400">Your feedback helps us improve.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6 mt-2">
                  <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <MessageSquare className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Quick Feedback</h3>
                    <p className="text-xs text-zinc-400">You have {timeLeft}s to share your thoughts</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="How was your experience? Any bugs?"
                    className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none mb-4 text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!feedback.trim()}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Send size={16} /> Submit Feedback
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
