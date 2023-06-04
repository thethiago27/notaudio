class AudioRecognitionError extends Error {
  constructor(reason: string) {
    const message: string = `Audio recognition failed: ${reason}`;

    super(message);
    this.name = this.constructor.name;
  }
}

export default AudioRecognitionError;
