export interface RecallPattern {
  id: string;
  sequence: string[];
  type: 'Numeric' | 'Symbolic' | 'Mixed';
  complexity: number; // 1 to 5
}

export const recallDatabase: RecallPattern[] = [
  { id: "r1", sequence: ["3", "7", "1", "9", "4"], type: "Numeric", complexity: 1 },
  { id: "r2", sequence: ["8", "2", "6", "5", "0"], type: "Numeric", complexity: 1 },
  { id: "r3", sequence: ["α", "β", "γ", "δ", "ε"], type: "Symbolic", complexity: 2 },
  { id: "r4", sequence: ["Ω", "Σ", "Δ", "Π", "Φ"], type: "Symbolic", complexity: 2 },
  { id: "r5", sequence: ["7", "X", "2", "Y", "9"], type: "Mixed", complexity: 3 },
  { id: "r6", sequence: ["A", "4", "B", "8", "C"], type: "Mixed", complexity: 3 },
  { id: "r7", sequence: ["1", "4", "1", "5", "9", "2"], type: "Numeric", complexity: 4 },
  { id: "r8", sequence: ["2", "7", "1", "8", "2", "8"], type: "Numeric", complexity: 4 },
  { id: "r9", sequence: ["λ", "μ", "ν", "ξ", "ο", "π"], type: "Symbolic", complexity: 5 },
  { id: "r10", sequence: ["Q", "7", "W", "3", "E", "9"], type: "Mixed", complexity: 5 },
  { id: "r11", sequence: ["5", "8", "3", "2", "1"], type: "Numeric", complexity: 1 },
  { id: "r12", sequence: ["9", "0", "4", "7", "6"], type: "Numeric", complexity: 1 },
  { id: "r13", sequence: ["θ", "ι", "κ", "λ", "μ"], type: "Symbolic", complexity: 2 },
  { id: "r14", sequence: ["Ψ", "ω", "χ", "φ", "υ"], type: "Symbolic", complexity: 2 },
  { id: "r15", sequence: ["3", "Z", "6", "W", "1"], type: "Mixed", complexity: 3 },
  { id: "r16", sequence: ["D", "5", "E", "9", "F"], type: "Mixed", complexity: 3 },
  { id: "r17", sequence: ["3", "1", "4", "1", "5", "9"], type: "Numeric", complexity: 4 },
  { id: "r18", sequence: ["1", "6", "1", "8", "0", "3"], type: "Numeric", complexity: 4 },
  { id: "r19", sequence: ["ρ", "σ", "τ", "υ", "φ", "χ"], type: "Symbolic", complexity: 5 },
  { id: "r20", sequence: ["R", "4", "T", "8", "Y", "2"], type: "Mixed", complexity: 5 },
  { id: "r21", sequence: ["1", "2", "3", "5", "8"], type: "Numeric", complexity: 2 },
  { id: "r22", sequence: ["2", "4", "8", "1", "6"], type: "Numeric", complexity: 3 },
  { id: "r23", sequence: ["!", "@", "#", "$", "%"], type: "Symbolic", complexity: 2 },
  { id: "r24", sequence: ["^", "&", "*", "(", ")"], type: "Symbolic", complexity: 2 },
  { id: "r25", sequence: ["1", "A", "2", "B", "3", "C"], type: "Mixed", complexity: 4 }
];
