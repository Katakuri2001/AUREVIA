import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";

const cases = {
  "halo-hospitality": { client: "Halo Hospitality", title: "A quiet repositioning for a loud category", category: "Hospitality", intro: "A boutique hotel group had beautiful properties and an invisible brand story.", challenge: "Search demand was growing, but direct bookings were being lost to louder platforms.", strategy: "We built a narrative around the idea of “the room between places,” then translated it into a restrained identity, editorial system, and high-intent acquisition program.", execution: "A new site architecture, destination storytelling, paid search rebuild, and lifecycle program launched across three markets.", metrics: [["+64%", "direct bookings"], ["2.8×", "branded search"], ["+21%", "booking value"]] },
  "arc-finance": { client: "Arc Finance", title: "Turning a complex product into a clear invitation", category: "Fintech", intro: "A B2B finance platform had strong technology and a category explanation that only insiders understood.", challenge: "The product was powerful, but the promise was hidden behind industry language.", strategy: "We found the human tension beneath the product—control without friction—and made it the organizing idea for the brand and demand engine.", execution: "A modular story system, executive content program, conversion-focused website, and account-based paid media program.", metrics: [["+118%", "qualified pipeline"], ["3.4×", "organic intent traffic"], ["−17%", "sales-cycle time"]] },
  "nova-living": { client: "Nova Living", title: "A launch that felt inevitable", category: "Consumer", intro: "A sustainable home brand needed to enter a crowded market without discounting its values.", challenge: "The category was crowded with claims, but no one had made sustainability feel like a better ritual.", strategy: "We positioned the launch around “better rituals,” pairing tactile product storytelling with a creator network and a carefully sequenced waitlist.", execution: "Film, editorial commerce, creator partnerships, lifecycle email, and a measurement model followed the full path from curiosity to purchase.", metrics: [["42k", "people in the waitlist"], ["+38%", "revenue forecast"], ["29%", "creator purchases"]] },
};

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases[slug as keyof typeof cases];
  if (!item) return <main className="case-page"><Link className="back-link" href="/work"><ArrowLeft size={16} /> All work</Link><h1>Case study not found.</h1></main>;
  return <main className="case-page"><Link className="back-link" href="/work"><ArrowLeft size={16} /> All work</Link><Reveal><div className="case-page-hero"><div className="eyebrow"><span className="eyebrow-dot" /> {item.category} / CASE STUDY</div><h1>{item.title}</h1><p>{item.intro}</p></div><div className="case-page-content"><div className="case-page-sticky"><span>THE STORY</span><strong>01 — 04</strong></div><div className="case-page-body"><section><small>THE CHALLENGE</small><h2>{item.challenge}</h2></section><section><small>THE STRATEGY</small><h2>{item.strategy}</h2></section><section><small>THE EXECUTION</small><h2>{item.execution}</h2></section><div className="case-page-metrics">{item.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></div></Reveal></main>;
}

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}