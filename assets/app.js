

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTYsnyX6OsfEs-aApQI88OqUgJHADTugk",
    authDomain: "train-schedule-57feb.firebaseapp.com",
    databaseURL: "https://train-schedule-57feb.firebaseio.com",
    projectId: "train-schedule-57feb",
    storageBucket: "",
    messagingSenderId: "61963468666"
};
firebase.initializeApp(config);

var database = firebase.database();



// FUNCTIONS + EVENTS
$("#submit").on("click", function () {

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#trainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

    return false;
});


database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    // update the variable with data from the database
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().firstTrainTime;
    frequency = snapshot.val().frequency;

    var firstTrainMoment = moment(firstTrainTime, "HH:mm");
    var nowMoment = moment();

    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, "minutes");
    var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    var minutesAway = frequency - minutesSinceLastArrival;

    var nextArrival = nowMoment.add(minutesAway, "minutes");
    var formatNextArrival = nextArrival.format("HH:mm");


  //  var newTableRow = $("<tr>");
  //  newTableRow.append($("<td>").text(trainName));
  //  newTableRow.append($("<td>").html(destination));
  //  newTableRow.append($("<td>").html(frequency));
   // newTableRow.append($("<td>").html(formatNextArrival.format("MMM DD hh:mm A")));
   // newTableRow.append($("<td>").html(minutesAway));

    $("#trainSchedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
    childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")


    // Append train data to table 
   // $("#trainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + formatNextArrival + "</td><td>" + minutesAway + "</td></tr>");

});


  }, function (errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});