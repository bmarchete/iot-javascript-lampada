var five = require("johnny-five"),
  board, button;
var firebase = require("firebase");

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(2);
  var led = new five.Led(13);
  var rele = new five.Relay(8);
  var on = false;

  // Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyACd8Q-3bXs2kDrXdFERASbcpwlhp2v10c",
  authDomain: "iots-441a4.firebaseapp.com",
  databaseURL: "https://iots-441a4.firebaseio.com",
  storageBucket: "iots-441a4.appspot.com",
};
firebase.initializeApp(config);

 // Get a reference to the database service
  var database = firebase.database();

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
    if (on) {
      led.on();
      rele.on();

      database.ref('led/').set('on');
      
    }else{
      rele.off();
      
      led.off();
      database.ref('led/').set('off');
    }

    on = !on;


  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
    // led.off();
  });

  database.ref('led/').on('value', snapshot => {
    var state = snapshot.val();

    if (state == 'on') {
      on = true;
      led.on();
      rele.on();
    }else{
       on = false;
       led.off();
       rele.off();
    }
  });
});