// Set today's date
document.getElementById('date').textContent = new Date().toDateString();

function addTodo() {
    const input = document.getElementById('input');
    const taskValue = input.value.trim();
    
    if (!taskValue) {
        alert('Please enter a task.');
        return;
    }

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskDiv.remove();
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        const newTaskValue = prompt('Edit your task:', taskSpan.textContent);
        if (newTaskValue && newTaskValue.trim()) {
            taskSpan.textContent = newTaskValue.trim();
        } else {
            alert('Task cannot be empty.');
        }
    };

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    document.getElementById('todoList').appendChild(taskDiv);
    input.value = '';
}
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}