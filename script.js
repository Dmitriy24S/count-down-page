const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// temp date
const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();

// giveaway date
const fullEndDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
const fullEndDateTimeInMs = fullEndDate.getTime();
// launch date
const fullLaunchDate = new Date(tempYear, tempMonth + 2, tempDay + 10, 6, 00, 0);
const fullLaunchDateTimeInMs = fullLaunchDate.getTime();

let endDateYear = fullEndDate.getFullYear();
let endDateMonth = fullEndDate.getMonth();
endDateMonth = months[endDateMonth]; // month text
let endDateDay = fullEndDate.getDate();
let weekDayText = weekdays[Math.floor(fullEndDate.getDay())]; // week day text
let endDateHour = fullEndDate.getHours();
let endDateMinutes = fullEndDate.getMinutes();

// giveaway end date info text
const endDateTextSection = document.querySelector(".info h4");

endDateTextSection.textContent = `Giveaway ends on ${weekDayText}, ${endDateMonth} ${endDateDay} ${endDateYear} at ${endDateHour}:${endDateMinutes}am`;

// giveaway elements
const countdownNumberElements = document.querySelectorAll(".countdown-number h4");
// launch time elements
const launchCountdownNumberElements = document.querySelectorAll(".launch-countdown-number h4");

// calculate timer func
const calculateRemainingTime = () => {
  const todayInMs = new Date().getTime();
  const timeDifference = fullEndDateTimeInMs - todayInMs; // time difference between dates in ms
  const launchTimeDifference = fullLaunchDateTimeInMs - todayInMs;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr

  // values in miliseconds
  const oneMinute = 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  // giveaway calculate all values
  let days = Math.floor(timeDifference / oneDay);
  let hours = Math.floor((timeDifference % oneDay) / oneHour);
  let minutes = Math.floor((timeDifference % oneHour) / oneMinute);
  let seconds = Math.floor((timeDifference % oneMinute) / 1000);

  // launch calcualte all values
  let launchDays = Math.floor(launchTimeDifference / oneDay);
  let launchHours = Math.floor((launchTimeDifference % oneDay) / oneHour);
  let launchMinutes = Math.floor((launchTimeDifference % oneHour) / oneMinute);
  let launchSeconds = Math.floor((launchTimeDifference % oneMinute) / 1000);

  // set number values array
  const giveawayValues = [days, hours, minutes, seconds];
  const launchValues = [launchDays, launchHours, launchMinutes, launchSeconds];

  // format number to 2 digits func
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  // insert countdown numbers
  countdownNumberElements.forEach((num, index) => {
    num.innerHTML = format(giveawayValues[index]);
  });
  // insert launch countdown numbers
  launchCountdownNumberElements.forEach((num, index) => {
    num.innerHTML = format(launchValues[index]);
  });

  // check if giveaway is over
  if (timeDifference < 0) {
    clearInterval(countdown);
    endDateText.innerHTML = `<h4 class='expired'>This giveaway has ended.</h4>`;
  }
};

// countdown func
let countdown = setInterval(calculateRemainingTime, 1000);
calculateRemainingTime();
