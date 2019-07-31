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

        database.ref('/PostedOvertime').push({
            department: department,
            date: date,
            startTime: startTime,
            endTime: endTime
          });
    })

    $('#request-submit').click(function(){

        event.preventDefault();
        var userName = $('#user-name').val().trim();
        var userDepartment = $('#user-department').val();
        var userDate = $('#user-date').val();
        var userStartTime = $('#user-start-time').val();
        var userEndTime = $('#user-end-time').val();

        database.ref('/RequestOvertime').push({
            userName: userName,
            userDepartment: userDepartment,
            userDate: userDate,
            userStartTime: userStartTime,
            userEndTime: userEndTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    })
    
    database.ref('PostedOvertime').on('child_added', function(snapshot){

            var dateFormat = moment(snapshot.val().date).format('MMM Do YYYY')
            var startTimeFormat = moment(snapshot.val().startTime, 'HH:mm').format('h:mm a');
            var endTimeFormat = moment(snapshot.val().endTime, 'HH:mm').format('h:mm a')


        var adminRow = $('<tr>').append(
            $('<td>').text(snapshot.val().department),
            $('<td>').text(dateFormat),
            $('<td>').text(startTimeFormat),
            $('<td>').text(endTimeFormat),
        );
        
        var userRow =$('<tr>').append(
            $('<td>').text(snapshot.val().department),
            $('<td>').text(dateFormat),
            $('<td>').text(startTimeFormat),
            $('<td>').text(endTimeFormat),
        )

        var buttons =$('<td>');
        var remove = $('<button>').text('Remove').addClass('btn btn-primary').attr({value:snapshot.key, id:'remove'});
        
        buttons.append(remove);
        adminRow.append(buttons);
        $('#admin-overtime-table').append(adminRow);
        $('#user-overtime-table').append(userRow);
    })

    // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on
    database.ref('RequestOvertime').on('child_added', function(snapshot){

        var userDateFormat = moment(snapshot.val().userDate).format('MMM Do YYYY');
        var userStartTimeFormat = moment(snapshot.val().userStartTime, 'HH:mm').format('h:mm a');
        var userEndTimeFormat = moment(snapshot.val().userEndTime, 'HH:mm').format('h:mm a');

        console.log(snapshot.val().userName);
        console.log(snapshot.val().userDepartment);
        console.log(userDateFormat);
        console.log(userStartTimeFormat);
        console.log(userEndTimeFormat);

        var adminApprove = $('<tr>').append(
            $('<td>').text(snapshot.val().userName),
            $('<td>').text(snapshot.val().userDepartment),
            $('<td>').text(userDateFormat),
            $('<td>').text(userStartTimeFormat),
            $('<td>').text(userEndTimeFormat)
        )

        var buttons = $('<td>')
        var approveButton = $('<button>').text('Approve').addClass('btn btn-success mr-2').attr('value', 'approve');
        var denyButton = $('<button>').text('Deny').addClass('btn btn-danger').attr('value', 'deny');

        buttons.append(approveButton);
        buttons.append(denyButton);
        adminApprove.append(buttons);
        $('#overtime-requests').append(adminApprove);
    })

    $(document).on('click', '#remove', function(){
        
        var childId = this.value;
        console.log(childId)
        
        database.ref('PostedOvertime').child(childId).remove();
        location.reload();
    })

})