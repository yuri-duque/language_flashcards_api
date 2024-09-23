import OpenAI from "openai";

export class TranslateService {
    private readonly openai;
    private originalLanguage = "english";
    private targetLanguage = "portuguese";
    private systemMessage = `You are a ${this.originalLanguage} professor.`;
    private userMessage = `Translate the words below to ${this.targetLanguage}, give only the translation: `;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, 
            organization: process.env.OPENAI_ORGANIZATION_ID,
            project: process.env.OPENAI_PROJECT_ID,
        });
    }

    async translateText(text: string) {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: this.systemMessage },
                {
                    role: "user",
                    content: `${this.userMessage} '${text}'`,
                },
            ],
        });

        return response.choices[0].message.content || undefined;
    }
}