// header

fetch("header.txt")
  .then((response) => response.text())
  .then((html) => {
    document.querySelector("header").innerHTML = html;
  });

// totop

const toTopButton = document.querySelector(".to_top");
toTopButton.style.opacity = "0";

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    toTopButton.style.opacity = "1";
  } else {
    toTopButton.style.opacity = "0";
  }
});

toTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  window.history.replaceState(null, null, window.location.href.split("#")[0]);
});

// scrollbar
window.addEventListener("scroll", function () {
  const content = document.documentElement;
  const scrollPercentage =
    (content.scrollTop / (content.scrollHeight - content.clientHeight)) * 100;

  const scrollbar = document.getElementById("bar");
  scrollbar.style.width = scrollPercentage + "%";

  const header = document.querySelector("header");
  if (window.scrollY > 1) {
    header.classList.add("ysr");
  } else {
    header.classList.remove("ysr");
  }
});
