const cover = document.querySelector(".cover");
const coverHeading = document.querySelector(".cover h2");
const name = document.getElementById("name");

const circle = document.querySelector("#circle");
const circleSize = document.querySelector("#circle").clientWidth;
let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;
let lastX = 0;
let lastY = 0;
let lastTime = Date.now();
let lagFactor = 0.2;
let scale = 1;

document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

function animate() {
  const now = Date.now();
  const timeDelta = now - lastTime;

  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (timeDelta > 0) {
    const speed = distance / timeDelta;

    lagFactor = Math.min(0.2, 0.1 + speed * 0.005);
    scale = Math.max(0.4, 1 - distance * 0.03);
  }

  lastX = mouseX;
  lastY = mouseY;
  lastTime = now;

  circleX += (mouseX - circleX) * lagFactor;
  circleY += (mouseY - circleY) * lagFactor;

  const offset = (circleSize * scale) / 2;

  circle.style.transform = `translate(${circleX - offset}px, ${
    circleY - offset
  }px) scale(${scale})`;

  requestAnimationFrame(animate);
}

animate();

function revealTimeline() {
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      item.classList.add("visible");
    } else {
      item.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", revealTimeline);
revealTimeline();

document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        projectItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("expand");
          }
        });

        this.classList.toggle("expand");
      }
    });
  });
});

window.onload = () => {
  console.log("loading");
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.body.style.overflow = "auto";
    cover.style.display = "none";
  }, 3500);
};
