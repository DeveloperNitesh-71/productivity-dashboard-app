const addTask = document.getElementById("AddNewTaskIcon");
const AddNewTaskSection = document.querySelector(".createNewTaskSection");
const closeAddNewTaskSection = document.querySelector(".cutCreateNewTaskSection");
const EmptyInput = document.querySelector(".EmptyInput");

let TaskArr = JSON.parse(localStorage.getItem("Task")) || [];

//removing hide class form task add section
addTask.addEventListener("click", () => {
    AddNewTaskSection.classList.add("hide")
})

//adding hide class form task add section
closeAddNewTaskSection.addEventListener("click", () => {
    NewTaskTitle.value = ""
    EmptyInput.style.display = "none"
    AddNewTaskSection.classList.remove("hide")
})

// generate random id for each task 
function GenerateId(div) {
    const Calphs = "ABhijklmnPQcdeEFLRSTopIJqrstuCDvMNO128wxyzUGHKV34567WXYZabfg90"
    let UniqueId = "";
    let i = 0;
    while (i < 16) {
        let Rnum = Math.floor(Math.random() * 60)
        UniqueId += Calphs[Rnum];
        i++
    }
    div.setAttribute("id", `${UniqueId}`)
}


//adding new task
const NewTaskTitle = document.getElementById("NewTaskTitle")
const AddTaskBtn = document.querySelector(".addNewTask")
const InitialTaskContainer = document.querySelector(".InitialTaskContainer")
const PendingTaskContainer = document.querySelector(".PendingTaskContainer")
const CompletedTaskContainer = document.querySelector(".CompletedTaskContainer")
let SelectedDrager = null;

function createTaskCard() {
    let div = document.createElement("div");
    div.classList.add("Tasks")
    div.draggable = true;
    div.dataset.status = "new";
    GenerateId(div);
    let span = document.createElement("span");
    span.classList.add("TaskTitle")
    span.textContent = NewTaskTitle.value;
    let i = document.createElement("i")
    i.classList.add("fa-regular");
    i.classList.add("fa-trash-can")
    i.classList.add("trash")
    div.appendChild(span)
    div.appendChild(i)
    div.addEventListener("dragstart", (drager) => {
        SelectedDrager = drager.target;
    });
    TotalTask++;
    let Uid = div.getAttribute("id")
    IncreaseTotalTaskCount()
    deletTask(i)
    AddingInStorage(NewTaskTitle.value, "new", Uid)
    InitialTaskContainer.appendChild(div);
    UpdateProgressBar()
}

AddTaskBtn.addEventListener("click", () => {
    if (NewTaskTitle.value !== "") {
        createTaskCard();
        NewTaskTitle.value = "";
        EmptyInput.style.display = "none"
        AddNewTaskSection.classList.remove("hide")
    }
    else {
        EmptyInput.style.display = "block"
        EmptyInput.textContent = "Task title can't be empty!!"
    }

})

//deleting task
function deletTask(btn) {
    btn.addEventListener("click", () => {
        if (btn.parentElement.dataset.status === "pending") {
            TotalPendingTask--;
            TotalTask--;
        }
        else if (btn.parentElement.dataset.status === "completed") {
            TotalCompletedTask--;
            TotalTask--;
        }
        else {
            TotalTask--;
        }
        IncreaseTotalTaskCount()
        DeleteFromStorage(btn)
        btn.parentElement.remove()
        UpdateProgressBar()
    })
}

const deletBtn = document.querySelectorAll(".trash");
deletBtn.forEach(delbtn => {
    deletTask(delbtn)
})

//editing tasks
const EditTaskSection = document.querySelector(".EditTaskSection")
const tasks = document.querySelectorAll(".Tasks");
const TaskTitleToBeEdit = document.querySelector(".TaskTitleToBeEdit")
let selecteTaskToEdit = null;
let mode = null;
function TaskcontainerListener(TaskContainer) {
    TaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("TaskTitle")) {
            mode = "EditingTask";
            selecteTaskToEdit = e.target;
            EditTaskSection.classList.add("hide")
            TaskTitleToBeEdit.value = selecteTaskToEdit.textContent;
        }
    })
}

