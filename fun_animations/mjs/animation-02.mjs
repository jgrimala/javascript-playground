// animation-02.mjs
export function anim2() {
  btn2.addEventListener('mousedown', enleverOuAfficher, false)
  section1.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "none";

  //fait apparaitre ou disparaitre l'animation
  function enleverOuAfficher() {
    if (btn2.innerHTML == "<h5>animation 2</h5>") {
      section2.style.display = "flex";
      btn2.innerHTML = "<h5>arreter</h5>";
    }
    else {
      section2.style.display = "none";
      btn2.innerHTML = "<h5>animation 2</h5>";
    }
  }
}