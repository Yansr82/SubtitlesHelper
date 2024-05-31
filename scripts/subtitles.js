let wordTableIdCounter = 300;
let wordTableData = JSON.parse(localStorage.getItem('wordTableData')) || [];

document.addEventListener('DOMContentLoaded', function () {
    let newBadgeData = localStorage.getItem('newBadge') === 'true';
    const tabsButton = document.querySelector('#check-rules-area-tab');
    const newBadge = document.querySelector('#rules-update');

    function updateWordTableData() {
        fetch('./scripts/dwt.json')
            .then(response => response.json())
            .then(data => {
                let updated = false;
                let maxNumber = data.reduce((max, item) => (item.number !== undefined && item.number !== null && item.number !== '' && item.number > max ? item.number : max), 0);

                data.forEach(item => {

                    if (item.number === null || item.number === undefined || item.number === '') {
                        item.number = ++maxNumber;
                    }

                    if (item.number >= 0 && item.number < 300) {
                        let existingItem = wordTableData.find(existing => existing.number === item.number);
                        if (!existingItem || existingItem.word !== item.word || existingItem.correct !== item.correct || existingItem.annotation !== item.annotation || existingItem.category !== item.category) {
                            if (!existingItem) {
                                wordTableData.push(item);
                            } else {
                                Object.assign(existingItem, item);
                            }
                            updated = true;
                            location.reload();
                        }
                    }
                });

                if (updated || wordTableData.length < 1) {
                    localStorage.setItem('wordTableData', JSON.stringify(wordTableData));
                    localStorage.setItem('newBadge', 'true');
                    newBadgeData = true;
                }

                checkBadgeDisplay();
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
            });
    }

    function checkBadgeDisplay() {
        if (newBadgeData) {
            newBadge.style.display = 'block';
        } else {
            newBadge.style.display = 'none';
        }
    }

    updateWordTableData();

    tabsButton.addEventListener('click', function () {
        localStorage.setItem('newBadge', 'false');
        newBadgeData = false;
        newBadge.style.display = 'none';
    });

    checkBadgeDisplay();
});





const restoreButton = document.getElementById('resetlocalStorage');
restoreButton.addEventListener('click', function () {
    fetch('./scripts/dwt-0529.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('wordTableData', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error loading default JSON:', error);
        });
});


let filteredWords = [];
const inputText = document.querySelector('.inputText');
const output = document.querySelector('.output ol');
const checkArea = document.querySelector('.check_area');
const wordsToCheck = [{
        word: '*',
        errorMessage: '請確認星號',
        errorClass: 'stay-key'
    },
    {
        word: '@',
        errorMessage: '請確認@符號',
        errorClass: 'at-symbol'
    },
    {
        word: '?',
        errorMessage: '請確認問號',
        errorClass: 'question-mark'
    }
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
                if (data.category === 'all' || data.category === 'name') {
                    filteredWords.push(data);
                } else if (checkbox.checked && data.category === checkbox.value) {
                    filteredWords.push(data);
                }
            });
            checkTimeCode();
        });
    });
    wordTableData.forEach(function (data) {
        if (data.category === 'all' || data.category === 'name') {
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
        } else if (char === ' ') {
            count += 0.5;
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
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function checkTimeCode() {
    const lines = inputText.value.split('\n');
    output.innerHTML = '';
    checkArea.innerHTML = '';
    let hasError = false;
    let prevTimeCode = null;

    let endIndex = lines.length;
    const firstLine = lines[0];
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
        const foundWord = wordsToCheck.find(({
            word
        }) => line.includes(word));
        const customizedWord = filteredWords.find(({
            word
        }) => {
            const wordsArray = word.split(',').map(w => w.trim());
            return wordsArray.some(w => {
                const matches = w.match(/(?<=\[)(.*?)(?=\])/);
                if (matches && matches.length > 0) {
                    const excludedWord = matches[0];
                    if (line.includes(excludedWord)) {
                        return false;
                    }
                }
                const wordToCheck = w.replace(/\[.*?\]/, '').trim();
                return line.includes(wordToCheck);
            });
        });



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
                    errorMessage = `請確認是否為"${customizedWord.correct}"`;
                    errorClass = 'customized-word';
                } else {
                    errorMessage = `請確認誤用字"${customizedWord.word}"`;
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
            if (timeCodeToSeconds(currentTimeCode) <= timeCodeToSeconds(prevTimeCode)) {
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

            } else if (countCharacters(lines[index - 1]) >= 12 && timeCodeToSeconds(currentTimeCode) - timeCodeToSeconds(prevTimeCode) >= 7) {
                const errorMessage = `請確認下字時間`;
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
    if (hasError) {
        return;
    }
    if (lastLine.trim().toLowerCase().endsWith('end') && firstLine.trim() === "01:00:00:00") {
        const listItem = document.createElement('p');
        listItem.textContent = `無錯誤行句`;
        checkArea.appendChild(listItem);
    } else {
        const listItem = document.createElement('p');
        listItem.textContent = `請檢查開頭及結尾格式 "01:00:00:00 or END"`;
        checkArea.appendChild(listItem);
    }
}


function isValidTimeValues(timeCode) {
    const parts = timeCode.split(':').map(part => parseInt(part, 10));
    if (parts.length !== 4) {
        return false;
    }
    const [hours, minutes, seconds, milliseconds] = parts;

    if (hours < 0 || hours > 59) return false;
    if (minutes < 0 || minutes > 59) return false;
    if (seconds < 0 || seconds > 59) return false;
    if (milliseconds < 0 || milliseconds > 29) return false;

    return true;
}


function timeCodeToSeconds(timeCode) {
    const parts = timeCode.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);
    const milliseconds = parseInt(parts[3]);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
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

        const newRow = createRow({
            correct,
            word,
            annotation,
            category
        });
        if (newRow) {
            insertRowByCategory(newRow, category);
            saveData(newRow);
        }

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
                    updateWordTableIdCounter(data);
                }
            });
        }
    }

    function updateWordTableIdCounter(data) {
        if (data.number >= wordTableIdCounter) {
            wordTableIdCounter = data.number + 1;
        }
    }

    function findExistingRow(data) {
        const tableRows = wordTableBody.querySelectorAll('tr');
        const dataCategory = getCategoryFromData(data);

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const td = row.querySelectorAll('td');
            const hasAllClass = row.classList.contains('all');
            const rowCategory = getCategoryFromRow(row);

            if ((td[0].textContent.trim() === data.word) && (hasAllClass || rowCategory === dataCategory)) {
                return row;
            }
        }
        return null;
    }

    function getCategoryFromData(data) {
        return data.category;
    }

    function getCategoryFromRow(row) {
        if (row.classList.contains('pcp-1')) return 'pcp-1';
        if (row.classList.contains('pcp-2')) return 'pcp-2';
        if (row.classList.contains('name')) return 'name';
        if (row.classList.contains('vgt')) return 'vgt';
        if (row.classList.contains('all')) return 'all';
        return null;
    }

    function createRow(data) {
        const existingRow = findExistingRow(data);
        if (existingRow) {
            alert('已有新增詞彙了！');
            return null;
        }

        const newRow = document.createElement("tr");
        let uniqueId;

        if (data.number !== undefined && data.number !== null) {
            uniqueId = `row-${data.number}`;
        } else {
            uniqueId = `row-${wordTableIdCounter++}`;
        }

        newRow.id = uniqueId;

        if (data.category) {
            newRow.classList.add(data.category.toLowerCase());
            newRow.classList.add(uniqueId);
        } else {
            console.error('Missing category in data:', data);
        }
        newRow.innerHTML = `
            <th></th>
            <td class="editable role-word">${data.word}</td>
            <td class="editable role-correct">${data.correct}</td>
            <td class="editable role-annotation">${data.annotation}</td>
        `;
        return newRow;
    }


    function saveData(newRow) {
        const tdList = newRow.querySelectorAll('td');
        const rowData = {
            category: newRow.classList[0],
            word: tdList[0].textContent.trim(),
            correct: tdList[1].textContent.trim(),
            annotation: tdList[2].textContent.trim(),
            number: parseInt(newRow.id.split('-')[1])
        };

        let savedData = localStorage.getItem('wordTableData');
        let rowDataArray = [];
        if (savedData) {
            rowDataArray = JSON.parse(savedData);
        }

        const existingIndex = rowDataArray.findIndex(item => item.word === rowData.word && item.category === rowData.category);

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

    const trsWithClass = document.querySelectorAll('#wordTable tr[class]');

    trsWithClass.forEach(tr => {
        tr.addEventListener('mouseenter', function () {
            this.classList.add('hovered');
        });

        tr.addEventListener('mouseleave', function () {
            this.classList.remove('hovered');
        });

        tr.addEventListener('click', function () {
            const rowNumberClass = Array.from(this.classList).find(cls => cls.startsWith('row-'));
            const rowNumber = parseInt(rowNumberClass.split('-')[1]);
            let savedData = localStorage.getItem('wordTableData');
            let rowDataArray = [];
            if (savedData) {
                rowDataArray = JSON.parse(savedData);
            }
            const indexToRemove = rowDataArray.findIndex(item =>
                item.number === rowNumber
            );
            if (indexToRemove !== -1) {
                rowDataArray.splice(indexToRemove, 1);
            }

            localStorage.setItem('wordTableData', JSON.stringify(rowDataArray));
            this.remove();
        });

    });



    document.getElementById('downloadButton').addEventListener('click', function () {
        const data = localStorage.getItem('wordTableData');
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate();
        const blob = new Blob([data], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wordTableData-${month}${day}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    document.getElementById('uploadButton').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            let data = JSON.parse(e.target.result);
            data = data.map((item, index) => {
                if (!item.hasOwnProperty('number')) {
                    item.number = wordTableIdCounter++;
                }
                return item;
            });

            localStorage.setItem('wordTableData', JSON.stringify(data));
            location.reload();
        };
        reader.readAsText(file);
    });

});