$.ajax({
    url: 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=7018368103b21c0709259d661e5c8d6a',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.error(data);

    },
    error: function (error) {
        console.error(error)
    }
})
