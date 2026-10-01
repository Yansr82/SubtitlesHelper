let wordTableIdCounter = 300;
let wordTableData = [];

/*
 * 第一次使用時才載入 dwt.json
 * 之後全部以 localStorage 的 wordTableData 為準
 */
document.addEventListener("DOMContentLoaded", function () {
  const savedData = localStorage.getItem("wordTableData");

  if (savedData !== null) {
    try {
      wordTableData = JSON.parse(savedData) || [];
      console.log("已載入使用者端 DWT 資料");
    } catch (error) {
      console.error("localStorage 資料格式錯誤:", error);
      wordTableData = [];
    }

    return;
  }

  console.log("首次使用，載入預設 DWT...");

  fetch("./scripts/dwt.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response was not ok: " + response.statusText
        );
      }

      return response.json();
    })
    .then((data) => {
      /*
       * 找出目前 dwt.json 最大的 number
       * 沒有 number 的資料在第一次匯入時補上固定 number
       */
      let maxNumber = data.reduce((max, item) => {
        const number = Number(item.number);

        if (
          item.number !== undefined &&
          item.number !== null &&
          item.number !== "" &&
          !Number.isNaN(number) &&
          number > max
        ) {
          return number;
        }

        return max;
      }, 0);

      data.forEach((item) => {
        if (
          item.number === undefined ||
          item.number === null ||
          item.number === ""
        ) {
          item.number = ++maxNumber;
        } else {
          item.number = Number(item.number);
        }
      });

      wordTableData = data;

      localStorage.setItem(
        "wordTableData",
        JSON.stringify(wordTableData)
      );

      console.log("首次載入預設 DWT 完成");

      location.reload();
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
});

let filteredWords = [];

const inputText = document.querySelector(".inputText");
const output = document.querySelector(".output ol");
const checkArea = document.querySelector(".check_area");

