let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

let contentNow = 1;

let weeklast, hourslast, minuteslast, datelast, monthlast, contentNowLast;

const updateTimeout = setInterval(update, 50);

let batteryLvl = Math.floor(Math.random() * 101) + 2;
showBatteryLvl();
if (batteryLvl > 0) {
    window.timeout = setInterval(showBatteryLvl, 10000);
}
function showBatteryLvl() {
    batteryLvl--;
    if (batteryLvl > 100) {
        batteryLvl = 100;
    }
    let batteryIcon;
    if (batteryLvl <= 0) {
        document.querySelector(`.content-${contentNow}`).innerHTML = 'а все 0%';
        document.querySelector('.oneplus').style.background = '';
        document.querySelector('.finger').remove();
        clearInterval(timeout);
        clearInterval(updateTimeout);
        return;
    }else if (batteryLvl < 10) {
        batteryIcon = 0;
    } else if (batteryLvl < 25) {
        batteryIcon = 1;
    } else if (batteryLvl < 60) {
        batteryIcon = 2;
    } else if (batteryLvl < 90) {
        batteryIcon = 3;
    } else if (batteryLvl >= 90) {
        batteryIcon = 4;
    }
    document.querySelector(`.content-${contentNow} .batteryInfo`).innerHTML = `<i class="i-battery-${batteryIcon} i-battery"></i> ${batteryLvl} %`;
}

let i = localStorage.getItem('i');
let timeGo = false;
showAnimation(1);
function showAnimation(time) {
    if (!(timeGo && contentNow !== 1)) {
        let positions = [47, 142, 210, 275, 345];
        function show() {
            timeGo = false;
            if (contentNow === 1) {
                document.querySelector('.content-1').style.marginTop = `${positions[i]}px`;
                document.querySelector('.content-1').style.animation = 'appear 0.9s forwards';
                document.querySelector('.i-finger').style.animation = 'appear-finger 0.9s forwards';
                i++;
                if (i >= positions.length) {
                    i = 0;
                }
                localStorage.setItem('i', i);
            }
        }
        setTimeout(show, time * 1000);
        timeGo = true;
    }
}

function showWeather() {
    let weathers = ['precipitation', 'clear', 'cloud', 'thunderstorm'];
    let temperature = Math.floor(Math.random() * 31) * [1, -1][Math.floor(Math.random() * 2)];
    if (temperature === -0) {
        temperature = 0;
    }
    if (temperature < 0) {
        weathers.pop();
    }
    let tempDay = temperature + Math.floor(Math.random() * 5);
    let tempNight = temperature - Math.floor(Math.random() * 5);
    let weather = weathers[Math.floor(Math.random() * weathers.length)];
    if (weather === 'precipitation' && temperature < 0) {
        weather = 'snow';
    } else if (temperature >= 0) {
        weather = 'rain';
    } else if (weather === 'clear' && new Date().getHours() >= 21) {
        weather = 'moon';
    } else if (weather === 'clear' && new Date().getHours() < 21) {
        weather = 'sun';
    }
    if (temperature > 0) {
        temperature = `+${temperature}`;
    }
    if (tempDay > 0) {
        tempDay = `+${tempDay}`;
    }
    if (tempNight > 0) {
        tempNight = `+${tempNight}`;
    }
    document.querySelector('#weather').innerHTML = `<i class="i-${weather} weather"></i>`;
    document.querySelector('#tempNow').innerHTML = `${temperature}&deg;`;
    document.querySelector('#tempDay').innerHTML = `${tempDay}&deg;`;
    document.querySelector('#tempNight').innerHTML = `${tempNight}&deg;`;
}

function checkZero(time) {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

function checkRedOne(time) {
    let className;
    if (contentNow > 1) {
        className = 'one-1';
    } else {
        className = 'one';
    }
    if (time > 9 && time < 20) {
        if (time === 11) {
            return `<span class="${className}">11</span>`;
        } else {
            return `<span class="${className}">1</span>${time - 10}`;
        }
    } else if (time === 21) {
        return `2<span class="${className}">1</span>`;
    } else {
        return time;
    }
}

function update() {
    if (batteryLvl <= 0) {
        return;
    }
    let className;
    if (contentNow > 1) {
        className = 'twone-1';
    } else {
        className = 'twone';
    }
    const dayweek = document.querySelector(`.content-${contentNow} .dweek`);
    const time = document.querySelector(`.content-${contentNow} .time`);
    const date = document.querySelector(`.content-${contentNow} .date`);
    let data = new Date();
    if (weeklast !== data.getDay() || hourslast !== data.getHours() || minuteslast !== data.getMinutes() || datelast !== data.getDate() || monthlast !== data.getMonth() || contentNowLast !== contentNow) {
        dayweek.innerHTML = days[data.getDay()];
        time.innerHTML = `${checkZero(checkRedOne(data.getHours()))}:${checkZero(data.getMinutes())}`;
        if (contentNow === 3) {
            document.querySelector('#time').innerHTML = `${checkZero(data.getHours())}:${checkZero(data.getMinutes())}`;
        }
        date.innerHTML = `<span class="${className}">${data.getDate()}</span> ${months[data.getMonth()]}`;
        weeklast = data.getDay();
        hourslast = data.getHours();
        minuteslast = data.getMinutes();
        datelast = data.getDate();
        monthlast = data.getMonth();
        contentNowLast = contentNow;
        batteryLvl++;
        showBatteryLvl();
    }
}

function unlock() {
    if (batteryLvl <= 0) {
        return;
    }
    if (contentNow === 1 || contentNow === 2) {
        document.querySelector('.oneplus').style = 'background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(images/wall-2.jpg) no-repeat center; image-rendering: pixelated; background-size: 350px;'; // image-rendering: pixelated - убирает размытие
        document.querySelector('.content-1').style = 'display: none';
        document.querySelector('.content-2').style = 'display: none';
        document.querySelector('.content-3').style = 'display: block';
        document.querySelector('.finger').style = 'display: none';
        contentNow = 3;
        showWeather();
    }

}

function turnOn() {
    if (batteryLvl <= 0) {
        return;
    }
    if (contentNow === 3) {
        document.querySelector('.oneplus').style = 'background: ';
        document.querySelector('.content-3').style = 'display: none;';
        document.querySelector('.content-2').style = 'display: none;';
        document.querySelector('.content-1').style = 'display: block;';
        document.querySelector('.finger').style = 'display: block';
        document.querySelector('.i-finger').style = 'opacity: 0';
        showAnimation(1.8);
        contentNow = 1;

    } else if (contentNow === 2) {
        document.querySelector('.oneplus').style = 'background: ';
        document.querySelector('.content-3').style = 'display: none;';
        document.querySelector('.content-2').style = 'display: none;';
        document.querySelector('.content-1').style = 'display: block;';
        document.querySelector('.i-finger').style = 'opacity: 0';
        showAnimation(1.8);
        contentNow = 1;
    } else {
        document.querySelector('.oneplus').style = 'background: url(images/wall.jpg) no-repeat center; background-size: 455px;';
        document.querySelector('.i-finger').style = 'opacity: 1';
        document.querySelector('.content-3').style = 'display: none;';
        document.querySelector('.content-1').style = 'display: none;';
        document.querySelector('.content-2').style = 'display: block;';
        contentNow = 2;
    }
}
