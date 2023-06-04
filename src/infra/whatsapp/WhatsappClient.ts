import {Client, LocalAuth} from "whatsapp-web.js";
import EventEmitter from "events";
import qrcode from "qrcode-terminal";
import {google} from "@google-cloud/speech/build/protos/protos";
import AudioRecognitionClient from "@infra/services/audio-recognition/AudioRecognitionClient";

const {AudioEncoding} = google.cloud.speech.v1.RecognitionConfig;

interface Message {
  from: string;
  hasMedia: boolean;
  downloadMedia(): Promise<any>;
}

class WhatsappClient extends EventEmitter {
  client: Client;

  constructor() {
    super();
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    this.client.on("error", (err) => {
      console.log("Erro no cliente WhatsApp", err);
    });

    this.client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.generate(qr, {small: true});
    });

    this.client.on("ready", () => {
      console.log("Cliente WhatsApp pronto");
      this.emit("ready");
    });

    this.client.on("message", async (msg) => {
     await this.handleMessage(msg);
    });
  }

  public async start(): Promise<void> {
    await this.client.initialize();
    console.log("Cliente WhatsApp iniciado");
  }

  public async sendTextMessage(to: string, text: string): Promise<void> {
    await this.client.sendMessage(to, text);
  }

  async handleAudioMessage(msg: Message): Promise<void> {
    try {
      const media = await msg.downloadMedia();
      if (media.mimetype === "audio/ogg; codecs=opus") {
        const audioRecognitionClient = new AudioRecognitionClient(media.data);

        const text = await audioRecognitionClient.recognize({
          encoding: AudioEncoding.OGG_OPUS,
          sampleRateHertz: 16000,
          languageCode: "pt-BR",
          enableAutomaticPunctuation: true,
        });

        await this.sendTextMessage(msg.from, text);
      }
    } catch (err) {
      console.log("Erro ao processar mensagem de áudio", err);
    }
  }

  async handleMessage(msg: Message): Promise<void> {
    if (msg.from === "status@broadcast") return;
    if (msg.hasMedia) {
      await this.handleAudioMessage(msg);
    }
  }
}

export default new WhatsappClient();