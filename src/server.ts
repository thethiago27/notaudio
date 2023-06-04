import WhatsappClient from "@infra/whatsapp/WhatsappClient";

(async () => {
  try {
    const whatsappClient = WhatsappClient;
    await whatsappClient.start();
  } catch (error) {
    console.error("Erro ao iniciar o cliente do WhatsApp", error);
    process.exit(1);
  }
})();