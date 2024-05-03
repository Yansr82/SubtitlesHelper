async function initOml2dAndEvents() {
  const oml2d = await OML2D.loadOml2d({
    primaryColor: '#9E6172',
    sayHello: false,
    models: [
      {
        "path": "https://model.oml2d.com/cat-black/model.json",
        "scale": 0.14,
        "position": [0, 20],
        "stageStyle": {
          "height": 350,
        }
      },
      {
        "path": "https://model.oml2d.com/cat-white/model.json",
        "scale": 0.14,
        "position": [0, 20],
        "stageStyle": {
          "height": 350
        }
      }
    ],
    menus: {
      disable: false,
      items: [
        {
          id: 'Rest',
          icon: 'icon-rest',
          title: '休息',

          onClick(oml2d) {
            oml2d.statusBarOpen('站長休息中');
            oml2d.clearTips();
            oml2d.setStatusBarClickEvent(() => {
              oml2d.statusBarClose();
              oml2d.stageSlideIn();
              oml2d.tipsMessage('你找我嗎～')
              oml2d.statusBarClearEvents();
            });
            oml2d.stageSlideOut();
          }
        },
        {
          id: 'SwitchModel',
          icon: 'icon-switch',
          title: '切换模型',
          onClick(oml2d) {
            oml2d.loadNextModel('https://model.oml2d.com/cat-white/model.json');
          }
        },
        {
          id: '1',
          icon: 'icon-about',
          title: '關於',
          onClick() {
            window.open('https://google.com');
          }
        },
        {
          id: 'setting',
          icon: 'icon-setting',
          title: '設定',
          onClick() {
            openSettingsPopup();
          }
        },
      ]
    },
    statusBar: {
      loadSuccessMessage: '歡迎光臨',
      loadingMessage: '載入中',
      reloadMessage: '重新載入',
      restMessage: '站長休息中',
      switchingMessage: '換班ＩＮＧ',
    },
    tips: {
      copyTips: {
        message: ['複製了什麼呢~'],
      },
      idleTips: {
      },
      welcomeTips: {
        priority: 1,
        message: {
          daybreak: '早起的鳥兒有蟲吃！',
          morning: '又是新的一天，開始工作吧！',
          noon: '再忙也不要忘記吃午餐唷！',
          afternoon: '工作之餘，也要記得喝水、上廁所！',
          dusk: '就快結束了！再撐著點！',
          night: '加班辛苦了！',
          lateNight: '夜深了！早點休息吧！',
          weeHours: '這時間怎麼還在呢？',
        },
      }
    },
  });
  return oml2d;
}

initOml2dAndEvents().then((oml2d) => {
  console.error('OML2D initialization error:', error);
}).catch((error) => {
});

function openSettingsPopup() {
  const settingsPopup = document.querySelector('#settingsPopup');
  settingsPopup.style.display = 'block';
  setTimeout(function () {
    settingsPopup.style.opacity = '1';
  }, 10);

  const applyButton = document.querySelector('#applyButton');
  applyButton.onclick = function () {
    primaryColor = document.querySelector('#primaryColor').value;
    closeSettingsPopup();
  };
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










document.addEventListener("DOMContentLoaded", function () {
  const addWordForm = document.getElementById("addWordForm");
  const wordTableBody = document.querySelector("#wordTable tbody");

  loadSavedData();

  addWordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const word = document.getElementById("floating-word").value.trim();
    const error = document.getElementById("floating-error").value.trim();
    const annotation = document.getElementById("floating-annotation").value.trim();
    const category = document.getElementById("form-category").value.trim();

    const newRow = createRow({ word, error, annotation, category });
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
      if (td[0].textContent.trim() === data.word &&
        td[1].textContent.trim() === data.error &&
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
      <td class="editable">${data.word}</td>
      <td class="editable">${data.error}</td>  
      <td class="editable">${data.annotation}</td>
    `;
    return newRow;
  }

  function saveData(newRow) {
    const tdList = newRow.querySelectorAll('td');
    const rowData = {
      category: newRow.classList[0],
      word: tdList[0].textContent.trim(),
      error: tdList[1].textContent.trim(),
      annotation: tdList[2].textContent.trim()
    };
    console.log("rowData:", rowData);
    let savedData = localStorage.getItem('wordTableData');
    let rowDataArray = [];
    if (savedData) {
      rowDataArray = JSON.parse(savedData);
    }
  
    const existingIndex = rowDataArray.findIndex(item =>
      item.word === rowData.word &&
      item.error === rowData.error &&
      item.annotation === rowData.annotation
    );
  
    if (existingIndex !== -1) {
      rowDataArray[existingIndex] = rowData;
    } else {
      rowDataArray.push(rowData);
    }
  
    console.log("rowDataArray:", rowDataArray);
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
  

  // TD 元素可编辑部分
  const editableTDs = document.querySelectorAll('td.editable');
  editableTDs.forEach(td => {
    td.addEventListener('click', function (event) {
      event.stopPropagation(); // 防止事件冒泡
      td.classList.add('td-editable');
  
      if (!td.querySelector('input')) { // 檢查是否已經有 input 元素
        const content = this.textContent;
        const input = document.createElement('input');
        input.value = content;
        this.innerHTML = '';
        this.appendChild(input);
        input.focus(); // 將焦點設置在 input 元素上
        input.addEventListener('blur', function () {
          const newValue = input.value;
          td.textContent = newValue;
          saveData(td.parentNode);
          td.classList.remove('td-editable');
        });
  
        // 當按下鍵盤時
        input.addEventListener('keydown', function (event) {
          // 如果按下的是 Enter 鍵
          if (event.keyCode === 13) {
            // 取消編輯，保存數據
            input.blur();
          }
        });
      }
    });
  });  
});