const wordsToCheck = [
  {
    word: "*",
    errorMessage: "請確認星號",
    errorClass: "stay-key",
  },
  {
    word: "@",
    errorMessage: "請確認@符號",
    errorClass: "at-symbol",
  },
  {
    word: "?",
    errorMessage: "請確認問號",
    errorClass: "question-mark",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const savedData = localStorage.getItem("wordTableData");

  if (savedData) {
    try {
      wordTableData = JSON.parse(savedData) || [];
    } catch (error) {
      console.error("讀取 wordTableData 失敗:", error);
      wordTableData = [];
    }
  }

  const listItem = document.createElement("p");
  listItem.textContent = `錯誤檢查區`;
  checkArea.appendChild(listItem);

  const checkboxes = document.querySelectorAll(
    '#toolbar input[type="checkbox"]'
  );

  checkboxes.forEach(function (checkbox, index) {
    checkbox.addEventListener("click", function () {
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
    checkbox.addEventListener("change", function () {
      filteredWords = [];

      wordTableData.forEach(function (data) {
        if (
          data.category === "all" ||
          data.category === "name"
        ) {
          filteredWords.push(data);
        } else if (
          checkbox.checked &&
          data.category === checkbox.value
        ) {
          filteredWords.push(data);
        }
      });

      checkTimeCode();
    });
  });

  wordTableData.forEach(function (data) {
    if (
      data.category === "all" ||
      data.category === "name"
    ) {
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
    } else if (char === " ") {
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

  const targetId = event.target
    .getAttribute("href")
    .substring(1);

  const targetElement =
    document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

function checkTimeCode() {
  const sotCheck =
    document.getElementById("subtitles-check-4");

  const lines =
    inputText.value.split("\n");

  output.innerHTML = "";
  checkArea.innerHTML = "";

  let hasError = false;
  let prevTimeCode = null;
  let endIndex = lines.length;

  const firstLine = lines[0];
  const lastLine =
    lines[lines.length - 1];

  if (
    lastLine
      .trim()
      .toLowerCase()
      .endsWith("end")
  ) {
    endIndex--;
  }

  let firstFourLinesValidTimeCode = false;

  if (lines.length >= 5) {
    const firstLineTimeCodeValid =
      /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(
        lines[0].substring(0, 11)
      );

    const secondLineTimeCodeValid =
      /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(
        lines[1].substring(0, 11)
      );

    const thirdLineTimeCodeValid =
      /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(
        lines[2].substring(0, 11)
      );

    const fourthLineTimeCodeValid =
      /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(
        lines[3].substring(0, 11)
      );

    const fifthLineTimeCodeValid =
      /^(?:[0-9]{2}:){3}[0-9]{2}$/.test(
        lines[4].substring(0, 11)
      );

    firstFourLinesValidTimeCode =
      firstLineTimeCodeValid &&
      secondLineTimeCodeValid &&
      thirdLineTimeCodeValid &&
      fourthLineTimeCodeValid &&
      fifthLineTimeCodeValid;
  }

  for (
    let index = 0;
    index < endIndex;
    index++
  ) {
    const line = lines[index];
    const lineNumber = index + 1;
    const characterCount =
      countCharacters(line);

    let exceedsLimit = false;
    let isValidTimeCode = true;

    if (sotCheck.checked) {
      exceedsLimit =
        (characterCount > 24 &&
          line.charAt(11) !== " " &&
          line.charAt(2) !== ":") ||
        characterCount > 36;
    } else if (
      firstFourLinesValidTimeCode
    ) {
      isValidTimeCode =
        /^(?:[0-9]{2}:){3}[0-9]{2}\s*$/.test(
          line.substring(0, 12)
        ) &&
        isValidTimeValues(
          line.substring(0, 11)
        );

      exceedsLimit =
        characterCount > 39;
    } else {
      exceedsLimit =
        (characterCount > 27 &&
          line.charAt(11) !== " " &&
          line.charAt(2) !== ":") ||
        characterCount > 39;
    }

    const listItem =
      document.createElement("li");

    const foundWord =
      wordsToCheck.find(({ word }) =>
        line.includes(word)
      );

    const customizedWord =
      filteredWords.find(
        ({
          word,
          regex = false,
        }) => {
          const wordsArray =
            word.split(",").map((w) => {
              if (regex) {
                return w;
              }

              return w.trim();
            });

          return wordsArray.some((w) => {
            const matches =
              w.match(
                /(?<=\[)(.*?)(?=\])/
              );

            if (
              matches &&
              matches.length > 0
            ) {
              const excludedWord =
                matches[0];

              if (
                line.includes(
                  excludedWord
                )
              ) {
                return false;
              }
            }

            if (regex) {
              try {
                const regexToCheck =
                  new RegExp(
                    w
                      .replace(
                        /\[.*?\]/,
                        ""
                      )
                      .trim()
                  );

                return regexToCheck.test(
                  line
                );
              } catch (error) {
                return false;
              }
            }

            const wordToCheck =
              w
                .replace(
                  /\[.*?\]/,
                  ""
                )
                .trim();

            return line.includes(
              wordToCheck
            );
          });
        }
      );

    if (
      exceedsLimit ||
      !isValidTimeCode ||
      foundWord ||
      customizedWord
    ) {
      let errorMessage = "";
      let errorClass = "";

      if (exceedsLimit) {
        errorMessage =
          `請確認字數`;

        errorClass =
          "exceeds-limit";
      } else if (
        !isValidTimeCode
      ) {
        errorMessage =
          `TIMECODE格式錯誤`;

        errorClass =
          "invalid-timecode";
      } else if (foundWord) {
        errorMessage =
          foundWord.errorMessage;

        errorClass =
          foundWord.errorClass;
      } else if (
        customizedWord
      ) {
        if (
          customizedWord.correct
        ) {
          errorMessage =
            `請確認是否為"${customizedWord.correct}"`;

          errorClass =
            "customized-word";
        } else {
          errorMessage =
            `請確認誤用字"${customizedWord.word}"`;

          errorClass =
            "customized-word";
        }
      }

      listItem.classList.add(
        "error"
      );

      listItem.id =
        `error-${lineNumber}`;

      listItem.textContent =
        `${lineNumber}`;

      const errorAnchor =
        document.createElement("a");

      errorAnchor.classList.add(
        errorClass
      );

      errorAnchor.textContent =
        `${lineNumber} ${errorMessage}`;

      errorAnchor.href =
        `#error-${lineNumber}`;

      errorAnchor.addEventListener(
        "click",
        scrollToError
      );

      checkArea.appendChild(
        errorAnchor
      );

      hasError = true;
    }

    if (prevTimeCode !== null) {
      const currentTimeCode =
        line.substring(0, 11);

      if (
        timeCodeToSeconds(
          currentTimeCode
        ) <=
        timeCodeToSeconds(
          prevTimeCode
        )
      ) {
        const errorMessage =
          `TIMECODE順序錯誤`;

        const errorClass =
          "invalid-timecode-order";

        listItem.classList.add(
          "error"
        );

        listItem.id =
          `error-${lineNumber}`;

        listItem.textContent =
          `${lineNumber}`;

        const errorAnchor =
          document.createElement("a");

        errorAnchor.classList.add(
          errorClass
        );

        errorAnchor.textContent =
          `${lineNumber} ${errorMessage}`;

        errorAnchor.href =
          `#error-${lineNumber}`;

        errorAnchor.addEventListener(
          "click",
          scrollToError
        );

        checkArea.appendChild(
          errorAnchor
        );

        hasError = true;
      } else if (
        countCharacters(
          lines[index - 1]
        ) >= 12 &&
        timeCodeToSeconds(
          currentTimeCode
        ) -
          timeCodeToSeconds(
            prevTimeCode
          ) >=
          7
      ) {
        const errorMessage =
          `請確認下字時間`;

        const errorClass =
          "invalid-timecode-order";

        listItem.classList.add(
          "error"
        );

        listItem.id =
          `error-${lineNumber}`;

        listItem.textContent =
          `${lineNumber}`;

        const errorAnchor =
          document.createElement("a");

        errorAnchor.classList.add(
          errorClass
        );

        errorAnchor.textContent =
          `${lineNumber} ${errorMessage}`;

        errorAnchor.href =
          `#error-${lineNumber}`;

        errorAnchor.addEventListener(
          "click",
          scrollToError
        );

        checkArea.appendChild(
          errorAnchor
        );

        hasError = true;
      }
    }

    output.appendChild(listItem);

    prevTimeCode =
      line.substring(0, 11);
  }

  if (hasError) {
    return;
  }

  if (
    lastLine
      .trim()
      .toLowerCase()
      .endsWith("end") &&
    firstLine.trim() ===
      "01:00:00:00"
  ) {
    const listItem =
      document.createElement("p");

    listItem.textContent =
      `無錯誤行句`;

    checkArea.appendChild(
      listItem
    );
  } else {
    const listItem =
      document.createElement("p");

    listItem.textContent =
      `請檢查開頭及結尾格式 "01:00:00:00 or END"`;

    checkArea.appendChild(
      listItem
    );
  }
}

function isValidTimeValues(
  timeCode
) {
  const parts =
    timeCode
      .split(":")
      .map((part) =>
        parseInt(part, 10)
      );

  if (parts.length !== 4) {
    return false;
  }

  const [
    hours,
    minutes,
    seconds,
    milliseconds,
  ] = parts;

  if (
    hours < 0 ||
    hours > 59
  ) {
    return false;
  }

  if (
    minutes < 0 ||
    minutes > 59
  ) {
    return false;
  }

  if (
    seconds < 0 ||
    seconds > 59
  ) {
    return false;
  }

  if (
    milliseconds < 0 ||
    milliseconds > 29
  ) {
    return false;
  }

  return true;
}

function timeCodeToSeconds(
  timeCode
) {
  const parts =
    timeCode.split(":");

  const hours =
    parseInt(parts[0]);

  const minutes =
    parseInt(parts[1]);

  const seconds =
    parseInt(parts[2]);

  const milliseconds =
    parseInt(parts[3]);

  return (
    hours * 3600 +
    minutes * 60 +
    seconds +
    milliseconds / 1000
  );
}

function handleInput() {
  setTimeout(() => {
    window.scrollTo(
      0,
      document.body.scrollHeight
    );
  }, 0);
}

function debounce(
  func,
  wait
) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);

    timeout =
      setTimeout(
        () =>
          func.apply(
            context,
            args
          ),
        wait
      );
  };
}

inputText.addEventListener(
  "input",
  debounce(
    checkTimeCode,
    500
  )
);

inputText.addEventListener(
  "paste",
  handleInput
);


// ==========================
// RULES / DWT
// ==========================

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const addWordForm =
      document.getElementById(
        "addWordForm"
      );

    const wordTableBody =
      document.querySelector(
        "#wordTable tbody"
      );

    loadSavedData();

    addWordForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        const correct =
          document
            .getElementById(
              "floating-word"
            )
            .value.trim();

        const word =
          document
            .getElementById(
              "floating-error"
            )
            .value.trim();

        const annotation =
          document
            .getElementById(
              "floating-annotation"
            )
            .value.trim();

        const category =
          document
            .getElementById(
              "form-category"
            )
            .value.trim();

        const newRow =
          createRow({
            correct,
            word,
            annotation,
            category,
          });

        if (newRow) {
          insertRowByCategory(
            newRow,
            category
          );

          saveData(newRow);

          /*
           * 新增後同步更新記憶體資料，
           * 不必重新整理也可以立即用於字幕檢查。
           */
          refreshWordTableData();
        }

        addWordForm.reset();
      }
    );

    function refreshWordTableData() {
      const savedData =
        localStorage.getItem(
          "wordTableData"
        );

      if (savedData) {
        try {
          wordTableData =
            JSON.parse(
              savedData
            ) || [];
        } catch (error) {
          console.error(
            "重新讀取 DWT 失敗:",
            error
          );
        }
      }

      refreshFilteredWords();
    }

    function refreshFilteredWords() {
      filteredWords = [];

      const checkboxes =
        document.querySelectorAll(
          '#toolbar input[type="checkbox"]'
        );

      const checkedValues =
        Array.from(
          checkboxes
        )
          .filter(
            (checkbox) =>
              checkbox.checked
          )
          .map(
            (checkbox) =>
              checkbox.value
          );

      wordTableData.forEach(
        function (data) {
          if (
            data.category ===
              "all" ||
            data.category ===
              "name"
          ) {
            filteredWords.push(
              data
            );
          } else if (
            checkedValues.includes(
              data.category
            )
          ) {
            filteredWords.push(
              data
            );
          }
        }
      );
    }

    function loadSavedData() {
      const savedData =
        localStorage.getItem(
          "wordTableData"
        );

      if (!savedData) {
        return;
      }

      let parsedData = [];

      try {
        parsedData =
          JSON.parse(savedData) ||
          [];
      } catch (error) {
        console.error(
          "載入 DWT 資料失敗:",
          error
        );

        return;
      }

      parsedData.forEach(
        (data) => {
          const existingRow =
            findExistingRow(
              data
            );

          if (!existingRow) {
            const newRow =
              createRow(data);

            if (newRow) {
              insertRowByCategory(
                newRow,
                data.category
              );
            }
          }

          updateWordTableIdCounter(
            data
          );
        }
      );

      /*
       * 避免使用者新增項目的 ID
       * 跟預設 DWT 的 ID 撞到
       */
      if (
        wordTableIdCounter <
        300
      ) {
        wordTableIdCounter =
          300;
      }
    }

    function updateWordTableIdCounter(
      data
    ) {
      const number =
        Number(data.number);

      if (
        !Number.isNaN(number) &&
        number >=
          wordTableIdCounter
      ) {
        wordTableIdCounter =
          number + 1;
      }
    }

    function findExistingRow(
      data
    ) {
      const tableRows =
        wordTableBody.querySelectorAll(
          "tr"
        );

      const dataCategory =
        getCategoryFromData(
          data
        );

      for (
        let i = 0;
        i <
        tableRows.length;
        i++
      ) {
        const row =
          tableRows[i];

        const td =
          row.querySelectorAll(
            "td"
          );

        if (
          td.length === 0
        ) {
          continue;
        }

        const hasAllClass =
          row.classList.contains(
            "all"
          );

        const rowCategory =
          getCategoryFromRow(
            row
          );

        if (
          td[0]
            .textContent
            .trim() ===
            data.word &&
          (
            hasAllClass ||
            rowCategory ===
              dataCategory
          )
        ) {
          return row;
        }
      }

      return null;
    }

    function getCategoryFromData(
      data
    ) {
      return data.category;
    }

    function getCategoryFromRow(
      row
    ) {
      if (
        row.classList.contains(
          "pcp-1"
        )
      ) {
        return "pcp-1";
      }

      if (
        row.classList.contains(
          "pcp-2"
        )
      ) {
        return "pcp-2";
      }

      if (
        row.classList.contains(
          "name"
        )
      ) {
        return "name";
      }

      if (
        row.classList.contains(
          "vgt"
        )
      ) {
        return "vgt";
      }

      if (
        row.classList.contains(
          "all"
        )
      ) {
        return "all";
      }

      return null;
    }

    function createRow(data) {
      const existingRow =
        findExistingRow(
          data
        );

      if (existingRow) {
        return null;
      }

      const newRow =
        document.createElement(
          "tr"
        );

      let uniqueId;

      if (
        data.number !==
          undefined &&
        data.number !== null &&
        data.number !== ""
      ) {
        uniqueId =
          `row-${data.number}`;
      } else {
        uniqueId =
          `row-${wordTableIdCounter++}`;
      }

      newRow.id =
        uniqueId;

      if (data.category) {
        newRow.classList.add(
          data.category
            .toLowerCase()
        );

        newRow.classList.add(
          uniqueId
        );
      } else {
        console.error(
          "Missing category in data:",
          data
        );
      }

      newRow.innerHTML = `
        <th></th>
        <td class="editable role-word">${data.word || ""}</td>
        <td class="editable role-correct">${data.correct || ""}</td>
        <td class="editable role-annotation">${data.annotation || ""}</td>
      `;

      /*
       * 動態新增的 row 也直接綁定事件
       */
      bindRowEvents(newRow);

      return newRow;
    }

    function saveData(
      newRow
    ) {
      const tdList =
        newRow.querySelectorAll(
          "td"
        );

      const rowData = {
        category:
          newRow.classList[0],

        word:
          tdList[0]
            .textContent
            .trim(),

        correct:
          tdList[1]
            .textContent
            .trim(),

        annotation:
          tdList[2]
            .textContent
            .trim(),

        number:
          parseInt(
            newRow.id.split(
              "-"
            )[1],
            10
          ),
      };

      let savedData =
        localStorage.getItem(
          "wordTableData"
        );

      let rowDataArray = [];

      if (savedData) {
        try {
          rowDataArray =
            JSON.parse(
              savedData
            ) || [];
        } catch (error) {
          console.error(
            "讀取 DWT 失敗:",
            error
          );

          rowDataArray = [];
        }
      }

      const existingIndex =
        rowDataArray.findIndex(
          (item) =>
            item.number ===
            rowData.number
        );

      if (
        existingIndex !== -1
      ) {
        rowDataArray[
          existingIndex
        ] = rowData;
      } else {
        rowDataArray.push(
          rowData
        );
      }

      localStorage.setItem(
        "wordTableData",
        JSON.stringify(
          rowDataArray
        )
      );
    }

    function insertRowByCategory(
      newRow,
      category
    ) {
      const categoryParent =
        document.querySelector(
          `.${category}`
        );

      if (
        categoryParent
      ) {
        const parentTR =
          categoryParent.closest(
            "tr"
          );

        if (
          parentTR
        ) {
          parentTR.after(
            newRow
          );
        } else {
          wordTableBody.appendChild(
            newRow
          );
        }
      } else {
        wordTableBody.appendChild(
          newRow
        );
      }
    }

    function bindRowEvents(
      tr
    ) {
      /*
       * 避免同一 row 重複綁定事件
       */
      if (
        tr.dataset
          .eventsBound ===
        "true"
      ) {
        return;
      }

      tr.dataset.eventsBound =
        "true";

      tr.addEventListener(
        "mouseenter",
        function () {
          this.classList.add(
            "hovered"
          );
        }
      );

      tr.addEventListener(
        "mouseleave",
        function () {
          this.classList.remove(
            "hovered"
          );
        }
      );

      tr.addEventListener(
        "click",
        function () {
          const rowNumberClass =
            Array.from(
              this.classList
            ).find((cls) =>
              cls.startsWith(
                "row-"
              )
            );

          if (
            !rowNumberClass
          ) {
            return;
          }

          const rowNumber =
            parseInt(
              rowNumberClass.split(
                "-"
              )[1],
              10
            );

          if (
            Number.isNaN(
              rowNumber
            )
          ) {
            return;
          }

          let savedData =
            localStorage.getItem(
              "wordTableData"
            );

          let rowDataArray =
            [];

          if (savedData) {
            try {
              rowDataArray =
                JSON.parse(
                  savedData
                ) || [];
            } catch (error) {
              console.error(
                "讀取 DWT 失敗:",
                error
              );

              return;
            }
          }

          const indexToRemove =
            rowDataArray.findIndex(
              (item) =>
                Number(
                  item.number
                ) ===
                rowNumber
            );

          if (
            indexToRemove !==
            -1
          ) {
            rowDataArray.splice(
              indexToRemove,
              1
            );
          }

          localStorage.setItem(
            "wordTableData",
            JSON.stringify(
              rowDataArray
            )
          );

          this.remove();

          /*
           * 刪除後同步更新字幕檢查使用的資料
           */
          refreshWordTableData();

          checkTimeCode();
        }
      );
    }

    const trsWithClass =
      document.querySelectorAll(
        "#wordTable tr[class]"
      );

    trsWithClass.forEach(
      (tr) => {
        /*
         * 分類標題若沒有 row-number
         * bindRowEvents 裡會自然略過刪除
         */
        bindRowEvents(tr);
      }
    );


    // ==========================
    // DOWNLOAD DWT
    // ==========================

    document
      .getElementById(
        "downloadButton"
      )
      .addEventListener(
        "click",
        function () {
          const data =
            localStorage.getItem(
              "wordTableData"
            );

          const currentDate =
            new Date();

          const month =
            (
              currentDate.getMonth() +
              1
            )
              .toString()
              .padStart(2, "0");

          const day =
            currentDate
              .getDate()
              .toString()
              .padStart(2, "0");

          const blob =
            new Blob(
              [
                data ||
                  "[]",
              ],
              {
                type:
                  "application/json",
              }
            );

          const url =
            URL.createObjectURL(
              blob
            );

          const a =
            document.createElement(
              "a"
            );

          a.href =
            url;

          a.download =
            `wordTableData-${month}${day}.json`;

          document.body.appendChild(
            a
          );

          a.click();

          document.body.removeChild(
            a
          );

          URL.revokeObjectURL(
            url
          );
        }
      );


    // ==========================
    // UPLOAD DWT
    // ==========================

    document
      .getElementById(
        "uploadButton"
      )
      .addEventListener(
        "change",
        function (event) {
          const file =
            event.target
              .files[0];

          if (!file) {
            return;
          }

          const reader =
            new FileReader();

          reader.onload =
            function (e) {
              try {
                let data =
                  JSON.parse(
                    e.target.result
                  );

                if (
                  !Array.isArray(
                    data
                  )
                ) {
                  throw new Error(
                    "JSON 格式必須為陣列"
                  );
                }

                /*
                 * 先找目前最大的 ID
                 */
                let maxNumber =
                  data.reduce(
                    (
                      max,
                      item
                    ) => {
                      const number =
                        Number(
                          item.number
                        );

                      if (
                        !Number.isNaN(
                          number
                        ) &&
                        number >
                          max
                      ) {
                        return number;
                      }

                      return max;
                    },
                    299
                  );

                if (
                  maxNumber <
                  299
                ) {
                  maxNumber =
                    299;
                }

                data =
                  data.map(
                    (item) => {
                      if (
                        item.number ===
                          undefined ||
                        item.number ===
                          null ||
                        item.number ===
                          ""
                      ) {
                        item.number =
                          ++maxNumber;
                      } else {
                        item.number =
                          Number(
                            item.number
                          );
                      }

                      return item;
                    }
                  );

                localStorage.setItem(
                  "wordTableData",
                  JSON.stringify(
                    data
                  )
                );

                location.reload();
              } catch (error) {
                console.error(
                  "匯入 DWT 失敗:",
                  error
                );

                alert(
                  "匯入失敗，請確認 JSON 格式是否正確。"
                );
              }
            };

          reader.readAsText(
            file
          );
        }
      );
  }
);


