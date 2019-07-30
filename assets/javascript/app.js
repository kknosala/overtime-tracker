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

        var row = $('<tr>').append(
            $('<td>').text(available.val().department),
            $('<td>').text(available.val().date),
            $('<td>').text(available.val().startTime),
            $('<td>').text(available.val().endTime),
        );
        
        var buttons =$('<td>');
        var approval = $('<button>Approve');
        var decline = $('<button>Decline');

        buttons.append(approval, decline);
        row.append(buttons);
        $('#overtime-table').append(row);
    })

})