let eventIdCounter = 20;
const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
let userList;

$(document).ready(function () {
  $("#calendar")
    .evoCalendar({
      format: "yyyy-mm-dd",
      eventHeaderFormat: "mm/dd",
      todayHighlight: true,
      sidebarDisplayDefault: true,
      eventDisplayDefault: true,
      calendarEvents: events
    })

    .on('selectDate', function () {
      const active_date = $('#calendar').evoCalendar('getActiveDate');
      console.log(active_date);
      $('#Event-canvas').offcanvas('show');
      $('#startDate').val(active_date);

      $('#addevent').off('click');

      $('#addevent').on('click', function () {
        const eventName = $('#event-type').val();
        const episode = $('#event-episode').val();
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        const typing = $('#event-typing').is(':checked');
        const typingUnit = $('#event-unit-1').val();
        const proofreading = $('#event-proofreading').is(':checked');
        const proofreadingUnit = $('#event-unit-2').val();
        const tc = $('#event-tc').is(':checked');
        const tcUnit = $('#event-unit-3').val();
        const partner = $('#event-partner').val();
        const eventId = eventIdCounter++;
        let units = [];
        if (typing) units.push(`聽打 ${typingUnit}`);
        if (proofreading) units.push(`校正 ${proofreadingUnit}`);
        if (tc) units.push(`上字 ${tcUnit}`);
        let unit = units.join(' / ');

        if (!eventName || !startDate) {
          const inputElement = $('#event-type');
          inputElement.tooltip({
            placement: 'top',
            title: '請輸入節目名稱'
          }).tooltip('show');
          setTimeout(function () {
            inputElement.tooltip('hide');
          }, 2500);
          return;
        };

        if (endDate && (new Date(endDate) <= new Date(startDate))) {
          const endDateElement = $('#endDate');
          endDateElement.tooltip({
            placement: 'top',
            title: '結束日期必須在開始日期之後或不等於開始日期'
          }).tooltip('show');
          setTimeout(function () {
            endDateElement.tooltip('hide');
          }, 2500);
          return;
        };

        if (!typing && !tc && !proofreading) {
          const checkboxes = $('.type-wrapper:eq(0)');
          checkboxes.tooltip({
            placement: 'top',
            title: '請選擇作業項目'
          }).tooltip('show');
          setTimeout(function () {
            endDateElement.tooltip('hide');
          }, 2500);
          return;
        };

        const newEvent = {
          id: eventId,
          name: eventName,
          date: endDate ? [startDate, endDate] : startDate,
          type: eventName,
          category: (eventName == '全國第一勇' || eventName == '台灣最前線') ? 'LIVE' : 'PROGRAM',
          badge: endDate ? `回件日 ${endDate}` : `當日`,
          units: unit,
          episode: episode == '' ? '' : episode.includes('#') ? episode : '#' + episode,
          partner: partner,
        };


        events.push(newEvent);

        localStorage.setItem('calendarEvents', JSON.stringify(events));

        $("#calendar").evoCalendar('addCalendarEvent', [newEvent]);
        updateEventList();
        userList.add({
          'filter-name': newEvent.name,
          'filter-episode': newEvent.episode ? newEvent.episode : '',
          'filter-received': Array.isArray(newEvent.date) ? newEvent.date[0] : newEvent.date,
          'filter-deadline': Array.isArray(newEvent.date) ? newEvent.date[1] : '',
          'filter-status': newEvent.units,
          'filter-partner': newEvent.partner ? newEvent.partner : '',
        });
      });
    });
  updateEventList();

  if (events.length > 0) {
    const options = {
      valueNames: ['filter-name', 'filter-episode', 'filter-received', 'filter-deadline', 'filter-status', 'filter-partner'],
      customSort: function (a, b) {
        const aDate = $(a.elm).data('date');
        const bDate = $(b.elm).data('date');

        if (!aDate && bDate) return 1;
        if (aDate && !bDate) return -1;
        if (!aDate && !bDate) return 0;

        return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
      }
    };
    userList = new List('events-list-wrapper', options);
  }
});


function updateEventList() {
  const eventsList = $('.events-list');
  eventsList.empty();

  events.forEach(event => {
    const eventItem = `
    <li class="event-item" data-date="${Array.isArray(event.date) ? event.date[1] : ''}" data-category="${event.category}">
        <span class="filter-name">${event.name}</span>
        <span class="filter-episode">${event.episode ? event.episode : ''}</span>
        <span class="filter-received">${Array.isArray(event.date) ? event.date[0] : event.date}</span>
        <span class="filter-deadline">${Array.isArray(event.date) ? event.date[1] : ''}</span>
        <span class="filter-status">${event.units}</span>
        <span class="filter-partner">${event.partner ? event.partner : ''}</span>
      </li>
    `;
    eventsList.append(eventItem);
  });
}


//autocomplete
$(function () {
  const eventTypes = [{
      program: '台灣學堂',
      unit: '1'
    },
    {
      program: '新聞觀測站',
      unit: ''
    },
    {
      program: '台灣最前線',
      unit: '0.3'
    },
    {
      program: '全國第一勇',
      unit: '0.3'
    },
    {
      program: '愛的榮耀',
      unit: ''
    },
    {
      program: '故事屋',
      unit: '1'
    },
    {
      program: '台灣傳奇',
      unit: ''
    },
    {
      program: '全能歌手',
      unit: ''
    },
    {
      program: '美鳳有約',
      unit: '1'
    },
    {
      program: 'GoGo台灣',
      unit: '1'
    },
    {
      program: '娛樂超skr',
      unit: '1'
    },
    {
      program: '姊妹亮起來',
      unit: '1'
    },
    {
      program: '醫學大聯盟',
      unit: '1'
    },
    {
      program: '我們一家人',
      unit: '1'
    },
    {
      program: '綜藝大集合',
      unit: '4'
    },
    {
      program: '綜藝新時代',
      unit: '1'
    }
  ];
  const program = eventTypes.map(event => event.program);
  $("#event-type").autocomplete({
    source: program,
    delay: 50,
    minLength: 0,
    search: '',
    select: function (event, ui) {
      const selectedProgram = ui.item.value;
      const selectedEvent = eventTypes.find(event => event.program === selectedProgram);
      $('#event-typing').data('unit', selectedEvent.unit);
      $('#event-proofreading').data('unit', selectedEvent.unit);
      $('#event-tc').data('unit', selectedEvent.unit);
      updateCheckboxValues();
    }
  }).on("click", function () {
    $(this).autocomplete("search", "");
  });

  $('input[type="checkbox"]').on('change', function () {
    updateCheckboxValues();
  });


  function updateCheckboxValues() {
    $('input[type="checkbox"]').each(function () {
      const checkboxId = $(this).attr('id');
      const unitValue = $(this).data('unit');
      let unitId;
      switch (checkboxId) {
        case 'event-typing':
          unitId = 'event-unit-1';
          break;
        case 'event-proofreading':
          unitId = 'event-unit-2';
          break;
        case 'event-tc':
          unitId = 'event-unit-3';
          break;
        default:
          return;
      }
      if ($(this).is(':checked')) {
        $(`#${unitId}`).val(unitValue);
      } else {
        $(`#${unitId}`).val('');
      }
    });
  }
});

$(document).ready(function () {
  const today = new Date();

  $('.event-item').each(function () {
    const eventDate = new Date($(this).data('date'));
    const timeDifference = eventDate - today;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference >= 0 && daysDifference <= 4) {
      $(this).addClass('soon');
    }
  });
});

// 篩選功能