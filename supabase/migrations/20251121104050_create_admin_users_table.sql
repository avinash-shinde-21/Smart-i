/*
  # Create Admin Users Table

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key) - References auth.users
      - `email` (text) - Admin email
      - `role` (text) - Admin role (super_admin, admin)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy so only authenticated admins can view/modify
    - Only auth.users with admin role can access

  3. Important Notes
    - This table links to the auth.users table for authentication
    - Admins use Supabase Auth for email/password login
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update their profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);
