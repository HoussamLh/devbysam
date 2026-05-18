function initLiveChat() {
  if (document.querySelector(".live-chat-container")) return;

  const chat = document.createElement("div");
  chat.className = "live-chat-container";

  chat.innerHTML = `
    <div id="chat-container-wrapper">
      <span class="chat-label">Chat now</span>
      <button id="chat-toggle">
        <i class="fa-solid fa-comments"></i>
      </button>
    </div>

    <div id="chat-window">

      <div class="chat-header">
        <div>
          <h4>Chat with Sam</h4>
          <span>Usually replies quickly</span>
        </div>
        <button id="chat-close">✕</button>
      </div>

      <div id="chat-messages">
        <div class="bot-message">
          Hi 👋 Welcome to DevBySam. How can I help?
        </div>
      </div>

      <div class="chat-input-area">
        <input id="chat-input" placeholder="Type a message..." />
        <button id="chat-send">Send</button>
      </div>

    </div>
  `;

  document.body.appendChild(chat);

  const toggle = document.getElementById("chat-toggle");
  const windowBox = document.getElementById("chat-window");
  const closeBtn = document.getElementById("chat-close");

  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");

  toggle.addEventListener("click", () => {
    windowBox.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    windowBox.classList.remove("open");
  });

  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    const messages = document.getElementById("chat-messages");

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = text;

    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    input.value = "";

    await window.sendMessage(text);
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
}

window.initLiveChat = initLiveChat;