const taskBlocks = document.querySelectorAll(".taskBlock");
taskBlocks.forEach(taskBlock => {
    TaskcontainerListener(taskBlock)
})


//saving edited task 
let selecteTaskToEdited = selecteTaskToEdit;
const Save = document.querySelector(".save");
Save.addEventListener("click", () => {
    if (mode === "EditingTask") {
        ChangeTaskName()
    }
    else {
        ChangeTaskContainerName()
    }
})

const EmptyTaskTitle = document.querySelector(".EmptyTaskTitle")
function ChangeTaskName(selecteTaskToEdited) {
    if (selecteTaskToEdited !== null) {
        if (TaskTitleToBeEdit.value !== "") {
            selecteTaskToEdit.textContent = TaskTitleToBeEdit.value
            UpdateTaskValueInStorage(selecteTaskToEdit, TaskTitleToBeEdit.value)
            TaskTitleToBeEdit.value = "";
            selecteTaskToEdit = null;
            EmptyTaskTitle.style.display = "none"
            EditTaskSection.classList.remove("hide");
        }
        else {
            EmptyTaskTitle.style.display = "block"
            EmptyTaskTitle.textContent = "Task Title can't be empyt!!"
        }
    }
    else {
        return;
    }
}
//cancling Editing of task 
const cancle = document.querySelector(".cancle")
cancle.addEventListener("click", () => {
    EmptyTaskTitle.style.display = "none"
    EditTaskSection.classList.remove("hide")
})

//closing Edit task section
const cutEditTaskSection = document.querySelector(".cutEditTaskSection")
cutEditTaskSection.addEventListener("click", () => {
    EmptyTaskTitle.style.display = "none"
    EditTaskSection.classList.remove("hide")
})

//edit name of task container
const TaskContainerHeadings = document.querySelectorAll(".TaskContainerHeading")
let SelectedContainerHeading = null;
let SelectedContainerId = null;
TaskContainerHeadings.forEach(TaskContainerHeading => {
    TaskContainerHeading.addEventListener("click", (event) => {
        if (event.target.classList.contains("EditHeading")) {
            mode = "EditingTaskContainer";
            SelectedContainerId = event.target.parentElement.parentElement.parentElement.getAttribute("id")
            SelectedContainerHeading = event.target.parentElement.parentElement.querySelector("span")
            EditTaskSection.classList.add("hide")
            TaskTitleToBeEdit.value = SelectedContainerHeading.textContent;
        }
    })
})

//saving edited task container heading
let SelecteContainerHeading = SelectedContainerHeading;
let SelecteContainerId = SelectedContainerId;
function ChangeTaskContainerName(SelecteContainerHeading, SelecteContainerId) {
    if (SelecteContainerHeading !== null) {
        if (TaskTitleToBeEdit.value !== "") {
            console.log(SelecteContainerId);
            TaskCotainerNameStored(TaskTitleToBeEdit.value, SelecteContainerId)
            SelectedContainerHeading.textContent = TaskTitleToBeEdit.value
            TaskTitleToBeEdit.value = "";
            SelectedContainerHeading = null;
            SelectedContainerId = null;
            EmptyTaskTitle.style.display = "none"
            EditTaskSection.classList.remove("hide")
        }
        else {
            EmptyTaskTitle.style.display = "block"
            EmptyTaskTitle.textContent = "Container name can't be empty!!"
        }
    }
    else {
        return;
    }
}



//Drag and Drop Functionality
tasks.forEach(task => {
    task.addEventListener("dragstart", (drager) => {
        SelectedDrager = drager.target;
    });
});

