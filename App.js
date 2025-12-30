import { useEffect, useState } from 'react';



import AuthScreen from './src/AuthScreen';
import NotesScreen from './src/NotesScreen';
import { supabase } from './src/supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session ? <NotesScreen /> : <AuthScreen />;
}
