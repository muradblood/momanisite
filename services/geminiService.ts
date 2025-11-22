
import { GoogleGenAI } from "@google/genai";

// Helper to get AI client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLogo = async (prompt: string, aspectRatio: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: aspectRatio as any,
      outputMimeType: 'image/jpeg',
    },
  });

  const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
  if (!base64ImageBytes) {
    throw new Error("Failed to generate logo");
  }

  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const sendMapMessage = async (message: string, location?: { lat: number; lng: number }) => {
  const ai = getAiClient();
  
  const config: any = {
    tools: [{ googleMaps: {} }],
    thinkingConfig: { thinkingBudget: 32768 }, // Enable thinking mode with max budget
  };

  if (location) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.lat,
          longitude: location.lng
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview", // Use the pro model for complex reasoning
    contents: message,
    config: config,
  });

  return {
    text: response.text || "",
    groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks,
  };
};