function StopDrag(Container) {
    Container.addEventListener("dragover", (drager) => {
        drager.preventDefault();
    });
    Container.addEventListener("drop", (drager) => {
        UpdateInStorage(SelectedDrager, Container);
        Container.appendChild(SelectedDrager);
        if (SelectedDrager.dataset.status !== Container.dataset.status) {
            if (Container.dataset.status === "pending") {
                if (SelectedDrager.dataset.status === "completed") {
                    TotalCompletedTask--;
                }
                TotalPendingTask++;
            }
            if (Container.dataset.status === "completed") {
                if (SelectedDrager.dataset.status === "pending") {
                    TotalPendingTask--;
                }
                TotalCompletedTask++;
            }
            if (Container.dataset.status === "new") {
                if (SelectedDrager.dataset.status === "pending") {
                    TotalPendingTask--;
                }
                if (SelectedDrager.dataset.status === "completed") {
                    TotalCompletedTask--;
                }
            }
            UpdateProgressBar()
        }
        SelectedDrager.dataset.status = Container.dataset.status;
        IncreaseTotalTaskCount()
        SelectedDrager = null;
    });
};

const TasksContainer = document.querySelectorAll(".TasksContainer")
TasksContainer.forEach(TaskContainer => {
    StopDrag(TaskContainer);
});


// Add tasks in localStorage

function AddingInStorage(TaskName, TaskStatus, id) {
    let TaskObj = {
        Taskname: TaskName,
        status: TaskStatus,
        id: id
    }
    TaskArr.push(TaskObj)
    localStorage.setItem("Task", JSON.stringify(TaskArr))
}

//updating states of task in localstorage
function UpdateInStorage(SelectedElement, container) {
    if (TaskArr.length > 0) {
        TaskArr = TaskArr.map(element => {
            if (element.id === SelectedElement.getAttribute("id")) {
                return {
                    ...element,
                    status: container.dataset.status
                }
            }
            return element;
        })
        localStorage.setItem("Task", JSON.stringify(TaskArr))
    }
}

//delete from localStorage
function DeleteFromStorage(delBtn) {
    TaskArr = TaskArr.filter(element => {
        if (element.id !== delBtn.parentElement.getAttribute("id")) {
            return element;
        }
    })
    localStorage.setItem("Task", JSON.stringify(TaskArr))
}


//rendering from localStorage
function createTaskCardFromStorage() {
    TaskArr.forEach(Task => {
        let div = document.createElement("div");
        div.classList.add("Tasks")
        div.draggable = true;
        div.dataset.status = `${Task.status}`;
        div.setAttribute("id", `${Task.id}`)
        let span = document.createElement("span");
        span.classList.add("TaskTitle")
        span.textContent = Task.Taskname;
        let i = document.createElement("i")
        i.classList.add("fa-regular");
        i.classList.add("fa-trash-can")
        i.classList.add("trash")
        div.appendChild(span)
        div.appendChild(i)
        div.addEventListener("dragstart", (drager) => {
            SelectedDrager = drager.target;
        });
        deletTask(i)
        if (Task.status === "new") {
            InitialTaskContainer.appendChild(div)
        }
        else if (Task.status === "pending") {
            PendingTaskContainer.appendChild(div)
        }
        else {
            CompletedTaskContainer.appendChild(div)
        }
    })
}
createTaskCardFromStorage()

//updating task name in localStorage;

function UpdateTaskValueInStorage(EditableElement, NewTask) {
    TaskArr = TaskArr.map(Task => {
        if (Task.id === EditableElement.parentElement.getAttribute("id")) {
            return {
                ...Task,
                Taskname: NewTask
            }
        }
    })
    localStorage.setItem("Task", JSON.stringify(TaskArr))
}


//store task container names in localstorage
function TaskCotainerNameStored(TaskContainerNewName, ContainerId) {
    let TasksContainersName = JSON.parse(localStorage.getItem("TaskContainersName")) || [];
    let ContainersName = {
        TaskContainerName: TaskContainerNewName,
        ContainerId: ContainerId
    }
    TasksContainersName.push(ContainersName)
    localStorage.setItem("TaskContainersName", JSON.stringify(TasksContainersName))
}