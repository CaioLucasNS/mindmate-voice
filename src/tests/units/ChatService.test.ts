import 'reflect-metadata';
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';
import { ChatService } from '@/services/chatService/ChatService';

class FakeOpenAIApiProvider implements IOpenAIApiProvider {
  async sendPrompt(prompt: string): Promise<string> {
    return `Fake response for: ${prompt}`;
  }
}

describe('ChatService', () => {
  it('should return a fake response', async () => {
    const fakeProvider = new FakeOpenAIApiProvider();
    const chatService = new ChatService(fakeProvider);

    const response = await chatService.getResponse('Hello!');
    expect(response).toBe('Fake response for: Hello!');
  });
});
