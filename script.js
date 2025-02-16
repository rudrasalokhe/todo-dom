document.getElementById('todays-date').textContent = new Date().toDateString();

function addTodo() {
  const input = document.getElementById('input');
  const taskValue = input.value.trim();
  
  if (!taskValue) {
    alert('Please enter a task.');
    return;
  }

  // Create task container
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-item';

  // Task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskValue;

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    taskDiv.remove();
  };

  // Edit button
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

  // Append elements to task container
  taskDiv.appendChild(taskSpan);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);

  // Add task to the list
  document.getElementById('todoList').appendChild(taskDiv);

  // Clear the input field
  input.value = '';
}