
// header

fetch('header.txt')
  .then(response => response.text())
  .then(html => {
    document.querySelector('header').innerHTML = html;
  })

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
  window.history.replaceState(null, null, window.location.href.split("#")[0]);
});

// scrollbar
window.addEventListener('scroll', function () {
  const content = document.documentElement;
  const scrollPercentage = (content.scrollTop / (content.scrollHeight - content.clientHeight)) * 100;

  const scrollbar = document.getElementById('bar');
  scrollbar.style.width = scrollPercentage + '%';

  const header = document.querySelector('header');
  if (window.scrollY > 60) {
    header.classList.add('ysr');
  } else {
    header.classList.remove('ysr');
  }
});

// webmaster

let oml2d;
async function initOml2dAndEvents() {
  oml2d = await OML2D.loadOml2d({
    // initialStatus: 'sleep',
    parentElement: document.querySelector('#oml2d-wrapper'),
    dockedPosition: 'right',
    primaryColor: '#bd5c76d7',
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
          id: 'EipLogin',
          icon: 'icon-about',
          title: 'EIP系統',
          onClick() {
            window.open('https://eip.ftv.com.tw/UOF/Login.aspx?ReturnUrl=%2Fuof%2F');
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
      disable:  false,
      loadSuccessMessage: '打卡上班',
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
