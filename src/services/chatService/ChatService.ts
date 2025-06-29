import { injectable, inject } from 'tsyringe';

import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';

@injectable()
export class ChatService {
  constructor(
    @inject('OpenAIApiProvider')
    private openAIApiProvider: IOpenAIApiProvider,
  ) {}

  async getResponse(prompt: string): Promise<string> {
    return this.openAIApiProvider.sendPrompt(prompt);
  }
}
