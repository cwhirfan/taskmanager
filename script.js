 document.addEventListener('DOMContentLoaded', function () {
    const addTaskForm = document.getElementById('add-task-form');
    const taskList = document.getElementById('tasks');
    document.getElementById("due-date").valueAsDate = new Date();

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
                <td id="mark${counter}" title="Not Completed" ><box-icon name='x-circle'></box-icon></td>
                <td>
                    <button title="Edit" onclick="edit(${counter})"><box-icon name='edit' ></box-icon></button>
                    <button title="Delete" onclick="del(${counter})"><box-icon name='trash' ></box-icon></button> 
                    <button title="Mark as Complete" onclick="complete('${counter}','${title}','${description}','${dueDate}','${priority}')"><box-icon name='check-circle'></box-icon></button>
                </td>
            `;

            taskList.appendChild(newTask);

            // Clear the form fields after adding a task
            addTaskForm.reset();

            document.getElementById('counter').value++;

            alert("Task added successfully");
            
        } else {
            alert('Please fill in all the required fields.');
        }

    });
});

//This function is to check all the checkboxes when clicks at the "Select All" checkbox
function selectAllCheckboxes() {
    var checkboxes = document.querySelectorAll('.filters__list input[type="checkbox"]');
    var selectAllCheckbox = document.getElementById('selectAllCheckbox'); // Add an id to your "Select All" checkbox

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

function filterTasks() {

    // Get selected filter values
    const priorityFilters = document.querySelectorAll('#priority-check input[type="checkbox"]:checked');
    const statusFilters = document.querySelectorAll('#status-check input[type="checkbox"]:checked');

    // Filter tasks based on selected criteria
    const rows = document.querySelectorAll('#tasks tr:not(#notask)');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const priority = row.querySelector('td:nth-child(4)').innerHTML;
        const status = row.querySelector('td:nth-child(5)').innerHTML;

        // Check if the row should be displayed based on priority filters
        const priorityFilterPassed = Array.from(priorityFilters).some(filter => {
            return filter.value === priority.toLowerCase();
        });

        // Check if the row should be displayed based on status filters
        const statusFilterPassed = Array.from(statusFilters).some(filter => {
            return filter.value === status.toLowerCase();
        });

        // Display or hide the row based on filter criteria
        if (priorityFilterPassed && statusFilterPassed) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

//This function is to display the filter options
function showFilter(){

    const display = document.getElementById("filter-container").style.display;

    if(display == "block"){
        document.getElementById("filter-container").style.display = "none";
    }
    else{
        document.getElementById("filter-container").style.display = "block";
        document.getElementById("color-list").style.display = "none";
    }
}

// This function is to load prefered theme color
function onloadproc(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme = urlParams.get('theme');
    
    if(theme == "blue"){
        blue();
    }
    else if(theme == "black"){
        black()
    }
    else if(theme == "red"){
        red()
    }
    else if(theme == "pink"){
        pink()
    }
}

//This function is to go to the About Us page.
function go_about(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme = urlParams.get('theme');
    
    if(theme == "blue"){
        window.location.href = "about.html?theme=blue";
    }
    else if(theme == "black"){
        window.location.href = "about.html?theme=black";
    }
    else if(theme == "red"){
        window.location.href = "about.html?theme=red";
    }
    else if(theme == "pink"){
        window.location.href = "about.html?theme=pink";
    }
    else{
        window.location.href = "about.html";
    }
}

// This function is to go back to My task page
function go_mt(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme = urlParams.get('theme');
    
    if(theme == "blue"){
        window.location.href = "index.html?theme=blue";
    }
    else if(theme == "black"){
        window.location.href = "index.html?theme=black";
    }
    else if(theme == "red"){
        window.location.href = "index.html?theme=red";
    }
    else if(theme == "pink"){
        window.location.href = "index.html?theme=pink";
    }
    else{
        window.location.href = "index.html";
    }
}

// This function is to change the them color to black
function black(){
    document.getElementById("myHeader").style.backgroundColor = "#000";
    document.getElementById("myFooter").style.backgroundColor = "#000";
    document.getElementById("myHeader").style.color = "white";
    document.getElementById("myFooter").style.color = "white";

    var css = '#btn-about:hover, #btn-about:active, #btn-mt:hover, #btn-mt:active {background-color: rgb(122, 122, 122);color: white;} #btn-about,#btn-mt {background-color: white;color: #000;}';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('header')[0].appendChild(style);

    history.pushState({}, null, "?theme=black");
}

// This function is to change the them color to blue
function blue(){
    document.getElementById("myHeader").style.backgroundColor = "rgb(0, 153, 255)";
    document.getElementById("myFooter").style.backgroundColor = "rgb(0, 153, 255)";
    document.getElementById("myHeader").style.color = "white";
    document.getElementById("myFooter").style.color = "white";

    var css = '#btn-about:hover, #btn-about:active, #btn-mt:hover, #btn-mt:active {background-color: rgb(0, 153, 255);color: white;} #btn-about,#btn-mt {background-color: white;color: rgb(0, 153, 255);}';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('header')[0].appendChild(style);

    history.pushState({}, null, "?theme=blue");
}

// This function is to change the them color to red
function red(){
    document.getElementById("myHeader").style.backgroundColor = "#f00";
    document.getElementById("myFooter").style.backgroundColor = "#f00";
    document.getElementById("myHeader").style.color = "white";
    document.getElementById("myFooter").style.color = "white";

    var css = '#btn-about:hover, #btn-about:active, #btn-mt:hover, #btn-mt:active {background-color: rgb(250, 115, 115);color: white;} #btn-about,#btn-mt {background-color: white;color: #f00;}';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('header')[0].appendChild(style);

    history.pushState({}, null, "?theme=red");
}

// This function is to change the them color to pink
function pink(){
    document.getElementById("myHeader").style.backgroundColor = "#f59ace";
    document.getElementById("myFooter").style.backgroundColor = "#f59ace";
    document.getElementById("myHeader").style.color = "#000";
    document.getElementById("myFooter").style.color = "#000";

    var css = '#btn-about:hover, #btn-about:active, #btn-mt:hover, #btn-mt:active {background-color: #f59ace;color: white;} #btn-about,#btn-mt {background-color: #000; color: #f59ace;}';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('header')[0].appendChild(style);

    history.pushState({}, null, "?theme=pink");
}

//This function is to display the the color choices
function personalizeButton(){

    const display = document.getElementById("color-list").style.display;

    if(display == "block"){
        document.getElementById("color-list").style.display = "none";
    }
    else{
        document.getElementById("color-list").style.display = "block";
        document.getElementById("filter-container").style.display = "none";
    }

}

//This function is the process of clicking the edit button before the task completed
function edit(counter){
    const title = document.getElementById('title'+counter).innerHTML;
    const description = document.getElementById('description'+counter).innerHTML;
    const dueDate = document.getElementById('due-date'+counter).innerHTML;
    const priority = document.getElementById('priority'+counter).innerHTML;

    if(priority == "Low"){
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low" selected>Low</option><option value="Medium">Medium</option><option value="High">High</option></select></td>';
    }
    else if(priority == "Medium"){
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low">Low</option><option value="Medium" selected>Medium</option><option value="High">High</option></select></td>';
    }
    else{
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low">Low</option><option value="Medium">Medium</option><option value="High" selected>High</option></select></td>';
    }

    document.getElementById("row"+counter).innerHTML =
    `
        <form id="form${counter}">
        <td><input type="text" id="title${counter}"  value=${title}></td>
        <td><textarea type="text" id="description${counter}">${description}</textarea></td>
        <td><input type="date" id="due-date${counter}" value=${dueDate}></td>
    `
    +
    `${selectPrio}`
    +
    `
        <td id="status${counter}" class="statusColumn">0</td>
        <td id="mark${counter}" ><box-icon name='x-circle'></box-icon></td>
        
        <td>
            <button id="save-button" onClick="save(${counter})">Save</button>
            <button id="cancel-button" onClick="cancelEdit('${counter}','${title}','${description}','${dueDate}','${priority}')">Cancel</button>
        </td>
        </form>
    `;
}

//This function is the process of clicking the edit button after the task completed
function edit2(counter){
    const title = document.getElementById('title'+counter).innerHTML;
    const description = document.getElementById('description'+counter).innerHTML;
    const dueDate = document.getElementById('due-date'+counter).innerHTML;
    const priority = document.getElementById('priority'+counter).innerHTML;

    if(priority == "Low"){
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low" selected>Low</option><option value="Medium">Medium</option><option value="High">High</option></select></td>';
    }
    else if(priority == "Medium"){
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low">Low</option><option value="Medium" selected>Medium</option><option value="High">High</option></select></td>';
    }
    else{
        selectPrio = '<td><select id="priority'+counter+'" required><option value="Low">Low</option><option value="Medium">Medium</option><option value="High" selected>High</option></select></td>';
    }

    document.getElementById("row"+counter).innerHTML =
    `
        <form id="form${counter}">
        <td><input type="text" id="title${counter}"  value=${title}></td>
        <td><textarea type="text" id="description${counter}">${description}</textarea></td>
        <td><input type="date" id="due-date${counter}" value=${dueDate}></td>
    `
    +
    `${selectPrio}`
    +
    `
        <td id="status${counter}" class="statusColumn">1</td>
        <td id="mark${counter}" ><box-icon name='check-circle'></box-icon></td>
        <td>
            <button id="save-button" onClick="save(${counter})">Save</button>
            <button id="cancel-button" onClick="cancelEdit2('${counter}','${title}','${description}','${dueDate}','${priority}')">Cancel</button>
        </td>
        </form>
    `;
}

//This function is to cancel editing before the task completed
function cancelEdit(counter,title,description,dueDate,priority){
    document.getElementById("row"+counter).innerHTML =
    `
    <tr>
        <td id="title${counter}">${title}</td>
        <td id="description${counter}">${description}</td>
        <td id="due-date${counter}">${dueDate}</td>
        <td id="priority${counter}">${priority}</td>
        <td id="status${counter}" class="statusColumn">0</td>
        <td id="mark${counter}" ><box-icon name='x-circle'></box-icon></td>
        <td>
            <button onclick="edit(${counter})"><box-icon name='edit' ></box-icon></button>
            <button onclick="del(${counter})"><box-icon name='trash' ></box-icon></button> 
            <button onclick="complete('${counter}','${title}','${description}','${dueDate}','${priority}')"><box-icon name='check-circle'></box-icon></button>
        </td>
    </tr>
    `;
}

//This function is to cancel editing after the task completed
function cancelEdit2(counter,title,description,dueDate,priority){
    document.getElementById("row"+counter).innerHTML =
    `
    <tr>
        <td id="title${counter}">${title}</td>
        <td id="description${counter}">${description}</td>
        <td id="due-date${counter}">${dueDate}</td>
        <td id="priority${counter}">${priority}</td>
        <td id="status${counter}" class="statusColumn">1</td>
        <td id="mark${counter}" ><box-icon name='check-circle'></box-icon></td>
        <td>
            <button onclick="edit2(${counter})"><box-icon name='edit' ></box-icon></button>
        </td>
    </tr>
    `;
}

//This function is to save edited task
function save(counter){
    const title = document.getElementById('title'+counter).value;
    const description = document.getElementById('description'+counter).value;
    const dueDate = document.getElementById('due-date'+counter).value;
    const priority = document.getElementById('priority'+counter).value;

    if (title && description && dueDate && priority) {
    document.getElementById("row"+counter).innerHTML =
    `
    <tr>
        <td id="title${counter}">${title}</td>
        <td id="description${counter}">${description}</td>
        <td id="due-date${counter}">${dueDate}</td>
        <td id="priority${counter}">${priority}</td>
        <td id="status${counter}" class="statusColumn">0</td>
        <td id="mark${counter}" ><box-icon name='x-circle'></box-icon></td>
        <td>
            <button onclick="edit(${counter})"><box-icon name='edit' ></box-icon></button>
            <button onclick="del(${counter})"><box-icon name='trash' ></box-icon></button> 
            <button onclick="complete('${counter}','${title}','${description}','${dueDate}','${priority}')"><box-icon name='check-circle'></box-icon></button>
        </td>
    </tr>
    `;

    alert('Task save successfully!');
    } else {
        alert('Please fill in all the required fields.');
    }
}

//This function is to delete task
function del(counter){
    let text = "Are you sure want to delete this task?";
    if (confirm(text) == true) {
        document.getElementById("row"+counter).innerHTML =``
        alert("The task has been successfully deleted!");
    } else {
        
    }
}

//This function is to mark task as complete
function complete(counter,title,description,dueDate,priority){
    let text = "Are you sure want to mark this task as completed?";
    if (confirm(text) == true) {
        document.getElementById("row"+counter).innerHTML =
    `
    <tr>
        <td id="title${counter}">${title}</td>
        <td id="description${counter}">${description}</td>
        <td id="due-date${counter}">${dueDate}</td>
        <td id="priority${counter}">${priority}</td>
        <td id="status${counter}" class="statusColumn">1</td>
        <td id="mark${counter}" ><box-icon name='check-circle'></box-icon></td>
        <td>
            <button onclick="edit2(${counter})"><box-icon name='edit' ></box-icon></button>
        </td>
    </tr>
    `;
    alert("The task has been successfully marked as completed!");

    } else {
        
    }
}
