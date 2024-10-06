  document.addEventListener('DOMContentLoaded', () => {
    // your code here
    const taskInput = document.getElementById('new-task-description');
    const priorityInput = document.getElementById('priorityInput');
    const taskForm = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');
    const sortBtn = document.getElementById('sortBtn');

    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.text} (Priority: ${task.priority})
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add task
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the page from reloading

        const taskText = taskInput.value.trim();
        const priority = parseInt(priorityInput.value);

        if (taskText) {
            tasks.push({ text: taskText, priority });
            taskInput.value = ''; // Clear the input
            renderTasks();
        }
    });

    // Sort tasks
    sortBtn.addEventListener('click', () => {
        tasks.sort((a, b) => a.priority - b.priority);
        renderTasks();
    });

    // Edit and Delete event delegation
    taskList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('delete-btn')) {
            tasks.splice(index, 1); // Remove the task
            renderTasks();
        } else if (event.target.classList.contains('edit-btn')) {
            const newTaskText = prompt("Edit Task:", tasks[index].text);
            if (newTaskText) {
                tasks[index].text = newTaskText; // Update the task text
                renderTasks();
            }
        }
    });
});

