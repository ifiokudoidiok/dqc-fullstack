export interface Survey {
  survey_title: string;
  created_at: string;
  questions: Question[];
}

export interface Question {
  question_text: string;
  type: string; 
  responses: string[]; 
}