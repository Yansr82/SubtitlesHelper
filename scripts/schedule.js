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

    .on('selectDate', function() {
        const active_date = $('#calendar').evoCalendar('getActiveDate');
        console.log(active_date);
        $('#Event-canvas').offcanvas('show');
        $('#startDate').val(active_date);

        $('#addevent').off('click');

        $('#addevent').on('click', function() {
            const eventName = $('#event-name-input').val(); 
            const startDate = $('#startDate').val();
            const endDate = $('#endDate').val();
            const type = $('#event-type').val();
            const eventId = eventIdCounter++;
            console.log(eventIdCounter,eventName,startDate,"event");
            $("#calendar").evoCalendar('addCalendarEvent', [
                {
                    id: eventId,
                    name: eventName,
                    date:endDate ? [startDate, endDate] : startDate,
                    type: type,
                }
            ]);
        });
    });
});
