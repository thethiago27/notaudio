class UndefinedEnvVariableError extends Error {
  constructor(envName: string) {
    const message: string = `Environment variable ${envName} is not defined`;

    super(message);
    this.name = this.constructor.name;
  }
}

export default UndefinedEnvVariableError;
