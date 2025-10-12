//В этом документе изменяется лишь вставка расписания в таблицу и подсветка текущей дисциплины
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
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среду",
  "Четверг",
  "Пятницу",
  "Субботу",
];

const daysEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const now = new Date();
const today = now.getDay() + 1; //ПРИБАВЛЯЕМ 1 ДЛЯ ПРАВИЛЬНОЙ РАБОТЫ РАСПИСАНИЯ НА ЗАВТРА

function isUpperWeek(referenceDate = new Date("2025-09-01")) {
  const now = new Date();
  const timeDiff = now.getTime() - referenceDate.getTime();
  const weekDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
  return weekDiff % 2 === 0;
}

const tableBody = document.querySelector("#table-rasp tbody");
const captElem = document.getElementById("Ru-day");
captElem.textContent = daysRu[today];

const dayEn = daysEn[today];
const pg1BtnElement = document.getElementById("PG1");
const pg2BtnElement = document.getElementById("PG2");

//ВЫРЕЗАНА ФУНКЦИЯ ДЛЯ ПОДСВЕТКИ ТЕК. ДИСЦИП.

let scheduleAppend = function (PG) {
  tableBody.innerHTML = "";
  if (!PG[dayEn] || PG[dayEn].length === 0) {
    const row = document.createElement("tr");
    const placeholders = ["-", "-", "-", "-", "-"];
    placeholders.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  } else {
    PG[dayEn].forEach((item) => {
      //УДАЛЕНО ВЕТВЛЕНИЕ ДЛЯ ДОБАВЛЕНИЯ КЛАССА "NOW"
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

function animateAndGoTo(url) {
  document.body.classList.add("transition-out");
  setTimeout(() => {
    window.location.href = url;
  }, 700);
  document.body.classList.add("transition-in");
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
  if (today - 1 === 0) {
    isUpperWeek() ? scheduleAppend(PGDown) : scheduleAppend(PGUp);
  } else {
    isUpperWeek() ? scheduleAppend(PGUp) : scheduleAppend(PGDown);
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
