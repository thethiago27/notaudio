import WhatsappClient from "./WhatsappClient";

describe("WhatsappClient", () => {
  let whatsappClient: typeof WhatsappClient;

  beforeEach(() => {
    whatsappClient = WhatsappClient;
  });

  it("should send a text message", async () => {
    // Mock the necessary methods and events
    whatsappClient.client.sendMessage = jest.fn().mockResolvedValue(undefined);

    // Call the method under test
    await whatsappClient.sendTextMessage("1234567890", "Hello, world!");

    // Verify if the message was sent
    expect(whatsappClient.client.sendMessage).toHaveBeenCalledWith(
        "1234567890",
        "Hello, world!"
    );
  });
});