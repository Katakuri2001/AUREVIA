import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const cases = [
  { slug: "halo-hospitality", client: "Halo Hospitality", title: "A quiet repositioning for a loud category", category: "Hospitality", metric: "+64%", label: "direct bookings", description: "A narrative-led repositioning that turned beautiful properties into a brand people could feel before they ever arrived." },
  { slug: "arc-finance", client: "Arc Finance", title: "Turning a complex product into a clear invitation", category: "Fintech", metric: "3.4×", label: "organic intent traffic", description: "A clearer story, a sharper demand engine, and a conversion experience built around control without friction." },
  { slug: "nova-living", client: "Nova Living", title: "A launch that felt inevitable", category: "Consumer", metric: "42k", label: "people in the waitlist", description: "A ritual-led launch that made a new sustainable home brand feel familiar before it was available." },
];

export default function WorkPage() {
  return <main className="inner-page"><div className="inner-page-header"><div><div className="eyebrow"><span className="eyebrow-dot" /> SELECTED WORK</div><h1>Proof, not<br /><em>promises.</em></h1></div><p>Three stories of brands that chose meaning over noise—and built systems to make it last.</p></div><div className="inner-case-list">{cases.map((item, index) => <Reveal key={item.slug} className="inner-case-row"><span className="inner-case-number">0{index + 1}</span><div className="inner-case-copy"><small>{item.category}</small><h2>{item.title}</h2><p>{item.description}</p><div className="inner-case-metric"><strong>{item.metric}</strong><span>{item.label}</span></div></div><Link href={`/work/${item.slug}`} className="round-link" aria-label={`Read ${item.client} case study`}><ArrowUpRight size={20} /></Link></Reveal>)}</div></main>;
}