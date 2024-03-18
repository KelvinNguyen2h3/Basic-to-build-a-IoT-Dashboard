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


//Nhietdo----------------------------------------------------------------------
//-----------------------------------------------------------------------------
firebase.database().ref("/cambien/nhietdo").on("value",function(snapshot){
    var nd = snapshot.val();  
    document.getElementById("nd").innerHTML = nd;
    console.log(nd);
  });

  //Doam-------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  firebase.database().ref("/cambien/doam").on("value",function(snapshot){
    var da = snapshot.val();  
    document.getElementById("da").innerHTML = da;
    console.log(da);
});



function controlLight(roomPath, buttonOnId, buttonOffId, imageId) {
    var buttonOn = document.getElementById(buttonOnId);
    var buttonOff = document.getElementById(buttonOffId);
    var image = document.getElementById(imageId);
  
    buttonOn.onclick = function() {
      image.src = "./img/bulb_on.png";
      firebase.database().ref(roomPath).update({ "Den": "ON" });
    };
  
    buttonOff.onclick = function() {
      image.src = "./img/bulb_off.png";
      firebase.database().ref(roomPath).update({ "Den": "OFF" });
    };
  
    firebase.database().ref(roomPath).once("value", (snapshot) => {
      if (snapshot.exists()) {
        var status = snapshot.val();
        if (status["Den"] == "ON") {
          image.src = "./img/bulb_on.png";
        } else {
          image.src = "./img/bulb_off.png";
        }
      } else {
        console.log("No data available!");
      }
    });
  }
  
  // Phòng khách
  controlLight("/pk", "dpk_on", "dpk_off", "dpk_img");
  // Phòng ngủ
  controlLight("/pn", "dpn_on", "dpn_off", "dpn_img");


  function controlFan(roomPath, buttonOnId, buttonOffId, imageId) {
    var buttonOn = document.getElementById(buttonOnId);
    var buttonOff = document.getElementById(buttonOffId);
    var image = document.getElementById(imageId);
  
    buttonOn.onclick = function() {
      image.src = "./img/fan_on.gif";
      firebase.database().ref(roomPath).update({ "Quat": "ON" });
    };
  
    buttonOff.onclick = function() {
      image.src = "./img/fan_off.png";
      firebase.database().ref(roomPath).update({ "Quat": "OFF" });
    };
  
    firebase.database().ref(roomPath).once("value", (snapshot) => {
      if (snapshot.exists()) {
        var status = snapshot.val();
        if (status["Quat"] == "ON") {
          image.src = "./img/fan_on.gif";
        } else {
          image.src = "./img/fan_off.png";
        }
      } else {
        console.log("No data available!");
      }
    });
  }
  
  // Phòng khách
  controlFan("/pk", "qpk_on", "qpk_off", "qpk_img");
  // Phòng ngủ
  controlFan("/pn", "qpn_on", "qpn_off", "qpn_img");


 
var slider_mlpk = document.getElementById("slider_mlpk_id");
var mlpk_img = document.getElementById("mlpk_img");
  slider_mlpk.oninput = function(){
  document.getElementById("slider_mlpk_value").innerHTML = slider_mlpk.value;
  mlpk_img.style.opacity = slider_mlpk.value/10;
}

var slider_mlpn = document.getElementById("slider_mlpn_id");
var mlpn_img = document.getElementById("mlpn_img");
  slider_mlpn.oninput = function(){
  document.getElementById("slider_mlpn_value").innerHTML = slider_mlpn.value;
  mlpk_img.style.opacity = slider_mlpn.value/10;
}





function controlAirConditionerBrightness(sliderId, sliderValueId, roomPath, img) {
  var slider = document.getElementById(sliderId);
  var sliderValue = document.getElementById(sliderValueId);
  var acImg = document.getElementById(img);

  // Thiết lập giá trị ban đầu cho thanh trượt và giá trị hiển thị
  sliderValue.innerHTML = slider.value;
  acImg.style.opacity = slider.value / 35; // Giả sử giá trị max của slider là 35

  // Xử lý sự kiện khi người dùng thay đổi giá trị trên thanh trượt
  slider.oninput = function () {
      sliderValue.innerHTML = this.value;
      acImg.style.opacity = this.value / 35; // Giả sử giá trị max của slider là 35

      // Lưu giá trị độ mờ mới vào cơ sở dữ liệu Firebase
      var firebaseRef = firebase.database().ref(roomPath).child("Maylanh");
      firebaseRef.set(this.value);
  };

  // Theo dõi sự thay đổi trong cơ sở dữ liệu Firebase và cập nhật giao diện
  firebase.database().ref(roomPath + "/Maylanh").on("value", function (snapshot) {
      var brightness = snapshot.val();
      slider.value = brightness;
      sliderValue.innerHTML = brightness;
      acImg.style.opacity = brightness / 35; // Giả sử giá trị max của slider là 35
  });
}

// Gọi hàm controlAirConditionerBrightness để điều khiển độ mờ của máy lạnh trong các phòng khác nhau
controlAirConditionerBrightness("slider_mlpk_id", "slider_mlpk_value", "/pk", "mlpk_img"); // Phòng khách
controlAirConditionerBrightness("slider_mlpn_id", "slider_mlpn_value", "/pn", "mlpn_img"); // Phòng ngủ
