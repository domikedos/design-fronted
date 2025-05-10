export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  address: string;
  created_at: string;
  solved: number;
  place?: {
    place_lower_bound: number;
    place_upper_bound: number;
  };
}

export interface Task {
  id: number;
  title: string;
  difficulty: string;
}

export interface Submission {
  id: number;
  code: string;
  created_at: string;
  gas_used: number;
  is_done: boolean;
  lang: string;
  passed_tests: number;
  task_id: number;
  total_tests: number;
  user_id: number;
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  created_at: string;
  likes: number;
  is_liked: boolean;
  submission: Submission;
}

export interface TonProofResponse {
  payload: string;
}

export interface TonTokenResponse {
  payload: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
} 