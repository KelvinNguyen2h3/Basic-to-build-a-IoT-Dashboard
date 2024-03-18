// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBny3WmaIL7xjGZrfLKgz5i8mps4sMbsSU",
//   authDomain: "tt-iot-ute.firebaseapp.com",
//   databaseURL: "https://tt-iot-ute-default-rtdb.firebaseio.com",
//   projectId: "tt-iot-ute",
//   storageBucket: "tt-iot-ute.appspot.com",
//   messagingSenderId: "999270078595",
//   appId: "1:999270078595:web:6ef84fd4903ea0dd2f23b6"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// Auto load Temperature-------------------------
firebase.database().ref("/TT_IoT/Temp").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd;
  console.log(nd);
});

// Auto load Humid-------------------------
firebase.database().ref("/TT_IoT/Humid").on("value", function (snapshot) {
    var da = snapshot.val();
    document.getElementById("doam").innerHTML = da;
    console.log(da);
  });



var d01_on = document.getElementById("d01_on");
var d01_off = document.getElementById("d01_off");
var d02_on = document.getElementById("d02_on");
var d02_off = document.getElementById("d02_off");
var d03_on = document.getElementById("d03_on");
var d03_off = document.getElementById("d03_off");
var d04_on = document.getElementById("d04_on");
var d04_off = document.getElementById("d04_off");

//Den 01-------------------------------------------------------
d01_on.onclick = function(){
    document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/TT_IoT").update({
    "BULB_01": "ON"
  })
}

d01_off.onclick = function(){
	document.getElementById("d01_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/TT_IoT").update({
		"BULB_01": "OFF"
	})
}

//Den 02-------------------------------------------------------
d02_on.onclick = function(){
  document.getElementById("d02_img").src = "./img/light_bulb_on.png"
  
  firebase.database().ref("/TT_IoT").update({
  "BULB_02": "ON"
})
}

d02_off.onclick = function(){
document.getElementById("d02_img").src = "./img/light_bulb_off.png"

firebase.database().ref("/TT_IoT").update({
  "BULB_02": "OFF"
})
}

//quat-------------------------------------------------------
d03_on.onclick = function(){
  document.getElementById("d03_img").src = "./img/fan_on.gif"
  
  firebase.database().ref("/TT_IoT").update({
  "FAN": "ON"
})
}

d03_off.onclick = function(){
document.getElementById("d03_img").src = "./img/fan_off.png"

firebase.database().ref("/TT_IoT").update({
  "FAN": "OFF"
})
}

//maylanh-------------------------------------------------------
d04_on.onclick = function(){
  document.getElementById("d04_img").src = "./img/aircon_on.png"
  
  firebase.database().ref("/TT_IoT").update({
  "AIR_CON": "ON"
})
}

d04_off.onclick = function(){
document.getElementById("d04_img").src = "./img/aircon_off.png"

firebase.database().ref("/TT_IoT").update({
  "AIR_CON": "OFF"
})
}





//Update Bulb status-----when reload website-------
//Den 01-------------------------------------------------------
firebase.database().ref("/TT_IoT").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var status = snapshot.val()
    if (status["BULB_01"] == "ON")
      document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d01_img").src = "./img/light_bulb_off.png"
  }
  else
    console.log("No data available!")
})
//Den 02-------------------------------------------------------
firebase.database().ref("/TT_IoT").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var status = snapshot.val()
    if (status["BULB_02"] == "ON")
      document.getElementById("d02_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d02_img").src = "./img/light_bulb_off.png"
  }
  else
    console.log("No data available!")
})
//quat-------------------------------------------------------
firebase.database().ref("/TT_IoT").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var status = snapshot.val()
    if (status["FAN"] == "ON")
      document.getElementById("d03_img").src = "./img/fan_on.gif"
    else
      document.getElementById("d03_img").src = "./img/fan_off.png"
  }
  else
    console.log("No data available!")
})
//maylanh-------------------------------------------------------
firebase.database().ref("/TT_IoT").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var status = snapshot.val()
    if (status["AIR_CON"] == "ON")
      document.getElementById("d04_img").src = "./img/aircon_on.png"
    else
      document.getElementById("d04_img").src = "./img/aircon_off.png"
  }
  else
    console.log("No data available!")
})