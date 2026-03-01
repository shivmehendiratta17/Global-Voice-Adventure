export interface RecallPatternV2 {
  id: string;
  level: number;
  round: number;
  sequence: string[];
  type: 'Numeric' | 'Alpha' | 'Symbolic' | 'Mixed';
  complexity: number;
}

export const recallDatabaseV2: RecallPatternV2[] = [
  {
    "id": "r1",
    "level": 1,
    "round": 1,
    "sequence": [
      "7",
      "6",
      "7",
      "3"
    ],
    "type": "Numeric",
    "complexity": 1
  },
  {
    "id": "r2",
    "level": 1,
    "round": 2,
    "sequence": [
      "U",
      "P",
      "D",
      "W"
    ],
    "type": "Alpha",
    "complexity": 1
  },
  {
    "id": "r3",
    "level": 1,
    "round": 3,
    "sequence": [
      "ω",
      "τ",
      "ν",
      "Δ"
    ],
    "type": "Symbolic",
    "complexity": 1
  },
  {
    "id": "r4",
    "level": 1,
    "round": 4,
    "sequence": [
      "^",
      "D",
      "2",
      "5",
      "I"
    ],
    "type": "Mixed",
    "complexity": 1
  },
  {
    "id": "r5",
    "level": 2,
    "round": 1,
    "sequence": [
      "3",
      "1",
      "9",
      "9"
    ],
    "type": "Numeric",
    "complexity": 1
  },
  {
    "id": "r6",
    "level": 2,
    "round": 2,
    "sequence": [
      "C",
      "L",
      "K",
      "D"
    ],
    "type": "Alpha",
    "complexity": 1
  },
  {
    "id": "r7",
    "level": 2,
    "round": 3,
    "sequence": [
      "η",
      "λ",
      "ι",
      "η"
    ],
    "type": "Symbolic",
    "complexity": 1
  },
  {
    "id": "r8",
    "level": 2,
    "round": 4,
    "sequence": [
      "1",
      "8",
      "F",
      "U",
      "W"
    ],
    "type": "Mixed",
    "complexity": 1
  },
  {
    "id": "r9",
    "level": 3,
    "round": 1,
    "sequence": [
      "8",
      "5",
      "8",
      "6"
    ],
    "type": "Numeric",
    "complexity": 2
  },
  {
    "id": "r10",
    "level": 3,
    "round": 2,
    "sequence": [
      "G",
      "L",
      "N",
      "W"
    ],
    "type": "Alpha",
    "complexity": 2
  },
  {
    "id": "r11",
    "level": 3,
    "round": 3,
    "sequence": [
      "τ",
      "Π",
      "μ",
      "ο"
    ],
    "type": "Symbolic",
    "complexity": 2
  },
  {
    "id": "r12",
    "level": 3,
    "round": 4,
    "sequence": [
      "A",
      "6",
      "S",
      "3",
      "B"
    ],
    "type": "Mixed",
    "complexity": 2
  },
  {
    "id": "r13",
    "level": 4,
    "round": 1,
    "sequence": [
      "6",
      "4",
      "6",
      "2",
      "5"
    ],
    "type": "Numeric",
    "complexity": 2
  },
  {
    "id": "r14",
    "level": 4,
    "round": 2,
    "sequence": [
      "P",
      "G",
      "Y",
      "W",
      "K"
    ],
    "type": "Alpha",
    "complexity": 2
  },
  {
    "id": "r15",
    "level": 4,
    "round": 3,
    "sequence": [
      "δ",
      "υ",
      "ω",
      "ω",
      "Δ"
    ],
    "type": "Symbolic",
    "complexity": 2
  },
  {
    "id": "r16",
    "level": 4,
    "round": 4,
    "sequence": [
      "T",
      "M",
      "R",
      "L",
      "V",
      "9"
    ],
    "type": "Mixed",
    "complexity": 2
  },
  {
    "id": "r17",
    "level": 5,
    "round": 1,
    "sequence": [
      "4",
      "3",
      "4",
      "9",
      "0"
    ],
    "type": "Numeric",
    "complexity": 2
  },
  {
    "id": "r18",
    "level": 5,
    "round": 2,
    "sequence": [
      "C",
      "C",
      "O",
      "T",
      "X"
    ],
    "type": "Alpha",
    "complexity": 2
  },
  {
    "id": "r19",
    "level": 5,
    "round": 3,
    "sequence": [
      "Ψ",
      "χ",
      "ι",
      "κ",
      "χ"
    ],
    "type": "Symbolic",
    "complexity": 2
  },
  {
    "id": "r20",
    "level": 5,
    "round": 4,
    "sequence": [
      "C",
      "1",
      "K",
      "H",
      "%",
      "7"
    ],
    "type": "Mixed",
    "complexity": 2
  },
  {
    "id": "r21",
    "level": 6,
    "round": 1,
    "sequence": [
      "8",
      "5",
      "5",
      "7",
      "4"
    ],
    "type": "Numeric",
    "complexity": 3
  },
  {
    "id": "r22",
    "level": 6,
    "round": 2,
    "sequence": [
      "I",
      "J",
      "E",
      "W",
      "W"
    ],
    "type": "Alpha",
    "complexity": 3
  },
  {
    "id": "r23",
    "level": 6,
    "round": 3,
    "sequence": [
      "β",
      "ο",
      "α",
      "ξ",
      "μ"
    ],
    "type": "Symbolic",
    "complexity": 3
  },
  {
    "id": "r24",
    "level": 6,
    "round": 4,
    "sequence": [
      "L",
      "W",
      "T",
      "W",
      "P",
      "I"
    ],
    "type": "Mixed",
    "complexity": 3
  },
  {
    "id": "r25",
    "level": 7,
    "round": 1,
    "sequence": [
      "3",
      "1",
      "9",
      "3",
      "3",
      "3"
    ],
    "type": "Numeric",
    "complexity": 3
  },
  {
    "id": "r26",
    "level": 7,
    "round": 2,
    "sequence": [
      "V",
      "C",
      "X",
      "I",
      "A",
      "F"
    ],
    "type": "Alpha",
    "complexity": 3
  },
  {
    "id": "r27",
    "level": 7,
    "round": 3,
    "sequence": [
      "Φ",
      "ο",
      "δ",
      "Π",
      "Ψ",
      "η"
    ],
    "type": "Symbolic",
    "complexity": 3
  },
  {
    "id": "r28",
    "level": 7,
    "round": 4,
    "sequence": [
      "V",
      "C",
      "$",
      "R",
      "W",
      "Y",
      "I"
    ],
    "type": "Mixed",
    "complexity": 3
  },
  {
    "id": "r29",
    "level": 8,
    "round": 1,
    "sequence": [
      "3",
      "6",
      "4",
      "6",
      "4",
      "3"
    ],
    "type": "Numeric",
    "complexity": 4
  },
  {
    "id": "r30",
    "level": 8,
    "round": 2,
    "sequence": [
      "N",
      "K",
      "D",
      "N",
      "I",
      "P"
    ],
    "type": "Alpha",
    "complexity": 4
  },
  {
    "id": "r31",
    "level": 8,
    "round": 3,
    "sequence": [
      "Ψ",
      "η",
      "Ω",
      "ρ",
      "ω",
      "λ"
    ],
    "type": "Symbolic",
    "complexity": 4
  },
  {
    "id": "r32",
    "level": 8,
    "round": 4,
    "sequence": [
      "K",
      "B",
      "9",
      "K",
      "9",
      "W",
      "Q"
    ],
    "type": "Mixed",
    "complexity": 4
  },
  {
    "id": "r33",
    "level": 9,
    "round": 1,
    "sequence": [
      "7",
      "0",
      "3",
      "4",
      "7",
      "8"
    ],
    "type": "Numeric",
    "complexity": 4
  },
  {
    "id": "r34",
    "level": 9,
    "round": 2,
    "sequence": [
      "R",
      "I",
      "U",
      "F",
      "K",
      "N"
    ],
    "type": "Alpha",
    "complexity": 4
  },
  {
    "id": "r35",
    "level": 9,
    "round": 3,
    "sequence": [
      "Ω",
      "α",
      "φ",
      "Δ",
      "ε",
      "β"
    ],
    "type": "Symbolic",
    "complexity": 4
  },
  {
    "id": "r36",
    "level": 9,
    "round": 4,
    "sequence": [
      "9",
      "N",
      "W",
      "&",
      "I",
      "O",
      "6"
    ],
    "type": "Mixed",
    "complexity": 4
  },
  {
    "id": "r37",
    "level": 10,
    "round": 1,
    "sequence": [
      "2",
      "6",
      "3",
      "2",
      "0",
      "3",
      "9"
    ],
    "type": "Numeric",
    "complexity": 4
  },
  {
    "id": "r38",
    "level": 10,
    "round": 2,
    "sequence": [
      "Y",
      "D",
      "F",
      "J",
      "Z",
      "I",
      "A"
    ],
    "type": "Alpha",
    "complexity": 4
  },
  {
    "id": "r39",
    "level": 10,
    "round": 3,
    "sequence": [
      "Ω",
      "Σ",
      "δ",
      "ω",
      "Δ",
      "ι",
      "ψ"
    ],
    "type": "Symbolic",
    "complexity": 4
  },
  {
    "id": "r40",
    "level": 10,
    "round": 4,
    "sequence": [
      "1",
      "7",
      "E",
      "3",
      "T",
      "G",
      "^",
      "Q"
    ],
    "type": "Mixed",
    "complexity": 4
  },
  {
    "id": "r41",
    "level": 11,
    "round": 1,
    "sequence": [
      "8",
      "3",
      "5",
      "2",
      "6",
      "2",
      "3"
    ],
    "type": "Numeric",
    "complexity": 5
  },
  {
    "id": "r42",
    "level": 11,
    "round": 2,
    "sequence": [
      "O",
      "N",
      "R",
      "S",
      "Q",
      "Z",
      "Y"
    ],
    "type": "Alpha",
    "complexity": 5
  },
  {
    "id": "r43",
    "level": 11,
    "round": 3,
    "sequence": [
      "κ",
      "ν",
      "μ",
      "Π",
      "κ",
      "ψ",
      "Δ"
    ],
    "type": "Symbolic",
    "complexity": 5
  },
  {
    "id": "r44",
    "level": 11,
    "round": 4,
    "sequence": [
      "X",
      "S",
      "M",
      "*",
      "@",
      "^",
      "@",
      "Z"
    ],
    "type": "Mixed",
    "complexity": 5
  },
  {
    "id": "r45",
    "level": 12,
    "round": 1,
    "sequence": [
      "4",
      "6",
      "1",
      "0",
      "0",
      "3",
      "4"
    ],
    "type": "Numeric",
    "complexity": 5
  },
  {
    "id": "r46",
    "level": 12,
    "round": 2,
    "sequence": [
      "E",
      "N",
      "N",
      "W",
      "P",
      "G",
      "B"
    ],
    "type": "Alpha",
    "complexity": 5
  },
  {
    "id": "r47",
    "level": 12,
    "round": 3,
    "sequence": [
      "ν",
      "Σ",
      "ψ",
      "υ",
      "ν",
      "φ",
      "π"
    ],
    "type": "Symbolic",
    "complexity": 5
  },
  {
    "id": "r48",
    "level": 12,
    "round": 4,
    "sequence": [
      "7",
      "N",
      "#",
      "Y",
      "A",
      "8",
      "T",
      "T"
    ],
    "type": "Mixed",
    "complexity": 5
  },
  {
    "id": "r49",
    "level": 13,
    "round": 1,
    "sequence": [
      "8",
      "9",
      "5",
      "6",
      "0",
      "3",
      "8",
      "5"
    ],
    "type": "Numeric",
    "complexity": 6
  },
  {
    "id": "r50",
    "level": 13,
    "round": 2,
    "sequence": [
      "P",
      "G",
      "Q",
      "C",
      "Z",
      "D",
      "M",
      "V"
    ],
    "type": "Alpha",
    "complexity": 6
  },
  {
    "id": "r51",
    "level": 13,
    "round": 3,
    "sequence": [
      "θ",
      "Φ",
      "χ",
      "ζ",
      "Ω",
      "λ",
      "μ",
      "χ"
    ],
    "type": "Symbolic",
    "complexity": 6
  },
  {
    "id": "r52",
    "level": 13,
    "round": 4,
    "sequence": [
      "A",
      "T",
      "K",
      "6",
      "V",
      "Q",
      "4",
      "7",
      "&"
    ],
    "type": "Mixed",
    "complexity": 6
  },
  {
    "id": "r53",
    "level": 14,
    "round": 1,
    "sequence": [
      "9",
      "0",
      "9",
      "9",
      "3",
      "6",
      "4",
      "7"
    ],
    "type": "Numeric",
    "complexity": 6
  },
  {
    "id": "r54",
    "level": 14,
    "round": 2,
    "sequence": [
      "E",
      "A",
      "B",
      "G",
      "W",
      "S",
      "N",
      "F"
    ],
    "type": "Alpha",
    "complexity": 6
  },
  {
    "id": "r55",
    "level": 14,
    "round": 3,
    "sequence": [
      "Π",
      "ο",
      "ψ",
      "β",
      "ψ",
      "ρ",
      "Ψ",
      "δ"
    ],
    "type": "Symbolic",
    "complexity": 6
  },
  {
    "id": "r56",
    "level": 14,
    "round": 4,
    "sequence": [
      "$",
      "@",
      "R",
      "8",
      "6",
      "G",
      "U",
      "&",
      "T"
    ],
    "type": "Mixed",
    "complexity": 6
  },
  {
    "id": "r57",
    "level": 15,
    "round": 1,
    "sequence": [
      "7",
      "6",
      "1",
      "8",
      "6",
      "2",
      "3",
      "2"
    ],
    "type": "Numeric",
    "complexity": 6
  },
  {
    "id": "r58",
    "level": 15,
    "round": 2,
    "sequence": [
      "P",
      "L",
      "M",
      "M",
      "R",
      "D",
      "W",
      "N"
    ],
    "type": "Alpha",
    "complexity": 6
  },
  {
    "id": "r59",
    "level": 15,
    "round": 3,
    "sequence": [
      "λ",
      "σ",
      "Φ",
      "κ",
      "μ",
      "π",
      "ξ",
      "μ"
    ],
    "type": "Symbolic",
    "complexity": 6
  },
  {
    "id": "r60",
    "level": 15,
    "round": 4,
    "sequence": [
      "B",
      "*",
      "V",
      "X",
      "W",
      "D",
      "V",
      "I",
      "S"
    ],
    "type": "Mixed",
    "complexity": 6
  },
  {
    "id": "r61",
    "level": 16,
    "round": 1,
    "sequence": [
      "4",
      "3",
      "6",
      "7",
      "2",
      "0",
      "4",
      "2",
      "6"
    ],
    "type": "Numeric",
    "complexity": 7
  },
  {
    "id": "r62",
    "level": 16,
    "round": 2,
    "sequence": [
      "C",
      "G",
      "G",
      "T",
      "K",
      "D",
      "S",
      "G",
      "P"
    ],
    "type": "Alpha",
    "complexity": 7
  },
  {
    "id": "r63",
    "level": 16,
    "round": 3,
    "sequence": [
      "Σ",
      "ξ",
      "ω",
      "σ",
      "μ",
      "φ",
      "σ",
      "ψ",
      "Σ"
    ],
    "type": "Symbolic",
    "complexity": 7
  },
  {
    "id": "r64",
    "level": 16,
    "round": 4,
    "sequence": [
      "R",
      "9",
      "G",
      "R",
      "R",
      "8",
      "7",
      "G",
      "4",
      "Q"
    ],
    "type": "Mixed",
    "complexity": 7
  },
  {
    "id": "r65",
    "level": 17,
    "round": 1,
    "sequence": [
      "3",
      "2",
      "7",
      "9",
      "3",
      "1",
      "5",
      "1",
      "1"
    ],
    "type": "Numeric",
    "complexity": 7
  },
  {
    "id": "r66",
    "level": 17,
    "round": 2,
    "sequence": [
      "W",
      "C",
      "Y",
      "N",
      "A",
      "N",
      "E",
      "G",
      "X"
    ],
    "type": "Alpha",
    "complexity": 7
  },
  {
    "id": "r67",
    "level": 17,
    "round": 3,
    "sequence": [
      "Π",
      "ν",
      "σ",
      "ξ",
      "Π",
      "σ",
      "ε",
      "τ",
      "γ"
    ],
    "type": "Symbolic",
    "complexity": 7
  },
  {
    "id": "r68",
    "level": 17,
    "round": 4,
    "sequence": [
      "O",
      "P",
      "6",
      "A",
      "N",
      "W",
      "2",
      "7",
      "5",
      "L"
    ],
    "type": "Mixed",
    "complexity": 7
  },
  {
    "id": "r69",
    "level": 18,
    "round": 1,
    "sequence": [
      "0",
      "5",
      "5",
      "2",
      "6",
      "0",
      "9",
      "2",
      "3"
    ],
    "type": "Numeric",
    "complexity": 8
  },
  {
    "id": "r70",
    "level": 18,
    "round": 2,
    "sequence": [
      "E",
      "M",
      "Z",
      "S",
      "B",
      "Z",
      "G",
      "S",
      "S"
    ],
    "type": "Alpha",
    "complexity": 8
  },
  {
    "id": "r71",
    "level": 18,
    "round": 3,
    "sequence": [
      "χ",
      "φ",
      "ρ",
      "ν",
      "ε",
      "φ",
      "χ",
      "θ",
      "τ"
    ],
    "type": "Symbolic",
    "complexity": 8
  },
  {
    "id": "r72",
    "level": 18,
    "round": 4,
    "sequence": [
      "2",
      "K",
      "N",
      "Z",
      "A",
      "U",
      "B",
      "V",
      "9",
      "G"
    ],
    "type": "Mixed",
    "complexity": 8
  },
  {
    "id": "r73",
    "level": 19,
    "round": 1,
    "sequence": [
      "5",
      "0",
      "2",
      "7",
      "4",
      "2",
      "2",
      "9",
      "5",
      "3"
    ],
    "type": "Numeric",
    "complexity": 8
  },
  {
    "id": "r74",
    "level": 19,
    "round": 2,
    "sequence": [
      "S",
      "J",
      "R",
      "G",
      "U",
      "T",
      "R",
      "Y",
      "K",
      "H"
    ],
    "type": "Alpha",
    "complexity": 8
  },
  {
    "id": "r75",
    "level": 19,
    "round": 3,
    "sequence": [
      "ω",
      "δ",
      "ψ",
      "ν",
      "ο",
      "ε",
      "χ",
      "β",
      "σ",
      "Ψ"
    ],
    "type": "Symbolic",
    "complexity": 8
  },
  {
    "id": "r76",
    "level": 19,
    "round": 4,
    "sequence": [
      "*",
      "H",
      "Y",
      "6",
      "5",
      "6",
      "^",
      "J",
      "%",
      "9",
      "V"
    ],
    "type": "Mixed",
    "complexity": 8
  },
  {
    "id": "r77",
    "level": 20,
    "round": 1,
    "sequence": [
      "9",
      "2",
      "1",
      "0",
      "0",
      "8",
      "3",
      "8",
      "0",
      "0"
    ],
    "type": "Numeric",
    "complexity": 8
  },
  {
    "id": "r78",
    "level": 20,
    "round": 2,
    "sequence": [
      "V",
      "R",
      "L",
      "I",
      "T",
      "H",
      "C",
      "N",
      "Y",
      "V"
    ],
    "type": "Alpha",
    "complexity": 8
  },
  {
    "id": "r79",
    "level": 20,
    "round": 3,
    "sequence": [
      "ε",
      "ο",
      "Ψ",
      "γ",
      "π",
      "ι",
      "η",
      "Δ",
      "ε",
      "χ"
    ],
    "type": "Symbolic",
    "complexity": 8
  },
  {
    "id": "r80",
    "level": 20,
    "round": 4,
    "sequence": [
      "9",
      "6",
      "K",
      "1",
      "J",
      "Z",
      "^",
      "O",
      "Z",
      "W",
      "Y"
    ],
    "type": "Mixed",
    "complexity": 8
  },
  {
    "id": "r81",
    "level": 21,
    "round": 1,
    "sequence": [
      "6",
      "0",
      "1",
      "3",
      "4",
      "0",
      "6",
      "5",
      "3",
      "4"
    ],
    "type": "Numeric",
    "complexity": 9
  },
  {
    "id": "r82",
    "level": 21,
    "round": 2,
    "sequence": [
      "C",
      "S",
      "G",
      "H",
      "M",
      "S",
      "K",
      "Z",
      "S",
      "U"
    ],
    "type": "Alpha",
    "complexity": 9
  },
  {
    "id": "r83",
    "level": 21,
    "round": 3,
    "sequence": [
      "π",
      "β",
      "μ",
      "Ψ",
      "κ",
      "ψ",
      "λ",
      "κ",
      "δ",
      "Π"
    ],
    "type": "Symbolic",
    "complexity": 9
  },
  {
    "id": "r84",
    "level": 21,
    "round": 4,
    "sequence": [
      "I",
      "H",
      "@",
      "2",
      "&",
      "H",
      "9",
      "^",
      "P",
      "T",
      "*"
    ],
    "type": "Mixed",
    "complexity": 9
  },
  {
    "id": "r85",
    "level": 22,
    "round": 1,
    "sequence": [
      "0",
      "8",
      "8",
      "0",
      "0",
      "3",
      "0",
      "4",
      "3",
      "2",
      "7"
    ],
    "type": "Numeric",
    "complexity": 9
  },
  {
    "id": "r86",
    "level": 22,
    "round": 2,
    "sequence": [
      "X",
      "M",
      "U",
      "F",
      "N",
      "U",
      "P",
      "Y",
      "W",
      "B",
      "M"
    ],
    "type": "Alpha",
    "complexity": 9
  },
  {
    "id": "r87",
    "level": 22,
    "round": 3,
    "sequence": [
      "Π",
      "θ",
      "γ",
      "Ψ",
      "ξ",
      "ψ",
      "θ",
      "θ",
      "Ψ",
      "χ",
      "ι"
    ],
    "type": "Symbolic",
    "complexity": 9
  },
  {
    "id": "r88",
    "level": 22,
    "round": 4,
    "sequence": [
      "H",
      "4",
      "W",
      "H",
      "Y",
      "E",
      "K",
      "Z",
      "G",
      "V",
      "5",
      "M"
    ],
    "type": "Mixed",
    "complexity": 9
  },
  {
    "id": "r89",
    "level": 23,
    "round": 1,
    "sequence": [
      "0",
      "4",
      "2",
      "7",
      "5",
      "3",
      "3",
      "2",
      "3",
      "1",
      "0"
    ],
    "type": "Numeric",
    "complexity": 10
  },
  {
    "id": "r90",
    "level": 23,
    "round": 2,
    "sequence": [
      "Y",
      "I",
      "G",
      "F",
      "X",
      "V",
      "U",
      "L",
      "K",
      "P",
      "V"
    ],
    "type": "Alpha",
    "complexity": 10
  },
  {
    "id": "r91",
    "level": 23,
    "round": 3,
    "sequence": [
      "μ",
      "Σ",
      "ξ",
      "σ",
      "υ",
      "ε",
      "ζ",
      "Δ",
      "μ",
      "ξ",
      "ο"
    ],
    "type": "Symbolic",
    "complexity": 10
  },
  {
    "id": "r92",
    "level": 23,
    "round": 4,
    "sequence": [
      "0",
      "X",
      "W",
      "N",
      "X",
      "M",
      "7",
      "P",
      "S",
      "&",
      "Q",
      "J"
    ],
    "type": "Mixed",
    "complexity": 10
  },
  {
    "id": "r93",
    "level": 24,
    "round": 1,
    "sequence": [
      "8",
      "8",
      "3",
      "9",
      "4",
      "2",
      "1",
      "0",
      "1",
      "3",
      "4"
    ],
    "type": "Numeric",
    "complexity": 10
  },
  {
    "id": "r94",
    "level": 24,
    "round": 2,
    "sequence": [
      "K",
      "U",
      "M",
      "D",
      "J",
      "J",
      "B",
      "J",
      "S",
      "P",
      "K"
    ],
    "type": "Alpha",
    "complexity": 10
  },
  {
    "id": "r95",
    "level": 24,
    "round": 3,
    "sequence": [
      "π",
      "Ψ",
      "ι",
      "Δ",
      "Φ",
      "ο",
      "κ",
      "ο",
      "η",
      "Ω",
      "υ"
    ],
    "type": "Symbolic",
    "complexity": 10
  },
  {
    "id": "r96",
    "level": 24,
    "round": 4,
    "sequence": [
      "!",
      "B",
      "T",
      "J",
      "N",
      "X",
      "2",
      "W",
      "S",
      "7",
      "H",
      "^"
    ],
    "type": "Mixed",
    "complexity": 10
  },
  {
    "id": "r97",
    "level": 25,
    "round": 1,
    "sequence": [
      "6",
      "1",
      "6",
      "0",
      "5",
      "5",
      "6",
      "9",
      "8",
      "1",
      "6",
      "1"
    ],
    "type": "Numeric",
    "complexity": 10
  },
  {
    "id": "r98",
    "level": 25,
    "round": 2,
    "sequence": [
      "Z",
      "T",
      "D",
      "Y",
      "L",
      "E",
      "G",
      "S",
      "G",
      "U",
      "U",
      "B"
    ],
    "type": "Alpha",
    "complexity": 10
  },
  {
    "id": "r99",
    "level": 25,
    "round": 3,
    "sequence": [
      "Δ",
      "θ",
      "τ",
      "ζ",
      "Σ",
      "γ",
      "ζ",
      "μ",
      "ο",
      "π",
      "Σ",
      "ψ"
    ],
    "type": "Symbolic",
    "complexity": 10
  },
  {
    "id": "r100",
    "level": 25,
    "round": 4,
    "sequence": [
      "S",
      "J",
      "V",
      "9",
      "#",
      "8",
      "7",
      "Y",
      "E",
      "N",
      "F",
      "@",
      "J"
    ],
    "type": "Mixed",
    "complexity": 10
  }
];
