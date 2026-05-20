export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          subject?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          title: string | null;
          quote: string;
          rating: number;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          title?: string | null;
          quote: string;
          rating: number;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string | null;
          quote?: string;
          rating?: number;
          is_approved?: boolean;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string | null;
          tech_stack: string[];
          live_url: string | null;
          github_url: string | null;
          is_featured: boolean;
          is_draft: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          github_url?: string | null;
          is_featured?: boolean;
          is_draft?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          github_url?: string | null;
          is_featured?: boolean;
          is_draft?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
    };
  };
}

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
