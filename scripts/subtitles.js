const restoreButton = document.getElementById('resetlocalStorage');
restoreButton.addEventListener('click', function () {
    localStorage.setItem('wordTableData', JSON.stringify(defaultWordTableData));
    window.location.reload();
});

const defaultWordTableData = [{
    "category": "all",
    "correct": "暴打",
    "word": "爆打",
    "annotation": "",
    "number": 37
}, {
    "category": "all",
    "correct": "暴汗",
    "word": "爆汗",
    "annotation": "",
    "number": 38
}, {
    "category": "all",
    "correct": "暴紅",
    "word": "爆紅",
    "annotation": "",
    "number": 39
}, {
    "category": "all",
    "correct": "暴發戶",
    "word": "爆發戶",
    "annotation": "",
    "number": 40
}, {
    "category": "all",
    "correct": "山洪暴發",
    "word": "山洪爆發",
    "annotation": "",
    "number": 41
}, {
    "category": "all",
    "correct": "爆炸",
    "word": "暴炸",
    "annotation": "",
    "number": 42
}, {
    "category": "all",
    "correct": "爆料",
    "word": "暴料",
    "annotation": "",
    "number": 43
}, {
    "category": "all",
    "correct": "爆笑",
    "word": "暴笑",
    "annotation": "",
    "number": 44
}, {
    "category": "all",
    "correct": "爆氣",
    "word": "暴氣",
    "annotation": "",
    "number": 45
}, {
    "category": "all",
    "correct": "爆哭",
    "word": "暴哭",
    "annotation": "",
    "number": 46
}, {
    "category": "pcp-1",
    "correct": "祕密",
    "word": "秘密",
    "annotation": "",
    "number": 47
}, {
    "category": "pcp-2",
    "correct": "秘密",
    "word": "祕密",
    "annotation": "",
    "number": 48
}, {
    "category": "all",
    "correct": "闔上",
    "word": "合上",
    "annotation": "240513會議",
    "number": 49
}, {
    "category": "all",
    "correct": "闔眼",
    "word": "合眼",
    "annotation": "240513會議",
    "number": 50
}, {
    "category": "all",
    "correct": "作夢",
    "word": "做夢",
    "annotation": "240513會議",
    "number": 51
}, {
    "category": "all",
    "correct": "作主",
    "word": "做主",
    "annotation": "240513會議",
    "number": 52
}, {
    "category": "all",
    "correct": "做不了主",
    "word": "作不了主",
    "annotation": "240513會議",
    "number": 53
}, {
    "category": "all",
    "correct": "做了主",
    "word": "作了主",
    "annotation": "240513會議",
    "number": 54
}, {
    "category": "all",
    "correct": "做惡夢",
    "word": "作惡夢",
    "annotation": "240513會議",
    "number": 55
}, {
    "category": "all",
    "word": "非常的",
    "correct": "非常地",
    "annotation": "",
    "number": 90
}, {
    "category": "all",
    "correct": "紙媒",
    "word": "中國時報",
    "annotation": "",
    "number": 57
}, {
    "category": "pcp-2",
    "correct": "北朝鮮",
    "word": "北韓",
    "annotation": "",
    "number": 59
}, {
    "category": "name",
    "correct": "余莓莓",
    "word": "于莓莓,于苺苺,余苺苺",
    "annotation": "",
    "number": 60
}, {
    "category": "name",
    "correct": "呂家愷",
    "word": "呂家凱,呂家楷",
    "annotation": "",
    "number": 61
}, {
    "category": "all",
    "correct": "禁得起",
    "word": "經得起",
    "annotation": "",
    "number": 62
}, {
    "category": "all",
    "correct": "禁不起",
    "word": "經不起",
    "annotation": "",
    "number": 63
}, {
    "category": "all",
    "word": "污點證人",
    "correct": "汙點證人",
    "annotation": "",
    "number": 64
}, {
    "category": "all",
    "word": "貪污",
    "correct": "貪汙",
    "annotation": "",
    "number": 65
}, {
    "category": "all",
    "word": "扯蛋",
    "correct": "扯淡",
    "annotation": "",
    "number": 66
}, {
    "category": "name",
    "word": "廖偉祥,廖瑋翔",
    "correct": "廖偉翔",
    "annotation": "",
    "number": 67
}, {
    "category": "name",
    "word": "江宜臻,江怡蓁",
    "correct": "江怡臻",
    "annotation": "",
    "number": 68
}, {
    "category": "name",
    "word": "陳珮琪",
    "correct": "陳佩琪",
    "annotation": "",
    "number": 69
}, {
    "category": "all",
    "word": "月份",
    "correct": "月分",
    "annotation": "",
    "number": 70
}, {
    "category": "name",
    "word": "游淑惠",
    "correct": "游淑慧",
    "annotation": "",
    "number": 71
}, {
    "category": "name",
    "word": "洪偉傑,洪緯傑,洪暐杰",
    "correct": "洪暐傑",
    "annotation": "醫學大聯盟",
    "number": 36
}, {
    "category": "all",
    "word": "凸顯",
    "correct": "突顯",
    "annotation": "",
    "number": 73
}, {
    "category": "all",
    "word": "精彩",
    "correct": "精采",
    "annotation": "",
    "number": 74
}, {
    "category": "name",
    "word": "顏寬恆",
    "correct": "顏寬恒",
    "annotation": "",
    "number": 75
}, {
    "category": "all",
    "word": "部份",
    "correct": "部分",
    "annotation": "",
    "number": 76
}, {
    "category": "all",
    "word": "大陸",
    "correct": "中國",
    "annotation": "",
    "number": 78
}, {
    "category": "name",
    "word": "柯建民,柯建名",
    "correct": "柯建銘",
    "annotation": "",
    "number": 79
}, {
    "category": "all",
    "word": "綠畜",
    "correct": "綠營",
    "annotation": "",
    "number": 80
}, {
    "category": "pcp-2",
    "word": "兇",
    "correct": "凶",
    "annotation": "",
    "number": 82
}, {
    "category": "all",
    "word": "沒梗,有梗,梗圖,時事梗",
    "correct": "哏",
    "annotation": "",
    "number": 84
}, {
    "category": "name",
    "word": "謝依鳳,謝衣鳯",
    "correct": "謝衣鳳",
    "annotation": "",
    "number": 85
}, {
    "category": "pcp-1",
    "word": "韓國,北韓",
    "correct": "南韓/北朝鮮",
    "annotation": "",
    "number": 86
}, {
    "category": "all",
    "word": "Oppa,oppa",
    "correct": "Obba",
    "annotation": "",
    "number": 88
}, {
    "category": "all",
    "word": "賀爾蒙",
    "correct": "荷爾蒙",
    "annotation": "",
    "number": 89
}, {
    "category": "all",
    "correct": "鞦韆",
    "word": "秋千",
    "annotation": "",
    "number": 119
}, {
    "category": "all",
    "correct": "棟樑",
    "word": "棟梁",
    "annotation": "",
    "number": 120
}, {
    "category": "all",
    "correct": "橋樑",
    "word": "橋梁",
    "annotation": "",
    "number": 121
}, {
    "category": "all",
    "correct": "嘴唇",
    "word": "嘴脣",
    "annotation": "",
    "number": 122
}, {
    "category": "all",
    "correct": "護唇膏",
    "word": "護脣膏",
    "annotation": "",
    "number": 123
}, {
    "category": "all",
    "correct": "咆哮",
    "word": "咆嘯",
    "annotation": "",
    "number": 124
}, {
    "category": "all",
    "correct": "抹煞",
    "word": "抹殺",
    "annotation": "",
    "number": 125
}, {
    "category": "all",
    "correct": "要嘛",
    "word": "要馬",
    "annotation": "",
    "number": 126
}, {
    "category": "all",
    "correct": "名不副實",
    "word": "名不符實",
    "annotation": "",
    "number": 127
}, {
    "category": "all",
    "correct": "意識型態",
    "word": "意識形態",
    "annotation": "",
    "number": 128
}, {
    "category": "all",
    "correct": "日據",
    "word": "日治",
    "annotation": "",
    "number": 129
}, {
    "category": "all",
    "correct": "人參",
    "word": "人蔘",
    "annotation": "",
    "number": 130
}, {
    "category": "all",
    "correct": "窗帘",
    "word": "窗簾",
    "annotation": "",
    "number": 131
}, {
    "category": "all",
    "correct": "眼簾",
    "word": "眼帘",
    "annotation": "",
    "number": 132
}, {
    "category": "all",
    "correct": "氾濫",
    "word": "泛濫",
    "annotation": "",
    "number": 133
}, {
    "category": "all",
    "correct": "寒毛",
    "word": "汗毛",
    "annotation": "",
    "number": 134
}, {
    "category": "all",
    "correct": "坑坑巴巴",
    "word": "坑坑疤疤",
    "annotation": "",
    "number": 135
}, {
    "category": "all",
    "correct": "一分子",
    "word": "一份子",
    "annotation": "",
    "number": 136
}, {
    "category": "all",
    "correct": "分量",
    "word": "份量",
    "annotation": "",
    "number": 137
}, {
    "category": "all",
    "correct": "蘸醬",
    "word": "沾醬",
    "annotation": "",
    "number": 138
}, {
    "category": "all",
    "correct": "肴",
    "word": "餚",
    "annotation": "",
    "number": 139
}, {
    "category": "all",
    "correct": "占",
    "word": "佔",
    "annotation": "",
    "number": 140
}, {
    "category": "all",
    "correct": "嘗",
    "word": "嚐",
    "annotation": "",
    "number": 141
}, {
    "category": "all",
    "correct": "念",
    "word": "唸",
    "annotation": "",
    "number": 142
}, {
    "category": "all",
    "correct": "癡",
    "word": "痴",
    "annotation": "",
    "number": 143
}, {
    "category": "all",
    "correct": "黏",
    "word": "粘",
    "annotation": "",
    "number": 144
}, {
    "category": "all",
    "correct": "越",
    "word": "愈",
    "annotation": "",
    "number": 145
}, {
    "category": "all",
    "correct": "濕",
    "word": "溼",
    "annotation": "",
    "number": 146
}, {
    "category": "all",
    "correct": "古董",
    "word": "骨董",
    "annotation": "",
    "number": 147
}, {
    "category": "all",
    "correct": "突顯",
    "word": "凸顯",
    "annotation": "",
    "number": 148
}, {
    "category": "all",
    "correct": "起司",
    "word": "起士",
    "annotation": "",
    "number": 149
}, {
    "category": "all",
    "correct": "饑餓",
    "word": "飢餓",
    "annotation": "",
    "number": 150
}, {
    "category": "all",
    "correct": "囉嗦",
    "word": "囉唆",
    "annotation": "",
    "number": 151
}, {
    "category": "all",
    "correct": "保母",
    "word": "保姆",
    "annotation": "",
    "number": 152
}, {
    "category": "all",
    "correct": "枴杖",
    "word": "拐杖",
    "annotation": "",
    "number": 153
}, {
    "category": "all",
    "correct": "叩關",
    "word": "扣關",
    "annotation": "",
    "number": 154
}, {
    "category": "name",
    "correct": "陳時中",
    "word": "陳時鐘",
    "annotation": "",
    "number": 231
}, {
    "category": "name",
    "correct": "郭台銘",
    "word": "郭台名, 郭台明",
    "annotation": "",
    "number": 232
}, {
    "category": "name",
    "correct": "蘇貞昌",
    "word": "蘇偵昌, 蘇真昌",
    "annotation": "",
    "number": 233
}, {
    "category": "name",
    "correct": "黃珊珊",
    "word": "黃姍姍, 黃刪刪",
    "annotation": "",
    "number": 234
}];

