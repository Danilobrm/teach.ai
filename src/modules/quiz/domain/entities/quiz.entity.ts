export class Quiz {
  question: string; // Text of the quiz question
  correctAnswerIndex: number; // The correct answer for the quiz
  options: string[]; // Array of answer options for the quiz
  contentId: string; // Foreign key referencing the generated content
}

// export class Answer {
//   question: string; // Text of the quiz question
//   correctAnswer: number; // The correct answer for the quiz
//   options: string[]; // Array of answer options for the quiz
//   generatedContentId: string; // Foreign key referencing the generated content
// }
