import { PGUp, PGDown } from "./schedulePO.js";

const burgerButton = document.querySelector(".burger");
const burgerNav = document.querySelector(".burger_navigation");
burgerButton.addEventListener("click", () => {
  burgerNav.classList.toggle("burger_navigation_open");
  burgerButton.classList.toggle("burger_open");
});

const rootOfEd = getComputedStyle(document.documentElement);
const mainColor = rootOfEd.getPropertyValue("--main-color").trim();
const colorOfPage = document.getElementById("colorPicker");
colorOfPage.value = mainColor;
const checkBtn = document.getElementById("check");
checkBtn.addEventListener("click", () => {
  const selectedColor = colorOfPage.value;
  document.documentElement.style.setProperty("--main-color", colorOfPage.value);
  localStorage.setItem("savedColor", selectedColor);
});

const daysRu = [
  "Понедельник",
  "Вторник",
  "Среду",
  "Четверг",
  "Пятницу",
  "Субботу",
  "Воскресенье",
];

const daysEn = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function isUpperWeek(referenceDate = new Date("2025-09-01")) {
  const now = new Date();
  const timeDiff = now.getTime() - referenceDate.getTime();
  const weekDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
  return weekDiff % 2 === 0;
}

let today = daysEn[0];

let scheduleAppend = function (PG, tableBody) {
  tableBody.innerHTML = "";
  if (!PG[today] || PG[today].length === 0) {
    const row = document.createElement("tr");
    const placeholders = ["-", "-", "-", "-", "-"];
    placeholders.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  } else {
    PG[today].forEach((item) => {
      const row = document.createElement("tr");
      const cellNum = document.createElement("td");
      cellNum.textContent = item.num;
      const cellTime = document.createElement("td");
      cellTime.textContent = item.time;
      const cellName = document.createElement("td");
      cellName.textContent = item.name;
      const cellTeach = document.createElement("td");
      cellTeach.textContent = item.teach;
      const cellCab = document.createElement("td");
      cellCab.textContent = item.cab;
      let arrayOfCells = [cellNum, cellTime, cellName, cellTeach, cellCab];
      arrayOfCells.forEach((element) => {
        row.appendChild(element);
      });
      tableBody.appendChild(row);
    });
  }
};

const tableContainer = document.querySelector(".tab");
const originalTable = document.querySelector("table");

for (let i = 0; i < 6; i++) {
  const copiedTable = originalTable.cloneNode(true);
  copiedTable.id = "table-rasp_" + String(i);
  tableContainer.appendChild(copiedTable);
}

const captionSpans = document.querySelectorAll(".Ru-day");
let counter = 0;
captionSpans.forEach((e) => {
  e.className = "Ru-day" + String(counter);
  e.textContent = daysRu[counter];
  counter++;
});

const bodiesOfTable = document.querySelectorAll(".table tbody");

if (isUpperWeek()) {
  for (let day = 0; day < bodiesOfTable.length; day++) {
    today = daysEn[day];
    scheduleAppend(PGUp, bodiesOfTable[day]);
  }
} else {
  for (let day = 0; day < bodiesOfTable.length; day++) {
    today = daysEn[day];
    scheduleAppend(PGDown, bodiesOfTable[day]);
  }
}

function animateAndGoTo(url) {
  document.body.classList.add("transition-out");
  setTimeout(() => {
    window.location.href = url;
  }, 700);
}

document.querySelectorAll(".waveTransition").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetUrl = link.getAttribute("data-link");
    animateAndGoTo(targetUrl);
  });
});

const mainSection = document.getElementById("contentSection");
const colorForBack = localStorage.getItem("savedColor");
mainSection.style.setProperty("background", colorForBack);

window.addEventListener("DOMContentLoaded", () => {
  if (isUpperWeek()) {
  for (let day = 0; day < bodiesOfTable.length; day++) {
    today = daysEn[day];
    scheduleAppend(PGUp, bodiesOfTable[day]);
  }
} else {
  for (let day = 0; day < bodiesOfTable.length; day++) {
    today = daysEn[day];
    scheduleAppend(PGDown, bodiesOfTable[day]);
  }
}
  const localSavedColor = localStorage.getItem("savedColor");
  document.documentElement.style.setProperty("--main-color", localSavedColor);
  if (localSavedColor === null) {
    colorOfPage.value = "#4973ff";
    document.documentElement.style.setProperty("--main-color", "#4973ff");
  } else {
    colorOfPage.value = localSavedColor;
  }
  document.body.classList.add("loaded");
  const contentOfPage = document.querySelector(".content");
  contentOfPage.classList.add("loadedCon");
});
