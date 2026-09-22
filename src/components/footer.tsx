import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/" className="brand-lockup"><span className="brand-mark">TG</span><span>The Guys</span></Link><p>Strategy, story, and systems for brands ready to be remembered.</p></div><div className="footer-nav"><div><small>EXPLORE</small><Link href="/work">Work</Link><Link href="/insights">Insights</Link><Link href="/#method">Method</Link></div><div><small>CONNECT</small><Link href="mailto:hello@theguys.studio">Email</Link><Link href="/#contact">Start a project</Link><Link href="/admin">Admin</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} The Guys. All rights reserved.</span><span>DEMO EXPERIENCE / FICTIONAL CASE WORK</span><Link href="#top">Back to top <ArrowUpRight size={14} /></Link></div></footer>;
}