import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const posts = [
  { slug: "attention-economy", category: "Strategy", date: "18 AUG 2026", title: "The Attention Economy Is Over. Attention Craft Begins.", excerpt: "Why the next era of marketing belongs to brands that build meaning, not noise." },
  { slug: "brand-narrative", category: "Brand", date: "04 AUG 2026", title: "Your Brand Is Not a Logo. It Is a Living Argument.", excerpt: "The most durable brands are built around a clear argument about the future." },
  { slug: "full-funnel", category: "Growth", date: "21 JUL 2026", title: "Full-Funnel Is Not a Funnel. It Is a Conversation.", excerpt: "Design the next best moment, not just the next click." },
  { slug: "measurement", category: "Growth", date: "30 JUN 2026", title: "Measurement With Meaning", excerpt: "Numbers should sharpen the story, not replace it." },
];

export default function InsightsPage() {
  return <main className="inner-page insights-page"><div className="inner-page-header"><div><div className="eyebrow"><span className="eyebrow-dot" /> FIELD NOTES / INSIGHTS</div><h1>Ideas with<br /><em>some mileage.</em></h1></div><p>Strategy, story, and systems for teams building brands that earn attention and compound growth.</p></div><div className="insights-page-list">{posts.map((post, index) => <Reveal key={post.slug} delay={index * 0.05} className="insights-page-row"><span>{post.date}</span><div><small>{post.category}</small><h2>{post.title}</h2><p>{post.excerpt}</p></div><Link href={`/insights/${post.slug}`} className="round-link" aria-label={`Read ${post.title}`}><ArrowUpRight size={20} /></Link></Reveal>)}</div></main>;
}