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

export const crisisDatabase: CrisisScenario[] = [
  {
    id: "c1",
    title: "The Silicon Embargo",
    description: "A major geopolitical rival has suddenly halted all exports of rare earth minerals, critical for your nation's tech and defense sectors. Factories are halting production, and the stock market is plummeting.",
    options: [
      {
        text: "Impose immediate retaliatory tariffs and sanctions.",
        impact: { stability: -10, economy: -20, publicTrust: 15, globalRelations: -30 },
        consequence: "Trade war escalates. The economy suffers short-term, but the public rallies behind a strong stance."
      },
      {
        text: "Subsidize domestic mining and recycling programs heavily.",
        impact: { stability: 10, economy: -15, publicTrust: 5, globalRelations: 0 },
        consequence: "High immediate cost, but builds long-term resilience without escalating global tensions."
      },
      {
        text: "Negotiate a diplomatic compromise through neutral third parties.",
        impact: { stability: 5, economy: 10, publicTrust: -10, globalRelations: 20 },
        consequence: "Supply chains are restored, but the public perceives the government as weak and yielding."
      }
    ]
  },
  {
    id: "c2",
    title: "The Cyber Grid Collapse",
    description: "A sophisticated cyberattack has taken down the power grid in three major metropolitan areas. Millions are without power, and hospitals are running on backup generators. The origin of the attack is currently unknown.",
    options: [
      {
        text: "Declare martial law and deploy the military to maintain order.",
        impact: { stability: 20, economy: -10, publicTrust: -25, globalRelations: -5 },
        consequence: "Order is maintained, but civil liberties are suspended, leading to massive public distrust."
      },
      {
        text: "Launch a massive, unverified counter-cyberattack against suspected state actors.",
        impact: { stability: -15, economy: -5, publicTrust: 10, globalRelations: -40 },
        consequence: "You hit the wrong target, escalating a conflict with a neutral nation while the grid remains down."
      },
      {
        text: "Focus entirely on restoring the grid and call for international cybersecurity assistance.",
        impact: { stability: 10, economy: 5, publicTrust: 15, globalRelations: 25 },
        consequence: "The grid is restored slowly, but international cooperation strengthens and public trust is maintained."
      }
    ]
  },
  {
    id: "c3",
    title: "The Sovereign Debt Crisis",
    description: "Your nation's debt-to-GDP ratio has reached unsustainable levels. International credit rating agencies are threatening a downgrade, which would cause borrowing costs to skyrocket and trigger a recession.",
    options: [
      {
        text: "Implement severe austerity measures, cutting social programs and raising taxes.",
        impact: { stability: -20, economy: 15, publicTrust: -30, globalRelations: 10 },
        consequence: "The budget is balanced, but massive protests erupt, and the poorest citizens suffer greatly."
      },
      {
        text: "Default on a portion of the international debt to force restructuring.",
        impact: { stability: -10, economy: -30, publicTrust: 5, globalRelations: -40 },
        consequence: "The nation is locked out of international financial markets, causing a severe, immediate economic contraction."
      },
      {
        text: "Print money to pay off the debt (Quantitative Easing).",
        impact: { stability: 5, economy: -20, publicTrust: -15, globalRelations: -10 },
        consequence: "Hyperinflation sets in, destroying the savings of the middle class and destabilizing the currency."
      }
    ]
  },
  {
    id: "c4",
    title: "The Pandemic Resurgence",
    description: "A highly contagious new variant of a known virus has emerged in a neighboring country and the first cases have just been detected in your capital city. Hospitals are warning they could be overwhelmed within weeks.",
    options: [
      {
        text: "Implement an immediate, strict nationwide lockdown and close all borders.",
        impact: { stability: 15, economy: -35, publicTrust: -10, globalRelations: -15 },
        consequence: "The spread is halted, but the economy crashes and neighboring countries retaliate against border closures."
      },
      {
        text: "Keep the economy open but mandate masks and fast-track vaccine development.",
        impact: { stability: -15, economy: 10, publicTrust: 5, globalRelations: 5 },
        consequence: "Hospitals are overwhelmed, leading to high casualties, but the economy continues to function."
      },
      {
        text: "Implement localized lockdowns only in affected areas and increase healthcare funding.",
        impact: { stability: 5, economy: -10, publicTrust: 15, globalRelations: 0 },
        consequence: "A balanced approach that slows the spread without destroying the national economy, though some areas suffer."
      }
    ]
  },
  {
    id: "c5",
    title: "The AI Automation Shock",
    description: "A breakthrough in artificial general intelligence has suddenly made 30% of the workforce obsolete across multiple sectors, from transportation to legal services. Mass unemployment is imminent.",
    options: [
      {
        text: "Implement a Universal Basic Income (UBI) funded by a heavy tax on AI companies.",
        impact: { stability: 15, economy: -15, publicTrust: 20, globalRelations: 0 },
        consequence: "Citizens are supported, but tech companies threaten to relocate, slowing national innovation."
      },
      {
        text: "Ban the deployment of the new AI technologies to protect jobs.",
        impact: { stability: -5, economy: -25, publicTrust: 10, globalRelations: -20 },
        consequence: "Jobs are temporarily saved, but the nation falls drastically behind globally in technology and productivity."
      },
      {
        text: "Launch a massive, debt-funded national retraining program while allowing AI deployment.",
        impact: { stability: 5, economy: 15, publicTrust: -5, globalRelations: 10 },
        consequence: "The economy booms eventually, but the transition period is chaotic and many older workers are left behind."
      }
    ]
  }
];
