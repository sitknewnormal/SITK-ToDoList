'use script'

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme')
    let className = document.body.className;
    this.textContent = className == "light-theme" ? "Dark" : "Light";
    console.log('current <body> class name: ' + className);
});

let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", addToDoItem);
function addToDoItem() {
    let itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    saveList();
}

let clearCompletedBtn = document.getElementById("clear-completed-btn");
clearCompletedBtn.addEventListener("click", clearCompletedToDoItems);
function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
    saveList();
}

let emptyBtn = document.getElementById("empty-btn");
emptyBtn.addEventListener("click", emptyList);
function emptyList() {
    let toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    saveList();
}

let saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", saveList);
function saveList() {
    const toDos = [];
    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);
        let toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

let toDoEntryBox = document.getElementById("todo-entry-box");
let toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    let toDoItem = document.createElement("li");
    let toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    this.classList.contains("completed") ? this.classList.remove("completed") : this.classList.add("completed");
    saveList();
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        let toDos = JSON.parse(localStorage.getItem("toDos"));

        for (let i = 0; i < toDos.length; i++) {
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList();