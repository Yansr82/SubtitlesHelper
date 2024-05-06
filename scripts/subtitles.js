let wordTableData = [];
let filteredWords = [];
const inputText = document.querySelector('.inputText');
const output = document.querySelector('.output ol');
const checkArea = document.querySelector('.check_area');
const wordsToCheck = [
    { word: '*', errorMessage: '請確認星號', errorClass: 'stay-key' },
    { word: '@', errorMessage: '請確認@符號', errorClass: 'at-symbol' },
    { word: '?', errorMessage: '請確認問號', errorClass: 'question-mark' }
];

document.addEventListener('DOMContentLoaded', function () {
    const savedData = localStorage.getItem('wordTableData');
    if (savedData) {
        wordTableData = JSON.parse(savedData);
    }

    const listItem = document.createElement('p');
    listItem.textContent = `錯誤檢查區`;
    checkArea.appendChild(listItem);

    const checkboxes = document.querySelectorAll('#checks-wrapper input[type="checkbox"]');

    checkboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener('click', function () {
            if (index === 0) {
                return;
            }

            if (checkbox.checked) {
                checkboxes.forEach(function (cb, idx) {
                    if (idx !== index && idx !== 0) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            filteredWords = [];
            wordTableData.forEach(function (data) {
                if (data.category === 'all') {
                    filteredWords.push(data);
                } else if (checkbox.checked && data.category === checkbox.value) {
                    filteredWords.push(data);
                }
            });
            checkTimeCode();
        });
    });
    wordTableData.forEach(function (data) {
        if (data.category === 'all') {
            filteredWords.push(data);
        }
    });
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
    if (lastLine.trim().toLowerCase().endsWith('end')) {
        endIndex--;
    }

    let firstFourLinesValidTimeCode = false;
    if (lines.length >= 5) {
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
        const customizedWord = filteredWords.find(({ word }) => line.includes(word));
        const customizedCorrect = filteredWords.map(obj => obj.correct);
        
        if (exceedsLimit || !isValidTimeCode || foundWord || customizedWord) {
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
            } else if (customizedWord) {
                if (customizedWord.correct) {
                    errorMessage = `請確認"${customizedWord.word}" / "${customizedWord.correct}"`;
                    errorClass = 'customized-word';
                } else {
                    errorMessage = `請確認"${customizedWord.word}"`;
                    errorClass = 'customized-word';
                }
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
    if (!hasError || !hasError && lastLine.trim().toLowerCase().endsWith('end')) {
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

// rules
document.addEventListener("DOMContentLoaded", function () {
    const addWordForm = document.getElementById("addWordForm");
    const wordTableBody = document.querySelector("#wordTable tbody");

    loadSavedData();

    addWordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const correct = document.getElementById("floating-word").value.trim();
        const word = document.getElementById("floating-error").value.trim();
        const annotation = document.getElementById("floating-annotation").value.trim();
        const category = document.getElementById("form-category").value.trim();

        const newRow = createRow({ correct, word, annotation, category });
        insertRowByCategory(newRow, category);
        saveData(newRow);

        addWordForm.reset();
    });

    function loadSavedData() {
        const savedData = localStorage.getItem('wordTableData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            parsedData.forEach(data => {
                const existingRow = findExistingRow(data);
                if (!existingRow) {
                    const newRow = createRow(data);
                    insertRowByCategory(newRow, data.category);
                }
            });
        }
    }

    function findExistingRow(data) {
        const tableRows = wordTableBody.querySelectorAll('tr');
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const td = row.querySelectorAll('td');
            if (td[0].textContent.trim() === data.correct &&
                td[1].textContent.trim() === data.word &&
                td[2].textContent.trim() === data.annotation) {
                return row;
            }
        }
        return null;
    }

    function createRow(data) {
        const newRow = document.createElement("tr");
        if (data.category) {
            newRow.classList.add(data.category.toLowerCase());
        }
        newRow.innerHTML = `
        <th></th>
        <td class="editable">${data.correct}</td>
        <td class="editable">${data.word}</td>  
        <td class="editable">${data.annotation}</td>
      `;
        return newRow;
    }

    function saveData(newRow) {
        const tdList = newRow.querySelectorAll('td');
        const rowData = {
            category: newRow.classList[0],
            correct: tdList[0].textContent.trim(),
            word: tdList[1].textContent.trim(),
            annotation: tdList[2].textContent.trim()
        };
        let savedData = localStorage.getItem('wordTableData');
        let rowDataArray = [];
        if (savedData) {
            rowDataArray = JSON.parse(savedData);
        }

        const existingIndex = rowDataArray.findIndex(item =>
            item.correct === rowData.correct &&
            item.word === rowData.word &&
            item.annotation === rowData.annotation
        );

        if (existingIndex !== -1) {
            rowDataArray[existingIndex] = rowData;
        } else {
            rowDataArray.push(rowData);
        }
        localStorage.setItem('wordTableData', JSON.stringify(rowDataArray));
    }

    function insertRowByCategory(newRow, category) {
        const categoryParent = document.querySelector(`.${category}`);
        if (categoryParent) {
            const parentTR = categoryParent.closest('tr');
            if (parentTR) {
                parentTR.after(newRow);
            } else {
                wordTableBody.appendChild(newRow);
            }
        } else {
            wordTableBody.appendChild(newRow);
        }
    }

    const editableTDs = document.querySelectorAll('td.editable');
    editableTDs.forEach(td => {
        td.addEventListener('click', function (event) {
            event.stopPropagation();
            td.classList.add('td-editable');

            if (!td.querySelector('input')) {
                const content = this.textContent;
                const input = document.createElement('input');
                input.value = content;
                this.innerHTML = '';
                this.appendChild(input);
                input.focus();
                input.addEventListener('blur', function () {
                    const newValue = input.value;
                    td.textContent = newValue;
                    saveData(td.parentNode);
                    td.classList.remove('td-editable');
                });

                input.addEventListener('keydown', function (event) {
                    if (event.keyCode === 13) {
                        input.blur();
                    }
                });
            }
        });
    });

    document.getElementById('downloadButton').addEventListener('click', function () {
        const data = localStorage.getItem('wordTableData');
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wordTableData.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    document.getElementById('uploadButton').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            localStorage.setItem('wordTableData', data);
            location.reload();
        };
        reader.readAsText(file);
    });
});

function openSettingsPopup() {
    const settingsPopup = document.querySelector('#settingsPopup');
    settingsPopup.style.display = 'block';
    setTimeout(function () {
        settingsPopup.style.opacity = '1';
    }, 10);
}

const closeButton = document.querySelector('#closeButton');
closeButton.onclick = closeSettingsPopup;

function closeSettingsPopup() {
    const settingsPopup = document.querySelector('#settingsPopup');
    settingsPopup.style.opacity = '0';
    setTimeout(function () {
        settingsPopup.style.display = 'none';
    }, 300);
}
