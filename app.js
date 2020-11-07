// Define UI Var

const AddTaskTxt = document.getElementById('NewTask');
const AddForm = document.getElementById('AddForm');
const AddButton = document.getElementById('Addbutton');

// console.log(AddButton, AddForm, AddTaskTxt);


const FilterTaskTxt = document.getElementById('FilterTask');
const FilterForm = document.getElementById('Filterform');
const ClearAllButton = document.getElementById('Filterbutton');

const Collection = document.querySelector('.collection');

//const Collection = document.querySelector('.delete');

//Load All Event listners
loadLocalStorage();
loadEventListner();

function loadLocalStorage() {
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks != null) {
        tasks.forEach(
            function (task) {

                //create li
                const li = document.createElement('li');
                //create class name
                li.className = "Task list-group-item d-flex ";
                //append text to the li
                li.appendChild(document.createTextNode(task));
                //create the cancle icon
                const link = document.createElement('a');
                //create class name
                link.className = 'delete d-flex ml-auto my-auto';
                //add the icon
                link.innerHTML = '<i class="fas fa-minus w3-large"></i>';
                //style the icon
                link.style.alignText = "right";
                link.style.fontSize = "1.5em"
                //append the icon to li
                li.appendChild(link);
                //append the li to ul collection
                Collection.appendChild(li);
            }
        );
    }
}

function loadEventListner() {

    // Add Task Event
    AddForm.addEventListener('submit', addTask);
    Collection.addEventListener('click', deleteTaskfun);
    FilterForm.addEventListener('submit', function (e) { e.preventDefault(); });
    ClearAllButton.addEventListener('click', ClearAllfun)
    FilterTaskTxt.addEventListener('keyup', filterTaskfun);


}

function addTask(e) {

    if (AddTaskTxt.value === '') {
        alert('Add Task');

    }
    else {
        //create li
        const li = document.createElement('li');
        //create class name
        li.className = "Task list-group-item d-flex ";
        //append text to the li
        li.appendChild(document.createTextNode(AddTaskTxt.value));
        //create the cancle icon
        const link = document.createElement('a');
        //create class name
        link.className = 'delete d-flex ml-auto my-auto';
        //add the icon
        link.innerHTML = '<i class="fas fa-minus w3-large"></i>';
        //style the icon
        link.style.alignText = "right";
        link.style.fontSize = "1.5em"
        //append the icon to li
        li.appendChild(link);
        //append the li to ul collection
        Collection.appendChild(li);

        //Store in local storage
        storeLocalStorage(li.textContent);

    }
    AddTaskTxt.value = '';
    e.preventDefault();
}

function storeLocalStorage(task) {

    let tasks = [];
    tasks = localStorage.getItem('tasks');
    if (tasks != null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    else {
        tasks = [];
        // tasks.push(JSON.stringify(task));
        // localStorage.setItem('tasks', JSON.stringify(tasks));
        // console.log(task);

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function deleteTaskfun(e) {
    const deleteIcon = e.target.parentElement.parentElement;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (deleteIcon.classList.contains('delete')) {

        var index = Array.prototype.indexOf.call(deleteIcon.parentElement.parentElement.children, deleteIcon.parentElement);
        //console.log(e.target.parentElement.parentElement.parentElement);

        tasks.splice(index, 1);

        // console.log(tasks);
        // console.log(typeof (tasks));
        // console.log(deleteIcon.parentElement);
        // console.log(index);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        deleteIcon.parentElement.remove();

    }
}



function ClearAllfun(e) {
    while (document.querySelector('.collection').firstChild) {
        document.querySelector('.collection').firstChild.remove();
    }
    localStorage.clear();

}

function filterTaskfun(e) {

    const text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll('li').forEach(
        function (task) {

            const item = task.firstChild.textContent;
            console.log(task);

            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.classList.remove('d-none');
                task.classList.add('d-flex');
                console.log('block');
            }
            else {
                task.classList.add('d-none');
                task.classList.remove('d-flex');
                // task.style.display = 'none';
                console.log('none');

            }

        }
    );
}