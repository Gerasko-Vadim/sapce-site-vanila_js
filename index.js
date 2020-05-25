// m: Солнечная система
// Версия 2.2 от 21.07.2014

function Main_Solar(canvas) {
  canvas.onselectstart = function () {
    return false;
  }; // запрет выделения canvas

  // Предварительные установки

  var context = canvas.getContext("2d"); // на context происходит рисование

  var m0 = 1; // масштаб массы (масса Земли)
  var t0 = 1; // масштаб времени (1 оборот Земли вокруг своей оси (1 день))
  var a0 = 1; // масштаб расстояния (астрономическая единица - расстояние от Солнца до Земли)

  var r0 = 4.2588e-5 * a0; // радиус Земли
  var t1 = 365.2564 * t0; // 1 оборот Земли вокруг Солнца (1 год)

  // *** Задание вычислительных параметров ***

  var fps = 60; // frames per second - число кадров в секунду (качечтво отображения)
  var dt = 0.5 * t0; // шаг интегрирования

  // *** Выполнение программы ***

  var space_objects = [];
  // значения distance и time_around_Sun у солнца сделаны для того, чтобы оно мерцало из-за движения
  space_objects.push({
    name: "Солнце",
    mass: 333000 * m0,
    distance: 0.001 * a0,
    radius: 109.21 * r0,
    time_around_Sun: 60 * t0,
    phase: 0,
    color: "#f6e209",
    file: "VL_SS_Sun.png",
  });
  space_objects.push({
    name: "Меркурий",
    mass: 0.05527 * m0,
    distance: 0.387 * a0,
    radius: 0.3829 * r0,
    time_around_Sun: 87.97 * t0,
    phase: 0,
    color: "#de442c",
    file: "VL_SS_mercury.png",
  });
  space_objects.push({
    name: "Венера",
    mass: 0.815 * m0,
    distance: 0.723 * a0,
    radius: 0.949 * r0,
    time_around_Sun: 224.7 * t0,
    phase: 0,
    color: "#e8b633",
    file: "VL_SS_venus.png",
  });
  space_objects.push({
    name: "Земля",
    mass: 1 * m0,
    distance: 1 * a0,
    radius: 1 * r0,
    time_around_Sun: 1 * t1,
    phase: 0,
    color: "#3e6286",
    file: "VL_SS_earth.png",
  });
  space_objects.push({
    name: "Марс",
    mass: 0.107 * m0,
    distance: 1.523 * a0,
    radius: 0.532 * r0,
    time_around_Sun: 1.88 * t1,
    phase: 0,
    color: "#752814",
    file: "VL_SS_mars.png",
  });
  space_objects.push({
    name: "Юпитер",
    mass: 317.8 * m0,
    distance: 5.2 * a0,
    radius: 10.97 * r0,
    time_around_Sun: 11.86 * t1,
    phase: 0,
    color: "#8c694d",
    file: "VL_SS_jupiter.png",
  });
  space_objects.push({
    name: "Сатурн",
    mass: 95.2 * m0,
    distance: 9.54 * a0,
    radius: 9.45 * r0,
    time_around_Sun: 29.46 * t1,
    phase: 0,
    color: "#c69e47",
    file: "VL_SS_saturn.png",
  });
  space_objects.push({
    name: "Уран",
    mass: 14.53 * m0,
    distance: 19.19 * a0,
    radius: 4 * r0,
    time_around_Sun: 84.02 * t1,
    phase: 0,
    color: "#4e659b",
    file: "VL_SS_uranus.png",
  });
  space_objects.push({
    name: "Нептун",
    mass: 17.14 * m0,
    distance: 30.06 * a0,
    radius: 3.88 * r0,
    time_around_Sun: 164.78 * t1,
    phase: 0,
    color: "#4e6fbc",
    file: "VL_SS_neptune.png",
  });
  //    space_objects.push({name:"Плутон",    mass:0.0022*m0, distance:39.53*a0,  radius:0.18*r0, time_around_Sun:248.09*t1,  phase:0});
  //    space_objects.push({name:"Хаумеа",    mass:777*m0,    distance:777*a0,    radius:777*r0,  time_around_Sun:285*t1,     phase:0});
  //    space_objects.push({name:"Макемаке",  mass:777*m0,    distance:777*a0,    radius:777*r0,  time_around_Sun:309.88*t1,  phase:0});
  //    space_objects.push({name:"Эрида",     mass:777*m0,    distance:777*a0,    radius:777*r0,  time_around_Sun:557*t1,     phase:0});
  //    space_objects.push({name:"Седна",     mass:777*m0,    distance:777*a0,    radius:777*r0,  time_around_Sun:12059*t1,   phase:0});

  for (var i = 0; i < space_objects.length; i++) {
    space_objects[i].phase = Math.random() * 360;
  }

  var scale = canvas.height / a0 / space_objects.length / 2.1; // масштабный коэффициент для перехода от расчетных к экранным координатам
  var w = canvas.width / scale; // ширина окна в расчетных координатах
  var h = canvas.height / scale; // высота окна в расчетных координатах

  // Генерация звезд
  var stars = [];
  function generate_stars() {
    for (var i = 0; i < 1000; i++) {
      // цвет задается как #xxyyzz, где xx - доля красного, yy - зеленого, zz - синего.
      var r = (0x1a0 + Math.random() * 0x5f).toString(16).substr(1, 2); // красный от a0 до a0 + 5f
      var g = (0x1a0 + Math.random() * 0x5f).toString(16).substr(1, 2);
      var b = (0x1a0 + Math.random() * 0x5f).toString(16).substr(1, 2);
      stars[i] = {
        x: Math.random() * w * scale,
        y: Math.random() * h * scale,
        color: "#" + r + g + b,
      };
    }
  }

  // Основной цикл программы
  function control() {
    physics();
    draw();
  }

  // Расчетная часть программы
  function physics() {
    // то, что происходит каждый шаг времени
    for (var i = 0; i < space_objects.length; i++) {
      space_objects[i].phase += (360 * dt) / space_objects[i].time_around_Sun;
    }
  }

  // загрузка изображений планет
  function load_pics() {
    for (var i = 0; i < space_objects.length; i++) {
      if (!space_objects[i].file) continue;
      var pic = new Image();
      pic.src = "Pics/" + space_objects[i].file;
      space_objects[i].pic = pic;
    }
  }

  // Рисование
  function draw() {
    // темное небо
    context.fillStyle = "#000000";
    context.fillRect(0, 0, w * scale, h * scale);

    // звезды
    for (var i0 = 0; i0 < stars.length; i0++) {
      context.fillStyle = stars[i0].color;
      context.fillRect(stars[i0].x, stars[i0].y, 1, 1);
    }

    for (var i = 0; i < space_objects.length; i++) {
      var p = space_objects[i];
      var ro = 1.9 * Math.log(1 + (2.5 * p.distance) / a0) * a0;
      var fi = (p.phase / 180) * Math.PI;
      var xS = (w / 2 + ro * Math.cos(fi)) * scale;
      var yS = (h / 2 + ro * Math.sin(fi)) * scale;

      // траектории
      context.beginPath();
      context.arc(
        (w / 2) * scale,
        (h / 2) * scale,
        ro * scale,
        0,
        2 * Math.PI,
        false
      );
      context.strokeStyle = "#516185";
      context.stroke();

      // космические объекты
      if (p.pic) {
        var r = 0.1 * Math.log(1 + (8 * p.radius) / r0) * a0 * scale;
        var wh = p.pic.width / p.pic.height;
        context.drawImage(p.pic, xS - r * wh, yS - r, r * 2 * wh, r * 2);
      }
    }
  }

  // Запуск системы
  load_pics();
  generate_stars();
  setInterval(control, 1000 / fps);
}

