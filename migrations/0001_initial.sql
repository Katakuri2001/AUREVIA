PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  accent TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  r2_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  cover_media_id TEXT REFERENCES media(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  title TEXT NOT NULL,
  service_category TEXT NOT NULL,
  challenge TEXT NOT NULL,
  strategy TEXT NOT NULL,
  execution TEXT NOT NULL,
  results TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  cover_media_id TEXT REFERENCES media(id) ON DELETE SET NULL,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS case_study_metrics (
  id TEXT PRIMARY KEY,
  case_study_id TEXT NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  case_study_id TEXT REFERENCES case_studies(id) ON DELETE SET NULL,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  ip_hash TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'paused', 'completed')),
  objective TEXT NOT NULL DEFAULT '',
  budget_cents INTEGER NOT NULL DEFAULT 0,
  start_date TEXT,
  end_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  value_type TEXT NOT NULL DEFAULT 'string' CHECK (value_type IN ('string', 'number', 'boolean', 'json')),
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS seo_metadata (
  id TEXT PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  og_image TEXT,
  twitter_card TEXT NOT NULL DEFAULT 'summary_large_image',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_metrics_study ON case_study_metrics(case_study_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at DESC);
