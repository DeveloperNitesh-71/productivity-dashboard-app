//updating total task count, completed task count and pending task count or showing them;
const totalTaskCount = document.querySelector(".totalTaskCount");
const TotalCompletedTasksCount = document.querySelector(".TotalCompletedTasks");
const TotalPendingTasksCount = document.querySelector(".TotalPendingTasks")

const PendingTasksContainer = document.querySelector(".PendingTaskContainer")
const CompletedTasksContainer = document.querySelector(".CompletedTaskContainer")

let TotalTask = 0;
let TotalCompletedTask = 0;
let TotalPendingTask = 0;
let dataset = document.querySelectorAll(".Tasks[data-status]");

dataset.forEach(data => {
    TotalTask++;
    if(data.dataset.status === "pending"){
        TotalPendingTask++;
    }
    if(data.dataset.status === "completed"){
        TotalCompletedTask++;
    }
})

function IncreaseTotalTaskCount() {
    totalTaskCount.textContent = TotalTask;
    TotalCompletedTasksCount.textContent = TotalCompletedTask;
    TotalPendingTasksCount.textContent = TotalPendingTask;
}
IncreaseTotalTaskCount()


//updating progress bar

const Progressbar = document.querySelector(".progressbar")
const percentage = document.querySelector(".percent")
function UpdateProgressBar() {
    let percent = Math.round((TotalCompletedTask/TotalTask)*100);
    percentage.textContent = percent + "%"
    Progressbar.style.background = `linear-gradient(90deg, green ${percent}%, rgb(255, 255, 255) ${percent}%)`;
}

UpdateProgressBar()


