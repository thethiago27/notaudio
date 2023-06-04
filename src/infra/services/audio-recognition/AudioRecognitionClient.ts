import {SpeechClient} from '@google-cloud/speech';
import type {google} from "@google-cloud/speech/build/protos/protos";

export type SpeechRecognitionConfig = {
  encoding: google.cloud.speech.v1.RecognitionConfig.AudioEncoding,
  sampleRateHertz: number,
  languageCode: string,
  enableAutomaticPunctuation?: boolean,
};
class AudioRecognitionClient {
  private readonly audio: string;
  private readonly speechClient: SpeechClient;

  constructor(audio: string) {
    this.audio = audio;
    this.speechClient = new SpeechClient();
  }

  public async recognize(config: SpeechRecognitionConfig): Promise<string> {

    if (!config || typeof config !== 'object' || !config.encoding || !config.sampleRateHertz || !config.languageCode) {
      throw new AudioRecognitionClient('Invalid SpeechRecognitionConfig object');
    }

    try {
      const [response] = await this.speechClient.recognize({
        audio: {
          content: this.audio,
        },
        config: config,
      });

      if (response.results) {
        return response.results
          .map((result: any) => result.alternatives[0].transcript)
          .join('\n');
      }

      return '';

    } catch (error: any) {
      throw new AudioRecognitionClient(`Failed to recognize audio: ${error.message}`)
    }
  }
}

export default AudioRecognitionClient;