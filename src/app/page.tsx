import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";

const services = [
  { number: "01", title: "Content Marketing", tag: "CONTENT", description: "Stories people remember. Content systems that build long-term brand attention." },
  { number: "02", title: "Paid Media", tag: "MEDIA", description: "Right message. Right audience. Right moment. Performance advertising that scales." },
  { number: "03", title: "Social Growth", tag: "GROWTH", description: "Community-driven growth. Organic reach that converts. Culture-first strategy." },
  { number: "04", title: "Creative Strategy", tag: "STRATEGY", description: "Brand positioning that cuts through. Creative platforms built for attention." },
  { number: "05", title: "Growth Intelligence", tag: "INTEL", description: "Data that drives decisions. Measurement frameworks for sustainable growth." },
];

const cases = [
  { client: "Halo Hospitality", title: "A quiet repositioning for a loud category", metric: "+64%", label: "direct bookings", tone: "case-halo" },
  { client: "Arc Finance", title: "Turning a complex product into a clear invitation", metric: "3.4×", label: "organic intent traffic", tone: "case-arc" },
  { client: "Nova Living", title: "A launch that felt inevitable", metric: "42k", label: "people in the waitlist", tone: "case-nova" },
];

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient" />
        <div className="hero-grid" />
      </div>
      <div className="hero-container container">
        <div className="hero-content">
          <Reveal delay={0} className="hero-label">
            <span className="hero-label-dot" />
            THE GUYS — CONTENT × MEDIA × GROWTH
          </Reveal>
          <Reveal delay={100} as="h1" id="hero-heading" className="hero-title">
            <span className="hero-title-line">WE MAKE</span>
            <span className="hero-title-line">ATTENTION</span>
            <span className="hero-title-line hero-title-accent">MOVE.</span>
          </Reveal>
          <Reveal delay={200} className="hero-description">
            A creative growth agency building brands, content and campaigns people remember.
          </Reveal>
          <Reveal delay={300} className="hero-actions">
            <Link className="btn btn-primary" href="/#contact">
              Start a Project
              <ArrowUpRight size={18} />
            </Link>
            <Link className="btn btn-text link-arrow" href="/work">
              Explore Work
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={400} className="hero-visual" aria-hidden="true">
          <div className="hero-visual-inner">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
            <div className="hero-core">
              <span className="core-label">ATTENTION</span>
              <span className="core-value">TG</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={500} className="hero-scroll" aria-hidden="true">
        <span className="scroll-text">SCROLL</span>
        <ArrowDown size={20} className="scroll-arrow" />
      </Reveal>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="section manifesto-section" aria-labelledby="manifesto-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">01 / MANIFESTO</span>
          <h2 id="manifesto-heading" className="manifesto-title">
            <span className="reveal-text"><span>ATTENTION</span></span>
            <span className="reveal-text"><span>IS NOT</span></span>
            <span className="reveal-text"><span>THE GOAL.</span></span>
          </h2>
        </Reveal>
        <Reveal delay={200} className="manifesto-body">
          <p className="manifesto-lede">It is the invitation.</p>
          <p className="manifesto-note">
            The market is not short of messages. It is short of meaning. 
            We help ambitious teams find the idea that cuts through, 
            then build the system that lets it travel.
          </p>
          <p className="manifesto-note">
            Every engagement begins with a question: what should the world make of you? 
            From there, we move from signal to story, from story to scale, and from scale to lasting value.
          </p>
        </Reveal>
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
    <section className="section method-section" id="method" aria-labelledby="method-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">02 / METHOD</span>
          <h2 id="method-heading">Five moves.<br /><em>One momentum.</em></h2>
        </Reveal>
        <Reveal delay={100} className="method-description">
          Not a funnel. A living system for making brands matter.
        </Reveal>
        <div className="method-list">
          {steps.map(([number, title, statement, description], index) => (
            <Reveal key={number} delay={index * 80 + 200} className="method-row">
              <span className="method-number">{number}</span>
              <div className="method-content">
                <h3>{title}</h3>
                <p className="method-statement">{statement}</p>
              </div>
              <p className="method-row-text">{description}</p>
              <ArrowUpRight className="method-arrow" size={20} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">03 / SERVICES</span>
          <h2 id="services-heading">What We Do</h2>
        </Reveal>
        <Reveal delay={100} className="services-description">
          Senior people. Clear thinking. No theatrical process without a useful outcome.
        </Reveal>
        <div className="services-list">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 80 + 200} className="service-item">
              <div className="service-header">
                <span className="service-number">{service.number}</span>
                <span className="service-tag">{service.tag}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-text">{service.description}</p>
              <Link href="/#contact" className="service-link link-arrow">
                Explore
                <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section work-section" aria-labelledby="work-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">04 / WORK</span>
          <h2 id="work-heading">Selected Work</h2>
        </Reveal>
        <Reveal delay={100} className="work-description">
          Three stories of brands that chose meaning over noise—and built systems to make it last.
        </Reveal>
        <div className="work-grid">
          {cases.map((item, index) => (
            <Reveal key={item.client} delay={index * 100 + 200} className="work-card">
              <Link href={`/work/${item.client.toLowerCase().replaceAll(" ", "-")}`} className="work-card-link" aria-label={`Read ${item.client} case study`}>
                <div className="work-card-visual">
                  <span className="work-card-number">0{index + 1}</span>
                  <div className={`work-card-shape ${item.tone}`} />
                </div>
                <div className="work-card-content">
                  <div className="work-card-meta">
                    <span className="work-card-metric">{item.metric}</span>
                    <span className="work-card-label">{item.label}</span>
                  </div>
                  <h3 className="work-card-title">{item.title}</h3>
                  <span className="work-card-arrow link-arrow">
                    View Case
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500} className="work-cta">
          <Link className="btn btn-outline" href="/work">
            View All Work
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Engine() {
  return (
    <section className="section engine-section" aria-labelledby="engine-heading">
      <div className="container">
        <div className="engine-layout">
          <Reveal className="engine-content">
            <div className="section-header">
              <span className="section-label">05 / OPERATING SYSTEM</span>
              <h2 id="engine-heading">Strategy is the spark.<br /><em>Systems are the engine.</em></h2>
            </div>
            <Reveal delay={100} className="engine-text">
              We do not hand over a deck and disappear. We build the rituals, feedback loops, and creative infrastructure that keep your brand moving after launch.
            </Reveal>
            <Reveal delay={200} className="engine-stats">
              <div className="engine-stat">
                <strong>5</strong>
                <span>moves in the method</span>
              </div>
              <div className="engine-stat">
                <strong>1</strong>
                <span>connected growth system</span>
              </div>
              <div className="engine-stat">
                <strong>∞</strong>
                <span>ways to get sharper</span>
              </div>
            </Reveal>
          </Reveal>
          <Reveal delay={100} className="engine-visual" aria-hidden="true">
            <div className="engine-canvas">
              <div className="engine-ring engine-ring-1" />
              <div className="engine-ring engine-ring-2" />
              <div className="engine-ring engine-ring-3" />
              <div className="engine-node node-attention">ATTENTION</div>
              <div className="engine-node node-story">STORY</div>
              <div className="engine-node node-amplify">AMPLIFY</div>
              <div className="engine-node node-convert">CONVERT</div>
              <div className="engine-node node-grow">GROW</div>
              <div className="engine-center">
                <span className="center-label">TG</span>
                <span className="center-sub">GROWTH ENGINE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const posts = [
    { slug: "attention-economy", title: "The Attention Economy Is Over. Attention Craft Begins.", category: "Strategy", date: "18 AUG 2026" },
    { slug: "brand-narrative", title: "Your Brand Is Not a Logo. It Is a Living Argument.", category: "Brand", date: "04 AUG 2026" },
    { slug: "full-funnel", title: "Full-Funnel Is Not a Funnel. It Is a Conversation.", category: "Growth", date: "21 JUL 2026" },
  ];
  return (
    <section className="section insights-section" aria-labelledby="insights-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">06 / INSIGHTS</span>
          <h2 id="insights-heading">Latest Thinking</h2>
        </Reveal>
        <div className="insights-list">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80 + 100} className="insight-item">
              <span className="insight-date">{post.date}</span>
              <div className="insight-content">
                <small className="insight-category">{post.category}</small>
                <h3>{post.title}</h3>
              </div>
              <Link href={`/insights/${post.slug}`} className="insight-arrow link-arrow" aria-label={`Read ${post.title}`}>
                Read
                <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300} className="insights-cta">
          <Link className="btn btn-text link-arrow" href="/insights">
            All Insights
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-layout">
          <Reveal className="contact-content">
            <div className="section-header">
              <span className="section-label">07 / CONTACT</span>
              <h2 id="contact-heading">Your Next<br /><em>Breakthrough</em><br />Starts With Attention.</h2>
            </div>
            <Reveal delay={100} className="contact-text">
              Tell us where you are going. We will bring the signal, the story, and the system to get you there.
            </Reveal>
          </Reveal>
          <Reveal delay={200} className="contact-form-wrapper">
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Method />
      <Services />
      <Work />
      <Engine />
      <Insights />
      <Contact />
    </>
  );
}