const boxListeners = {};

const addX = (s) => (e) => {
  const obstruction = document.createElement("img");
  obstruction.src =
    "https://th.bing.com/th/id/OIP.q0jNJtBeHpON6IXsJKmXXgAAAA?pid=Api&rs=1";

  if (s.getElementsByTagName("img").length > 0) {
    let b = s.getElementsByTagName("img");

    b[0].remove(b[0]);
  } else {
    obstruction.height = 55;
    obstruction.width = 55;

    s.appendChild(obstruction);
  }
};

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
      const el = addX(s);
      let box_idx = i + "," + j;
      boxListeners[box_idx] = el;

      s.addEventListener("click", el);
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

  let done = false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let box = document.getElementById(i + "," + j);
      box.removeEventListener("click", boxListeners[i + "," + j]);
    }
  }
  const board = createList(n);

  document.querySelector(".result").innerHTML =
    "There are " + 0 + " solution/s";

  let change = document.getElementById("speed-input");
  change.addEventListener("change", () => {
    if (!done) {
      clearInterval(s);
      s = setInterval(findValidQeeuns, change.value);
    }
  });

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
  function findValidQeeuns() {
    computations++;
    let n = board.length;

    if (remove && n != 1) {
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
        let prev_idx = idx;
        if (move) {
          if (idx != 0) {
            board[idx] = 1;
            idx--;
          }

          if (board[idx] + 1 > n) {
            if (idx != 0) {
              removeImage(board[idx] - 1, idx);
            }
            if (idx == 0) {
              if (n != 1 && isValid(0)) {
                removeImage(n - 1, 0);
              }

              move = false;
              console.log(count);
              console.log(computations);
              done = true;
              for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                  let box = document.getElementById(i + "," + j);
                  box.addEventListener("click", boxListeners[i + "," + j]);
                }
              }
              clearInterval(s);
            }
          } else {
            move = false;

            i = board[idx] + 1;

            remove = true;
          }
        }
      }
    }
  }

  let s = setInterval(
    findValidQeeuns,
    document.getElementById("speed-input").value
  ); //Adjust speed here

  function isValid(idx) {
    let box = document.getElementById(board[idx] - 1 + "," + idx);

    if (box.getElementsByTagName("img").length > 0) {
      let list = box.getElementsByTagName("img");
      if (list[0].id == "") {
        return false;
      } else {
        return true;
      }
    }

    for (let i = 0; i < idx; i++) {
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
  createGrid(1);
  const make = document.querySelector(".grid-size");
  make.addEventListener("change", (event) => {
    destoryGrid();
    createGrid(event.target.value);
  });
  const start = document.querySelector(".begin");

  start.addEventListener("click", onStartButtonClick);
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});
