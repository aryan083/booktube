import { supabase } from "@/lib/supabase";

export interface UserCheckResult {
  exists: boolean;
  userId: string | null;
  message: string;
  error?: string;
}

export const checkAndSyncUser = async (): Promise<UserCheckResult> => {
  try {
    // Get current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return {
        exists: false,
        userId: null,
        message: 'No authenticated user found'
      };
    }

    const userId = session.user.id;

    // Check if user exists in users table
    const { error: checkError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        // Create user in users table with empty courses array
        const { error: createError } = await supabase
          .from('users')
          .insert([{ 
            user_id: userId,
            courses_json: []
          }])
          .single();

        if (createError) {
          return {
            exists: false,
            userId,
            message: 'Failed to create user in users table',
            error: createError.message
          };
        }

        return {
          exists: true,
          userId,
          message: 'Successfully created user in users table'
        };
      }

      return {
        exists: false,
        userId,
        message: 'Error checking users table',
        error: checkError.message
      };
    }

    return {
      exists: true,
      userId,
      message: 'User already exists in users table'
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      exists: false,
      userId: null,
      message: 'Error syncing user',
      error: errorMessage
    };
  }
};
"use client";

import { useEffect } from "react"; 
import {supabase} from "@/lib/supabase";

useEffect(() => {
    const syncUserToDatabase = async () => {
      try {
        // Get current auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log('No authenticated user found');
          return;
        }

        const userId = session.user.id;
        console.log('Checking user ID in database:', userId);

        // Check if user exists in users table
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (checkError) {
          if (checkError.code === 'PGRST116') {
            console.log('User not found in users table, creating new entry...');
            
            // Create user in users table
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert([{ user_id: userId }])
              .select()
              .single();

            if (createError) {
              console.error('Failed to create user in users table:', createError.message);
            } else {
              console.log('✅ Successfully created user in users table:', newUser);
            }
          } else {
            console.error('Error checking users table:', checkError.message);
          }
        } else {
          console.log('✅ User already exists in users table:', existingUser);
        }
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUserToDatabase();
  }, []);
