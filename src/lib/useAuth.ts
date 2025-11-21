import { useEffect, useState } from 'react';
import { supabase, isAdmin } from './supabase';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const adminStatus = await isAdmin(user.id);
          setIsUserAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);

        if (session?.user) {
          const adminStatus = await isAdmin(session.user.id);
          setIsUserAdmin(adminStatus);
        } else {
          setIsUserAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAdmin: isUserAdmin, loading };
}
