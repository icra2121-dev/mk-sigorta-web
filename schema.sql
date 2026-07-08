-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  user_type VARCHAR(50) DEFAULT 'customer', -- customer, agent, admin
  company_name VARCHAR(255),
  tax_id VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Products table
CREATE TABLE insurance_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- sağlık, araç, ev, iş, seyahat, hayat
  base_price DECIMAL(10, 2),
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES insurance_products(id),
  quote_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
  coverage_amount DECIMAL(12, 2),
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(12, 2),
  details JSONB DEFAULT '{}'::jsonb,
  valid_until DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Policies table
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES insurance_products(id),
  quote_id UUID REFERENCES quotes(id),
  policy_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- active, expired, cancelled, suspended
  coverage_amount DECIMAL(12, 2),
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(12, 2),
  start_date DATE,
  end_date DATE,
  payment_method VARCHAR(50), -- credit_card, bank_transfer, auto_payment
  auto_renew BOOLEAN DEFAULT TRUE,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Claims table
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id),
  claim_number VARCHAR(50) UNIQUE NOT NULL,
  claim_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, paid
  description TEXT,
  amount_claimed DECIMAL(12, 2),
  amount_approved DECIMAL(12, 2),
  amount_paid DECIMAL(12, 2),
  payment_date DATE,
  documents JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id),
  amount DECIMAL(12, 2) NOT NULL,
  payment_method VARCHAR(50), -- credit_card, bank_transfer, check
  payment_date DATE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, cancelled
  transaction_id VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, responded, closed
  response TEXT,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id),
  claim_id UUID REFERENCES claims(id),
  document_type VARCHAR(100), -- policy_document, claim_document, payment_proof
  document_url TEXT NOT NULL,
  document_name VARCHAR(255),
  file_size INT,
  mime_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- user, policy, claim, payment
  entity_id UUID,
  changes JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_insurance_products_category ON insurance_products(category);
CREATE INDEX idx_quotes_user_id ON quotes(user_id);
CREATE INDEX idx_quotes_product_id ON quotes(product_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_policies_user_id ON policies(user_id);
CREATE INDEX idx_policies_product_id ON policies(product_id);
CREATE INDEX idx_policies_status ON policies(status);
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_policy_id ON claims(policy_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_policy_id ON payments(policy_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for quotes table
CREATE POLICY "Users can view their own quotes"
  ON quotes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create quotes"
  ON quotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes"
  ON quotes FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for policies table
CREATE POLICY "Users can view their own policies"
  ON policies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create policies"
  ON policies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for claims table
CREATE POLICY "Users can view their own claims"
  ON claims FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create claims"
  ON claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments table
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for documents table
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insurance_products_updated_at BEFORE UPDATE ON insurance_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
