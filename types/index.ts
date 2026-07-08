// User types
export type UserType = 'customer' | 'admin' | 'agent';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  company_name?: string;
  tax_id?: string;
  address?: string;
  city: string;
  postal_code?: string;
  user_type: UserType;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Insurance Product types
export type InsuranceCategory = 'sağlık' | 'araç' | 'ev' | 'iş' | 'seyahat' | 'hayat' | 'dış_ticaret';

export interface InsuranceProduct {
  id: string;
  name: string;
  description?: string;
  category: InsuranceCategory;
  base_price?: number;
  coverage_details?: Record<string, any>;
  features?: string[];
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Quote types
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface Quote {
  id: string;
  user_id: string;
  product_id?: string;
  quote_number: string;
  status: QuoteStatus;
  coverage_amount?: number;
  monthly_premium?: number;
  annual_premium?: number;
  discount_percentage?: number;
  final_price?: number;
  details?: Record<string, any>;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

// Policy types
export type PolicyStatus = 'active' | 'expired' | 'cancelled' | 'suspended';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'check';

export interface Policy {
  id: string;
  user_id: string;
  product_id?: string;
  policy_number: string;
  quote_id?: string;
  status: PolicyStatus;
  coverage_amount?: number;
  monthly_premium?: number;
  annual_premium?: number;
  start_date?: string;
  end_date?: string;
  renewal_date?: string;
  payment_method?: PaymentMethod;
  policy_document_url?: string;
  created_at: string;
  updated_at: string;
}

// Claim types
export type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface Claim {
  id: string;
  user_id: string;
  policy_id?: string;
  claim_number: string;
  claim_date?: string;
  incident_date?: string;
  description?: string;
  amount_claimed?: number;
  amount_approved?: number;
  status: ClaimStatus;
  attachment_urls?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Payment types
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Payment {
  id: string;
  user_id: string;
  policy_id?: string;
  amount: number;
  payment_date?: string;
  payment_method?: PaymentMethod;
  transaction_id?: string;
  status: PaymentStatus;
  invoice_url?: string;
  created_at: string;
  updated_at: string;
}

// Contact Message types
export type MessageStatus = 'new' | 'read' | 'replied';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: MessageStatus;
  reply?: string;
  created_at: string;
  updated_at: string;
}

// Admin Settings
export interface AdminSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  description?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

// Form types
export interface QuoteRequestForm {
  product_id: string;
  coverage_amount?: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postal_code?: string;
  company_name?: string;
  tax_id?: string;
}

export interface ClaimForm {
  policy_id: string;
  claim_date: string;
  incident_date: string;
  description: string;
  amount_claimed: number;
  attachments?: File[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
