export interface Inquiry {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'pending' | 'answered' | 'closed';
  admin_reply?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateInquiryData {
  subject: string;
  message: string;
}

export interface InquiryWithProfile extends Inquiry {
  profile: {
    name: string;
    email: string;
  };
}