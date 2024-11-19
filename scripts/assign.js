// 保存選項到 localStorage
function saveOptionsToLocalStorage() {
  const options = [];
  selectOptions.forEach((selectElement) => {
    const selectedOption =
      selectElement.options[selectElement.selectedIndex].text;
    options.push(selectedOption);
  });
  localStorage.setItem("selectedOptions", JSON.stringify(options));
}

// 從 localStorage 加載選項
function loadOptionsFromLocalStorage() {
  const savedOptions = localStorage.getItem("selectedOptions");
  if (savedOptions) {
    const options = JSON.parse(savedOptions);
    options.forEach((option, index) => {
      if (selectOptions[index]) {
        const selectedIndex = Array.from(
          selectOptions[index].options
        ).findIndex((opt) => opt.text === option);
        if (selectedIndex !== -1) {
          selectOptions[index].selectedIndex = selectedIndex;
        }
      }
    });
  }
}

//

const assignUserSelect = document.querySelector("#assign-user-select-file");
const assignStart = document.querySelector(".assigntime_btn");
const hours = document.querySelector(".assigntime_h");
const minutes = document.querySelector(".assigntime_m");
const seconds = document.querySelector(".assigntime_s");
const episodeName = document.querySelector(".assigntime_n");
const assignTimeOutput = document.querySelector(".assign_time_output");
let selectOptions = document.querySelectorAll(
  "#tools-assign-time-people select"
);
const episodeInput = document.querySelector(".assign-time-ep-input");
const assignTimeCheck = document.querySelector("#assign-time-check");
let nopValue = 0;

// 計算時間並生成輸出
function calculateTimeAndGenerateOutput(
  hoursValue,
  minutesValue,
  secondsValue,
  nopValue,
  episode,
  assignTimeOutput,
  episodeN
) {
  console.log(episodeN);
  // 先確保 selectOptions 陣列有值
  if (selectOptions && selectOptions.length > 0) {
    let outputText = document.createElement("p");
    let totalSeconds;
    if (assignTimeCheck.checked) {
      totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue - 60;
    } else {
      totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue;
    }
    let averageTimePerNopMinutes = Math.floor(totalSeconds / 60 / nopValue);
    let averageTimePerNopSeconds = Math.floor((totalSeconds % 60) / nopValue);
    outputText.textContent = `${episodeN}#${episode}
        總長${hoursValue}時${minutesValue}分${secondsValue}秒 平均每人${averageTimePerNopMinutes}分${averageTimePerNopSeconds}秒
        時間參考如下↓`;
    outputText.style.whiteSpace = "pre-line";
    outputText.style.marginBottom = "5px";
    assignTimeOutput.appendChild(outputText);

    let nopElement = document.createElement("p");
    let noptext = "";
    for (let i = 0; i < nopValue; i++) {
      let startTime = Math.round((i * totalSeconds) / nopValue);
      let endTime = Math.round(((i + 1) * totalSeconds) / nopValue);
      let startTimeString = formatTime(startTime);
      let endTimeString = formatTime(endTime);

      if (
        selectOptions[i % selectOptions.length] &&
        selectOptions[i % selectOptions.length].options
      ) {
        let selectedOption =
          selectOptions[i % selectOptions.length].options[
            selectOptions[i % selectOptions.length].selectedIndex
          ].text;
        let lastCharacter = selectedOption
          .trim()
          .charAt(selectedOption.trim().length - 1);

        if (i === nopValue - 1) {
          noptext += `${episodeN}#${episode}-0${
            i + 1
          } (${startTimeString}-END) ${lastCharacter} (文字版).txt
                    `;
        } else {
          noptext += `${episodeN}#${episode}-0${
            i + 1
          } (${startTimeString}-${endTimeString}) ${lastCharacter} (文字版).txt
                    `;
        }
      }
    }
    nopElement.textContent = noptext;
    nopElement.style.whiteSpace = "pre-line";
    assignTimeOutput.appendChild(nopElement);
  } else {
    console.error("selectOptions is empty or undefined");
  }
}

// 網頁加載完成後設置 NOP 控制
document.addEventListener("DOMContentLoaded", function setupNopControls() {
  const nopMin = 2;
  const nopMax = 12;
  const nopContainer = document.getElementById("tools-assign-time-people");
  const decreaseBtn = document.getElementById("decrease-nop");
  const increaseBtn = document.getElementById("increase-nop");

  let currentNop = 9; // 預設人數

  generateNopOptions(currentNop);

  decreaseBtn.addEventListener("click", function decreaseNop() {
    if (currentNop > nopMin) {
      currentNop--;
      generateNopOptions(currentNop);
      loadOptionsFromLocalStorage();
    }
  });

  increaseBtn.addEventListener("click", function increaseNop() {
    if (currentNop < nopMax) {
      currentNop++;
      generateNopOptions(currentNop);
      loadOptionsFromLocalStorage();
    }
  });

  function generateNopOptions(nop) {
    nopContainer.innerHTML = "";

    for (let i = 1; i <= nop; i++) {
      const option = document.createElement("li");

      option.innerHTML = `
                <select class="assigntime_sort">
                    <option value="${i}">1 - 京</option>
                    <option value="${i + 1}">2 - 周</option>
                    <option value="${i + 2}">3 - 憲</option>
                    <option value="${i + 3}">4 - 薇</option>
                    <option value="${i + 4}">5 - 凱</option>
                    <option value="${i + 5}">6 - 顏</option>
                    <option value="${i + 6}">7 - 呂</option>
                    <option value="${i + 7}">8 - 郝</option>
                    <option value="${i + 8}">9 - 瀚</option>
                    <option value="${i + 9}">10 - 晴</option>
                    <option value="${i + 10}">11 - 豪</option>
                    <option value="${i + 11}">12 - 皓</option>
                </select>
            `;
      nopContainer.appendChild(option);
    }
    selectOptions = document.querySelectorAll(
      "#tools-assign-time-people select"
    );
  }
  loadOptionsFromLocalStorage();
});

