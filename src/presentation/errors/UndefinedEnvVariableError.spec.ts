import UndefinedEnvVariableError from "./UndefinedEnvVariableError";

describe("UndefinedEnvVariableError", () => {
  it("should have a message", () => {
    const envName = "envName";
    const error = new UndefinedEnvVariableError(envName);
    expect(error.message).toEqual(
      `Environment variable ${envName} is not defined`
    );
  });

  it("should have a name", () => {
    const envName = "envName";
    const error = new UndefinedEnvVariableError(envName);
    expect(error.name).toEqual("UndefinedEnvVariableError");
  });

  it("should have a stack", () => {
    const envName = "envName";
    const error = new UndefinedEnvVariableError(envName);
    expect(error.stack).toBeDefined();
  });
});
