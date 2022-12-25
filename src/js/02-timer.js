import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const container = document.querySelector('.timer');

container.style.display = "flex";
container.style.gap = "50px";
container.style.justifyContent = "center";
container.style.marginTop = "40px";
for (const child of container.children) {
    child.style.display = "flex";
    child.style.flexDirection = "column";
    child.style.alignItems = "center";
}
days.style.fontSize = "35px";
hours.style.fontSize = "35px";
minutes.style.fontSize = "35px";
seconds.style.fontSize = "35px";

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0])
        if (selectedDates[0] < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
            startBtn.disabled = false;
        }
    },
};

const fp = flatpickr(input, options);

startBtn.addEventListener('click', handleStart);

function handleStart(evt) {
    const selectedDate = fp.selectedDates[0].getTime();
    const intervalID = setInterval(() => {
        const currentDate = Date.now();;
        const timer = convertMs(selectedDate - currentDate);
        if (selectedDate > currentDate) {
            days.textContent = addLeadingZero(timer.days);
            hours.textContent = addLeadingZero(timer.hours);
            minutes.textContent = addLeadingZero(timer.minutes);
            seconds.textContent = addLeadingZero(timer.seconds);
        }
        else {
            clearInterval(intervalID);
            Notiflix.Notify.success('The time has come :D');
        }
    }, 1000)
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

function addLeadingZero(item) {
    return String(item).padStart(2, '0');
}
