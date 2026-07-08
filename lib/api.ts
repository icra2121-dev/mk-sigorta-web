import { supabase } from './supabase';

// Auth Functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(
  email: string,
  password: string,
  userData?: Record<string, any>
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email: data.user.email,
          ...userData,
        },
      ]);

    if (profileError) throw profileError;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) throw error;
}

// User Functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Record<string, any>
) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Insurance Products Functions
export async function getInsuranceProducts(category?: string) {
  let query = supabase.from('insurance_products').select('*');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.eq('is_active', true);

  if (error) throw error;
  return data;
}

export async function getInsuranceProduct(id: string) {
  const { data, error } = await supabase
    .from('insurance_products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Quote Functions
export async function createQuote(
  userId: string,
  productId: string,
  quoteData: Record<string, any>
) {
  const quoteNumber = `QT-${Date.now()}`;
  const { data, error } = await supabase
    .from('quotes')
    .insert([
      {
        user_id: userId,
        product_id: productId,
        quote_number: quoteNumber,
        ...quoteData,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserQuotes(userId: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, insurance_products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getQuote(id: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, insurance_products(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateQuoteStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Policy Functions
export async function createPolicy(
  userId: string,
  quoteId: string,
  policyData: Record<string, any>
) {
  const policyNumber = `PO-${Date.now()}`;
  const { data, error } = await supabase
    .from('policies')
    .insert([
      {
        user_id: userId,
        quote_id: quoteId,
        policy_number: policyNumber,
        ...policyData,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPolicies(userId: string) {
  const { data, error } = await supabase
    .from('policies')
    .select('*, insurance_products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPolicy(id: string) {
  const { data, error } = await supabase
    .from('policies')
    .select('*, insurance_products(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updatePolicy(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('policies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Claim Functions
export async function createClaim(
  userId: string,
  policyId: string,
  claimData: Record<string, any>
) {
  const claimNumber = `CL-${Date.now()}`;
  const { data, error } = await supabase
    .from('claims')
    .insert([
      {
        user_id: userId,
        policy_id: policyId,
        claim_number: claimNumber,
        ...claimData,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserClaims(userId: string) {
  const { data, error } = await supabase
    .from('claims')
    .select('*, policies(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getClaim(id: string) {
  const { data, error } = await supabase
    .from('claims')
    .select('*, policies(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Payment Functions
export async function createPayment(
  userId: string,
  policyId: string,
  paymentData: Record<string, any>
) {
  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        user_id: userId,
        policy_id: policyId,
        ...paymentData,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPayments(userId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*, policies(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Contact Functions
export async function submitContactMessage(messageData: Record<string, any>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Document Functions
export async function uploadDocument(
  userId: string,
  file: File,
  documentType: string,
  policyId?: string,
  claimId?: string
) {
  const fileName = `${userId}/${documentType}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  const { data, error: dbError } = await supabase
    .from('documents')
    .insert([
      {
        user_id: userId,
        policy_id: policyId,
        claim_id: claimId,
        document_type: documentType,
        document_url: urlData.publicUrl,
        document_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      },
    ])
    .select()
    .single();

  if (dbError) throw dbError;
  return data;
}

export async function getUserDocuments(userId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