assignStart.onclick = function () {
  nopValue = 0;
  document.querySelectorAll(".assign_time_output p").forEach((p) => p.remove());

  let hoursValue, minutesValue, secondsValue, episode;

  if (assignUserSelect.files.length > 0) {
    const file = assignUserSelect.files[0];
    const fileName = file.name;
    const hashIndex = fileName.indexOf("#");
    const episodeNumber = fileName.substring(hashIndex + 1).match(/\d+/)[0];
    episode = parseInt(episodeNumber);

    const video = document.createElement("video");
    video.preload = "metadata";
    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;

    video.onloadedmetadata = function () {
      const duration = video.duration;
      const endTimeInput = document.querySelector("#assign-time-end-time");
      if (endTimeInput.value.trim() !== "") {
        const timeString = endTimeInput.value.trim();
        const timeDigits = timeString
          .split("")
          .map((digit) => parseInt(digit))
          .filter((digit) => !isNaN(digit));
        console.log(timeDigits);
        console.log(timeString);
        if (timeDigits.length === 6) {
          hoursValue = parseInt(timeDigits.slice(0, 2).join(""));
          minutesValue = parseInt(timeDigits.slice(2, 4).join(""));
          secondsValue = parseInt(timeDigits.slice(4, 6).join(""));
          console.log(hoursValue, minutesValue, secondsValue);
        } else if (timeDigits.length === 5) {
          hoursValue = parseInt(timeDigits.slice(0, 1).join(""));
          minutesValue = parseInt(timeDigits.slice(1, 3).join(""));
          secondsValue = parseInt(timeDigits.slice(3, 5).join(""));
          console.log(hoursValue, minutesValue, secondsValue);
        } else if (timeDigits.length < 5) {
          hoursValue = 0;
          minutesValue = parseInt(timeDigits.slice(0, 2).join(""));
          secondsValue = parseInt(timeDigits.slice(2, 4).join(""));
          console.log(hoursValue, minutesValue, secondsValue);
        }
      } else {
        hoursValue = Math.floor(duration / 3600);
        minutesValue = Math.floor((duration % 3600) / 60);
        secondsValue = Math.floor(duration % 60);
      }
      nopValue = document.querySelectorAll(".assigntime_sort").length;
      calculateTimeAndGenerateOutput(
        hoursValue,
        minutesValue,
        secondsValue,
        nopValue,
        episode,
        assignTimeOutput
      );
      saveOptionsToLocalStorage();
    };
  } else {
    hoursValue = hours.value.trim() === "" ? 0 : parseInt(hours.value);
    minutesValue = minutes.value.trim() === "" ? 0 : parseInt(minutes.value);
    secondsValue = seconds.value.trim() === "" ? 0 : parseInt(seconds.value);
    episode = episodeInput.value;
    episodeN = episodeName.value;
    console.log(hoursValue, minutesValue, secondsValue);

    nopValue = document.querySelectorAll(".assigntime_sort").length;
    calculateTimeAndGenerateOutput(
      hoursValue,
      minutesValue,
      secondsValue,
      nopValue,
      episode,
      assignTimeOutput,
      episodeN
    );
    saveOptionsToLocalStorage();
  }
};

// 格式化時間
function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds % 3600) / 60);
  let seconds = timeInSeconds % 60;

  if (hours > 0) {
    minutes += hours * 60;
    hours = 0;
  }

  return padZero(minutes) + padZero(seconds);
}

// 數字前補0
function padZero(num) {
  return num.toString().padStart(2, "0");
}

// 複製 output
assignTimeOutput.onclick = copyAssignTimeOutput;

function copyAssignTimeOutput() {
  const assignTimeOutput = document.querySelector(".assign_time_output");
  const textToCopy = assignTimeOutput.innerText || assignTimeOutput.textContent;

  try {
    navigator.clipboard.writeText(textToCopy);
    showAlert("已複製到剪貼版！", "success");
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    showAlert("Failed to copy text to clipboard", "danger");
  }
}

function showAlert(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  if (!alertPlaceholder) {
    console.error("Alert placeholder not found!");
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div id="copyalert" class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    "</div>";

  alertPlaceholder.append(wrapper);

  setTimeout(function () {
    copyalert.classList.add("hidden");
  }, 1000);

  setTimeout(function () {
    copyalert.remove();
  }, 1500);
}

// 綁定 drag or drop file
document.addEventListener("change", function (event) {
  if (event.target.classList.contains("file-input")) {
    const filesCount = event.target.files.length;
    const textbox = event.target.previousElementSibling;

    if (filesCount === 1) {
      const fileName = event.target.value.split("\\").pop();
      textbox.textContent = fileName;
    } else {
      textbox.textContent = filesCount + " files selected";
    }
  }
});