// ==========================
// 合檔
// ==========================

document.addEventListener(
  "change",
  function (event) {
    if (
      event.target.classList.contains(
        "file-btn"
      )
    ) {
      const filesCount =
        event.target.files
          .length;

      const textbox =
        event.target
          .previousElementSibling;

      if (
        filesCount === 1
      ) {
        const fileName =
          event.target.value
            .split("\\")
            .pop();

        textbox.textContent =
          fileName;
      } else {
        textbox.textContent =
          filesCount +
          " files selected";
      }
    }
  }
);

const combineBtn =
  document.getElementById(
    "combine-input-btn"
  );

const textarea =
  document.querySelector(
    ".inputText"
  );

const combineModai =
  document.querySelector(
    "#combine-modal"
  );

combineBtn.addEventListener(
  "change",
  function () {
    const files =
      Array.from(
        combineBtn.files
      );

    let text = "";

    if (
      files.length > 0
    ) {
      files.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name
          )
      );

      let filesRead = 0;

      const readFile =
        (index) => {
          if (
            index >=
            files.length
          ) {
            textarea.value =
              text;

            checkTimeCode();

            combineBtn.value =
              "";

            const combineModal =
              document.querySelector(
                "#combine-modal"
              );

            const modalInstance =
              bootstrap.Modal
                .getInstance(
                  combineModal
                );

            if (
              modalInstance
            ) {
              modalInstance.hide();
            }

            return;
          }

          const reader =
            new FileReader();

          const currentFile =
            files[index];

          reader.onload =
            function (event) {
              text +=
                event.target
                  .result;

              if (
                index !==
                files.length -
                  1
              ) {
                text +=
                  `\n@${index + 2}\n`;
              }

              filesRead++;

              readFile(
                index + 1
              );
            };

          reader.readAsText(
            currentFile
          );
        };

      readFile(0);
    }
  }
);

console.log("1");