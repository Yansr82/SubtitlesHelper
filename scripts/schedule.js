let eventIdCounter = 20;
const events = [];

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
        const type = $('#event-type').val();
        const typing = $('#event-typing').is(':checked');
        const typingUnit = $('#event-unit-1').val();
        const proofreading = $('#event-proofreading').is(':checked');
        const proofreadingUnit = $('#event-unit-2').val();
        const tc = $('#event-tc').is(':checked');
        const tcUnit = $('#event-unit-3').val();
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
        }
        else {
          $("#calendar").evoCalendar('addCalendarEvent', [
            {
              id: eventId,
              name: eventName,
              date: endDate ? [startDate, endDate] : startDate,
              type: type,
              badge: endDate ? `回件日 ${endDate}` : `當日`,
              units: unit,
              episode: episode.includes('#') ? episode : '#' + episode,
            }
          ]);
        };
      });
    });
});


//autocomplete
$(function () {
  const eventTypes = [
    { program: '台灣學堂', unit: '1' },
    { program: '新聞觀測站', unit: '' },
    { program: '台灣最前線', unit: '0.3' },
    { program: '全國第一勇', unit: '0.3' },
    { program: '愛的榮耀', unit: '' },
    { program: '故事屋', unit: '1' },
    { program: '台灣傳奇', unit: '' },
    { program: '全能歌手', unit: '' },
    { program: '美鳳有約', unit: '1' },
    { program: 'GoGo台灣', unit: '1' },
    { program: '娛樂超skr', unit: '1' },
    { program: '姊妹亮起來', unit: '1' },
    { program: '醫學大聯盟', unit: '1' },
    { program: '我們一家人', unit: '1' },
    { program: '綜藝大集合', unit: '4' },
    { program: '綜藝新時代', unit: '1' }
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
