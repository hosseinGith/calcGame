function main() {
  const container = document.querySelector(".container "),
    calcolatorTextShow = document.querySelector(".calcolatorTextShow"),
    oprators = document.querySelectorAll(".oprators button"),
    numberButtonsContainer = document.querySelector(".numberButtons"),
    numberButtons = document.querySelectorAll(".numberButtons button"),
    btnNum = document.querySelectorAll(".btnNum"),
    userLevel = document.querySelector(".userLevel"),
    gameMaxLevel = document.querySelector(".gameMaxLevel");

  let numberCalcolate = [...numberButtonsContainer.innerText],
    oldBtn,
    indexNumber = [1, 2],
    allNumber = [0, 0, 0, 0],
    levels = [
      "1234",
      "2503",
      "1171",
      "7131",
      "1239",
      "1956",
      "3185",
      "6917",
      "0641",
      "1549",
      "1218",
      "1325",
      "1789",
      "6307",
      "4128",
      "6531",
      "4037",
      "4508",
      "4121",
      "7122",
      "2149",
      "6511",
      "9715",
      "3237",
      "3429",
      "8756",
      "0145",
      "2026",
      "1292",
      "1472",
      "3134",
      "8361",
      "8423",
      "6284",
      "8364",
      "5673",
      "9358",
      "6637",
      "9863",
      "4578",
      "0224",
      "5807",
      "1263",
      "1442",
      "4691",
      "3245",
      "4927",
      "6725",
      "2967",
      "3333",
      "2998",
      "6434",
      "5350",
      "4735",
      "5375",
      "9496",
      "9650",
      "1735",
      "9616",
      "3625",
      "2445",
      "5552",
      "6582",
      "8925",
      "4437",
      "8934",
      "6646",
      "0604",
      "7140",
      "5015",
      "0342",
      "7114",
      "9208",
      "1361",
      "8205",
      "1846",
      "9706",
      "7791",
      "3283",
      "5406",
      "2344",
      "3564",
      "5683",
      "7546",
      "6013",
      "5212",
      "6409",
      "3182",
      "5261",
      "7216",
      "3913",
      "5351",
      "9881",
      "1999",
      "5582",
      "5692",
      "7257",
      "5843",
      "4949",
      "1813",
      "4914",
      "3462",
      "7102",
    ],
    nowLevel =
      localStorage.getItem("nowLevel") === null
        ? 0
        : localStorage.getItem("nowLevel"),
    isComplate = false,
    touchPCS = 0,
    isWin = false;
  localStorage.getItem("nowLevel") === null
    ? localStorage.setItem("nowLevel", nowLevel)
    : localStorage.getItem("nowLevel");
  gameMaxLevel.textContent = levels.length;
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
  window.addEventListener("click", (e) => {
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
}

document.addEventListener("DOMContentLoaded", main);
