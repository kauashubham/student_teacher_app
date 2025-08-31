
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const summarizeContent = async (text: string, imageBase64?: string, mimeType?: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Summarize the key points from the following content in 3-5 clear and concise bullet points. Content: ${text}`;
        
        if (imageBase64 && mimeType) {
             const imagePart = {
                inlineData: {
                    mimeType: mimeType,
                    data: imageBase64,
                },
            };
            const textPart = { text: "Summarize the key points from this image in 3-5 clear and concise bullet points." };
            const response = await ai.models.generateContent({
                model,
                contents: { parts: [textPart, imagePart] },
            });
            return response.text;
        } else {
             const response = await ai.models.generateContent({
                model,
                contents: prompt,
             });
             return response.text;
        }
    } catch (error) {
        console.error("Error summarizing content:", error);
        return "Sorry, I couldn't generate a summary at this time.";
    }
};


export const generateQuizQuestion = async (context: string): Promise<QuizQuestion | null> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Based on the following text, create one multiple-choice question with four options. Indicate the correct answer. Text: ${context}`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        correctAnswer: { type: Type.STRING }
                    },
                    required: ["question", "options", "correctAnswer"]
                }
            }
        });

        const jsonText = response.text;
        return JSON.parse(jsonText) as QuizQuestion;
    } catch (error) {
        console.error("Error generating quiz question:", error);
        return null;
    }
};
