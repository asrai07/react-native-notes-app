import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  'https://mbksnphunvjiscuiaqbw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia3NucGh1bnZqaXNjdWlhcWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwODQzMjUsImV4cCI6MjA4MjY2MDMyNX0.uXi702FL78ZLvxc0OHltHB4QP_2Rfe44U_SPEwv3F64',
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
