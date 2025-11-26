
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// ⚠️ IMPORTANTE: PEGA TU API KEY AQUI ABAJO DENTRO DE LAS COMILLAS
const API_KEY = "PEGAR_TU_API_KEY_AQUI"; 

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // En producción real, esto debería venir de process.env, pero para este caso está hardcoded.
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
      - Asistente SSOMAC @ GRUPO FLK (Jul 2023 - Oct 2023): Documentación y gestión certificaciones ISO 9001/45001. (No desarrollo de software en este rol).
      
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
  if (!API_KEY || API_KEY === "PEGAR_TU_API_KEY_AQUI") {
    return "⚠️ Configuración incompleta: Por favor edita el archivo 'services/geminiService.ts' y coloca tu API Key de Google.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Estoy procesando la información... intenta de nuevo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error de conexión con la IA. Verifique su API Key o intente más tarde.";
  }
};