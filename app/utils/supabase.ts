import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://oeufvbafcncoumnudrbr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldWZ2YmFmY25jb3VtbnVkcmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjY0NjAsImV4cCI6MjA0MDk0MjQ2MH0.2il4JUjnfFL9WQmrCF8UCPZR1rSo2t-_7vAn6qUPEZk';

const supabase = createClient(supabaseUrl,supabaseKey)
export default supabase;
