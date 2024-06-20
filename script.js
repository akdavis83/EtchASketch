const gridContainer = document.querySelector("#grid-container");
const buttons = document.querySelectorAll(".colorselector");
const shake = document.querySelector("button");
const gridSize = document.querySelector("#gridsize");
const colorMode = document.querySelector("#colormode");
const modal = document.querySelector("#myModal");

const populate = (x) => {
  if (x > 200) {
    gridContainer.style.gridTemplate = `repeat(16, 1fr) / repeat(16, 1fr)`;
    alert("That would be way too much work. Try a lower number.");
    return;
  }
  gridContainer.style.gridTemplate = `repeat(${x}, 1fr) / repeat(${x}, 1fr)`;
  let totalBlocks = x ** 2;
  for (let i = 0; i < totalBlocks; i++) {
    const gridBlock = document.createElement("div");
    gridBlock.classList.add("grid-block", "blackandwhite");
    gridContainer.appendChild(gridBlock);
  }
};

const randomColor = () =>
  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

const shader = (item) => {
  if (item.style.backgroundColor == "") {
    item.style.backgroundColor = "rgb(255, 255, 255)";
  }
  let getColor = item.style.backgroundColor;
  getColor = getColor.slice(4, getColor.length - 1).split(",");
  getColor = getColor.map((i) => Number(i));
  if (getColor[0] >= 25) {
    getColor = getColor.map((j) => (j -= 25));
  } else if (getColor[0] < 25) {
    getColor.map((i) => (i = 0));
  }
  item.style.backgroundColor = `rgb(${getColor[0]}, ${getColor[1]}, ${getColor[2]})`;
};

const handleShade = (e) => {
  if (e.target.classList.contains("blackandwhite")) {
    e.target.style.backgroundColor = "black";
  } else if (e.target.classList.contains("randomcolor")) {
    e.target.style.backgroundColor = randomColor();
  } else if (e.target.classList.contains("shader")) {
    shader(e.target);
  }
};

const shakeFunction = () => {
  gridContainer.childNodes.forEach(
    (block) => (block.style.backgroundColor = "rgb(255, 255, 255)")
  );
};

const closeModal = () => {
  modal.style.display = "none"
}

gridContainer.addEventListener("mouseover", handleShade);
gridContainer.addEventListener("touchstart", handleShade);
shake.addEventListener("click", shakeFunction);

gridSize.addEventListener("click", () => {
  const gridSize = prompt("Please enter the row/column size as a number.");
  if (gridSize === null || gridSize === "") {
    return;
  } else if (typeof Number(gridSize) === 'number' && Number(gridSize) > 0) {
    shakeFunction();
    populate(gridSize);
  } else {
    alert(
      "I thought the instructions were rather simple. I guess I thought wrong."
    );
  }
});

colorMode.addEventListener("click", () => {
  const span = document.querySelector(".close");
  modal.style.display = "flex";
  span.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    gridContainer.childNodes.forEach((node) => (node.className = e.target.id));
    shakeFunction();
  });
});

populate(16);
