import { z } from "zod";

/* eslint-disable no-use-before-define */
interface Pagination {
  page: number;
  size: number;
  pages: number;
  count: number;
  pageLimitReached: boolean;
}

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
  quizAnswers: QuizAnswer[];
  category: QuizCategory;
}

export interface QuizQuestionGETManyRes extends GETManyRes<QuizQuestion> { }

export interface QuizCategoryGETManyRes extends GETManyRes<QuizCategory> { }

export interface QuizGETManyRes extends GETManyRes<Quiz> { }

export const namedObjectSchema = z.object({
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
});
