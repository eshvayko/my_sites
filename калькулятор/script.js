const value = document.querySelector('#number');

function read(operation) {
    if (operation == 'C') {
        value.value = '0';
    } else if ((value.value == '0') && (operation !== '.')) {
        if (operation == '<') {
            return;
        }
        value.value = operation;
    } else if (operation == '<') {
        if ((value.value == 'ошибка') || (value.value == 'Infinity')) {
            value.value = '0';
        }
        value.value = value.value.substring(0, value.value.length - 1);
        if (value.value == '') {
            value.value = '0';
        }
    } else if (operation == '=') {
        count();
    } else {
        value.value += operation;
    }
}

function count() {
    try {
        value.value = eval(value.value);
    } catch(err) {
        value.value = 'ошибка';
    }
}
