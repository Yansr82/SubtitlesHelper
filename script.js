// tab
var navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

//collapse side bar
const sidebarToggle = document.querySelector('#sidebar-toggle');
const sidebar = document.querySelector('.layout-sidebar');
const mainContent = document.querySelector('#main-content');
const toggleIcon = document.querySelector('#sidebar-toggle i');
const footerCollapse = document.querySelector('footer');

sidebarToggle.onclick = function () {
    if (sidebar.classList.contains('side-close')) {
        sidebar.classList.remove('side-close');
        sidebarToggle.classList.remove('side-toggle-close');
        mainContent.classList.remove('side-close');
        footerCollapse.style.paddingLeft = '250px';
    } else {
        sidebar.classList.add('side-close');
        sidebarToggle.classList.add('side-toggle-close');
        mainContent.classList.add('side-close');
        footerCollapse.style.paddingLeft = '30px';
    }
};

//checkarea

//聽打
function countCharacters(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (isChinese(char)) {
            count += 2;
        } else {
            count++;
        }
    }
    return count;
}

function isChinese(char) {
    return /^[\u4E00-\u9FA5]$/.test(char);
}

const inputText = document.querySelector('.inputText');
const output = document.querySelector('.output ol');
const checkArea = document.querySelector('.check_area');


//scroll

inputText.addEventListener('paste', handleInPaste);
inputText.addEventListener('input', updateOutput1);

function handleInPaste() {
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 0);
}






const wordsToCheck = [
    { word: '*', errorMessage: '請確認星號', errorClass: 'stay-key' },
    { word: '@', errorMessage: '請確認@符號', errorClass: 'at-symbol' },
    { word: '?', errorMessage: '請確認問號', errorClass: 'question-mark' }
];

function updateOutput1() {
    const lines = inputText.value.split('\n');
    output.innerHTML = '';
    checkArea.innerHTML = '';
    let hasError = false;

    lines.forEach((line, index) => {
        const lineNumber = index + 1;
        const characterCount = countCharacters(line);
        const exceedsLimit = characterCount > 27 && (line.charAt(11) !== ' ' && line.charAt(2) !== ':');
        const listItem = document.createElement('li');
        const foundWord = wordsToCheck.find(({ word }) => line.includes(word));

        if (exceedsLimit || foundWord) {
            let errorMessage = '';
            let errorClass = '';

            if (exceedsLimit) {
                errorMessage = `請確認字數`;
                errorClass = 'exceeds-limit';
            } else if (foundWord) {
                errorMessage = foundWord.errorMessage;
                errorClass = foundWord.errorClass;
            }

            listItem.textContent = `${lineNumber}`;
            listItem.classList.add('error');
            listItem.id = `error-${lineNumber}`;

            const errorAnchor = document.createElement('a');
            errorAnchor.classList.add(errorClass);
            errorAnchor.textContent = `${lineNumber} ${errorMessage}`;
            errorAnchor.href = `#error-${lineNumber}`;
            errorAnchor.addEventListener('click', scrollToError);
            checkArea.appendChild(errorAnchor);
            hasError = true;
        }

        output.appendChild(listItem);
    });

    if (!hasError) {
        const listItem = document.createElement('p');
        listItem.textContent = `無錯誤行句`;
        checkArea.appendChild(listItem);
    }
}

