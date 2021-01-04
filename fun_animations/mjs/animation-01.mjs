// animation-01.mjs
export function anim1() {
  var w = canvas.width = 400,
    h = canvas.height = 400,
    ctx = canvas.getContext('2d'),
    frame;
  btn1.addEventListener('mousedown', enleverOuAfficher, false)
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "none";

  //fait apparaitre ou disparaitre l'animation
  function enleverOuAfficher() {
    if (btn1.innerHTML == "<h5>animation 1</h5>") {
      section1.style.display = "flex";

      btn1.innerHTML = "<h5>arreter</h5>";
    }
    else {
      section1.style.display = "none";
      btn1.innerHTML = "<h5>animation 1</h5>";

    }
  }

  function draw() {
    frame = requestAnimationFrame(draw);
    ++frame;
    for (var i = 0; i < w; ++i) {
      ctx.strokeStyle = i % 20 === 0 ? 'hsl(hue, 100%, 50%)'.replace('hue',
        (360 / (w / 3) * i - frame) % 20
      ) : 'rgba(0, 0, 0, .08)';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, (i + frame) % w / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  }
  draw();
}

