// tab
var navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
        navLinks.forEach(function(link) {
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

sidebarToggle.onclick = function() {
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


radio1.addEventListener('click', function() {  
    inputText.removeEventListener('input', updateOutput2); 
    inputText.addEventListener('input', updateOutput1);
});

radio2.addEventListener('click', function() {
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

toTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 時間分配 assign-time
const assignStart = document.querySelector('.assigntime_btn');
const hours = document.querySelector('.assigntime_h');
const minutes = document.querySelector('.assigntime_m');
const seconds = document.querySelector('.assigntime_s');
const nop = document.querySelector('.assigntime_nop');
const assignTimeOutput = document.querySelector('.assign_time_output');
const selectOptions = document.querySelectorAll('#tools-assign-time-people select');
const episodeInput = document.querySelector('.assign-time-ep-input');

assignStart.onclick = function() {
    document.querySelectorAll('.assign_time_output p').forEach(p => p.remove());

    let hoursValue = hours.value.trim() === "" ? "00" : parseInt(hours.value);
    let minutesValue = minutes.value.trim() === "" ? "00" : parseInt(minutes.value);
    let secondsValue = seconds.value.trim() === "" ? "00" : parseInt(seconds.value);
    let nopValue = nop.value.trim() === "" ? "1" : parseInt(nop.value);
    let totalTimePerNop = ((hoursValue * 3600 + minutesValue * 60 + secondsValue) / nopValue);
    let episode = episodeInput.value;
    let outputText = document.createElement('p');
    let totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue;
    let averageTimePerNopMinutes = Math.floor(totalSeconds / 60 / nopValue);
    let averageTimePerNopSeconds =  Math.floor(totalSeconds % 60 / nopValue);
    outputText.textContent = `綜藝大集合#${episode}
    總長${hoursValue}時${minutesValue}分${secondsValue}秒 平均每人${averageTimePerNopMinutes}分${averageTimePerNopSeconds}秒
    時間參考如下~`
    outputText.style.whiteSpace = "pre-line";
    outputText.style.marginBottom = "5px";
    assignTimeOutput.appendChild(outputText);

    let nopElement = document.createElement('p');
    let noptext = '';
    for (let i = 0; i < nopValue; i++) {
        let startTime = Math.round(i * totalTimePerNop);
        let endTime = Math.round((i + 1) * totalTimePerNop);
        let startTimeString = formatTime(startTime);
        let endTimeString = formatTime(endTime);
        
        let selectedOption = selectOptions[i % selectOptions.length].options[selectOptions[i % selectOptions.length].selectedIndex].text;
        let lastCharacter = selectedOption.trim().charAt(selectedOption.trim().length - 1);

        if (i === nopValue - 1) {
            noptext += `綜藝大集合#${episode}-0${i+1} (${startTimeString}-END) ${lastCharacter} (文字版).txt
            `;
        }else {       
            noptext += `綜藝大集合#${episode}-0${i+1} (${startTimeString}-${endTimeString}) ${lastCharacter} (文字版).txt
            `;
        }
    }
    nopElement.textContent = noptext;
    nopElement.style.whiteSpace = "pre-line";
    assignTimeOutput.appendChild(nopElement);
}

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
    
    setTimeout(function() {
        copyalert.classList.add('hidden');
    }, 1000);

    setTimeout(function() {
        copyalert.remove();
    }, 1500);
}