function scrollToError(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

//timecodeCheck
function timecodeCheck() {

}


// 切換timecode/!timecode
function updateOutput2() {

    const inputText = document.querySelector('.inputText');
    const output = document.querySelector('.output ol');
    const checkArea = document.querySelector('.check_area');

    inputText.addEventListener('input', updateOutput1);

    const wordsToCheck = [
        { word: '*', errorMessage: '請確認星號', errorClass: 'stay-key' },
        { word: '@', errorMessage: '請確認@符號', errorClass: 'at-symbol' },
        { word: '?', errorMessage: '請確認問號', errorClass: 'question-mark' }
    ];

    function updateOutput1() {
        const lines = inputText.value.split('\n');
        output.innerHTML = '';
        checkArea.innerHTML = '';
        let hasError = false;

        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const characterCount = countCharacters(line);
            const exceedsLimit = characterCount > 39;
            const listItem = document.createElement('li');
            const foundWord = wordsToCheck.find(({ word }) => line.includes(word));

            if (exceedsLimit || foundWord) {
                let errorMessage = '';
                let errorClass = '';

                if (exceedsLimit) {
                    errorMessage = `請確認字數`;
                    errorClass = 'exceeds-limit';
                } else if (foundWord) {
                    errorMessage = foundWord.errorMessage;
                    errorClass = foundWord.errorClass;
                }

                listItem.textContent = `${lineNumber}`;
                listItem.classList.add('error');
                listItem.id = `error-${lineNumber}`;

                const errorAnchor = document.createElement('a');
                errorAnchor.classList.add(errorClass);
                errorAnchor.textContent = `${lineNumber} ${errorMessage}`;
                errorAnchor.href = `#error-${lineNumber}`;
                errorAnchor.addEventListener('click', scrollToError);
                checkArea.appendChild(errorAnchor);
                hasError = true;
            }

            output.appendChild(listItem);
        });

        if (!hasError) {
            const listItem = document.createElement('p');
            listItem.textContent = `無錯誤行句`;
            checkArea.appendChild(listItem);
        }
    }

}

//切換文本檢查
const radio1 = document.querySelector('#btnradio1');
const radio2 = document.querySelector('#btnradio2');


radio1.addEventListener('click', function () {
    inputText.removeEventListener('input', updateOutput2);
    inputText.addEventListener('input', updateOutput1);
});

radio2.addEventListener('click', function () {
    inputText.removeEventListener('input', updateOutput1);
    inputText.addEventListener('input', updateOutput2);
});



// totop
const toTopButton = document.querySelector('.to_top');
toTopButton.style.opacity = '0';

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        toTopButton.style.opacity = '1';
    } else {
        toTopButton.style.opacity = '0';
    }
});

toTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 時間分配 assign-time

const assignUserSelect = document.querySelector('#assign-user-select-file');
const assignStart = document.querySelector('.assigntime_btn');
const hours = document.querySelector('.assigntime_h');
const minutes = document.querySelector('.assigntime_m');
const seconds = document.querySelector('.assigntime_s');
const assignTimeOutput = document.querySelector('.assign_time_output');
const selectOptions = document.querySelectorAll('#tools-assign-time-people select');
const episodeInput = document.querySelector('.assign-time-ep-input');
const assignTimeCheck = document.querySelector('#assign-time-check');
let nopValue = 0;
// 計算時間並生成輸出
function calculateTimeAndGenerateOutput(hoursValue, minutesValue, secondsValue, nopValue, episode, assignTimeOutput) {
    let outputText = document.createElement('p');
    let totalSeconds;
    if (assignTimeCheck.checked) {
        totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue - 60;
        console.log(totalSeconds);
    } else {
        totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue;
        console.log(totalSeconds);
    };
    let averageTimePerNopMinutes = Math.floor(totalSeconds / 60 / nopValue);
    let averageTimePerNopSeconds = Math.floor(totalSeconds % 60 / nopValue);
    outputText.textContent = `綜藝大集合#${episode}
    總長${hoursValue}時${minutesValue}分${secondsValue}秒 平均每人${averageTimePerNopMinutes}分${averageTimePerNopSeconds}秒
    時間參考如下~`;
    outputText.style.whiteSpace = "pre-line";
    outputText.style.marginBottom = "5px";
    assignTimeOutput.appendChild(outputText);

    let nopElement = document.createElement('p');
    let noptext = '';
    for (let i = 0; i < nopValue; i++) {
        let startTime = Math.round(i * totalSeconds / nopValue);
        let endTime = Math.round((i + 1) * totalSeconds / nopValue);
        let startTimeString = formatTime(startTime);
        let endTimeString = formatTime(endTime);

        let selectedOption = selectOptions[i % selectOptions.length].options[selectOptions[i % selectOptions.length].selectedIndex].text;
        let lastCharacter = selectedOption.trim().charAt(selectedOption.trim().length - 1);

        if (i === nopValue - 1) {
            noptext += `綜藝大集合#${episode}-0${i + 1} (${startTimeString}-END) ${lastCharacter} (文字版).txt
            `;
        } else {
            noptext += `綜藝大集合#${episode}-0${i + 1} (${startTimeString}-${endTimeString}) ${lastCharacter} (文字版).txt
            `;
        }
    }
    nopElement.textContent = noptext;
    nopElement.style.whiteSpace = "pre-line";
    assignTimeOutput.appendChild(nopElement);
}

