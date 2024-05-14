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
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        const type = $('#event-type').val();
        const eventId = eventIdCounter++;
        console.log(eventIdCounter, eventName, startDate, "event");
        $("#calendar").evoCalendar('addCalendarEvent', [
          {
            id: eventId,
            name: eventName,
            date: endDate ? [startDate, endDate] : startDate,
            type: type,
          }
        ]);
      });
    });
});


//autocomplete
$(function () {
  const eventTypes = [
    '台灣學堂',
    '新聞觀測站',
    '台灣最前線',
    '全國第一勇',
    '愛的榮耀',
    '故事屋',
    '台灣傳奇',
    '全能歌手',
    '美鳳有約',
    'GoGo台灣',
    '娛樂超skr',
    '姊妹亮起來',
    '醫學大聯盟',
    '我們一家人',
    '綜藝大集合',
    '綜藝新時代'
  ];

  $("#event-type").autocomplete({
    source: eventTypes,
    delay: 50,
    minLength: 0,
    search: '',
  }).on("click", function () {
    $(this).autocomplete("search", "");
  });
});