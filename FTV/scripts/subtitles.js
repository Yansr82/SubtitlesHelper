const inputText = document.querySelector('.inputText');
const output = document.querySelector('.output ol');
const checkArea = document.querySelector('.check_area');
const wordsToCheck = [
    { word: '*', errorMessage: '請確認星號', errorClass: 'stay-key' },
    { word: '@', errorMessage: '請確認@符號', errorClass: 'at-symbol' },
    { word: '?', errorMessage: '請確認問號', errorClass: 'question-mark' }
];

document.addEventListener('DOMContentLoaded', function () {
    const listItem = document.createElement('p');
    listItem.textContent = `錯誤檢查區`;
    checkArea.appendChild(listItem);
});


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

function scrollToError(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function checkTimeCode() {
    const lines = inputText.value.split('\n');
    output.innerHTML = '';
    checkArea.innerHTML = '';
    let hasError = false;
    let prevTimeCode = null;

    let endIndex = lines.length;
    const lastLine = lines[lines.length - 1];
    if (lastLine.trim().endsWith('END')) {
        endIndex--;
    } 

    let firstFourLinesValidTimeCode = false;
    if (lines.length >= 4) {
        const firstLineTimeCodeValid = /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(lines[0].substring(0, 11));
        const secondLineTimeCodeValid = /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(lines[1].substring(0, 11));
        const thirdLineTimeCodeValid = /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(lines[2].substring(0, 11));
        const fourthLineTimeCodeValid = /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(lines[3].substring(0, 11));
        const fifthLineTimeCodeValid = /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(lines[4].substring(0, 11));
    
        firstFourLinesValidTimeCode = firstLineTimeCodeValid && secondLineTimeCodeValid && thirdLineTimeCodeValid && fourthLineTimeCodeValid && fifthLineTimeCodeValid;
    }

    for (let index = 0; index < endIndex; index++) {
        const line = lines[index];
        const lineNumber = index + 1;
        const characterCount = countCharacters(line);
        let exceedsLimit = false;
        let isValidTimeCode = true;

        if (firstFourLinesValidTimeCode) {
            isValidTimeCode = /^(?:[0-9]{2}:){3}[0-9]{2}\s*$/.test(line.substring(0, 12)) && isValidTimeValues(line.substring(0, 11));
            exceedsLimit = characterCount > 39;
        } else {
            exceedsLimit = (characterCount > 27 && line.charAt(11) !== ' ' && line.charAt(2) !== ':') || characterCount > 39;
        }

        const listItem = document.createElement('li');
        const foundWord = wordsToCheck.find(({ word }) => line.includes(word));


        if (exceedsLimit || !isValidTimeCode || foundWord) {
            let errorMessage = '';
            let errorClass = '';

            if (exceedsLimit) {
                errorMessage = `請確認字數`;
                errorClass = 'exceeds-limit';
            } else if (!isValidTimeCode) {
                errorMessage = `TIMECODE格式錯誤`;
                errorClass = 'invalid-timecode';
            } else if (foundWord) {
                errorMessage = foundWord.errorMessage;
                errorClass = foundWord.errorClass;
            }

            listItem.classList.add('error');
            listItem.id = `error-${lineNumber}`;
            listItem.textContent = `${lineNumber}`;

            const errorAnchor = document.createElement('a');
            errorAnchor.classList.add(errorClass);
            errorAnchor.textContent = `${lineNumber} ${errorMessage}`;
            errorAnchor.href = `#error-${lineNumber}`;
            errorAnchor.addEventListener('click', scrollToError);
            checkArea.appendChild(errorAnchor);
            hasError = true;
        }

        if (prevTimeCode !== null) {
            const currentTimeCode = line.substring(0, 11);
            if (timeCodeToNumber(currentTimeCode) <= timeCodeToNumber(prevTimeCode)) {
                const errorMessage = `TIMECODE順序錯誤`;
                const errorClass = 'invalid-timecode-order';

                listItem.classList.add('error');
                listItem.id = `error-${lineNumber}`;
                listItem.textContent = `${lineNumber}`;

                const errorAnchor = document.createElement('a');
                errorAnchor.classList.add(errorClass);
                errorAnchor.textContent = `${lineNumber} ${errorMessage}`;
                errorAnchor.href = `#error-${lineNumber}`;
                errorAnchor.addEventListener('click', scrollToError);
                checkArea.appendChild(errorAnchor);
                hasError = true;
            }
        }
    
        output.appendChild(listItem);
        prevTimeCode = line.substring(0, 11);
    }
    
    if (!hasError || !hasError && lastLine.trim().endsWith('END')) {
        const listItem = document.createElement('p');
        listItem.textContent = `無錯誤行句`;
        checkArea.appendChild(listItem);
    }
}


function isValidTimeValues(timeCode) {
    const parts = timeCode.split(':').map(part => parseInt(part, 10));
    return parts.every(part => part >= 0 && part <= 59);
}

function timeCodeToNumber(timeCode) {
    const parts = timeCode.split(':');
    return parseInt(parts[0]) * 1000000 + parseInt(parts[1]) * 10000 + parseInt(parts[2]) * 100 + parseInt(parts[3]);
}

function handleInput() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }


inputText.addEventListener('input', checkTimeCode);
inputText.addEventListener('paste', handleInput);