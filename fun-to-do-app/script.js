/* ==========================================
   TO-DO APP
========================================== */


/* ==========================================
   GET HTML ELEMENTS
========================================== */

const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const emptyMessage = document.getElementById("emptyMessage");

const clearCompleted =
    document.getElementById("clearCompleted");

const filterButtons =
    document.querySelectorAll(".filter-button");

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");


/* ==========================================
   LOAD SAVED TASKS
========================================== */

let tasks =
    JSON.parse(localStorage.getItem("myTasks")) || [];

let currentFilter = "all";


/* ==========================================
   SAVE TASKS
========================================== */

function saveTasks() {

    localStorage.setItem(
        "myTasks",
        JSON.stringify(tasks)
    );

}


/* ==========================================
   DISPLAY TASKS
========================================== */

function displayTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    /* FILTER */

    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(task => !task.completed);

    }


    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(task => task.completed);

    }


    /* EMPTY MESSAGE */

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    /* CREATE TASKS */

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";


        if (task.completed) {

            li.classList.add("completed");

        }


        /* CHECK BUTTON */

        const checkButton =
            document.createElement("button");

        checkButton.className = "task-check";

        checkButton.setAttribute(
            "aria-label",
            "Complete task"
        );


        checkButton.addEventListener(
            "click",
            () => toggleTask(task.id)
        );


        /* TASK TEXT */

        const text =
            document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        /* DELETE BUTTON */

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-task";

        deleteButton.textContent = "×";

        deleteButton.setAttribute(
            "aria-label",
            "Delete task"
        );


        deleteButton.addEventListener(
            "click",
            () => deleteTask(task.id)
        );


        /* ADD ELEMENTS */

        li.appendChild(checkButton);

        li.appendChild(text);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateTaskCount();

    updateProgress();

}


/* ==========================================
   ADD TASK
========================================== */

function addTask() {

    const taskText =
        taskInput.value.trim();


    if (taskText === "") {

        taskInput.focus();

        return;

    }


    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    taskInput.focus();

}


/* ==========================================
   COMPLETE TASK
========================================== */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    displayTasks();


    checkForCelebration();

}


/* ==========================================
   DELETE TASK
========================================== */

function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);


    saveTasks();

    displayTasks();

}


/* ==========================================
   CLEAR COMPLETED
========================================== */

clearCompleted.addEventListener(
    "click",
    () => {

        tasks =
            tasks.filter(task => !task.completed);

        saveTasks();

        displayTasks();

    }
);


/* ==========================================
   TASK COUNT
========================================== */

function updateTaskCount() {

    const remaining =
        tasks.filter(task => !task.completed).length;


    taskCount.textContent = remaining;

}


/* ==========================================
   PROGRESS
========================================== */

function updateProgress() {

    if (tasks.length === 0) {

        progressFill.style.width = "0%";

        progressPercent.textContent = "0%";

        return;

    }


    const completed =
        tasks.filter(task => task.completed).length;


    const percentage =
        Math.round(
            (completed / tasks.length) * 100
        );


    progressFill.style.width =
        percentage + "%";

    progressPercent.textContent =
        percentage + "%";

}


/* ==========================================
   CELEBRATION
========================================== */

function checkForCelebration() {

    if (
        tasks.length > 0 &&
        tasks.every(task => task.completed)
    ) {

        setTimeout(() => {

            alert(
                "🎉 Great job! You completed everything!"
            );

        }, 200);

    }

}


/* ==========================================
   FILTERS
========================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            displayTasks();

        }
    );

});


/* ==========================================
   ADD BUTTON
========================================== */

addButton.addEventListener(
    "click",
    addTask
);


/* ==========================================
   ENTER KEY
========================================== */

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* ==========================================
   START APP
========================================== */

displayTasks();