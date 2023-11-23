document.cookie = "s" + "=" + "100" + 1 * 60 * 60 * 1000;

async function main() {
  const container = document.querySelector(".container "),
    menuBtn = document.querySelector(".menuBtn"),
    calcolatorTextShow = document.querySelector(".calcolatorTextShow"),
    oprators = document.querySelectorAll(".oprators button"),
    numberButtonsContainer = document.querySelector(".numberButtons"),
    numberButtons = document.querySelectorAll(".numberButtons button"),
    btnNum = document.querySelectorAll(".btnNum"),
    userLevel = document.querySelector(".userLevel"),
    gameMaxLevel = document.querySelector(".gameMaxLevel"),
    resetNumbers = document.querySelector(".resetNumbers"),
    telegramId = document.querySelector(".telegramId"),
    nextBGImage = document.querySelector(".nextBGImage"),
    gameOptions = document.querySelector(".gameOptions"),
    levelChange = document.querySelector(".levelChange"),
    levelRange = document.querySelector("#levelRange"),
    changedLevelNum = document.querySelector(".changedLevelNum");

  let numberCalcolate = [...numberButtonsContainer.innerText],
    oldBtn,
    indexNumber = [1, 2],
    allNumber = [0, 0, 0, 0],
    levels = await (await fetch("./scripts/levels.json")).json(),
    nowLevel =
      localStorage.getItem("nowLevel") === null
        ? 0
        : localStorage.getItem("nowLevel"),
    isComplate = false,
    touchPCS = 0,
    isWin = false,
    timeOut,
    backgIndex = 0,
    backgroundImages = [
      "./assets/images/nightWallpaper.jpeg",
      "./assets/images/nightWallpaper3.jpg",
    ];

  localStorage.getItem("nowLevel") === null
    ? localStorage.setItem("nowLevel", nowLevel)
    : localStorage.getItem("nowLevel");
  gameMaxLevel.textContent = levels.length;
  if (nowLevel > Number(gameMaxLevel.textContent - 1)) {
    nowLevel = gameMaxLevel.textContent - 1;
  }
  function clearChar() {
    if (!isComplate) return (calcolatorTextShow.textContent = "?");
    numberCalcolate = [...numberButtonsContainer.innerText];
    numberCalcolate.forEach(() => {
      if (numberCalcolate.includes("x")) {
        numberCalcolate[numberCalcolate.indexOf("x")] = "*";
      }
      if (numberCalcolate.includes("÷")) {
        numberCalcolate[numberCalcolate.indexOf("÷")] = "/";
      }
    });
    numberCalcolate = numberCalcolate
      .filter((item) => (item === " " ? "" : item))
      .join("");
    calcolatorTextShow.textContent = Number(eval(numberCalcolate)).toFixed(0);
    if (calcolatorTextShow.textContent === "10") {
      isWin = true;
      nowLevel++;
      numberButtons.forEach((btn) => {
        if (btn.classList.contains("hideBtn")) {
          btn.textContent = "";
          btn.classList.remove("active");
        }
        numberButtonsContainer.classList.remove("showBtnsOparator");
        numberButtonsContainer.classList.remove("changeBtnValue");
      });
      changeLevel();
    }
  }

  function changeLevel() {
    btnNum.forEach((btn, index) => {
      btn.textContent = levels[nowLevel][index];
    });
    userLevel.textContent = Number(nowLevel) + 1;
    if (gameOptions.classList.contains("hideOptionsContainer")) return;
    localStorage.setItem("nowLevel", nowLevel);
  }
  function checkNumbers() {
    if (
      numberButtons[1].textContent !== "" &&
      numberButtons[3].textContent !== "" &&
      numberButtons[5].textContent !== ""
    ) {
      isComplate = true;
    } else {
      isComplate = false;
    }
  }
  changeLevel();
  btnNum.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      oldBtn = "";
      if (!btn.classList.contains("active")) {
        btnNum.forEach((element, index) => {
          allNumber[index] = element.textContent;
        });
        indexNumber[0] = index;
        oldNumber = btn.textContent;
      } else {
        indexNumber[1] = index;
        btnNum[indexNumber[1]].textContent = allNumber[indexNumber[0]];
        btnNum[indexNumber[0]].textContent = allNumber[indexNumber[1]];
        btnNum.forEach((element, index) => {
          allNumber[index] = element.textContent;
        });
      }
      btnNum.forEach((element) => {
        element.classList.add("active");
      });
      btn.classList.remove("active");

      numberButtonsContainer.classList.remove("showBtnsOparator");
      checkNumbers();
      if (touchPCS === 1) {
        btnNum.forEach((element) => {
          element.classList.remove("active");
          touchPCS = -1;
        });
      }
      touchPCS++;
    });
  });
  numberButtons.forEach((btn) => {
    if (isWin) return;
    btn.addEventListener("click", () => {
      if (btn.classList.contains("hideBtn")) {
        if (oldBtn !== "") {
          btn.textContent = oldBtn;
          btn.classList.add("active");
          oldBtn = "";
        }
        checkNumbers();
        oprators.forEach((item) => {
          item.classList.remove("active");
        });
      }
      clearChar();
    });
  });

  oprators.forEach((btn) => {
    btn.addEventListener("click", () => {
      oprators.forEach((element) => {
        element.classList.remove("active");
      });
      btn.classList.add("active");
      oldBtn = btn.textContent;
      numberButtonsContainer.classList.add("showBtnsOparator");
      numberButtonsContainer.classList.remove("changeBtnValue");
      btnNum.forEach((element) => {
        element.classList.remove("active");
      });
    });
  });
  menuBtn.addEventListener("click", () => {
    if (gameOptions.classList.contains("hideOptionsContainer")) {
      return (
        gameOptions.classList.remove("hideOptionsContainer"),
        menuBtn.parentElement.classList.remove("preview")
      );
    }
    menuBtn.parentElement.classList.toggle("active");
  });
  window.addEventListener("click", (e) => {
    if (e.target === document.body) {
      menuBtn.parentElement.classList.remove("active");
      menuBtn.parentElement.classList.remove("preview");
    }
    [...container.children].forEach((element) => {
      if (
        e.target === element ||
        e.target === numberButtonsContainer.parentElement ||
        e.target === container ||
        e.target === document.body
      )
        numberButtonsContainer.classList.remove("showBtnsOparator");
    });
  });
  resetNumbers.addEventListener("click", () => {
    numberButtons.forEach((btn) => {
      if (btn.classList.contains("hideBtn")) {
        btn.className = "hideBtn";
        btn.textContent = "";
      }
    });
    btnNum.forEach((btn, index) => {
      if (btn.classList.contains("btnNum")) {
        btn.className = "btnNum";
        btn.textContent = levels[nowLevel][index];
      }
    });
    numberButtonsContainer.className = "numberButtons";
    calcolatorTextShow.textContent = "?";
  });
  nextBGImage.addEventListener("click", () => {
    backgIndex++;
    if (backgIndex > backgroundImages.length - 1) backgIndex = 0;
    document.body.style.backgroundImage = `url(${backgroundImages[backgIndex]})`;
  });

  telegramId.addEventListener("click", async () => {
    clearTimeout(timeOut);
    navigator.clipboard.writeText(telegramId.textContent);
    telegramId.parentElement.classList.add("active");
    timeOut = setInterval(() => {
      telegramId.parentElement.classList.remove("active");
    }, 1000);
  });
  levelChange.addEventListener("click", () => {
    gameOptions.classList.add("hideOptionsContainer");
    menuBtn.parentElement.classList.add("preview");
  });
  levelRange.min = 1;
  levelRange.max = Number(nowLevel) + 1;
  levelRange.value = Number(nowLevel) + 1;
  changedLevelNum.textContent = levelRange.value;
  levelRange.addEventListener("mousemove", () => {
    changedLevelNum.textContent = levelRange.value;
    changeLevel();
  });
  levelRange.addEventListener("change", () => {
    changedLevelNum.textContent = levelRange.value;
    nowLevel = levelRange.value - 1;
    changeLevel();
  });
}

document.addEventListener("DOMContentLoaded", main);
