import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getWorkerProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching worker profile:', error);
    return null;
  }
}

export async function getCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function getCities(countryId: string) {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('country_id', countryId)
      .eq('is_active', true)
      .order('name_en');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}
