const destoryGrid = () => {
  const containers = document.getElementsByClassName("container");

  while (containers.length > 0) {
    containers[0].remove();
  }
};

const createList = (size) => {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push(1);
  }

  return board;
};

const createGrid = (n) => {
  for (let i = 0; i < n; i++) {
    let container = document.createElement("div");
    container.classList.add("container");

    for (let j = 0; j < n; j++) {
      let s = document.createElement("div");
      s.id = i + "," + j;

      s.classList.add("box");
      container.append(s);
    }

    document.body.append(container);
  }
};

const onStartButtonClick = (e) => {
  e.stopPropagation();

  const choosesize = document.querySelector(".grid-size");
  let n = parseInt(choosesize.value);
  let count = 0;
  let idx = 0;
  let i = 1;
  let computations = 0;
  let remove = false;
  const board = createList(n);
  destoryGrid();
  createGrid(n);
  document.querySelector(".result").innerHTML =
    "There are " + 0 + " solution/s";

  function addImage(i, j) {
    const img = document.createElement("img");
    img.src = "https://image.flaticon.com/icons/svg/606/606073.svg";
    img.height = 55;
    img.width = 55;
    img.id = i + "." + j;

    document.getElementById(i + "," + j).appendChild(img);
  }
  function removeImage(i, j) {
    document.getElementById(i + "." + j).remove();
  }
  let s = setInterval(function findValidQeeuns() {
    let n = board.length;

    if (remove) {
      removeImage(board[idx] - 1, idx);
      remove = false;
    }
    board[idx] = i;

    const valid = isValid(idx);
    if (valid) {
      addImage(board[idx] - 1, idx);

      if (idx == n - 1) {
        remove = true;
        i += 1;
        count++;
        document.querySelector(".result").innerHTML =
          "There are " + count + " solution/s";
      } else {
        idx += 1;
        i = 1;
      }
    } else {
      i += 1;
    }

    if (i == n + 1) {
      if (valid) {
        removeImage(board[idx] - 1, idx);
      }
      move = true;
      for (let k = 0; k < idx + 1; k++) {
        if (move) {
          board[idx] = 1;

          if (idx != 0) {
            idx--;
          }

          if (board[idx] + 1 > n) {
            removeImage(board[idx] - 1, idx);
            if (idx == 0) {
              move = false;
              console.log(count);
              console.log(computations);
              clearInterval(s);
            }
          } else {
            move = false;

            i = board[idx] + 1;
          }

          remove = true;
        }
      }
    }
  }, 500); //Adjust speed here

  function isValid(idx) {
    for (let i = 0; i < idx; i++) {
      computations++;
      if (
        board[idx] === board[i] ||
        Math.abs(board[idx] - board[i]) === idx - i
      ) {
        return false;
      }
    }

    return true;
  }
};

const main = () => {
  const start = document.querySelector(".begin");
  start.addEventListener("click", onStartButtonClick);
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});
