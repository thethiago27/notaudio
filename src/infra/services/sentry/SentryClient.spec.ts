import SentryClient from "./SentryClient";

describe("SentryClient", () => {
  it("should return a singleton instance", () => {
    const instance1 = SentryClient.getInstance();
    const instance2 = SentryClient.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should capture an exception", () => {
    const instance = SentryClient.getInstance();
    const spy = jest.spyOn(instance, "captureException");
    instance.captureException("test");
    expect(spy).toHaveBeenCalledWith("test");
  });
});
