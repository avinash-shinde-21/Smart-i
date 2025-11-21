/*
  # Create Site Settings Table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `key` (text) - Settings key (banner_title, banner_subtitle, etc.)
      - `value` (text) - Settings value
      - `type` (text) - Data type (string, number, boolean, json)
      - `updated_at` (timestamptz) - Last update timestamp
      - `updated_by` (uuid) - User who updated this setting

  2. Security
    - Enable RLS on `site_settings` table
    - Anyone can view settings (for frontend)
    - Only authenticated admins can modify settings

  3. Important Notes
    - Stores banner text, colors, homepage content, etc.
    - Used by frontend to display dynamic content
    - Includes audit trail via updated_by field
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'string',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  CONSTRAINT valid_type CHECK (type IN ('string', 'number', 'boolean', 'json'))
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can update settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admins can insert settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS site_settings_key_idx ON site_settings(key);
CREATE INDEX IF NOT EXISTS site_settings_updated_at_idx ON site_settings(updated_at DESC);

INSERT INTO site_settings (key, value, type) VALUES
  ('banner_title', 'Protected by the Evil Eye.', 'string'),
  ('banner_subtitle', 'Powered by Innovation.', 'string'),
  ('banner_description', 'Every smart i product is designed with our signature evil-eye technology for enhanced audio protection and superior sound clarity.', 'string'),
  ('banner_button_text', 'Shop Limited Edition', 'string'),
  ('site_tagline', 'Hear Smart. Live Smart.', 'string')
ON CONFLICT DO NOTHING;
