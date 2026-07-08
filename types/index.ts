// User Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  user_type: 'customer' | 'agent' | 'admin';
  company_name?: string;
  tax_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Insurance Product Types
export interface InsuranceProduct {
  id: string;
  name: string;
  description?: string;
  category: 'sağlık' | 'araç' | 'ev' | 'iş' | 'seyahat' | 'hayat';
  base_price?: number;
  features: string[];
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Quote Types
export interface Quote {
  id: string;
  user_id: string;
  product_id: string;
  quote_number: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  coverage_amount?: number;
  monthly_premium?: number;
  annual_premium?: number;
  details: Record<string, any>;
  valid_until?: string;
  created_at: string;
  updated_at: string;
  insurance_products?: InsuranceProduct;
}

// Policy Types
export interface Policy {
  id: string;
  user_id: string;
  product_id: string;
  quote_id?: string;
  policy_number: string;
  status: 'active' | 'expired' | 'cancelled' | 'suspended';
  coverage_amount?: number;
  monthly_premium?: number;
  annual_premium?: number;
  start_date?: string;
  end_date?: string;
  payment_method?: 'credit_card' | 'bank_transfer' | 'auto_payment';
  auto_renew: boolean;
  details: Record<string, any>;
  created_at: string;
  updated_at: string;
  insurance_products?: InsuranceProduct;
}

// Claim Types
export interface Claim {
  id: string;
  user_id: string;
  policy_id: string;
  claim_number: string;
  claim_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  description?: string;
  amount_claimed?: number;
  amount_approved?: number;
  amount_paid?: number;
  payment_date?: string;
  documents: Record<string, any>[];
  notes?: string;
  created_at: string;
  updated_at: string;
  policies?: Policy;
}

// Payment Types
export interface Payment {
  id: string;
  user_id: string;
  policy_id: string;
  amount: number;
  payment_method?: 'credit_card' | 'bank_transfer' | 'check';
  payment_date?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  policies?: Policy;
}

// Contact Message Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

// Document Types
export interface Document {
  id: string;
  user_id: string;
  policy_id?: string;
  claim_id?: string;
  document_type: 'policy_document' | 'claim_document' | 'payment_proof';
  document_url: string;
  document_name?: string;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type?: 'user' | 'policy' | 'claim' | 'payment';
  entity_id?: string;
  changes: Record<string, any>;
  created_at: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

export interface QuoteFormData {
  product_id: string;
  coverage_amount: number;
  details: Record<string, any>;
}

export interface ClaimFormData {
  policy_id: string;
  claim_date: string;
  description: string;
  amount_claimed: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
