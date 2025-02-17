document.getElementById('todays-date').textContent = new Date().toDateString();

// Fetch and display tasks on page load
async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3002');
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Add a new task
async function addTodo() {
    const input = document.getElementById('input');
    const taskValue = input.value.trim();
    
    if (!taskValue) {
        alert('Please enter a task.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3002', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: taskValue })
        });

        if (response.ok) {
            input.value = ''; // Clear the input field
            fetchTodos(); // Refresh the task list
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Delete a task
async function deleteTodo(id) {
    try {
        const response = await fetch(`http://localhost:3002/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTodos(); // Refresh the task list
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Render tasks to the page
function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the current list

    todos.forEach(todo => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = todo.task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

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

        todoList.appendChild(taskDiv);
    });
}

// Load tasks when the page is loaded
window.onload = fetchTodos;
