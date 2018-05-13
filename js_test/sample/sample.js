
$(function(){
    $('.slider').bxSlider({
        auto: true,
        slideWidth: 300,
        speed: 900,
        mode: 'fade',
        nextText: true
    });
});
  

$(function() {
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=6e7285606e95bb7c8000b7a2405845e8",
    cache: false,
    success:function (weatherdata){
  // img insert
  var img = document.createElement('img');
  img.src = "http://openweathermap.org/img/w/"+weatherdata.weather[0].icon+".png";
  img.alt = weatherdata.weather[0].main;
  document.getElementById('icon').appendChild(img);
  // ＝摂氏＋＝K
  document.getElementById('temp').innerHTML = Math.floor(weatherdata.main.temp - 273.15);
   
  // 位置
  document.getElementById('here').innerHTML = weatherdata.name;
   
  }
  });
});
setInterval(function(){
    var date = new Date();
    var time ;
      time = date.getFullYear()+'.';
      time += (date.getMonth()+1)+'.';
      time += (date.getDate())+'.';
      time += date.getHours()+'.';
      time += date.getMinutes()+'.';
      time += date.getSeconds(); 
     document.getElementById('time').innerHTML = time;
    },1000);

function initMap() {
    var data = [
        { lat:　30.1369229, lng: -109.7807451, title: "マスク達" ,content: '<h3>マスク達</h3>'},
        { lat:　50.657793, lng: -2.404477, title: "イギリス" ,content:'<h3>白馬</h3>'},
        { lat: 47.885478, lng: 106.926589, title: "スペイン",content:'<h3>チンギスハン</h3>' },
        { lat: 35.720272, lng: 140.322112, title: "イタリア",content:'<h3>スイカ</h3>' },
        { lat: 0.000000, lng: 0.000000, title: "アトランティス",content: '<h3>アトランティス</h3>'}];
   
    var infoWindow=[];
    var marker=[];
    var map = new google.maps.Map(document.getElementById('map'),{ 
        center: data[0],
        zoom: 2.5 
    });
    for (var i = 0; i < data.length; i++) {
        markerLatLng = {lat: data[i]['lat'], lng: data[i]['lng']};
        marker[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        animation: google.maps.Animation.BOUNCE
        });
        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: data[i]['content']
        });
        markerEvent(i); 
    }

    function markerEvent(i) {
        marker[i].addListener('click', function() { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); 
        map.setZoom(map.getZoom() + 2.5);//zoom クリックごとに２度
        });
    }

}
// $(function(){
    
//     // var modal = document.getElementById('#modal');
//     var modal = document.getElementsByClassName('modal')[0];
//     // /$('.modalBtn').click(function() {
//         // $('.modalBtn').on('click', function(e) {
//         //     modal.addClass('is-active');
//     // $('body').on( 'click', '.modalBtn', function( e ) {
//         // /$('.modal').show();
//         ("body").append('<div id="modal-overlay"></div>');

// //[$modal-overlay]をフェードインさせる
//         $("#modal-overlay").fadeIn("slow");
//     });
// });    

// $("#modal-open").click(
$(function(){
    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").fadeIn("slow");
    $("#modal-content").fadeIn("slow");
});
    $("#modal-overlay,#modal-close").unbind().click(function(){
    $("#modal-content,#modal-overlay").fadeOut("slow",function(){
        $("#modal-overlay").remove();
    });
});

$("#modal-open").click(function (e) {
    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").fadeIn("slow");
    $("#modal-selfFB").fadeIn("slow");
});
$("#modal-overlay,#modal-selfFB-close").unbind().click(function(){
    $("#modal-selfFB,#modal-overlay").fadeOut("slow",function(){
        $("#modal-overlay").remove();
    });
});



$("#modal-new").click(function() {
    $("body").append('<div id="mycanvas"></div>');
    $("#mycanvas").fadeIn("slow");
    'use strict';
    var canvas;
    var ctx;
    var Ball;
    var balls = [];

    canvas = document.getElementById('mycanvas');
    if (!canvas || !canvas.getContext) return false;
    ctx = canvas.getContext('2d');

    function rand(min, max) {
      // 0-n
      // Math.floor(Math.random() * (n + 1))
      // min-max
      return min + Math.floor(Math.random() * (max - min + 1));
    }
    canvas.addEventListener('click', function(e) {
        var x, y, r;
        x = e.clientX;
        y = e.clientY;
        r = rand(0, 100) < 20 ? rand(50, 80) : rand(10, 35);
        balls.push(new Ball(x, y, r));
      });

    Ball = function(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = rand(-10, 10);
        this.vy = rand(-10, 10);
        // this.color = 'hsla(120, 80%, 40%, 0.8)';
        // 色相（hue）・彩度（saturation）・明度（luminousity）・透明（alpha
        this.color ='hsla(' + rand(50, 100) + ', ' + rand(40, 80) + '%, ' + rand(50, 60) + '%, ' + Math.random() + ')';
        this.draw = function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
          ctx.fillStyle = this.color;
          ctx.closePath();
          ctx.fill();
        };
        this.move = function() {
            if (this.x + this.r > canvas.width || this.x - this.r < 0) {
                this.vx *= -1;
            }
            if (this.y + this.r > canvas.height || this.y - this.r < 0) {
                this.vy *= -1;
            }
            this.x += this.vx;
            this.y += this.vy;
        }
      };
  
      var ball = new Ball(rand(100, 200), rand(100, 200), rand(10, 50));
      ball.draw();

      function update() {
        var i;
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].move();
        }
        setTimeout(function() {
          update();
        }, 30);
      }
  
      update();
  })();



