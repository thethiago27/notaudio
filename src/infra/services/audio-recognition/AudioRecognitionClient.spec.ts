import AudioRecognitionClient, {SpeechRecognitionConfig} from './AudioRecognitionClient';
import {google} from "@google-cloud/speech/build/protos/protos";
import AudioEncoding = google.cloud.speech.v1.RecognitionConfig.AudioEncoding;

describe('AudioRecognitionClient', () => {
  let client: AudioRecognitionClient;

  beforeEach(() => {
    client = new AudioRecognitionClient('test-audio-content');
  });

  describe('recognize', () => {
    const config: SpeechRecognitionConfig = {
      encoding: AudioEncoding.OGG_OPUS,
      sampleRateHertz: 16000,
      languageCode: 'pt-BR',
      enableAutomaticPunctuation: true,
    };

    it('should recognize audio content with valid configuration', async () => {
      const response = {
        results: [
          {
            alternatives: [{ transcript: 'hello world' }],
          },
        ],
      };

      const recognizeMock = jest.fn().mockResolvedValue([response]);

      // @ts-ignore
      client.speechClient.recognize = recognizeMock;

      const text = await client.recognize(config);

      expect(recognizeMock).toHaveBeenCalledWith({
        audio: { content: 'test-audio-content' },
        config,
      });

      expect(text).toBe('hello world');
    });

    it('should throw error for invalid configuration', async () => {
      const invalidConfigs = [
        null,
        undefined,
        {},
        { encoding: 'OGG_OPUS', sampleRateHertz: 16000 },
        { encoding: 'OGG_OPUS', sampleRateHertz: 16000, languageCode: 'pt-BR', unknownProp: true },
      ];

      for (const invalidConfig of invalidConfigs) {
        await expect(client.recognize(invalidConfig as any)).rejects.toThrow('Invalid SpeechRecognitionConfig object');
      }
    });

    it('should throw error for recognition failure', async () => {
      const recognizeMock = jest.fn().mockRejectedValue(new Error('Failed to recognize audio'));

      // @ts-ignore
      client.speechClient.recognize = recognizeMock;

      await expect(client.recognize(config)).rejects.toThrow('Failed to recognize audio');

      expect(recognizeMock).toHaveBeenCalledWith({
        audio: { content: 'test-audio-content' },
        config,
      });
    });

    it('should return empty string for empty recognition results', async () => {
      const response = { results: [] };

      const recognizeMock = jest.fn().mockResolvedValue([response]);

      // @ts-ignore
      client.speechClient.recognize = recognizeMock;

      const text = await client.recognize(config);

      expect(recognizeMock).toHaveBeenCalledWith({
        audio: { content: 'test-audio-content' },
        config,
      });

      expect(text).toBe('');
    });
  });
});