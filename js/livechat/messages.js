async function sendMessage(message) {
  const { error } = await supabaseClient.from("messages").insert([
    {
      name: "Visitor",
      message: message,
    },
  ]);

  if (error) {
    console.error("Send error:", error);
  }
}

function listenMessages() {
  supabaseClient
    .channel("messages-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        const msg = payload.new;

        const div = document.createElement("div");
        div.className = "bot-message";
        div.textContent = msg.message;

        const container = document.getElementById("chat-messages");
        if (container) {
          container.appendChild(div);
          container.scrollTop = container.scrollHeight;
        }
      },
    )
    .subscribe();
}

/* expose globally */
window.sendMessage = sendMessage;
window.listenMessages = listenMessages;