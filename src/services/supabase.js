import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://exnkuvtgwmwarjfvwyxb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bmt1dnRnd213YXJqZnZ3eXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDkzMTIsImV4cCI6MjA3NzgyNTMxMn0.SgEG1P3tlGtRoefNdab4EZFUG5TVgfaZ3_7yMfY4LwI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;