export interface Caregiver {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  profile_image: string;
  years_experience: number;
  background_check_verified: boolean;
  languages: string[];
  created_at: string;
  average_rating?: number;
  review_count?: number;
  hourly_rate?: number;
  holiday_rate?: number;
}

export interface ReviewCategory {
  id: string;
  name: string;
  description: string;
  average_rating?: number;
}

export interface Review {
  id: string;
  caregiver_id: string;
  client_id: string;
  positive_feedback: string;
  created_at: string;
  ratings: Array<{
    category_id: string;
    rating: number;
  }>;
}