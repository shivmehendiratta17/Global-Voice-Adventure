export interface SignalItemV2 {
  id: string;
  level: number;
  round: number;
  headline: string;
  context: string;
  credibility: 'High' | 'Medium' | 'Low';
  bias: 'Neutral' | 'Sensational' | 'Partisan';
  explanation: string;
}

const templates = [
  {
    h: "New Study Claims {subject} Cures All Forms of Cancer",
    c: "A blog post citing a single unverified experiment claims that {subject} eliminates cancer cells entirely.",
    cr: "Low", b: "Sensational",
    e: "Exaggerates findings of a single, unverified study, making an unsupported medical claim."
  },
  {
    h: "Global Temperatures Rise by {num}°C Since Pre-Industrial Era",
    c: "A report published by the IPCC detailing the latest global temperature data collected from multiple independent scientific organizations.",
    cr: "High", b: "Neutral",
    e: "The IPCC is a highly credible international body, and the data is corroborated by multiple independent organizations."
  },
  {
    h: "Politician's Secret Plan to Destroy the Economy Revealed!",
    c: "An opinion piece on a highly partisan website that uses anonymous sources to allege a conspiracy by a political figure.",
    cr: "Low", b: "Partisan",
    e: "The use of anonymous sources on a partisan site, combined with emotionally charged language, indicates low credibility."
  },
  {
    h: "Central Bank Announces {num}% Interest Rate Hike",
    c: "An article from a major financial news outlet reporting on the official press release from the Central Bank.",
    cr: "High", b: "Neutral",
    e: "This is a factual report of an official announcement from a primary source, published by a reputable organization."
  },
  {
    h: "Tech CEO Promises Flying Cars by Next Year",
    c: "A tweet from a tech CEO known for making ambitious, often delayed promises, stating that their company will release consumer flying cars within 12 months.",
    cr: "Medium", b: "Sensational",
    e: "While the source is the CEO themselves, the claim is highly ambitious and the CEO has a history of delayed timelines."
  },
  {
    h: "Local Water Supply Contaminated with Mind-Controlling Chemicals",
    c: "A viral social media post claiming that the government is adding chemicals to the local water supply to control citizens' thoughts.",
    cr: "Low", b: "Sensational",
    e: "This is a baseless conspiracy theory spread on social media without any scientific or factual evidence."
  },
  {
    h: "Unemployment Rate Drops to {num}% in Q3",
    c: "A summary of the latest labor statistics released by the Bureau of Labor Statistics, showing a slight decrease in the unemployment rate.",
    cr: "High", b: "Neutral",
    e: "The information comes directly from a government statistical agency, which is a primary and reliable source."
  },
  {
    h: "Opposition Leader is a Traitor, Says Ruling Party Official",
    c: "A quote from a ruling party official during a heated parliamentary debate, accusing the opposition leader of treason without providing specific evidence.",
    cr: "Medium", b: "Partisan",
    e: "The quote is accurately reported, but the claim itself is highly partisan and lacks evidence."
  },
  {
    h: "Miracle Diet Pill Guarantees 20lbs Weight Loss in a Week",
    c: "An advertisement disguised as a news article on a lifestyle website, promoting a supplement with no FDA approval.",
    cr: "Low", b: "Sensational",
    e: "This is a deceptive advertorial making medically impossible claims without regulatory backing."
  },
  {
    h: "Senate Passes New Infrastructure Bill with Bipartisan Support",
    c: "A detailed breakdown of the newly passed legislation by a Pulitzer-winning political correspondent.",
    cr: "High", b: "Neutral",
    e: "Reported by a credible journalist with a history of accurate political reporting, detailing verifiable legislative action."
  },
  {
    h: "Aliens Built the Pyramids, New Evidence Suggests",
    c: "A late-night documentary on a fringe network featuring interviews with discredited authors and no archaeologists.",
    cr: "Low", b: "Sensational",
    e: "Relies on discredited sources and ignores decades of established archaeological consensus."
  },
  {
    h: "Quarterly Earnings Report Shows 15% Growth for Tech Giant",
    c: "An analysis based on the official SEC filings and earnings call transcript of a publicly traded company.",
    cr: "High", b: "Neutral",
    e: "Based on legally mandated financial disclosures and official company communications."
  }
];

const subjects = ["Coffee", "Green Tea", "Dark Chocolate", "Garlic", "Turmeric", "Apple Cider Vinegar"];

export function generateSignalItems(): SignalItemV2[] {
  const items: SignalItemV2[] = [];
  let idCounter = 1;
  
  for (let level = 1; level <= 49; level++) {
    for (let round = 1; round <= 3; round++) {
      // Deterministically pick a template based on level and round
      const templateIndex = ((level - 1) * 3 + (round - 1)) % templates.length;
      const t = templates[templateIndex];
      
      let headline = t.h;
      let context = t.c;
      
      if (headline.includes("{subject}")) {
        const subject = subjects[level % subjects.length];
        headline = headline.replace("{subject}", subject);
        context = context.replace("{subject}", subject);
      }
      
      if (headline.includes("{num}")) {
        const num = (1.2 + (level * 0.1)).toFixed(1);
        headline = headline.replace("{num}", num);
      }
      
      items.push({
        id: `sv2_${idCounter++}`,
        level,
        round,
        headline,
        context,
        credibility: t.cr as any,
        bias: t.b as any,
        explanation: t.e
      });
    }
  }
  
  return items;
}

export const signalDatabaseV2 = generateSignalItems();
