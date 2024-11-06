document.addEventListener('DOMContentLoaded', function () {
  const chatWindow = document.querySelector('.chat-window');
  const inputField = document.querySelector('.input-area input');
  const sendButton = document.querySelector('.input-area button');

  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.innerHTML =
      '<div class="typing-bubble"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async function handleUserInput() {
    const userMessage = inputField.value.trim();
    if (userMessage) {
      addMessage(userMessage, true);
      inputField.value = '';

      // Add typing indicator
      addTypingIndicator();

      try {
        const response = await fetch('http://10.1.16.121:8034/infer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: userMessage }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Remove typing indicator before adding the bot's response
        removeTypingIndicator();
        addMessage(data.response);
      } catch (error) {
        console.error('Error:', error);

        // Remove typing indicator before adding the error message
        removeTypingIndicator();
        addMessage('Sorry, there was an error processing your message.');
      }
    }
  }

  sendButton.addEventListener('click', handleUserInput);

  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });
});
