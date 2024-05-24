let eventIdCounter = 20;
const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
let userListInitialized = false;
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
        const eventId = eventIdCounter++;
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
        const description = $('#event-description').val();

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
        }

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
        }

        if (!typing && !tc && !proofreading) {
          const checkboxes = $('.type-wrapper:eq(0)');
          checkboxes.tooltip({
            placement: 'top',
            title: '請選擇作業項目'
          }).tooltip('show');
          setTimeout(function () {
            checkboxes.tooltip('hide');
          }, 2500);
          return;
        }

        const newEvent = {
          id: eventId,
          name: eventName,
          date: endDate ? [startDate, endDate] : startDate,
          type: eventName,
          category: (eventName == '全國第一勇' || eventName == '台灣最前線') ? 'LIVE' : 'PROGRAM',
          badge: endDate ? `回件日 ${endDate}` : `當日`,
          units: unit,
          episode: episode,
          partner: partner,
          description: description,
        };

        events.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        $("#calendar").evoCalendar('addCalendarEvent', [newEvent]);
        updateEventList(newEvent, startDate);
      });
    });

  updateEventList();
});

function updateEventList(newEvent = null, startDate) {
  const eventsList = $('.events-list');

  if (newEvent) {
    const eventDate = Array.isArray(newEvent.date) ? new Date(newEvent.date[0]) : new Date(newEvent.date);
    const eventMonth = eventDate.getMonth() + 1;
    const formattedEventDate = eventDate.toISOString().split('T')[0];
    const receivedDate = Array.isArray(newEvent.date) ? newEvent.date[0] : newEvent.date;
    const deadlineDate = Array.isArray(newEvent.date) ? newEvent.date[1] : '';

    const eventItem = `
      <li class="event-item" date-month="${eventMonth}" data-date="${formattedEventDate}">
          <span class="filter-name">${newEvent.name}</span>
          <span class="filter-episode">${newEvent.episode ? newEvent.episode : ''}</span>
          <span class="filter-received">${receivedDate}</span>
          <span class="filter-deadline">${deadlineDate}</span>
          <span class="filter-status">${newEvent.units}</span>
          <span class="filter-partner">${newEvent.partner ? newEvent.partner : ''}</span>
          <span class="filter-category" style="display: none;">${newEvent.category}</span>
      </li>
    `;
    eventsList.append(eventItem);

    if (!userListInitialized) {
      initializeUserList();
      userListInitialized = true;
    } else {
      userList.add({
        'filter-name': newEvent.name,
        'filter-episode': newEvent.episode ? newEvent.episode : '',
        'filter-received': receivedDate,
        'filter-deadline': deadlineDate,
        'filter-status': newEvent.units,
        'filter-partner': newEvent.partner ? newEvent.partner : '',
        'filter-category': newEvent.category
      });
    }
  } else {
    eventsList.empty();

    events.forEach(event => {
      const eventDate = Array.isArray(event.date) ? new Date(event.date[0]) : new Date(event.date);
      const eventMonth = eventDate.getMonth() + 1;
      const formattedEventDate = eventDate.toISOString().split('T')[0];
      const receivedDate = Array.isArray(event.date) ? event.date[0] : event.date;
      const deadlineDate = Array.isArray(event.date) ? event.date[1] : '';

      const eventItem = `
        <li class="event-item" date-month="${eventMonth}" data-date="${formattedEventDate}">
            <span class="filter-name">${event.name}</span>
            <span class="filter-episode">${event.episode ? event.episode : ''}</span>
            <span class="filter-received">${receivedDate}</span>
            <span class="filter-deadline">${deadlineDate}</span>
            <span class="filter-status">${event.units}</span>
            <span class="filter-partner">${event.partner ? event.partner : ''}</span>
            <span class="filter-category" style="display: none;">${event.category}</span>
        </li>
      `;
      eventsList.append(eventItem);
    });

    initializeUserList();
    userListInitialized = true;
  }

  // Filter
  $('#filter-category, #filter-month').on('change', function () {
    const selectedCategory = $('#filter-category').val();
    const selectedMonth = $('#filter-month').val();
    userList.filter(item => {
      const categoryMatch = selectedCategory === 'All' || $(item.elm).find('.filter-category').text() === selectedCategory;
      const monthMatch = selectedMonth === 'All' || parseInt($(item.elm).attr('date-month')) === parseInt(selectedMonth);
      return categoryMatch && monthMatch;
    });
  });

  // Date reminders
  const today = new Date();
  $('.event-item').each(function () {
    const deadlineDate = $(this).find('.filter-deadline').text();
    const eventDeadline = new Date(deadlineDate);
    const timeDifference = eventDeadline - today;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference >= 0 && daysDifference <= 3) {
      $(this).addClass('soon');
    }
  });

}

