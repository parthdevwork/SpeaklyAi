import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://hsctwsccptqkzkqjltla.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY3R3c2NjcHRxa3prcWpsdGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4MDUxNDYsImV4cCI6MjAyNDM4MTE0Nn0.PmZ2fLwJHnzn2hLyECiYFb2P3GjvjJ2naUHHsy3Ch6g';
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  logOptions: {
    level: 'DEBUG', // Enable detailed logging
  },
});

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
