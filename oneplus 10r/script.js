var days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const dayweek = document.querySelector('.dweek');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

var weeklast, hourslast, minuteslast, datelast, monthlast;

function checkZero(time) {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

function checkRedOne(time) {
    if (time > 9 && time < 20) {
        if (time == 11) {
            return '<span class="one">11</span>';
        } else {
            return `<span class="one">1</span>${time - 10}`;
        }
    } else if (time == 21) {
        return `2<span class="one">1</span>`;
    } else {
        return time;
    }
}

function update() {
    var data = new Date();
    if (weeklast != data.getDay() || hourslast != data.getHours() || minuteslast != data.getMinutes() || datelast != data.getDate() || monthlast != data.getMonth()) {
        dayweek.innerHTML = days[data.getDay()];
        time.innerHTML = `${checkZero(checkRedOne(data.getHours()))}:${checkZero(data.getMinutes())}`;
        date.innerHTML = `<span class="twone">${data.getDate()}</span> ${months[data.getMonth()]}`;
        weeklast = data.getDay();
        hourslast = data.getHours();
        minuteslast = data.getMinutes();
        datelast = data.getDate();
        monthlast = data.getMonth();
    }
}

setInterval(update, 100);

function unlock() {
    document.querySelector('.oneplus').innerHTML = '<div class="right_btn"></div><div class="left_btn_one"></div><div class="left_btn_two"></div><div class="circle"><div class="center-circle"></div></div>';
    // document.querySelector('.oneplus').style = 'background-image: url(images/максим2.jpg);';
    document.querySelector('.oneplus').style = 'background-image: url(images/кириешки.png);';
}
