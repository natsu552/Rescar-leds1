import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ptxfblnuhdcucgbvmqov.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eGZibG51aGRjdWNnYnZtcW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzQ1OTgsImV4cCI6MjA4OTcxMDU5OH0.ureHixxgPv-BZvAM7FS4u_8Se9Kp6V5bxIqQyXy-8zc"

export const supabase = createClient(supabaseUrl, supabaseKey)