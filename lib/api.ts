import { supabase } from './supabase';
import { User, Quote, Policy, Claim, Payment, ContactMessage } from '@/types';

// Auth functions
export async function signUp(email: string, password: string, userData: Partial<User>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// User functions
export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as User;
}

// Quote functions
export async function createQuote(quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quote])
    .select()
    .single();

  if (error) throw error;
  return data as Quote;
}

export async function getUserQuotes(userId: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Quote[];
}

export async function getQuoteById(quoteId: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', quoteId)
    .single();

  if (error) throw error;
  return data as Quote;
}

export async function updateQuote(quoteId: string, updates: Partial<Quote>) {
  const { data, error } = await supabase
    .from('quotes')
    .update(updates)
    .eq('id', quoteId)
    .select()
    .single();

  if (error) throw error;
  return data as Quote;
}

// Policy functions
export async function getUserPolicies(userId: string) {
  const { data, error } = await supabase
    .from('policies')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Policy[];
}

export async function getPolicyById(policyId: string) {
  const { data, error } = await supabase
    .from('policies')
    .select('*')
    .eq('id', policyId)
    .single();

  if (error) throw error;
  return data as Policy;
}

export async function createPolicy(policy: Omit<Policy, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('policies')
    .insert([policy])
    .select()
    .single();

  if (error) throw error;
  return data as Policy;
}

// Claim functions
export async function createClaim(claim: Omit<Claim, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('claims')
    .insert([claim])
    .select()
    .single();

  if (error) throw error;
  return data as Claim;
}

export async function getUserClaims(userId: string) {
  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Claim[];
}

export async function getClaimById(claimId: string) {
  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .eq('id', claimId)
    .single();

  if (error) throw error;
  return data as Claim;
}

// Payment functions
export async function createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
    .single();

  if (error) throw error;
  return data as Payment;
}

export async function getUserPayments(userId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Payment[];
}

// Contact Message functions
export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ ...message, status: 'new' }])
    .select()
    .single();

  if (error) throw error;
  return data as ContactMessage;
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ContactMessage[];
}
