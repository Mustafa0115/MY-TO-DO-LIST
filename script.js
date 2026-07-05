let taskinput = document.getElementById("taskinput");
let addbtn = document.getElementById("addbtn");
let message = document.getElementById("message");
let taskcount = document.getElementById("taskcount");
let tasklist = document.getElementById("tasklist");

const STORAGE_KEY = "todoTasks";
let tasks = [];

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateTaskCount() {
    taskcount.textContent = tasks.length;
}

function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const taskspan = document.createElement("span");
    taskspan.textContent = task.text;
    taskspan.className = "task-text";

    const noteinput = document.createElement("input");
    noteinput.type = "text";
    noteinput.placeholder = "Add a note";
    noteinput.value = task.note || "";
    noteinput.className = "task-note";

    noteinput.addEventListener("input", function () {
        tasks[index].note = noteinput.value;
        saveTasks();
    });

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.className = "delete-btn";

    deletebtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        message.textContent = "Task Deleted!";
    });

    listItem.appendChild(taskspan);
    listItem.appendChild(noteinput);
    listItem.appendChild(deletebtn);
    return listItem;
}

function renderTasks() {
    tasklist.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasklist.appendChild(taskElement);
    });
    updateTaskCount();
}

function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (error) {
            tasks = [];
        }
    }
}

addbtn.addEventListener("click", function () {
    const tasktext = taskinput.value.trim();
    if (tasktext === "") {
        message.textContent = "Please Enter Your Task!";
        return;
    }

    tasks.push({ text: tasktext, note: "" });
    saveTasks();
    renderTasks();

    taskinput.value = "";
    message.textContent = "Task added successfully!";
});

loadTasks();
renderTasks();