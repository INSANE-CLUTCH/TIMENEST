
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
    const currentDate = new Date();

    // Function to format date as "DD"
    function formatDate(date) {
        return date.getDate().toString().padStart(2, '0');
    }

    function getDayOfWeek(date) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek[date.getDay()];
    }

    // Get the start of the centered week
    const weekStart = getStartOfCenteredWeek(currentDate);

    //function to get the start of the centered week
    function getStartOfCenteredWeek(date) {
        const start = new Date(date);
        start.setDate(start.getDate() - 3); // Move back 3 days to start from Tuesday
        return start;
    }

    // Update the calendar
    const dayElements = document.querySelectorAll('.calendar-day');
    const dayOfWeekElements = document.querySelectorAll('.day_of_week');

    dayElements.forEach((element, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);
        element.textContent = formatDate(date);
        
        // Highlight the current day
        if (date.toDateString() === currentDate.toDateString()) {
            element.style.color = '#4361ee';
            element.style.fontWeight = 'bold';
        }

        // Update the day names (Mon, Tue, etc.) based on the correct date
        const dayOfWeek = getDayOfWeek(date);
        dayOfWeekElements[index].textContent = dayOfWeek;  // Correctly set the day name
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const timeSlots = document.querySelector('.time-slots');
    const timeInterval = document.querySelector('.time_interval .time');
    const modal = document.getElementById("createTaskModal");
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    // Initialize drag functionality
    let isDragging = false;
    let startSlot = null;
    let endSlot = null;

    // Create time intervals and time slots
    createTimeIntervalsAndSlots();

    // Event Listeners
    timeSlots.addEventListener('mousedown', onMouseDown);
    timeSlots.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.getElementsByClassName("close-button")[0].onclick = closeModal;
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    // Functions for handling time slots
    function createTimeIntervalsAndSlots() {
        const timeblank1 = document.createElement('div');
        timeblank1.classList.add('blank_time');
        timeInterval.appendChild(timeblank1);

        for (let i = 0; i < 96; i += 2) {
            const hours = Math.floor(i / 4);
            const minutes = (i % 4) * 15;
            const timeElement = document.createElement('p');
            if (i % 4 === 0) {
                timeElement.textContent = formatTimeForDisplay(hours, minutes);
            }
            timeInterval.appendChild(timeElement);

            for (let j = 0; j < 7; j++) {
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('time-slot');
                timeSlot.dataset.time = formatTimeForInput(hours, minutes);
                timeSlot.dataset.day = j;
                timeSlots.appendChild(timeSlot);
            }
        }

        const timeblank2 = document.createElement('div');
        timeblank2.classList.add('blank_time');
        timeInterval.appendChild(timeblank2);
    }

    function formatTimeForInput(hours, minutes) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    function formatTimeForDisplay(hours, minutes) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    function getTimeFromSlot(slot) {
        const slotIndex = Array.from(timeSlots.children).indexOf(slot);
        const hours = Math.floor(slotIndex / 4);
        const minutes = (slotIndex % 4) * 15;
        return { hours, minutes };
    }

    function highlightSlot(slot) {
        slot.classList.add('highlighted');
    }

    function highlightRange(start, end) {
        clearHighlight();
        const slots = Array.from(timeSlots.children);
        const startIndex = slots.indexOf(start);
        const endIndex = slots.indexOf(end);

        const [row1, row2] = [Math.floor(startIndex / 7), Math.floor(endIndex / 7)].sort((a, b) => a - b);
        const [col1, col2] = [startIndex % 7, endIndex % 7].sort((a, b) => a - b);

        for (let i = row1; i <= row2; i++) {
            for (let j = col1; j <= col2; j++) {
                slots[i * 7 + j].classList.add('highlighted');
            }
        }
    }

    function clearHighlight() {
        timeSlots.querySelectorAll('.highlighted').forEach(slot => slot.classList.remove('highlighted'));
    }

    // Event handling functions
    function onMouseDown(e) {
        if (e.target.classList.contains('time-slot')) {
            isDragging = true;
            startSlot = e.target;
            highlightSlot(startSlot);
        }
    }

    function onMouseMove(e) {
        if (isDragging && e.target.classList.contains('time-slot')) {
            endSlot = e.target;
            highlightRange(startSlot, endSlot);
        }
    }

    function onMouseUp() {
        if (isDragging) {
            isDragging = false;
            if (startSlot && endSlot) {
                const startTime = getTimeFromSlot(startSlot);
                const endTime = getTimeFromSlot(endSlot);

                // Pre-fill the modal with the captured time
                startTimeInput.value = formatTimeForInput(startTime.hours, startTime.minutes);
                endTimeInput.value = formatTimeForInput(endTime.hours, endTime.minutes);

                createTask();
            }
            clearHighlight();
        }
    }

    // Modal functions
    function closeModal() {
        modal.classList.remove("show");
    }

    function createTask() {
        modal.classList.add("show");

        document.getElementById("createTaskForm").onsubmit = function(e) {
            e.preventDefault();
            addTaskToCalendar();
            closeModal();
            document.getElementById("createTaskForm").reset();
        };
    }

    function addTaskToCalendar() {
        const task = document.createElement('div');
        task.classList.add('task');
    
        // Task Name
        const taskName = document.createElement('p');
        taskName.classList.add('taskName');
        taskName.textContent = document.getElementById('taskName').value;
    
        // Task Description
        const taskDescript = document.createElement('p');
        taskDescript.classList.add('taskDescript');
        taskDescript.textContent = document.getElementById('taskDescription').value;
    
        const startTime = new Date(startTimeInput.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(endTimeInput.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Task Time
        const taskTime = document.createElement('p');
        taskTime.classList.add('taskTime');
        taskTime.textContent = `${startTime} - ${endTime}`;
    
        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
    
        // Add event listener to delete the task
        deleteButton.onclick = function() {
            timeSlots.removeChild(task);
        };
    
        // Append elements to the task
        task.appendChild(taskName);
        task.appendChild(taskDescript);
        task.appendChild(taskTime);
        task.appendChild(deleteButton);
        task.style.backgroundColor = document.getElementById('taskColor').value;
    
        // Positioning the task
        const startRect = startSlot.getBoundingClientRect();
        const endRect = endSlot.getBoundingClientRect();
        const timeSlotRect = timeSlots.getBoundingClientRect();
    
        task.style.position = 'absolute';
        task.style.left = `${Math.min(startRect.left, endRect.left) - timeSlotRect.left}px`;
        task.style.top = `${Math.min(startRect.top, endRect.top) - timeSlotRect.top}px`;
        task.style.width = `${Math.max(startRect.right, endRect.right) - Math.min(startRect.left, endRect.left)}px`;
        task.style.height = `${Math.max(startRect.bottom, endRect.bottom) - Math.min(startRect.top, endRect.top)}px`;
    
        // Append the task to time slots
        timeSlots.appendChild(task);
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    // Get today's date
    const currentDate = new Date();

    // Function to format date as "DD.MM.YYYY"
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with zero
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-based) and pad
        const year = date.getFullYear(); // Get full year
        return `${day}.${month}.${year}`; // Return formatted date
    }

    // Select the <p> element inside the .day div
    const dayElement = document.querySelector('.day p');

    // Set the text content to today's date
    dayElement.textContent = formatDate(currentDate);
});