export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
  level
) => `
      You are an AI trained to generate technical interview questions and answers.
      
      Task:
      - Role: ${role}
      - Candidate Experience: ${experience} years
      - Difficulty Level: ${level}
      - Focus Topics: ${topicsToFocus}
      - Write ${numberOfQuestions} interview questions based on the specified level.
      - Use the following guidelines based on level:
        - Beginner: Simple, foundational questions with clear and easy-to-understand answers. Avoid jargon. Include code examples if helpful.
        - Intermediate: Moderately challenging questions that test practical understanding and application. Answers can assume some prior knowledge.
        - Advanced: Complex and in-depth questions testing system-level understanding, best practices, performance, and edge cases. Provide precise, technical answers and examples if needed.
      - For each question, generate a detailed and level-appropriate answer.
      - If the answer needs a code example, include a small code block inside.
      - Keep formatting clean and consistent.
      - Return a valid **pure JSON array** like:
      [
        {
          "question": "Question here?",
          "answer": "Answer here."
        },
        ...
      ]
      
      Important: Do NOT add any extra text. Only return valid JSON.
      `;

export const conceptExplainPrompt = (question) => `
                You are an AI trained to generate explanations for a given interview question.
                
                Task:
                - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
                - Question: "${question}"
                - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
                - If the explanation includes a code example, provide a small code block.
                - Keep the formatting very clean and clear.
                - Return the result as a valid JSON object in the following format:
                {
                  "title": "Short title here?",
                  "explanation": "Explanation here."
                }
                
                Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
                `;
