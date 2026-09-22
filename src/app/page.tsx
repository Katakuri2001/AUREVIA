import Link from "next/link";
import { ArrowDown, ArrowUpRight, Menu } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { HeroSceneWrapper } from "@/components/hero-scene-wrapper";

const services = [
  { number: "01", title: "Attention Architecture", text: "Positioning, creative platforms, and launch systems that make the first second impossible to ignore.", tag: "ATTENTION" },
  { number: "02", title: "Story & Brand Worlds", text: "A narrative identity and visual language that gives every touchpoint a reason to matter.", tag: "STORY" },
  { number: "03", title: "Amplification Systems", text: "Paid, organic, creator, and partnership programs designed as one connected distribution engine.", tag: "AMPLIFY" },
  { number: "04", title: "Conversion Experience", text: "Landing pages, lifecycle journeys, and experiments that turn interest into action.", tag: "CONVERT" },
  { number: "05", title: "Growth Intelligence", text: "Measurement frameworks and insight loops that make the next move visible.", tag: "GROW" },
];

const cases = [
  { client: "Halo Hospitality", title: "A quiet repositioning for a loud category", metric: "+64%", label: "direct bookings", tone: "case-halo" },
  { client: "Arc Finance", title: "Turning a complex product into a clear invitation", metric: "3.4×", label: "organic intent traffic", tone: "case-arc" },
  { client: "Nova Living", title: "A launch that felt inevitable", metric: "42k", label: "people in the waitlist", tone: "case-nova" },
];

function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="AUREVIA home">
        <span className="brand-mark">A</span>
        <span>AUREVIA</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#method">Method</Link>
        <Link href="/work">Work</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <Link className="header-cta" href="/#contact">Start a conversation <ArrowUpRight size={15} /></Link>
      <button className="mobile-menu-button" type="button" aria-label="Toggle menu"><Menu size={22} /></button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <Reveal className="eyebrow"><span className="eyebrow-dot" /> AUREVIA / DIGITAL MARKETING AGENCY</Reveal>
        <Reveal delay={0.08} as="h1" className="hero-title">
          <span>Impossible</span>
          <span>to <em>Ignore</em><span className="title-line" /></span>
        </Reveal>
        <Reveal delay={0.16} className="hero-deck">We build the strategy, story, and systems that turn attention into meaningful growth.</Reveal>
        <Reveal delay={0.22} className="hero-actions">
          <Link className="button button-primary" href="/#contact">Bring us your ambition <ArrowUpRight size={16} /></Link>
          <Link className="text-link" href="/work">See selected work <ArrowUpRight size={15} /></Link>
        </Reveal>
      </div>
      <div className="hero-orbit" aria-hidden="true"><HeroSceneWrapper /></div>
      <div className="hero-bottom"><span>EST. 2026 / GLOBAL BY DESIGN</span><span>SCROLL TO ENTER <ArrowDown size={15} /></span></div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto-section" id="method">
      <div className="section-label"><span>01 / MANIFESTO</span><span>THE AUREVIA LENS</span></div>
      <Reveal as="h2" className="manifesto-title">Attention is not the goal.<br /><em>It is the invitation.</em></Reveal>
      <div className="manifesto-grid">
        <p className="manifesto-lede">The market is not short of messages. It is short of meaning. We help ambitious teams find the idea that cuts through, then build the system that lets it travel.</p>
        <p className="manifesto-note">Every engagement begins with a question: what should the world make of you? From there, we move from signal to story, from story to scale, and from scale to lasting value.</p>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    ["01", "ATTENTION", "Make the first second impossible to ignore.", "We find the tension, the truth, and the visual signal that gives people a reason to stop."],
    ["02", "STORY", "Turn what you make into what people remember.", "We build a narrative world that gives every message a point of view and every channel a role."],
    ["03", "AMPLIFY", "Put the right story in the right rooms.", "We connect paid, organic, creator, and partnership programs into one intelligent distribution engine."],
    ["04", "CONVERT", "Make interest feel inevitable.", "We design the moments where curiosity becomes commitment—with clarity, momentum, and trust."],
    ["05", "GROW", "See the next move before the market does.", "We turn evidence into action, so every campaign makes the next one sharper."],
  ];
  return (
    <section className="method-section">
      <div className="section-label"><span>02 / METHOD</span><span>FROM SIGNAL TO SCALE</span></div>
      <div className="method-heading"><Reveal as="h2">Five moves.<br /><em>One momentum.</em></Reveal><p>Not a funnel. A living system for making brands matter.</p></div>
      <div className="method-list">{steps.map(([number, title, statement, description], index) => <Reveal key={number} delay={index * 0.06} className="method-row"><span className="method-number">{number}</span><div><h3>{title}</h3><p className="method-statement">{statement}</p></div><p className="method-description">{description}</p><ArrowUpRight className="method-arrow" size={20} /></Reveal>)}</div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section">
      <div className="section-label"><span>03 / CAPABILITIES</span><span>WHAT WE DO</span></div>
      <div className="services-heading"><Reveal as="h2">Built for the<br /><em>work that matters.</em></Reveal><p>Senior people. Clear thinking. No theatrical process without a useful outcome.</p></div>
      <div className="service-grid">{services.map((service, index) => <Reveal key={service.number} delay={index * 0.05} className="service-card"><div className="service-top"><span>{service.number}</span><span className="service-tag">{service.tag}</span></div><h3>{service.title}</h3><p>{service.text}</p><Link href="/#contact" className="card-link">Explore capability <ArrowUpRight size={15} /></Link></Reveal>)}</div>
    </section>
  );
}

