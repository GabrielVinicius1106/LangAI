import { input, select } from "@inquirer/prompts"
 
const API_URL = "http://localhost:11434/api/generate"
const MODEL_NAME = "gemma4:latest" // Model

/**
 * Defines the structure for the data sent to the Ollama API.
 */
interface OllamaRequest {
    model: string;
    prompt: string;
    system: string;
    stream: boolean;
}

/**
 * Defines the expected structure of the API Response.
 */
interface ApiResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

/**
 * Sends a request to a local Ollama endpoint to translate text based on system instructions.
 * @param textToTranslate The text content the user wants translated.
 * @param systemInstruction The context/rules for the model (e.g., "Translate only to Portuguese.").
 * @returns A promise that resolves with the model's response text.
 */
async function translateWithOllama(textToTranslate: string, systemInstruction: string): Promise<string> {

    const payload: OllamaRequest = {
        model: MODEL_NAME,
        prompt: textToTranslate,
        system: systemInstruction, // Passing SYSTEM CONTEXT
        stream: false
    };

    try {
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP Error! Status: ${response.status}. Details: ${errorBody}`);
        }

        const data: ApiResponse = await response.json();

        // The actual response text is often in the 'response' field of the returned JSON
        if (data.response) {
            return data.response.trim();
        } else {
            throw new Error("API response did not contain the expected 'response' field.");
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error("\n ❌ Failed to connect or process the API call:", error.message);
            throw error;
        }
        throw new Error("An unknown error occurred during the API call.");
    }
}


async function main() {

    let userInput = ''

    while(true){
            
        console.clear();

        // 1. Define the PHRASE TO TRANSLATE
        userInput = await input({ message: "Insert a Phrase (0 to EXIT) >> " }) ;

        if(userInput === '0'){
            console.log("\n Finishing App... \n");
            break;
        }

        // 2. Define de Language to TRANSLATE TO
        const language = await select({ message: "\nInsert the Language to Translate >> \n", choices: [ "Portuguese", "Italian", "German", "Espanhol", "French" ] })
        
        // 2. Define the rules/context for the model (Crucial for good output)
        const SYSTEM_CONTEXT = `You are a professional TRANSLATOR. Your sole output must be the ${language} translated text, with absolutely no introductory phrases, explanations, or markdown formatting.`;
    
        try {
            // Run the translation function
            const translation = await translateWithOllama(userInput, SYSTEM_CONTEXT);
    
            console.log("\n===================================================");
            console.log(`\n🌐 ORIGINAL TEXT: ${userInput}`);
            console.log(`\n🌍 TRANSLATION ${language}: ${translation}`);
            console.log("\n===================================================");

            console.log("\n");

            const A = await input({ message: "Press ENTER to CONTINUE. " });
    
        } catch (error) {
            console.error("\nProgram execution halted due to error.");
            break;
        }
    }

}

main();