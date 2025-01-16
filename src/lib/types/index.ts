import { z } from "zod";

/* eslint-disable no-use-before-define */
interface Pagination {
  page: number;
  size: number;
  pages: number;
  count: number;
  pageLimitReached: boolean;
}

export type GETRes<T> = [T, number];
export type GETManyRes<T> = [T[], number];

export interface Car {
  id: number;
  vin: string;
  year: number;
  price: number;
  mileage: number;
  registrationNumber: string;
  insurancePolicyNumber: string;
  insuranceExpiration: Date;
  registrationExpiration: Date;
  lastMaintenanceDate: Date;
}

export interface Quiz {
  id: string;
  name: string;
  questions: QuizQuestion[];
}

export interface QuizCategory {
  id: string;
  name: string;
}

export interface QuizAnswer {
  id: string;
  answer: string;
  quizQuestionId: string;
  correctAnswer: boolean;
  order?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  category: QuizCategory;
}

export type QuizQuestionGETManyRes = GETManyRes<QuizQuestion>;

export type QuizCategoryGETManyRes = GETManyRes<QuizCategory>;

export type QuizGETManyRes = GETManyRes<Quiz>;

export type QuizGETRes = GETRes<Quiz>;

export const namedObjectSchema = z.object({
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
});
