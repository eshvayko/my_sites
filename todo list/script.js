const input = document.querySelector('input');
const persentInfo = document.querySelector('.persent');
const list = document.querySelector('.list');

if (localStorage.getItem('maxtasks') === undefined) {
    localStorage.setItem('maxtasks', 0);
}
let tasks = localStorage.length - 1;
let maxtasks = localStorage.getItem('maxtasks');
loadTasks();
let completeTasks = countCompleteTasks();
countPersent();

document.onkeydown = (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
}

function countCompleteTasks() {
    let ct = 0;
    for (let num = 0; num <= maxtasks; num++) {
        try {
            if (document.querySelector(`.task${num} .text`).classList.contains('checked')) {
                ct++;
            }
        } catch {}
    }
    return ct;
}

function loadTasks() {
    for (let num = 0; num <= maxtasks; num++) {
        if (localStorage.getItem(`task${num}`) !== null) {
            list.innerHTML += localStorage.getItem(`task${num}`);
        }
    }
}

function countPersent() {
    if (tasks === 0) {
        persentInfo.innerHTML = '- ';
    } else {
        persentInfo.innerHTML = Math.floor(completeTasks / tasks * 100 * 100) / 100;
    }
}

function addTask() {
    if (input.value !== '') {
        list.innerHTML += `<li class="task${tasks}"><i class="i-check" onclick="checkTask(${tasks})" style="margin-right:10px"></i><span class="text">${input.value}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${tasks})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${tasks})"></i></span></li>`;
        localStorage.setItem(`task${tasks}`, `<li class="task${tasks}"><i class="i-check" onclick="checkTask(${tasks})" style="margin-right:10px"></i><span class="text">${input.value}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${tasks})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${tasks})"></i></span></li>`);
        input.value = '';
        tasks++;
        if (tasks > maxtasks) {
            maxtasks = tasks;
            localStorage.setItem('maxtasks', maxtasks);
        }
        countPersent();
    }
}

function deleteTask(num) {
    if (document.querySelector(`.task${num} .text`).classList.contains('checked')) {
        completeTasks--;
    }
    document.querySelector(`.task${num}`).remove();
    tasks--;
    countPersent();
    localStorage.removeItem(`task${num}`);
}

function deleteAll() {
    list.innerHTML = '';
    tasks = 0;
    completeTasks = 0;
    countPersent();
    localStorage.clear();
}

function checkTask(num) {
    if (!document.querySelector(`.task${num} .text`).classList.contains('checked')) {
        document.querySelector(`.task${num} .text`).className += ' checked';
        document.querySelector(`.task${num} .i-check`).className += ' checked-2';
        completeTasks++;
        countPersent();
        localStorage.setItem(`task${num}`, `<li class="task${num}"><i class="i-check checked-2" onclick="checkTask(${num})" style="margin-right:10px"></i><span class="text checked">${document.querySelector(`.task${num} .text`).innerHTML}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${num})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${num})"></i></span></li>`);
    }
}

function deleteDoneTasks() {
    for (let num = 0; num <= maxtasks; num++) {
        try {
            if (document.querySelector(`.task${num} .text`).classList.contains('checked')) {
                document.querySelector(`.task${num}`).remove();
                completeTasks--;
                tasks--;
                countPersent();
                localStorage.removeItem(`task${num}`);
            }
        } catch {}
    }
}

function editTask(num) {
    if (input.value !== '') {
        document.querySelector(`.task${num} .text`).innerHTML = input.value;
        if (!document.querySelector(`.task${num} .text`).classList.contains('checked')) {
            localStorage.setItem(`task${num}`, `<li class="task${num}"><i class="i-check" onclick="checkTask(${num})" style="margin-right:10px"></i><span class="text">${input.value}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${num})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${num})"></i></span></li>`);
        } else {
            localStorage.setItem(`task${num}`, `<li class="task${num}"><i class="i-check checked-2" onclick="checkTask(${num})" style="margin-right:10px"></i><span class="text checked">${input.value}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${num})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${num})"></i></span></li>`);
        }
        input.value = '';
    }
}
