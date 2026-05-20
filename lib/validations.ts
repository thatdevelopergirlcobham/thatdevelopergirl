import { z } from "zod";

export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long")
    .trim(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long")
    .trim(),
});

export const testimonialSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .trim(),
  title: z.string().max(150).trim().optional(),
  quote: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review is too long")
    .trim(),
  rating: z
    .number()
    .int()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