let wordTableData = defaultWordTableData;
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
        const customizedWord = filteredWords.find(({ word }) => {
            const matches = word.match(/(.*)\[(.*?)\]/);
            if (matches && matches.length > 2) {
                const mainWord = matches[1].trim();
                const excludedWord = matches[2].trim();
                if (line.includes(mainWord)) {
                    if (line.includes(excludedWord)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return line.includes(word.trim());
            }
            return false;
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

            } else if (timeCodeToSeconds(currentTimeCode) - timeCodeToSeconds(prevTimeCode) >= 7) {
                const errorMessage = `確認是否未下字`;
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
    console.log(lastLine.trim(), firstLine.trim());
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
    let wordTableIdCounter = 1;

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
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const td = row.querySelectorAll('td');
            if (td[2].textContent.trim() === data.word) {
                return row;
            }
        }
        return null;
    }

    function createRow(data) {
        const existingRow = findExistingRow(data);
        if (existingRow) {
            oml2d.tipsMessage('已有新增詞彙了！');
            return null;
        }

        const newRow = document.createElement("tr");
        const uniqueId = `row-${wordTableIdCounter++}`;
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

    function saveData(newRow, isNewRow) {
        const tdList = newRow.querySelectorAll('td');
        const rowData = {
            category: newRow.classList[0],
            word: tdList[0].textContent.trim(),
            correct: tdList[1].textContent.trim(),
            annotation: tdList[2].textContent.trim(),
            number: parseInt(newRow.classList[1].split('-')[1])
        };

        let savedData = localStorage.getItem('wordTableData');
        let rowDataArray = [];
        if (savedData) {
            rowDataArray = JSON.parse(savedData);
        }

        const existingIndex = rowDataArray.findIndex(item =>
            item.word === rowData.word
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

    // const editableTDs = document.querySelectorAll('td.editable');
    // editableTDs.forEach(td => {
    //     td.addEventListener('click', function (event) {
    //         event.stopPropagation();
    //         td.classList.add('td-editable');
    //         const editableIndex = Array.from(editableTDs).indexOf(this);

    //         if (!td.querySelector('input')) {
    //             const content = this.textContent;
    //             const input = document.createElement('input');
    //             input.value = content;
    //             this.innerHTML = '';
    //             this.appendChild(input);
    //             input.focus();
    //             input.addEventListener('blur', function () {
    //                 const existingRow = findExistingRow({ word: input.value });
    //                 if (existingRow && editableIndex !== 1) {
    //                     const newValue = input.value;
    //                     td.textContent = newValue;
    //                     saveData(td.parentNode, false);
    //                     td.classList.remove('td-editable');
    //                 } else if (!existingRow) {
    //                     const newValue = input.value;
    //                     td.textContent = newValue;
    //                     saveData(td.parentNode, false);
    //                     td.classList.remove('td-editable');
    //                 } else {
    //                     oml2d.tipsMessage('已有新增詞彙了！');
    //                     return null;
    //                 }
    //             });

    //             input.addEventListener('keydown', function (event) {
    //                 if (event.keyCode === 13) {
    //                     input.blur();
    //                 }
    //             });
    //         }
    //     });
    // });

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
        const blob = new Blob([data], {
            type: 'application/json'
        });
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