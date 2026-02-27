export interface SignalItem {
  id: string;
  headline: string;
  context: string;
  credibility: 'High' | 'Medium' | 'Low';
  bias: 'Neutral' | 'Sensational' | 'Partisan';
  explanation: string;
}

export const signalDatabase: SignalItem[] = [
  {
    id: "s1",
    headline: "New Study Claims Coffee Cures All Forms of Cancer",
    context: "A blog post citing a single unverified experiment on mice claims that drinking 10 cups of coffee a day eliminates cancer cells entirely.",
    credibility: "Low",
    bias: "Sensational",
    explanation: "This headline exaggerates the findings of a single, unverified animal study, making an unsupported medical claim."
  },
  {
    id: "s2",
    headline: "Global Temperatures Rise by 1.2°C Since Pre-Industrial Era",
    context: "A report published by the Intergovernmental Panel on Climate Change (IPCC) detailing the latest global temperature data collected from multiple independent scientific organizations.",
    credibility: "High",
    bias: "Neutral",
    explanation: "The IPCC is a highly credible international body, and the data is corroborated by multiple independent scientific organizations."
  },
  {
    id: "s3",
    headline: "Politician X's Secret Plan to Destroy the Economy Revealed!",
    context: "An opinion piece on a highly partisan website that uses anonymous sources to allege a conspiracy by a political figure.",
    credibility: "Low",
    bias: "Partisan",
    explanation: "The use of anonymous sources on a partisan site, combined with emotionally charged language, indicates low credibility and high bias."
  },
  {
    id: "s4",
    headline: "Central Bank Announces 0.25% Interest Rate Hike",
    context: "An article from a major financial news outlet reporting on the official press release from the Central Bank regarding its latest monetary policy decision.",
    credibility: "High",
    bias: "Neutral",
    explanation: "This is a factual report of an official announcement from a primary source, published by a reputable financial news organization."
  },
  {
    id: "s5",
    headline: "Tech CEO Promises Flying Cars by Next Year",
    context: "A tweet from a tech CEO known for making ambitious, often delayed promises, stating that their company will release consumer flying cars within 12 months.",
    credibility: "Medium",
    bias: "Sensational",
    explanation: "While the source is the CEO themselves, the claim is highly ambitious and the CEO has a history of delayed timelines, making the credibility medium and the tone sensational."
  },
  {
    id: "s6",
    headline: "Local Water Supply Contaminated with Mind-Controlling Chemicals",
    context: "A viral social media post claiming that the government is adding chemicals to the local water supply to control citizens' thoughts, providing no evidence.",
    credibility: "Low",
    bias: "Sensational",
    explanation: "This is a baseless conspiracy theory spread on social media without any scientific or factual evidence."
  },
  {
    id: "s7",
    headline: "Unemployment Rate Drops to 4.5% in Q3",
    context: "A summary of the latest labor statistics released by the Bureau of Labor Statistics, showing a slight decrease in the unemployment rate.",
    credibility: "High",
    bias: "Neutral",
    explanation: "The information comes directly from a government statistical agency, which is a primary and reliable source for economic data."
  },
  {
    id: "s8",
    headline: "Opposition Leader is a Traitor, Says Ruling Party Official",
    context: "A quote from a ruling party official during a heated parliamentary debate, accusing the opposition leader of treason without providing specific evidence.",
    credibility: "Medium",
    bias: "Partisan",
    explanation: "The quote is accurately reported, but the claim itself is highly partisan and lacks evidence, making it a medium credibility statement overall."
  }
];
