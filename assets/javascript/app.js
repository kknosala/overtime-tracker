var firebaseConfig = {
    apiKey: "AIzaSyAoB_7LDFq5ZsDQ--nuL0RvtU-FDro6aRU",
    authDomain: "overtime-app.firebaseapp.com",
    databaseURL: "https://overtime-app.firebaseio.com",
    projectId: "overtime-app",
    storageBucket: "",
    messagingSenderId: "780230153008",
    appId: "1:780230153008:web:aff23c7cce469559"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function(){

    $('#new-overtime-submit').click(function(){

        event.preventDefault();

        var department = $('#new-department').val();
        var date = $('#new-date').val();
        var startTime = $('#new-start-time').val();
        var endTime = $('#new-end-time').val();

        database.ref().push({
            department: department,
            date: date,
            startTime: startTime,
            endTime: endTime
          });
    })

    database.ref().on('child_added', function(available){

        var dateFormat = moment(available.val().date).format('MMM Do YYYY');
        var startTimeFormat = moment(available.val().startTime, 'HH:mm').format('h:mm a');
        var endTimeFormat = moment(available.val().endTime, 'HH:mm').format('h:mm a')
        

        var adminRow = $('<tr>').append(
            $('<td>').text(available.val().department),
            $('<td>').text(dateFormat),
            $('<td>').text(startTimeFormat),
            $('<td>').text(endTimeFormat),
        );
        
        var userRow =$('<tr>').append(
            $('<td>').text(available.val().department),
            $('<td>').text(dateFormat),
            $('<td>').text(startTimeFormat),
            $('<td>').text(endTimeFormat),
        )

        var buttons =$('<td>');
        var remove = $('<button>').text('Remove');
        
        buttons.append(remove);
        adminRow.append(buttons);
        $('#admin-overtime-table').append(adminRow);
        $('#user-overtime-table').append(userRow);
    })

})