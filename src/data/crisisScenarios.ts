export interface CrisisOption {
  text: string;
  impact: {
    stability: number;
    economy: number;
    publicTrust: number;
    globalRelations: number;
  };
  consequence: string;
}

export interface CrisisScenario {
  id: string;
  title: string;
  description: string;
  options: CrisisOption[];
}

const templates = [
  {
    title: "The Silicon Embargo",
    desc: "A major geopolitical rival has suddenly halted all exports of rare earth minerals, critical for your nation's tech and defense sectors.",
    opts: [
      { text: "Impose immediate retaliatory tariffs and sanctions.", s: -10, e: -20, t: 15, r: -30 },
      { text: "Subsidize domestic mining and recycling programs heavily.", s: 10, e: -15, t: 5, r: 0 },
      { text: "Negotiate a diplomatic compromise through neutral third parties.", s: 5, e: 10, t: -10, r: 20 }
    ]
  },
  {
    title: "The Cyber Grid Collapse",
    desc: "A sophisticated cyberattack has taken down the power grid in three major metropolitan areas. Millions are without power.",
    opts: [
      { text: "Declare martial law and deploy the military to maintain order.", s: 20, e: -10, t: -25, r: -5 },
      { text: "Launch a massive, unverified counter-cyberattack against suspected state actors.", s: -15, e: -5, t: 10, r: -40 },
      { text: "Focus entirely on restoring the grid and call for international cybersecurity assistance.", s: 10, e: 5, t: 15, r: 25 }
    ]
  },
  {
    title: "The Sovereign Debt Crisis",
    desc: "Your nation's debt-to-GDP ratio has reached unsustainable levels. International credit rating agencies are threatening a downgrade.",
    opts: [
      { text: "Implement severe austerity measures, cutting social programs and raising taxes.", s: -20, e: 15, t: -30, r: 10 },
      { text: "Default on a portion of the international debt to force restructuring.", s: -10, e: -30, t: 5, r: -40 },
      { text: "Print money to pay off the debt (Quantitative Easing).", s: 5, e: -20, t: -15, r: -10 }
    ]
  },
  {
    title: "The Pandemic Resurgence",
    desc: "A highly contagious new variant of a known virus has emerged in a neighboring country and the first cases have just been detected.",
    opts: [
      { text: "Implement an immediate, strict nationwide lockdown and close all borders.", s: 15, e: -35, t: -10, r: -15 },
      { text: "Keep the economy open but mandate masks and fast-track vaccine development.", s: -15, e: 10, t: 5, r: 5 },
      { text: "Implement localized lockdowns only in affected areas and increase healthcare funding.", s: 5, e: -10, t: 15, r: 0 }
    ]
  },
  {
    title: "The AI Automation Shock",
    desc: "A breakthrough in artificial general intelligence has suddenly made 30% of the workforce obsolete across multiple sectors.",
    opts: [
      { text: "Implement a Universal Basic Income (UBI) funded by a heavy tax on AI companies.", s: 15, e: -15, t: 20, r: 0 },
      { text: "Ban the deployment of the new AI technologies to protect jobs.", s: -5, e: -25, t: 10, r: -20 },
      { text: "Launch a massive, debt-funded national retraining program while allowing AI deployment.", s: 5, e: 15, t: -5, r: 10 }
    ]
  },
  {
    title: "Orbital Debris Cascade",
    desc: "A collision in low Earth orbit has created a massive debris field, threatening global communications and GPS networks.",
    opts: [
      { text: "Launch experimental laser-clearing satellites, risking weaponization accusations.", s: 10, e: -15, t: 5, r: -25 },
      { text: "Fund a massive international coalition to slowly clean the orbit.", s: 5, e: -20, t: 15, r: 20 },
      { text: "Do nothing and adapt ground-based systems to compensate.", s: -15, e: 10, t: -20, r: -5 }
    ]
  },
  {
    title: "The Deepfake Election",
    desc: "Weeks before a major election, hyper-realistic deepfakes of political leaders confessing to crimes go viral, causing mass riots.",
    opts: [
      { text: "Shut down major social media networks temporarily.", s: 20, e: -20, t: -30, r: -10 },
      { text: "Deploy an AI counter-measure to flag and remove fakes automatically.", s: 10, e: -5, t: 15, r: 5 },
      { text: "Allow the information to flow but launch a massive public education campaign.", s: -15, e: 5, t: 10, r: 0 }
    ]
  },
  {
    title: "Climate Refugee Surge",
    desc: "Unprecedented droughts in the southern hemisphere have triggered a mass migration of millions toward your borders.",
    opts: [
      { text: "Militarize the border and turn away all refugees.", s: 15, e: 5, t: -10, r: -35 },
      { text: "Open borders and establish massive temporary housing camps.", s: -20, e: -25, t: 15, r: 25 },
      { text: "Negotiate a quota system with neighboring nations and accept a limited number.", s: 5, e: -10, t: 5, r: 10 }
    ]
  },
  {
    title: "Quantum Decryption",
    desc: "A rogue state claims to have developed a quantum computer capable of breaking standard encryption, threatening global financial systems.",
    opts: [
      { text: "Launch a preemptive cyber strike to destroy their quantum facilities.", s: 10, e: -5, t: -10, r: -40 },
      { text: "Force an immediate, costly nationwide upgrade to quantum-resistant encryption.", s: 5, e: -30, t: 15, r: 10 },
      { text: "Call their bluff and rely on existing intelligence to monitor the threat.", s: -15, e: 10, t: -5, r: -10 }
    ]
  },
  {
    title: "The Synthetic Food Revolution",
    desc: "Lab-grown meat has become cheaper than traditional farming, causing a collapse in the agricultural sector and rural protests.",
    opts: [
      { text: "Heavily tax synthetic food to protect traditional farmers.", s: 15, e: -15, t: -10, r: -5 },
      { text: "Embrace the change and offer buyouts to traditional farmers.", s: -10, e: 20, t: 10, r: 5 },
      { text: "Subsidize both industries to artificially maintain balance.", s: 5, e: -25, t: 5, r: 0 }
    ]
  }
];

export function generateCrisisScenario(year: number): CrisisScenario {
  // Use year to deterministically select a template
  const templateIndex = (year * 13) % templates.length;
  const template = templates[templateIndex];
  
  // Add some slight variation based on the year
  const severityMultiplier = 1 + (year / 200); // Scales up slightly over 200 years
  
  return {
    id: `c_year_${year}`,
    title: template.title,
    description: template.desc,
    options: template.opts.map(opt => ({
      text: opt.text,
      impact: {
        stability: Math.round(opt.s * severityMultiplier),
        economy: Math.round(opt.e * severityMultiplier),
        publicTrust: Math.round(opt.t * severityMultiplier),
        globalRelations: Math.round(opt.r * severityMultiplier)
      },
      consequence: "The decision has been executed. The global landscape shifts."
    }))
  };
}

export const crisisDatabase: CrisisScenario[] = [];
