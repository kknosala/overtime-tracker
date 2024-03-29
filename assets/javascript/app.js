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

    $('#new-overtime-submit').click(function(event){
        
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
          $('#new-department').prop('selectedIndex',0);
          $('#new-date').val('');
          $('#new-start-time').val('');
          $('#new-end-time').val('');
    })

    $('#request-submit').click(function(event){

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

        $('#user-name').val('');
        $('#user-department').prop('selectedIndex',0);
        $('#user-date').val('');
        $('#user-start-time').val('');
        $('#user-end-time').val('');
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
        var remove = $('<button>').text('Remove').addClass('btn btn-danger').attr({value:snapshot.key, id:'remove'});
        
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
        if(!snapshot.val().approval){
            var adminApprove = $('<tr>').addClass(snapshot.key).append(
                $('<td>').text(snapshot.val().userName),
                $('<td>').text(snapshot.val().userDepartment),
                $('<td>').text(userDateFormat),
                $('<td>').text(userStartTimeFormat),
                $('<td>').text(userEndTimeFormat)
            )

            var buttons = $('<td>')
            var approveButton = $('<button>').text('Approve').addClass('btn btn-success mr-2 approve').attr('value', snapshot.key);
            var denyButton = $('<button>').text('Deny').addClass('btn btn-danger deny').attr('value', snapshot.key);

            buttons.append(approveButton);
            buttons.append(denyButton);
            adminApprove.append(buttons);
            $('#overtime-requests').append(adminApprove);

        }else if(snapshot.val().approval === 'approved'){

            var adminApproved = $('<tr>').addClass(snapshot.key).append(
                $('<td>').text(snapshot.val().userName),
                $('<td>').text(snapshot.val().userDepartment),
                $('<td>').text(userDateFormat),
                $('<td>').text(userStartTimeFormat),
                $('<td>').text(userEndTimeFormat)
            )

            var buttons =$('<td>');
            var remove = $('<button>').text('Remove').addClass('btn btn-danger').attr({value:snapshot.key, id:'remove'});
        
            buttons.append(remove);
            adminApproved.append(buttons);

            buttons.append(approveButton);
            buttons.append(denyButton);
            adminApproved.append(buttons);
            $('#approved-requests').append(adminApproved);

        }else if(snapshot.val().approval === 'denied'){

            var adminDenied = $('<tr>').addClass(snapshot.key).append(
                $('<td>').text(snapshot.val().userName),
                $('<td>').text(snapshot.val().userDepartment),
                $('<td>').text(userDateFormat),
                $('<td>').text(userStartTimeFormat),
                $('<td>').text(userEndTimeFormat)
            )

            var buttons =$('<td>');
            var remove = $('<button>').text('Remove').addClass('btn btn-danger').attr({value:snapshot.key, id:'remove'});
        
            buttons.append(remove);
            adminDenied.append(buttons);

            buttons.append(approveButton);
            buttons.append(denyButton);
            adminDenied.append(buttons);
            $('#denied-requests').append(adminDenied);
        }
    })

    $(document).on('click', '#remove', function(){
        
        var childId = this.value;
        database.ref('PostedOvertime').child(childId).remove();
        database.ref('RequestOvertime').child(childId).remove();
        location.reload();
    })

    $(document).on('click', '.approve', function(){
        var valueId = this.value;
        var approval = 'approved';
        database.ref('/RequestOvertime').child(valueId).update({
            approval: approval
        });
        location.reload();
    })

    $(document).on('click', '.deny', function(){
        var valueId = this.value;
        var approval = 'denied';
        database.ref('/RequestOvertime').child(valueId).update({
            approval: approval
        });
        location.reload();
    })





})