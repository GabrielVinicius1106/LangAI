# 🌐 LangAI Translator

A CLI application designed to translate text using a locally running Large Language Model (LLM) via Ollama.

## ✨ Features

*   **Local Translation:** Leverages models running on your local machine via Ollama, ensuring privacy and offline capability.
*   **Interactive CLI:** Provides a simple, user-friendly interface for translating text.
*   **Configurable Model:** Easily switch the underlying LLM model used for translation.

## 🚀 Getting Started

Follow these steps to get the application running on your machine.

### Prerequisites

Before running the application, you must have the following installed:

1.  **Node.js & npm:** (Recommended for running the application)
    ```bash
    # Check if Nodejs is installed
    node -v
    # If not installed, download from nodejs.org
    ```
2.  **Ollama:** The local LLM runner.
    *   Download and install Ollama from the official website: [ollama.com](https://ollama.com/)
3.  **A Language Model:** You must pull a suitable model (e.g., `llama2`, `mistral`, `gemma4`) into Ollama.
    ```bash
    # Example: Pulling the Mistral model
    ollama pull mistral
    ```

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd lingai-translator
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## ⚙️ Usage

### 1. Running the Translator

Execute the main script to start the translation interface:

```bash
npm run start
# or if you are using a different script name:
# node main.js
```

### 2. How It Works

The application will prompt you for input. It sends the text and the translation instructions to the Ollama API endpoint (`http://localhost:11434/api/generate`) using the specified model.

**Example Interaction:**

```
> Enter text to translate (or type 'exit' to quit):
Hello, how are you doing today?
> Target Language (e.g., French, Spanish):
French
> Translation:
Bonjour, comment allez-vous aujourd'hui ?

> Enter text to translate (or type 'exit' to quit):
exit
```

### 3. Configuration (Optional)

If you need to change the default model or API settings, modify the configuration file (e.g., `config.js` or environment variables).

*   **To change the model:** Update the `MODEL_NAME` constant in your configuration file to match a model you have pulled via Ollama (e.g., `"mistral"`).

## 🛠️ Development & Contribution

This project is open-source and welcomes contributions!

### Running Locally

To run the application in development mode (useful for debugging):

```bash
npm run dev
```

### Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

***

### 💡 Notes for Implementation:

1.  **API Endpoint:** Ensure your code correctly points to `http://localhost:11434` for the Ollama API.
2.  **Error Handling:** Add robust error handling in your code to catch cases where Ollama is not running or the model name is incorrect.
3.  **Model Prompting:** The quality of translation heavily depends on the prompt you send. You might want to refine the system prompt sent to the LLM to be more explicit, such as: *"You are an expert translator. Translate the following text from [Source Language] to [Target Language] and provide only the translated text."*