function Work() {
  return (
    <section className="work-section">
      <div className="section-label"><span>04 / SELECTED WORK</span><span>PROOF, NOT PROMISES</span></div>
      <div className="work-heading"><Reveal as="h2">The work<br /><em>speaks first.</em></Reveal><Link className="button button-outline" href="/work">View all work <ArrowUpRight size={16} /></Link></div>
      <div className="case-grid">{cases.map((item, index) => <Reveal key={item.client} delay={index * 0.08} className={`case-card ${item.tone}`}><div className="case-visual"><span className="case-index">0{index + 1}</span><div className="case-shape" /><span className="case-client">{item.client}</span></div><div className="case-info"><h3>{item.title}</h3><div className="case-result"><strong>{item.metric}</strong><span>{item.label}</span></div><Link href={`/work/${item.client.toLowerCase().replaceAll(" ", "-")}`} className="card-link">Read the story <ArrowUpRight size={15} /></Link></div></Reveal>)}</div>
    </section>
  );
}

function Engine() {
  return (
    <section className="engine-section">
      <div className="engine-copy"><div className="section-label"><span>05 / OPERATING SYSTEM</span><span>THE GROWTH ENGINE</span></div><Reveal as="h2">Strategy is the spark.<br /><em>Systems are the engine.</em></Reveal><p>We do not hand over a deck and disappear. We build the rituals, feedback loops, and creative infrastructure that keep your brand moving after launch.</p><div className="engine-stats"><div><strong>5</strong><span>moves in the method</span></div><div><strong>1</strong><span>connected growth system</span></div><div><strong>∞</strong><span>ways to get sharper</span></div></div></div>
      <div className="engine-visual" aria-label="AUREVIA growth engine diagram"><div className="engine-ring ring-one" /><div className="engine-ring ring-two" /><div className="engine-core"><span>ATTENTION</span><strong>GROWTH</strong><span>CONVERSION</span></div><div className="engine-node node-one">STORY</div><div className="engine-node node-two">AMPLIFY</div><div className="engine-node node-three">LEARN</div></div>
    </section>
  );
}

function Insights() {
  const posts = [
    ["The Attention Economy Is Over. Attention Craft Begins.", "Strategy", "18 AUG 2026"],
    ["Your Brand Is Not a Logo. It Is a Living Argument.", "Brand", "04 AUG 2026"],
    ["Full-Funnel Is Not a Funnel. It Is a Conversation.", "Growth", "21 JUL 2026"],
  ];
  return <section className="insights-section"><div className="section-label"><span>06 / FIELD NOTES</span><span>INSIGHTS</span></div><div className="insights-heading"><Reveal as="h2">Ideas with<br /><em>some mileage.</em></Reveal><Link className="text-link" href="/insights">All insights <ArrowUpRight size={15} /></Link></div><div className="post-list">{posts.map(([title, category, date], index) => <Reveal key={title} delay={index * 0.06} className="post-row"><span>{date}</span><div><small>{category}</small><h3>{title}</h3></div><ArrowUpRight size={19} /></Reveal>)}</div></section>;
}

function Contact() {
  return <section className="contact-section" id="contact"><div className="contact-glow" aria-hidden="true" /><div className="section-label"><span>07 / BEGIN</span><span>LET&apos;S MAKE IT UNMISSABLE</span></div><div className="contact-grid"><Reveal as="h2">Have something<br /><em>worth remembering?</em></Reveal><p className="contact-intro">Tell us where you are going. We will bring the signal, the story, and the system to get you there.</p><LeadForm /></div></section>;
}

export default function HomePage() {
  return <><SiteHeader /><main><Hero /><Manifesto /><Method /><Services /><Work /><Engine /><Insights /><Contact /></main><Footer /></>;
}
