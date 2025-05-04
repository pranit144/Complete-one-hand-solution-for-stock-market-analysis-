import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyDWa3ugC3Uj5Mdj7kVo1ynkWMQ52e_sCaw");

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIResponse = async (message, chatHistory) => {
  try {
    // Format the chat history for context
    const formattedHistory = chatHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add the current message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message.content }],
    });

    // Add system prompt for professional formatting
    const systemPrompt = {
      role: "user",
      parts: [
        {
          text: `You are a professional financial advisor. Please provide responses in a clear, professional format without using markdown or special characters. Structure your responses with:
1. Clear paragraphs
2. Proper spacing
3. Professional language
4. No markdown formatting (no **, *, etc.)
5. No emojis or informal language
6. Use bullet points with proper indentation when listing items
7. Maintain a formal and informative tone
8. Focus on providing accurate, well-reasoned financial advice

Current question: ${message.content}`,
        },
      ],
    };

    // Generate content with context
    const result = await model.generateContent({
      contents: [systemPrompt, ...formattedHistory],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const response = await result.response;
    const text = response.text();

    return {
      id: crypto.randomUUID(),
      role: "bot",
      content: text,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response from AI");
  }
};