window.onscroll = function () {
  let scrollEvent = document.getElementById("scroll");
  if (document.body.scrollTop < document.documentElement.clientHeight) {
    scrollEvent.style.opacity = "1";
  }
};
let timeOut;
function goUp() {
  let top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, -50);
    timeOut = setTimeout("goUp()", 15);
    let scrollEvent = document.getElementById("scroll");

    scrollEvent.style.opacity = "0";
  } else {
    clearTimeout(timeOut);

    let scrollEvent = document.getElementById("scroll");

    scrollEvent.style.opacity = "0";
  }
}

var modal1 = document.getElementById("modal");
var btn = document.getElementsByClassName("planet-btn");
var span = document.getElementById("close");
async function onclickBtn() {
  var modal1 = document.getElementById("modal");
  let modalContent = document.getElementById("modal-text");
  let src = `./Pics/VL_SS_${event.target.id}.png`;
  let response1 = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${event.target.id}`
  );
  let content = await response1.json();
  modalContent.innerHTML += `
  <div>
    <img src="${src}" class="img-modal"/>
    <div class="modal-flex">    
        <div>
            <p class="modal-p">Плотность:</p>
            <p class="modal-p">Эксцентричность:</p>
            <p class="modal-p">Радиус: </p>
            <p class="modal-p">Гравитация: </p>
            <p class="modal-p">Масса: </p>
            <p class="modal-p">Угол наклона: </p>
        </div>
        <div>
            <p> ${content.density}</p>
            <p> ${content.eccentricity}</p>
            <p>${content.equaRadius}</p>
            <p>${content.gravity}</p>
            <p>${content.mass.massValue}</p>
            <p>${content.sideralRotation}</p>
        </div>  
    </div>
    <p class="modal-op">Описание:</p>

    </div>
    `;

  modal1.style.display = "block";
  console.log(content);
}
function onclickBtnSpan() {
  var modal1 = document.getElementById("modal");
  modal1.style.display = "none";
  let modalContent = document.getElementById("modal-text");
  modalContent.innerHTML = "";
}
var input1 = 0;
var input2 = 0;
var input3 = 0;
var result = 0;
var g= 6.67*0.0000001;
function inputBtn(e) {
  if (event.target.id === "input1") {
    input1 = e;
  }
  if (event.target.id === "input2") {
    input2 = e;
  }
  if (event.target.id === "input3") {
    input3 = e;
  }
  if (input1 != 0 && input2 != 0 && input3 != 0) {
    let resul = document.getElementById("inputResult");
    resul.value = g*(Number(input1)*Number(input2)/(Math.pow(Number(input3), 2)));
  }
  else if(input1 == 0 || input2 == 0 || input3 == 0){ 
      let resul = document.getElementById("inputResult");
    resul.value =Number(0);
  }
}
