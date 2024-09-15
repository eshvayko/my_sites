const input = document.querySelector('input');
const persentInfo = document.querySelector('.persent');
const list = document.querySelector('.list');

var tasks = 0;
var maxtasks = 0;
var completeTasks = 0;

document.onkeydown = (event) => {
    if (event.keyCode == 13) {
        addTask();
    }
}

function countPersent() {
    if (tasks == 0) {
        persentInfo.innerHTML = '- ';
    } else {
        var persent = Math.floor(completeTasks / tasks * 100 * 100) / 100;
        persentInfo.innerHTML = persent;
    }
}

function addTask() {
    if (input.value != '') {
        list.innerHTML += `<li class="task${tasks}"><i class="i-check" onclick="checkTask(${tasks})" style="margin-right:10px"></i><span class="text">${input.value}</span><span class="buttonsli"><i class="i-pen" onclick="editTask(${tasks})" style="margin-right: 10px"></i><i class="i-trash-can" onclick="deleteTask(${tasks})"></i></span></li>`;
        input.value = '';
        tasks++;
        if (tasks > maxtasks) {
            maxtasks = tasks;
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
}

function deleteAll() {
    list.innerHTML = '';
    tasks = 0;
    completeTasks = 0;
    countPersent();
}

function checkTask(num) {
    if (!document.querySelector(`.task${num} .text`).classList.contains('checked')) {
        document.querySelector(`.task${num} .text`).className += ' checked';
        document.querySelector(`.task${num} .i-check`).className += ' checked-2';
        completeTasks++;
        countPersent();
    }
}

function deleteDoneTasks() {
    for (var num = 0; num <= maxtasks; num++) {
        try {
            if (document.querySelector(`.task${num} .text`).classList.contains('checked')) {
                document.querySelector(`.task${num}`).remove();
                completeTasks--;
                tasks--;
                countPersent();
            }
        } catch {}
    }
}

function editTask(num) {
    if (input.value != '') {
        document.querySelector(`.task${num} .text`).innerHTML = input.value;
        input.value = '';
    }
}
