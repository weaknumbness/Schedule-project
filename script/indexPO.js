const rootOfEd = getComputedStyle(document.documentElement);
const mainColor = rootOfEd.getPropertyValue('--main-color').trim();
const colorOfPage = document.getElementById("colorPicker");
colorOfPage.value = mainColor;
const checkBtn = document.getElementById("check");
checkBtn.addEventListener("click",() => {
  const selectedColor = colorOfPage.value;
  document.documentElement.style.setProperty('--main-color',colorOfPage.value)
  localStorage.setItem('savedColor', selectedColor)
})

function animateAndGoTo(url) {
  document.body.classList.add("transition-out");
  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

document.querySelectorAll(".btn").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetUrl = link.getAttribute("data-link");
    animateAndGoTo(targetUrl);
  });
});

const mainSection = document.getElementById("contentSection");
const colorForBack = localStorage.getItem('savedColor');
mainSection.style.setProperty("background",colorForBack)

window.addEventListener('DOMContentLoaded', () => {
  const localSavedColor = localStorage.getItem('savedColor');
  document.documentElement.style.setProperty('--main-color', localSavedColor);
  colorOfPage.value = localSavedColor;
  document.body.classList.add('loaded');
  const contentOfPage = document.querySelector('.content');
  contentOfPage.classList.add('loadedCon');
});

