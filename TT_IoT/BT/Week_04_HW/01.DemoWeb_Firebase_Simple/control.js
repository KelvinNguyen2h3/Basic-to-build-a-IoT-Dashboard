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
firebase.database().ref("/Arduino/count").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("count").innerHTML = nd;
  console.log(nd);
});

//Update Bulb status-----when reload website-------
firebase.database().ref("/Arduino").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["Led"] == 1)
      document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d01_img").src = "./img/light_bulb_off.png"
  }
  else
    console.log("No data available!")
})

//Den 01-------------------------------------------------------
var d01_on = document.getElementById("d01_on");
var d01_off = document.getElementById("d01_off");

d01_on.onclick = function(){
    document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/Arduino").update({
      "Led": 1
  })
}

d01_off.onclick = function(){
	document.getElementById("d01_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/Arduino").update({
		"Led": 0
	})
}

