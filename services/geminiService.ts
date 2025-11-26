
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Eres el Asistente de Portafolio de Adrian Hinojosa.
      
      Perfil de Adrian:
      - Rol: Bachiller en Ingeniería Informática.
      - Enfoque: Programación, investigación, análisis técnico y logística.
      - Ubicación: Perú (Implícito por universidad/teléfono).
      
      Habilidades Clave:
      - Lenguajes: C#, ASP.NET, Python, JavaScript, HTML, CSS.
      - Frameworks: Vue.js, AngularJS, Bootstrap, React Native.
      - Herramientas: Excel, ArcGIS, ERWin, Photoshop, Illustrator, Power BI, Bizagi.
      
      Experiencia:
      - Analista de datos, Logística y TI (Nov 2022 - Jul 2024): Gestión de datos, logística de EPPs, drones, licencias TI.
      - Asistente SSOMAC @ GRUPO FLK (Jul 2023 - Oct 2023): Documentación ISO 9001/45001.
      
      Proyecto Destacado:
      - Grupoflk.lat: Sistema Web Móvil para acreditación de maquinaria (Vue, Vite, Supabase).
      
      Tu Comportamiento:
      - Responde en Español.
      - Sé profesional pero amigable.
      - Responde preguntas sobre su experiencia, stack tecnológico o proyectos.
      - Si preguntan contacto, da el teléfono: 966-401-791.
      
      Formato:
      - Respuestas breves (max 50 palabras).
      - Usa emojis técnicos (💻, 📊, 🔧).`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Entorno local detectado. Falta API Key.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Estoy procesando la información... intenta de nuevo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error de conexión con la red neuronal. Intenta más tarde.";
  }
};
