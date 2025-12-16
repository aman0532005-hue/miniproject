import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a compassionate, empathetic, and supportive mental health assistant named "MindfulBot". 
Your goal is to provide a safe space for users to share their feelings.
- Listen actively and validate the user's emotions.
- Offer gentle, non-judgmental advice and coping strategies (breathing exercises, mindfulness, reframing thoughts).
- Use a warm, soothing, and conversational tone.
- Do NOT provide medical diagnoses or prescriptions. If a user seems to be in immediate danger or a severe crisis, gently encourage them to seek professional help or contact emergency services immediately.
- Keep responses concise but meaningful, avoiding overly long lectures unless asked.`;

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;

  initialize() {
    if (this.ai) return;
    
    // API Key is assumed to be available in process.env.API_KEY
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      return;
    }

    this.ai = new GoogleGenAI({ apiKey });
    
    // Initialize chat with system instruction
    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative but stable
      },
    });
  }

  async sendMessageStream(message: string): Promise<AsyncIterable<string>> {
    if (!this.chat) {
      this.initialize();
    }
    
    if (!this.chat) {
        throw new Error("Failed to initialize chat service.");
    }

    try {
      const result = await this.chat.sendMessageStream({ message });
      
      // Return an async generator that yields text chunks
      return {
        async *[Symbol.asyncIterator]() {
          for await (const chunk of result) {
             const responseChunk = chunk as GenerateContentResponse;
             if (responseChunk.text) {
               yield responseChunk.text;
             }
          }
        }
      };
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();