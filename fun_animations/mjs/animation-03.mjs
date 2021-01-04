export function anim3() {
  btn3.addEventListener('mousedown', enleverOuAfficher, false)
  section1.style.display = "none";
  section2.style.display = "none";
  section4.style.display = "none";

  //fait apparaitre ou disparaitre l'animation
  function enleverOuAfficher() {
    if (btn3.innerHTML == "<h5>animation 3</h5>") {
      section3.style.display = "flex";
      btn3.innerHTML = "<h5>arreter</h5>";
    }
    else {
      section3.style.display = "none";
      btn3.innerHTML = "<h5>animation 3</h5>";
    }
  }
}