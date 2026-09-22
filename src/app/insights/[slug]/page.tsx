import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const posts = {
  "attention-economy": { category: "Strategy", date: "18 AUG 2026", title: "The Attention Economy Is Over. Attention Craft Begins.", excerpt: "Why the next era of marketing belongs to brands that build meaning, not noise.", body: "Most brands are still optimizing for interruption. The next era rewards the ones that create a point of view worth following. Attention craft is the disciplined practice of making every signal clearer, more useful, and more memorable.\\n\\nIt begins before the campaign. It starts with the decision about what the brand should make people feel, believe, and do. From there, every channel becomes an instrument rather than an isolated tactic." },
  "brand-narrative": { category: "Brand", date: "04 AUG 2026", title: "Your Brand Is Not a Logo. It Is a Living Argument.", excerpt: "The most durable brands are built around a clear argument about the future.", body: "A logo can be recognized. A brand argument can be remembered. The strongest organizations know what they stand against, what they make possible, and why their work matters now.\\n\\nThis is where strategy becomes story. Not a slogan, but a coherent way of seeing the world that gives every team a sharper creative brief and every customer a reason to care." },
  "full-funnel": { category: "Growth", date: "21 JUL 2026", title: "Full-Funnel Is Not a Funnel. It Is a Conversation.", excerpt: "Design the next best moment, not just the next click.", body: "A customer does not experience your marketing as a funnel. They experience a sequence of promises. The work is to make each moment feel like the natural next step.\\n\\nWhen acquisition, activation, and retention share one story, measurement becomes less about defending channels and more about improving the relationship." },
  measurement: { category: "Growth", date: "30 JUN 2026", title: "Measurement With Meaning", excerpt: "Numbers should sharpen the story, not replace it.", body: "Dashboards are easy to accumulate and hard to act on. Meaningful measurement starts with the decisions a team needs to make, then works backward to the evidence that can change those decisions.\\n\\nAUREVIA pairs quantitative rigor with qualitative context so growth teams can move faster without losing the plot." },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) return <main className="article-page"><Link className="back-link" href="/insights"><ArrowLeft size={16} /> All insights</Link><h1>Insight not found.</h1></main>;
  return <main className="article-page"><Link className="back-link" href="/insights"><ArrowLeft size={16} /> All insights</Link><Reveal><article><div className="article-header"><div className="eyebrow"><span className="eyebrow-dot" /> {post.category} / {post.date}</div><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p></div><div className="article-body">{post.body.split("\\n\\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="article-cta"><div><small>READY FOR A NEW SIGNAL?</small><h2>Let&apos;s make your next move impossible to ignore.</h2></div><Link className="button button-primary" href="/#contact">Start a conversation <ArrowUpRight size={16} /></Link></div></article></Reveal></main>;
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
