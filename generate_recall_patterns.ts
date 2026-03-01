import fs from 'fs';

const NUMERIC_CHARS = '0123456789';
const ALPHA_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SYMBOLIC_CHARS = 'αβγδεζηθικλμνξοπρστυφχψωΩΣΔΠΦΨ';
const MIXED_CHARS = NUMERIC_CHARS + ALPHA_CHARS + '!@#$%^&*';

function getRandomChar(charset: string): string {
  return charset[Math.floor(Math.random() * charset.length)];
}

function generateSequence(length: number, type: 'Numeric' | 'Alpha' | 'Symbolic' | 'Mixed'): string[] {
  const seq: string[] = [];
  let charset = NUMERIC_CHARS;
  if (type === 'Alpha') charset = ALPHA_CHARS;
  if (type === 'Symbolic') charset = SYMBOLIC_CHARS;
  if (type === 'Mixed') charset = MIXED_CHARS;

  for (let i = 0; i < length; i++) {
    seq.push(getRandomChar(charset));
  }
  return seq;
}

const patterns = [];
let idCounter = 1;

for (let level = 1; level <= 25; level++) {
  // Base length increases every 3 levels
  const baseLength = 4 + Math.floor((level - 1) / 3);
  
  for (let round = 1; round <= 4; round++) {
    // Round 1: Numeric, Round 2: Alpha, Round 3: Symbolic, Round 4: Mixed
    let type: 'Numeric' | 'Alpha' | 'Symbolic' | 'Mixed' = 'Numeric';
    if (round === 2) type = 'Alpha';
    if (round === 3) type = 'Symbolic';
    if (round === 4) type = 'Mixed';

    // Length increases slightly within the level for the last round
    const length = baseLength + (round === 4 ? 1 : 0);

    patterns.push({
      id: `r${idCounter++}`,
      level,
      round,
      sequence: generateSequence(length, type),
      type,
      complexity: Math.min(10, Math.ceil(level / 2.5))
    });
  }
}

const fileContent = `export interface RecallPatternV2 {
  id: string;
  level: number;
  round: number;
  sequence: string[];
  type: 'Numeric' | 'Alpha' | 'Symbolic' | 'Mixed';
  complexity: number;
}

export const recallDatabaseV2: RecallPatternV2[] = ${JSON.stringify(patterns, null, 2)};
`;

fs.writeFileSync('src/data/recallPatternsV2.ts', fileContent);
console.log('Generated 100 recall patterns in src/data/recallPatternsV2.ts');
