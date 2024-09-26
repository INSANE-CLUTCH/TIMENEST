
document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.querySelector('.chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Create and append the user's message
            const userMessageLi = document.createElement('li');
            userMessageLi.className = 'chat outgoing';
            userMessageLi.innerHTML = `<p>${message}</p>`;
            chatbox.appendChild(userMessageLi);

            // Clear the input field
            userInput.value = '';

            // Scroll to the bottom of the chatbox
            chatbox.scrollTop = chatbox.scrollHeight;

            // Here you would typically send the message to your backend
            // and wait for a response. For now, we'll just add a placeholder response.
            setTimeout(() => {
                const botMessageLi = document.createElement('li');
                botMessageLi.className = 'chat incoming';
                botMessageLi.innerHTML = '<p>I received your message. How can I assist you further?</p>';
                chatbox.appendChild(botMessageLi);
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 1000);
        }
    }

    // Event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the Enter key in the input field
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const timeInterval = document.querySelector('.time_interval .time');
    const timeSlots = document.querySelector('.time-slots');

    const timeblank1 = document.createElement('div');
    timeblank1.classList.add('blank_time');
    timeInterval.appendChild(timeblank1);

    for (let i = 0; i < 96; i+=2) {
        const hours = Math.floor(i / 4);
        const minutes = (i % 4) * 15;
        const timeElement = document.createElement('p');
        if (i % 4 === 0) {
            timeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        timeInterval.appendChild(timeElement);
        for (let j = 0; j < 7; j++) {
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlots.appendChild(timeSlot);
        }
    }
    const timeblank2 = document.createElement('div');
    timeblank2.classList.add('blank_time');
    timeInterval.appendChild(timeblank2);

    const timeElement = document.createElement('p');
    for (let j = 0; j < 7; j++) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlots.appendChild(timeSlot);
    }

});