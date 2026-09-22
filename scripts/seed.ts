import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@aurevia.demo";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe-In-Production-2026!";
  const now = new Date().toISOString();
  const passwordHash = await bcrypt.hash(password, 12);
  const tempDir = mkdtempSync(join(tmpdir(), "aurevia-seed-"));
  const sqlPath = join(tempDir, "seed.sql");

  const sql = `
PRAGMA foreign_keys = ON;
INSERT INTO users (id,email,display_name,password_hash,role,created_at,updated_at)
VALUES ('user-demo-admin', '${email.replace(/'/g, "''")}', 'Aurevia Studio', '${passwordHash}', 'admin', '${now}', '${now}');

INSERT INTO categories (id,slug,name,description,sort_order) VALUES
('cat-strategy','strategy','Strategy','Positioning and growth strategy before execution.',1),
('cat-brand','brand','Brand','Narrative identity and distinctive expression.',2),
('cat-growth','growth','Growth','Full-funnel acquisition and conversion systems.',3),
('cat-content','content','Content','Editorial systems that compound trust.',4);

INSERT INTO services (id,slug,name,tagline,description,icon,accent,sort_order,is_active) VALUES
('svc-attention','attention','Attention Architecture','Make the first second impossible to ignore.','Research-led positioning, creative platforms, and launch systems that earn attention without shouting.','spark','#e8b96a',1,1),
('svc-story','story','Story & Brand Worlds','Turn what you make into what people remember.','A distinctive brand narrative, verbal identity, and visual language that scales across every touchpoint.','orbit','#c98d55',2,1),
('svc-amplify','amplify','Amplification Systems','Put the right story in the right rooms.','Paid, organic, creator, and partnership programs designed as one connected distribution engine.','signal','#8f7457',3,1),
('svc-convert','convert','Conversion Experience','Make interest feel inevitable.','Landing pages, lifecycle journeys, CRM strategy, and experiments that turn intent into action.','path','#d9b782',4,1),
('svc-grow','grow','Growth Intelligence','See the next move before the market does.','Measurement frameworks, insight loops, and optimization rituals that make growth repeatable.','pulse','#b69b76',5,1),
('svc-studio','studio','Creative Studio','A senior team for the work that matters.','Design, motion, copy, and production under one editorial direction—from campaign to product story.','studio','#e7d0aa',6,1);

INSERT INTO posts (id,slug,title,excerpt,body,category_id,author_id,status,seo_title,seo_description,published_at,created_at,updated_at) VALUES
('post-attention-economy','attention-economy','The Attention Economy Is Over. Attention Craft Begins.','Why the next era of marketing belongs to brands that build meaning, not noise.','Most brands are still optimizing for interruption. The next era rewards the ones that create a point of view worth following. Attention craft is the disciplined practice of making every signal clearer, more useful, and more memorable.\n\nIt begins before the campaign. It starts with the decision about what the brand should make people feel, believe, and do. From there, every channel becomes an instrument rather than an isolated tactic.\n\nAUREVIA helps teams move from content volume to cultural value—building the strategy, story, and systems that make attention compound.', 'cat-strategy', 'user-demo-admin', 'published', 'The Attention Economy Is Over', 'A strategy-led view of attention, meaning, and modern marketing.', '2026-08-18T09:00:00.000Z', '${now}', '${now}'),
('post-brand-narrative','brand-narrative','Your Brand Is Not a Logo. It Is a Living Argument.','The most durable brands are built around a clear argument about the future.','A logo can be recognized. A brand argument can be remembered. The strongest organizations know what they stand against, what they make possible, and why their work matters now.\n\nThis is where strategy becomes story. Not a slogan, but a coherent way of seeing the world that gives every team a sharper creative brief and every customer a reason to care.', 'cat-brand', 'user-demo-admin', 'published', 'Your Brand Is a Living Argument', 'How to build a brand narrative that gives every decision meaning.', '2026-08-04T09:00:00.000Z', '${now}', '${now}'),
('post-full-funnel','full-funnel-clarity','Full-Funnel Is Not a Funnel. It Is a Conversation.','Design the next best moment, not just the next click.','A customer does not experience your marketing as a funnel. They experience a sequence of promises. The work is to make each moment feel like the natural next step.\n\nWhen acquisition, activation, and retention share one story, measurement becomes less about defending channels and more about improving the relationship.', 'cat-growth', 'user-demo-admin', 'published', 'Full-Funnel Is a Conversation', 'A practical framework for connected acquisition and retention.', '2026-07-21T09:00:00.000Z', '${now}', '${now}'),
('post-creative-ops','creative-operations','Creative Operations Is Where Good Ideas Stay Alive.','Build a system that protects the spark without sterilizing it.','Great creative rarely dies in the first meeting. It dies in the handoff. Creative operations gives ideas a path from insight to production while preserving the tension that made them interesting.\n\nThe goal is not more process. It is better decisions, clearer ownership, and a rhythm that lets teams do their best work repeatedly.', 'cat-content', 'user-demo-admin', 'draft', 'Creative Operations That Protect Ideas', 'How to make creative systems useful without making them rigid.', null, '${now}', '${now}'),
('post-measurement','measurement-with-meaning','Measurement With Meaning','Numbers should sharpen the story, not replace it.','Dashboards are easy to accumulate and hard to act on. Meaningful measurement starts with the decisions a team needs to make, then works backward to the evidence that can change those decisions.\n\nAUREVIA pairs quantitative rigor with qualitative context so growth teams can move faster without losing the plot.', 'cat-growth', 'user-demo-admin', 'published', 'Measurement With Meaning', 'A human approach to marketing measurement and decision quality.', '2026-06-30T09:00:00.000Z', '${now}', '${now}');

INSERT INTO case_studies (id,slug,client,title,service_category,challenge,strategy,execution,results,testimonial,featured,status,published_at,created_at,updated_at) VALUES
('case-halo','halo-hospitality','Halo Hospitality','A quiet repositioning for a loud category.','Hospitality','A boutique hotel group had beautiful properties and an invisible brand story. Search demand was growing, but direct bookings were being lost to louder platforms.','We built a narrative around the idea of “the room between places,” then translated it into a restrained identity, editorial system, and high-intent acquisition program.','A new site architecture, destination storytelling, paid search rebuild, and lifecycle program launched across three markets. Creative testing was tied to booking intent rather than vanity reach.','Direct bookings rose 64%, branded search grew 2.8×, and the average booking value increased 21% within two quarters.','AUREVIA made our brand feel like the destination before a guest ever arrived.',1,'published','2026-07-12T09:00:00.000Z','${now}','${now}'),
('case-arc','arc-finance','Arc Finance','Turning a complex product into a clear invitation.','Fintech','A B2B finance platform had strong technology and a category explanation that only insiders understood.','We found the human tension beneath the product—control without friction—and made it the organizing idea for the brand and demand engine.','A modular story system, executive content program, conversion-focused website, and account-based paid media program.','Qualified pipeline increased 118%, sales-cycle time fell 17%, and organic traffic to high-intent pages grew 3.4×.','The work gave our team a shared language and gave buyers a reason to lean in.',1,'published','2026-05-22T09:00:00.000Z','${now}','${now}'),
('case-nova','nova-living','Nova Living','A launch that felt inevitable.','Consumer','A sustainable home brand needed to enter a crowded market without discounting its values.','We positioned the launch around “better rituals,” pairing tactile product storytelling with a creator network and a carefully sequenced waitlist.','Film, editorial commerce, creator partnerships, lifecycle email, and a measurement model that followed the full path from curiosity to purchase.','The waitlist reached 42,000 people, launch revenue exceeded forecast by 38%, and creator content drove 29% of first-party purchases.','AUREVIA understood that the product was only half the story—the ritual was the brand.',0,'published','2026-03-15T09:00:00.000Z','${now}','${now}');

INSERT INTO case_study_metrics (id,case_study_id,label,value,sort_order) VALUES
('metric-halo-1','case-halo','Direct bookings','+64%',1),('metric-halo-2','case-halo','Branded search','2.8×',2),('metric-halo-3','case-halo','Booking value','+21%',3),
('metric-arc-1','case-arc','Qualified pipeline','+118%',1),('metric-arc-2','case-arc','Organic intent traffic','3.4×',2),('metric-arc-3','case-arc','Cycle time','−17%',3),
('metric-nova-1','case-nova','Waitlist','42k',1),('metric-nova-2','case-nova','Revenue forecast','+38%',2),('metric-nova-3','case-nova','Creator purchases','29%',3);

INSERT INTO testimonials (id,name,role,company,quote,case_study_id,featured,sort_order) VALUES
('test-halo','Mara Ellison','Chief Commercial Officer','Halo Hospitality','The Guys made our brand feel like the destination before a guest ever arrived.','case-halo',1,1),
('test-arc','Jonas Reed','VP of Growth','Arc Finance','The work gave our team a shared language and gave buyers a reason to lean in.','case-arc',1,2),
('test-nova','Leila Okafor','Founder','Nova Living','The Guys understood that the product was only half the story—the ritual was the brand.','case-nova',1,3);

INSERT INTO site_settings (key,value,value_type,updated_at) VALUES
('agency_name','The Guys','string','${now}'),('agency_tagline','Impossible to Ignore','string','${now}'),('demo_notice','Demo content is fictional and prepared for presentation only.','string','${now}');

INSERT INTO seo_metadata (id,page_key,title,description,canonical_url,og_image,twitter_card,created_at,updated_at) VALUES
('seo-home','home','The Guys — Impossible to Ignore','A premium digital marketing agency for brands ready to be remembered.','/','/images/the-guys-og.svg','summary_large_image','${now}','${now}'),
('seo-work','work','Selected Work | The Guys','Strategy, story, amplification, conversion, and growth in motion.','/work','/images/the-guys-og.svg','summary_large_image','${now}','${now}'),
('seo-insights','insights','Insights | The Guys','Ideas for building brands that earn attention and compound growth.','/insights','/images/the-guys-og.svg','summary_large_image','${now}','${now}');
`;

  writeFileSync(sqlPath, sql);
  const args = ["d1", "execute", "DB"];
  if (process.env.SEED_REMOTE === "1") args.push("--remote");
  else args.push("--local");
  args.push("--file", sqlPath);
  execFileSync("npx", ["wrangler", ...args], { stdio: "inherit" });
  console.log(`Seeded demo data for ${email}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});