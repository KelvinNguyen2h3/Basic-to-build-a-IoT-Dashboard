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


var BtnOn = document.getElementById("d01_on");
var d01_off = document.getElementById("d01_off");
//Den 01-------------------------------------------------------
d01_on.onclick = function(){
  document.getElementById("d01_img").src = "./img/light_bulb_on.png"
  document.getElementById("status").innerHTML = "ON"
}

d01_off.onclick = function(){
  document.getElementById("d01_img").src = "./img/light_bulb_off.png"
  document.getElementById("status").innerHTML = "OFF"
}


var SliderNgang = document.getElementById("sliderNgangId");
var d02_img = document.getElementById("d02_img");
//Den 02 SliderNgang-------------------------------------------------------
  SliderNgang.oninput = function(){
  document.getElementById("sliderNgangValue").innerHTML = SliderNgang.value;
  d02_img.style.opacity = SliderNgang.value/10;
}