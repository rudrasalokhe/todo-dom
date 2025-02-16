
document.getElementById('todays-date').textContent = new Date().toDateString();

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
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(deleteButton);
    document.getElementById('todoList').appendChild(taskDiv);
    input.value = '';
}
