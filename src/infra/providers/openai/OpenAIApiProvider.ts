import axios from 'axios';
import { injectable } from 'tsyringe';
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';

@injectable()
export class OpenAIApiProvider implements IOpenAIApiProvider {
    private readonly apiKey = process.env.OPENAI_API_KEY;
    private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

    async sendPrompt(prompt: string): Promise<string> {
        try {
            const response = await axios.post(this.apiUrl, {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('[OpenAIApiProvider] Error:', error);
            throw new Error('Failed to fetch response from OpenAI.');
        }
    }
}
