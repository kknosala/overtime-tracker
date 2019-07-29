$(document).ready(function(){

    var database = firebase.database();

    $('#new-overtime-submit').click(function(){

        event.preventDefault();

        var department = $('#new-department').val();
        var date = $('#new-date').val();
        var startTime = $('#new-start-time').val();
        var endTime = $('#new-end-time').val();

        database.ref().set({
            department: department,
            date: date,
            startTime: startTime,
            endTime: endTime
          });
    })

})