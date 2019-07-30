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
        console.log(dateFormat);

        var adminRow = $('<tr>').append(
            $('<td>').text(available.val().department),
            $('<td>').text(dateFormat),
            $('<td>').text(available.val().startTime),
            $('<td>').text(available.val().endTime),
        );
        
        var userRow =$('<tr>').append(
            $('<td>').text(available.val().department),
            $('<td>').text(available.val().date),
            $('<td>').text(available.val().startTime),
            $('<td>').text(available.val().endTime),
        )

        var buttons =$('<td>');
        var remove = $('<button>').text('Remove');
        
        buttons.append(remove);
        adminRow.append(buttons);
        $('#admin-overtime-table').append(adminRow);
        $('#user-overtime-table').append(userRow);
    })

})