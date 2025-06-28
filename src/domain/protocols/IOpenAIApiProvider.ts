export interface IOpenAIApiProvider {
    sendPrompt(prompt: string): Promise<string>;
}
