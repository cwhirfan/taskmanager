 document.addEventListener('DOMContentLoaded', function () {
    const addTaskForm = document.getElementById('add-task-form');
    const taskList = document.getElementById('tasks');

    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementById('notask').style.display = "none";
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        const counter = document.getElementById('counter').value;

        if (title && description && dueDate && priority) {
            const newTask = document.createElement('tr');
            newTask.setAttribute('id','row' + counter);
            newTask.innerHTML = `
                <td id="title${counter}">${title}</td>
                <td id="description${counter}">${description}</td>
                <td id="due-date${counter}">${dueDate}</td>
                <td id="priority${counter}" >${priority}</td>
                <td id="status${counter}" class="statusColumn">0</td>
                <td id="mark${counter}" ><box-icon name='x-circle'></box-icon></td>
                <td>
                    <button onclick="edit(${counter})"><box-icon name='edit' ></box-icon></button>
                    <button onclick="del(${counter})"><box-icon name='trash' ></box-icon></button> 
                    <button onclick="complete('${counter}','${title}','${description}','${dueDate}','${priority}')"><box-icon name='check-circle'></box-icon></button>
                </td>
            `;

            taskList.appendChild(newTask);

            // Clear the form fields after adding a task
            addTaskForm.reset();

            document.getElementById('counter').value++;
            
        } else {
            alert('Please fill in all the required fields.');
        }
    });
});