function initializeUserList() {
  const options = {
    valueNames: ['filter-name', 'filter-episode', 'filter-received', 'filter-deadline', 'filter-status', 'filter-partner', 'filter-category'],
    customSort: function (a, b) {
      const aDate = new Date($(a.elm).data('date'));
      const bDate = new Date($(b.elm).data('date'));

      if (!aDate && bDate) return 1;
      if (aDate && !bDate) return -1;
      if (!aDate && !bDate) return 0;

      return aDate - bDate;
    }
  };
  userList = new List('events-list-wrapper', options);
}


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


// export XLSX
$('#export').on('click', function () {
  exportToExcel();
});

function exportToExcel() {
  const filteredData = userList.visibleItems.map(item => {
    const statusText = $(item.elm).find('.filter-status').text();
    const typing = getStatusNumber(statusText, '聽打');
    const proofreading = getStatusNumber(statusText, '校正');
    const tc = getStatusNumber(statusText, '上字');

    return {
      '節目': $(item.elm).find('.filter-name').text(),
      '集數': $(item.elm).find('.filter-episode').text(),
      '接收日期': $(item.elm).find('.filter-received').text(),
      '截止日期': $(item.elm).find('.filter-deadline').text(),
      '聽打': typing,
      '校正': proofreading,
      '上字': tc
    };
  });

  filteredData.push({
    '節目': '總計',
    '集數': '',
    '接收日期': '',
    '截止日期': '',
    '聽打': {
      t: 'n',
      f: `SUM(E2:E${filteredData.length + 1})`
    },
    '校正': {
      t: 'n',
      f: `SUM(F2:F${filteredData.length + 1})`
    },
    '上字': {
      t: 'n',
      f: `SUM(G2:G${filteredData.length + 1})`
    },
  });

  function getStatusNumber(statusText, keyword) {
    const regex = new RegExp(`${keyword} (\\d+)`);
    const match = statusText.match(regex);
    return match ? parseInt(match[1]) : 0;
  }

  const worksheet = XLSX.utils.json_to_sheet(filteredData, {
    cellStyles: true
  });

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const alignment = C === 0 ? {
      horizontal: 'left'
    } : {
      horizontal: 'center'
    };
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const cell = worksheet[XLSX.utils.encode_cell({
        r: R,
        c: C
      })];
      if (cell) {
        cell.s = cell.s || {};
        cell.s.alignment = alignment;
      }
    }
  }

  for (let C = range.s.c; C <= range.e.c; ++C) {
    let max_width = 0;
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const cell = worksheet[XLSX.utils.encode_cell({
        r: R,
        c: C
      })];
      if (cell && cell.v) {
        const cellContentWidth = getStringWidth(cell.v);
        if (cellContentWidth > max_width) max_width = cellContentWidth;
      }
    }
    worksheet['!cols'] = worksheet['!cols'] || [];
    worksheet['!cols'][C] = {
      'wpx': max_width
    };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
  XLSX.writeFile(workbook, 'filtered_events.xlsx', {
    cellStyles: true
  });
}

function getStringWidth(str) {
  const fontSize = 14;
  const font = `${fontSize}px Arial`;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(str).width;
}



// quickadd - sot/live
$(document).ready(function () {
  $('#quick-add-btn').on('click', function () {
    $('#quick-add-container').toggle('fast');
    $('#quick-add-btn').toggleClass('active');
    $('#quick-add-submit').on('click', function () {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      const eventId = eventIdCounter++;
      const eventName = $('#quick-add-type').val();
      const today = `${year}-${month}-${day}`;
      const typing = $('#quick-add-work').val() === "1";
      const proofreading = $('#quick-add-work').val() === "2";
      const tc = $('#quick-add-work').val() === "3";
      const quickAddUnit = $('#quick-add-unit').val();

      const newEvent = {
        id: eventId,
        name: eventName,
        date: today,
        type: eventName,
        episode: '',
        category: eventName.includes('SOT') ? 'SOT' : 'LIVE',
        badge: `LIVE ${typing ? '聽打' : ''} ${proofreading ? '校正' : ''} ${tc ? '上字' : ''}`,
        units: typing ? '聽打 ' + quickAddUnit : proofreading ? '校正 ' + quickAddUnit : tc ? '上字 ' + quickAddUnit : '',

      };

      events.push(newEvent);
      localStorage.setItem('calendarEvents', JSON.stringify(events));
      $("#calendar").evoCalendar('addCalendarEvent', [newEvent]);
      updateEventList(newEvent, today);
    })
  });
})
