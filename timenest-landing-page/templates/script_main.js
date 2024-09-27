
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

// Modal functionality
const modal = document.getElementById("createTaskModal");
const btn = document.getElementById("createBtn");
const span = document.getElementsByClassName("close-button")[0];

btn.onclick = function() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

span.onclick = closeModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Form submission
document.getElementById("createTaskForm").onsubmit = function(e) {
    e.preventDefault();
    console.log("Task Name:", document.getElementById("taskName").value);
    console.log("Description:", document.getElementById("taskDescription").value);
    console.log("Start Time:", document.getElementById("startTime").value);
    console.log("End Time:", document.getElementById("endTime").value);
    
    // Close the modal after submission
    closeModal();
    
    // Reset the form
    this.reset();
}


document.addEventListener('DOMContentLoaded', function() {
    const timeSlots = document.querySelector('.time-slots');
    const timeInterval = document.querySelector('.time_interval .time');

    // Create time intervals and time slots
    function createTimeIntervalsAndSlots() {
        const timeblank1 = document.createElement('div');
        timeblank1.classList.add('blank_time');
        timeInterval.appendChild(timeblank1);

        for (let i = 0; i < 96; i += 2) {
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
                timeSlot.dataset.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                timeSlot.dataset.day = j;
                timeSlots.appendChild(timeSlot);
            }
        }

        const timeblank2 = document.createElement('div');
        timeblank2.classList.add('blank_time');
        timeInterval.appendChild(timeblank2);
    }

    createTimeIntervalsAndSlots();

    // Drag to create functionality
    let isDragging = false;
    let startSlot = null;
    let endSlot = null;

    timeSlots.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('time-slot')) {
            isDragging = true;
            startSlot = e.target;
            highlightSlot(startSlot);
        }
    });

    timeSlots.addEventListener('mousemove', function(e) {
        if (isDragging && e.target.classList.contains('time-slot')) {
            endSlot = e.target;
            highlightRange(startSlot, endSlot);
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            if (startSlot && endSlot) {
                createTask(startSlot, endSlot);
            }
            clearHighlight();
        }
    });

    function highlightSlot(slot) {
        slot.classList.add('highlighted');
    }

    function highlightRange(start, end) {
        clearHighlight();
        const slots = Array.from(timeSlots.children);
        const startIndex = slots.indexOf(start);
        const endIndex = slots.indexOf(end);
        const [minIndex, maxIndex] = [Math.min(startIndex, endIndex), Math.max(startIndex, endIndex)];
        
        for (let i = minIndex; i <= maxIndex; i++) {
            slots[i].classList.add('highlighted');
        }
    }

    function clearHighlight() {
        timeSlots.querySelectorAll('.highlighted').forEach(slot => slot.classList.remove('highlighted'));
    }

    function createTask(start, end) {
        const taskName = prompt("Enter task name:");
        if (taskName) {
            const task = document.createElement('div');
            task.classList.add('task');
            task.textContent = taskName;
            
            const startRect = start.getBoundingClientRect();
            const endRect = end.getBoundingClientRect();
            const timeSlotRect = timeSlots.getBoundingClientRect();

            task.style.position = 'absolute';
            task.style.left = `${startRect.left - timeSlotRect.left}px`;
            task.style.top = `${startRect.top - timeSlotRect.top}px`;
            task.style.width = `${endRect.right - startRect.left}px`;
            task.style.height = `${endRect.bottom - startRect.top}px`;

            timeSlots.appendChild(task);
        }
    }
});

