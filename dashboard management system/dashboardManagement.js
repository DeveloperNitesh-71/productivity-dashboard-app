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
    if(TotalTask !== 0){
        let percent = Math.round((TotalCompletedTask/TotalTask)*100);
        percentage.textContent = percent + "%"
        Progressbar.style.background = `linear-gradient(90deg, green ${percent}%, rgb(255, 255, 255) ${percent}%)`;
    }
}
UpdateProgressBar()


//login
const loginbtn = document.querySelector(".Login")
const UserName = document.querySelector(".UserName")
const DashBoardName = document.querySelector(".name-date h1")
const userLoginPopUpBack = document.querySelector(".userLoginPopUpBack")
const UserNameError = document.querySelector(".UserNameError")
loginbtn.addEventListener("click", () => {
    if(UserName.value !== ""){
        userLoginPopUpBack.classList.add("none")
        DashBoardName.textContent = `Hi, ${UserName.value}`
         DashBoardName.style.textTransform = "capitalize"
        StoreUserName(UserName.value)
        UserNameError.classList.add("none")
        UserName.value = ""
    }
    else{
        UserNameError.classList.remove("none")
    }
})

//store username in localstorage
let userName = JSON.parse(localStorage.getItem("userName")) || []
function StoreUserName(username) {
    let Username = {
        UserName: username
    }
    userName.push(Username)
    localStorage.setItem("userName", JSON.stringify(userName))
}

//check if username exist
function CheckUserName() {
    userName.map(name => {
        if(name.UserName){
            userLoginPopUpBack.classList.add("none")
            DashBoardName.textContent = `Hi, ${name.UserName}`
            DashBoardName.style.textTransform = "capitalize";
        }
    })
}
CheckUserName()