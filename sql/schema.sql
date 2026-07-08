-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  company_name TEXT,
  tax_id TEXT,
  address TEXT,
  city TEXT DEFAULT 'Antalya',
  postal_code TEXT,
  user_type TEXT DEFAULT 'customer', -- 'customer', 'admin', 'agent'
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance Products table
CREATE TABLE IF NOT EXISTS insurance_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'sağlık', 'araç', 'ev', 'iş', 'seyahat', vb.
  base_price DECIMAL(10, 2),
  coverage_details JSONB,
  features JSONB,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes (Teklifler)
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES insurance_products(id),
  quote_number TEXT UNIQUE,
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'rejected', 'expired'
  coverage_amount DECIMAL(12, 2),
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2),
  final_price DECIMAL(10, 2),
  details JSONB,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policies (Poliçeler)
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES insurance_products(id),
  policy_number TEXT UNIQUE,
  quote_id UUID REFERENCES quotes(id),
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled', 'suspended'
  coverage_amount DECIMAL(12, 2),
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  renewal_date DATE,
  payment_method TEXT, -- 'credit_card', 'bank_transfer', 'check'
  policy_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Claims (Tazminat Talepleri)
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id),
  claim_number TEXT UNIQUE,
  claim_date DATE,
  incident_date DATE,
  description TEXT,
  amount_claimed DECIMAL(12, 2),
  amount_approved DECIMAL(12, 2),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'paid'
  attachment_urls JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments (Ödemeler)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id),
  amount DECIMAL(10, 2),
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  invoice_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages (İletişim Formu Mesajları)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied'
  reply TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_quotes_user_id ON quotes(user_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_policies_user_id ON policies(user_id);
CREATE INDEX idx_policies_status ON policies(status);
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_policy_id ON claims(policy_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_policy_id ON payments(policy_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for quotes
CREATE POLICY "Users can view their own quotes" ON quotes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create quotes" ON quotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for policies
CREATE POLICY "Users can view their own policies" ON policies
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for claims
CREATE POLICY "Users can view their own claims" ON claims
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create claims" ON claims
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);
