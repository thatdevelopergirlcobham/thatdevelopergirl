-- ============================================================
-- Portfolio schema — safe to re-run at any time.
-- Tables are created only if they don't exist.
-- Columns are added only if they don't exist.
-- Policies are dropped then recreated (no data is touched).
-- ============================================================

-- ── Contacts ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name  TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  is_read    BOOLEAN     DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Testimonials ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  title       TEXT,
  quote       TEXT        NOT NULL,
  rating      INTEGER     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Projects ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  description   TEXT        NOT NULL,
  image_url     TEXT,
  tech_stack    TEXT[]      DEFAULT '{}',
  live_url      TEXT,
  github_url    TEXT,
  is_featured   BOOLEAN     DEFAULT FALSE,
  is_draft      BOOLEAN     DEFAULT FALSE,
  display_order INTEGER     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Guard: add any column that may be missing from an older version
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_draft      BOOLEAN     DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured   BOOLEAN     DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER     DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url    TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url      TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack    TEXT[]      DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url     TEXT;

ALTER TABLE contacts ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;


-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;


-- ── contacts policies ────────────────────────────────────────
DROP POLICY IF EXISTS "Public can insert contacts"  ON contacts;
DROP POLICY IF EXISTS "Admin can read contacts"     ON contacts;
DROP POLICY IF EXISTS "Admin can update contacts"   ON contacts;
DROP POLICY IF EXISTS "Admin can delete contacts"   ON contacts;

CREATE POLICY "Public can insert contacts"  ON contacts FOR INSERT TO anon          WITH CHECK (true);
CREATE POLICY "Admin can read contacts"     ON contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update contacts"   ON contacts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete contacts"   ON contacts FOR DELETE TO authenticated USING (true);


-- ── testimonials policies ────────────────────────────────────
DROP POLICY IF EXISTS "Public can insert testimonials"       ON testimonials;
DROP POLICY IF EXISTS "Public can read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access testimonials"       ON testimonials;

CREATE POLICY "Public can insert testimonials"        ON testimonials FOR INSERT TO anon          WITH CHECK (true);
CREATE POLICY "Public can read approved testimonials" ON testimonials FOR SELECT TO anon          USING (is_approved = true);
CREATE POLICY "Admin full access testimonials"        ON testimonials FOR ALL    TO authenticated USING (true);


-- ── projects policies ────────────────────────────────────────
DROP POLICY IF EXISTS "Public can read projects"  ON projects;
DROP POLICY IF EXISTS "Admin full access projects" ON projects;

CREATE POLICY "Public can read projects"   ON projects FOR SELECT TO anon          USING (true);
CREATE POLICY "Admin full access projects" ON projects FOR ALL    TO authenticated USING (true);
