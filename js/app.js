(function () {
  "use strict";

  var slides = document.querySelectorAll(".bg-slide");
  var i = 0;
  slides.forEach(function (s) { s.style.backgroundImage = "url('" + s.dataset.src + "')"; });
  if (slides.length) {
    slides[0].classList.add("on");
    setInterval(function () {
      slides[i].classList.remove("on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("on");
    }, 7000);
  }

  var ip = document.getElementById("ip");
  var label = ip.querySelector("small");
  ip.addEventListener("click", function () {
    var done = function () {
      ip.classList.add("copied");
      label.textContent = "Kopiert ✓";
      setTimeout(function () { ip.classList.remove("copied"); label.textContent = "Kopieren"; }, 1600);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText("CityPvP.DE").then(done, function () { window.prompt("IP kopieren:", "CityPvP.DE"); });
    } else {
      window.prompt("IP kopieren:", "CityPvP.DE");
    }
  });

  var audio = document.getElementById("bgmusic");
  var mbtn = document.getElementById("music");
  var started = false;
  function setMusic(on) {
    if (on) { audio.play().then(function () { mbtn.classList.add("on"); }).catch(function () {}); }
    else { audio.pause(); mbtn.classList.remove("on"); }
  }
  mbtn.addEventListener("click", function (e) {
    e.stopPropagation();
    started = true;
    setMusic(audio.paused);
  });
  document.body.addEventListener("click", function () {
    if (!started) { started = true; audio.volume = 0.5; setMusic(true); }
  }, { once: true });

  var st = document.getElementById("status");
  fetch("https://api.mcsrvstat.us/3/citypvp.de")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d && d.online) {
        st.querySelector(".dot").classList.add("live");
        st.querySelector(".st-text").innerHTML = "<b>" + (d.players ? d.players.online : 0) + "</b> online";
        st.hidden = false;
      }
    })
    .catch(function () {});

  fetch("https://api.modrinth.com/v2/project/femcraftclient")
    .then(function (r) { return r.json(); })
    .then(function (d) { if (d && d.icon_url) document.getElementById("fem-icon").src = d.icon_url; })
    .catch(function () {});

  var title = document.title;
  window.addEventListener("blur", function () { document.title = "CityPvP.DE – Wartet auf dich!"; });
  window.addEventListener("focus", function () { document.title = title; });
})();