// 點擊事件處理程序
assignStart.onclick = function () {
    document.querySelectorAll('.assign_time_output p').forEach(p => p.remove());

    let hoursValue, minutesValue, secondsValue, episode, nopValue;

    if (assignUserSelect.files.length > 0) {
        const file = assignUserSelect.files[0];
        const fileName = file.name;
        const hashIndex = fileName.indexOf('#');
        const episodeNumber = fileName.substring(hashIndex + 1).match(/\d+/)[0];
        episode = parseInt(episodeNumber);

        const video = document.createElement('video');
        video.preload = 'metadata';
        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;

        video.onloadedmetadata = function () {
            const duration = video.duration;
            hoursValue = Math.floor(duration / 3600);
            minutesValue = Math.floor((duration % 3600) / 60);
            secondsValue = Math.floor(duration % 60);

            // Check if #assign-time-end-time has input
            const endTimeInput = document.querySelector('#assign-time-end-time');
            if (endTimeInput.value.trim() !== "") {
                const timeString = endTimeInput.value.trim();
                const timeDigits = timeString.split('').map(digit => parseInt(digit)).filter(digit => !isNaN(digit));
                if (timeDigits.length === 8) {
                    hoursValue = parseInt(timeDigits.slice(0, 2).join(''));
                    minutesValue = parseInt(timeDigits.slice(2, 4).join(''));
                    secondsValue = parseInt(timeDigits.slice(4, 6).join(''));
                }
            }

            nopValue = calculateNOPValue(); // 計算 nopValue
            calculateTimeAndGenerateOutput(hoursValue, minutesValue, secondsValue, nopValue, episode, assignTimeOutput);
        };
    } else {
        // Check if #assign-time-end-time has input
        const endTimeInput = document.querySelector('#assign-time-end-time');
        if (endTimeInput.value.trim() !== "") {
            const timeString = endTimeInput.value.trim();
            const timeDigits = timeString.split('').map(digit => parseInt(digit)).filter(digit => !isNaN(digit));
            if (timeDigits.length === 8) {
                hoursValue = parseInt(timeDigits.slice(0, 2).join(''));
                minutesValue = parseInt(timeDigits.slice(2, 4).join(''));
                secondsValue = parseInt(timeDigits.slice(4, 6).join(''));
            }
        } else {
            hoursValue = hours.value.trim() === "" ? "00" : parseInt(hours.value);
            minutesValue = minutes.value.trim() === "" ? "00" : parseInt(minutes.value);
            secondsValue = seconds.value.trim() === "" ? "00" : parseInt(seconds.value);
        }

        episode = episodeInput.value;

        nopValue = calculateNOPValue(); // 計算 nopValue
        calculateTimeAndGenerateOutput(hoursValue, minutesValue, secondsValue, nopValue, episode, assignTimeOutput);
    }
}


// 計算有效值的數量
function calculateNOPValue() {
    let nopCount = 0;
    selectOptions.forEach(selectElement => {
        let selectedOption = selectElement.options[selectElement.selectedIndex].text;
        if (selectedOption !== "--") {
            nopCount++;
        }
    });
    return nopCount;
}

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

// 在數字前補零
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// 複製output
assignTimeOutput.onclick = copyAssignTimeOutput;

function copyAssignTimeOutput() {
    const assignTimeOutput = document.querySelector('.assign_time_output');
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
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (!alertPlaceholder) {
        console.error("Alert placeholder not found!");
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<div id="copyalert" class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>';

    alertPlaceholder.append(wrapper);

    setTimeout(function () {
        copyalert.classList.add('hidden');
    }, 1000);

    setTimeout(function () {
        copyalert.remove();
    }, 1500);
}

// drag or drop file
document.addEventListener('change', function (event) {
    if (event.target.classList.contains('file-input')) {
        const filesCount = event.target.files.length;
        const textbox = event.target.previousElementSibling;

        if (filesCount === 1) {
            const fileName = event.target.value.split('\\').pop();
            textbox.textContent = fileName;
        } else {
            textbox.textContent = filesCount + ' files selected';
        }
    }
});

