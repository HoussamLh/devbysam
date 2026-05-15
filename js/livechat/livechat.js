function initLiveChat() {
  const chat = document.createElement("div");

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
                Hi 👋 Welcome to DevBySam.
                How can I help?
            </div>

        </div>

        <div class="chat-input-area">

            <input
              id="chat-input"
              placeholder="Type a message..."
            />

            <button id="chat-send">
                Send
            </button>

        </div>

    </div>
    `;

  document.body.appendChild(chat);

  const toggle = document.getElementById("chat-toggle");

  const windowBox = document.getElementById("chat-window");

  const closeBtn = document.getElementById("chat-close");

  toggle.addEventListener("click", () => {
    windowBox.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    windowBox.classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", initLiveChat);