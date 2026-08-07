import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Allow the app to run without Supabase credentials (for development)
let supabase = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
} else {
  console.warn(
    '⚠️ Supabase credentials missing. The app will run in demo mode.\n' +
    'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable database features.'
  )
}

export { supabase }
