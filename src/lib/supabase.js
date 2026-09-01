import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid Supabase credentials exist
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

// Initialize Supabase Client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback storage helper for testing before Supabase env setup
const LOCAL_STORAGE_KEY = 'kkcc_local_enquiries';

const getLocalEnquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // Seed some initial mock data for demo / testing
      const seedData = [
        {
          id: 'demo-1',
          name: 'Pooja Sharma',
          phone: '+91 98111 22334',
          course: 'JEE Preparation',
          message: 'Interested in weekend test series and drop year guidance.',
          is_read: false,
          created_at: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'demo-2',
          name: 'Vikas Gupta',
          phone: '+91 98777 44556',
          course: 'NEET Preparation',
          message: 'Want to know batch timings and study material provided for Class 12.',
          is_read: true,
          created_at: new Date(Date.now() - 3600000 * 24).toISOString()
        },
        {
          id: 'demo-3',
          name: 'Kavita Chawla',
          phone: '+91 98999 77889',
          course: 'Foundation',
          message: 'Looking for Class 10 board preparation batch starting this month.',
          is_read: false,
          created_at: new Date(Date.now() - 3600000 * 48).toISOString()
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local enquiries:', err);
    return [];
  }
};

const saveLocalEnquiries = (enquiries) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Error saving local enquiries:', err);
  }
};

// Database API abstraction
export const submitEnquiry = async ({ name, phone, course, message }) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{ name, phone, course, message, is_read: false }])
      .select();
    
    if (error) throw error;
    return { data, isLocal: false };
  } else {
    // Local fallback
    const enquiries = getLocalEnquiries();
    const newEntry = {
      id: 'local-' + Date.now(),
      name,
      phone,
      course,
      message,
      is_read: false,
      created_at: new Date().toISOString()
    };
    enquiries.unshift(newEntry);
    saveLocalEnquiries(enquiries);
    // Simulate minor network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { data: [newEntry], isLocal: true };
  }
};

export const fetchEnquiries = async () => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data: data || [], isLocal: false };
  } else {
    const data = getLocalEnquiries();
    return { data, isLocal: true };
  }
};

export const markEnquiryAsRead = async (id, isRead = true) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ is_read: isRead })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { data, isLocal: false };
  } else {
    const enquiries = getLocalEnquiries();
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, is_read: isRead } : item
    );
    saveLocalEnquiries(updated);
    return { data: updated.filter((item) => item.id === id), isLocal: true };
  }
};
