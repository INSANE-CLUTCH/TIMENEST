
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

// Function to get the start of the centered week for a given date
function getStartOfCenteredWeek(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - 3); // Move back 3 days to start from Tuesday
    return start;
}

// Function to format date as "DD"
function formatDate(date) {
    return date.getDate().toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the current date (in this case, 27.09.2024)
    const currentDate = new Date('2024-09-27');

    // Get the start of the centered week
    const weekStart = getStartOfCenteredWeek(currentDate);

    // Update the calendar
    const dayElements = document.querySelectorAll('.calendar-day');
    const dayOfWeekElements = document.querySelectorAll('.day_of_week');
    const daysOfWeek = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

    dayElements.forEach((element, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);
        element.textContent = formatDate(date);
        
        // Highlight the current day
        if (date.toDateString() === currentDate.toDateString()) {
            element.style.color = '#4361ee';
            element.style.fontWeight = 'bold';
        }
    });

    // Update the day names
    dayOfWeekElements.forEach((element, index) => {
        element.textContent = daysOfWeek[index];
    });

});

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
        
        let row1 = parseInt(startIndex / 7);
        let col1 = startIndex - row1 * 7;
        let row2 = parseInt(endIndex / 7);
        let col2 = endIndex - row2 * 7;
        
        if(row1 > row2){
            let temp = row2;
            row2 = row1;
            row1 = temp;
        }

        if(col1 > col2){
            let temp = col2;
            col2 = col1;
            col1 = temp;
        }

        for (let i = row1; i <= row2; i++) {
            for(let j = col1; j <= col2; j++){
                slots[i*7+j].classList.add('highlighted');
            }
        }
    }

    function clearHighlight() {
        timeSlots.querySelectorAll('.highlighted').forEach(slot => slot.classList.remove('highlighted'));
    }



    function createTask(start, end) {
        clearHighlight();
        const modal = document.getElementById("createTaskModal");
        modal.classList.add("show");
    
        document.getElementById("createTaskForm").onsubmit = function(e) {
            e.preventDefault();
    
            let task = document.createElement('div');
            task.classList.add('task');
    
            let taskName = document.createElement('p');
            taskName.classList.add('taskName');
            taskName.textContent = document.getElementById('taskName').value;
    
            let taskDescript = document.createElement('p');
            taskDescript.classList.add('taskDescript');
            taskDescript.textContent = document.getElementById('taskDescription').value;
    
            let taskTime = document.createElement('p');
            taskTime.classList.add('taskTime');
            taskTime.textContent = `${document.getElementById('startTime').value} - ${document.getElementById('endTime').value}`;
    
            task.appendChild(taskName);
            task.appendChild(taskDescript);
            task.appendChild(taskTime);
            task.backgroundColor = document.getElementById('taskColor').value;
    
            const startRect = start.getBoundingClientRect();
            const endRect = end.getBoundingClientRect();
            const timeSlotRect = timeSlots.getBoundingClientRect();
    
            task.style.position = 'absolute';
            let most_left = Math.min(startRect.left, endRect.left);
            let most_right = Math.max(startRect.right, endRect.right);
            let most_top = Math.min(startRect.top, endRect.top);
            let most_bottom = Math.max(startRect.bottom, endRect.bottom);
    
            task.style.left = `${most_left - timeSlotRect.left}px`;
            task.style.top = `${most_top - timeSlotRect.top}px`;
            task.style.width = `${most_right - most_left}px`;
            task.style.height = `${most_bottom - most_top}px`;
    
            // Set the background color based on the selected task color
            task.style.backgroundColor = document.getElementById('taskColor').value;
    
            timeSlots.appendChild(task);
    
            // Close the modal after creating the task
            modal.classList.remove("show");
    
            // Reset the form
            document.getElementById("createTaskForm").reset();
        };
    }
});