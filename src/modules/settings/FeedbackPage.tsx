import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [type, setType] = useState<'feedback' | 'bug'>('feedback');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // In a real app, send to backend here
    console.log('Submitted:', { type, feedback });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <MessageSquare className="text-emerald-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Feedback & Support</h1>
          <p className="text-zinc-400 font-mono tracking-widest uppercase text-sm">Help us improve the system</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 opacity-50"></div>
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-emerald-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
            <p className="text-zinc-400">Thank you for your input. Our systems are processing your report.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setType('feedback')}
                className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                  type === 'feedback' 
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
                }`}
              >
                General Feedback
              </button>
              <button
                type="button"
                onClick={() => setType('bug')}
                className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                  type === 'bug' 
                    ? 'bg-rose-500/10 border-rose-500/50 text-rose-400' 
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
                }`}
              >
                Report a Bug
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                {type === 'feedback' ? 'What are your thoughts?' : 'Describe the issue you encountered'}
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your message here..."
                className="w-full h-40 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 resize-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!feedback.trim()}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:shadow-none"
            >
              <Send size={18} /> Transmit Report
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
