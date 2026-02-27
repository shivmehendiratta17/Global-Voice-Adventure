import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { oracleService } from '../services/oracleService';
import { useGameStore } from '../store/useGameStore';

interface OracleAnalysisProps {
  gameId: string;
  score: number;
  metrics: any;
}

export function OracleAnalysis({ gameId, score, metrics }: OracleAnalysisProps) {
  const { oracleHintsEnabled } = useGameStore();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!oracleHintsEnabled) {
      setLoading(false);
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      const result = await oracleService.getPostGameAnalysis(gameId, score, metrics);
      setAnalysis(result);
      setLoading(false);
    };

    fetchAnalysis();
  }, [gameId, score, metrics, oracleHintsEnabled]);

  if (!oracleHintsEnabled) return null;

  return (
    <div className="mt-8 bg-zinc-900/50 border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuit className="text-cyan-400" size={24} />
        <h3 className="text-xl font-serif font-bold text-white">Oracle Analysis</h3>
      </div>
      
      {loading ? (
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="animate-spin" size={16} />
          <span className="font-mono text-sm">Analyzing cognitive patterns...</span>
        </div>
      ) : (
        <div className="space-y-4 text-zinc-300 leading-relaxed text-sm">
          {analysis?.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
          ))}
        </div>
      )}
    </div>
  );
}
