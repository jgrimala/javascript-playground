// animation-04.mjs 
export function anim4() {
  btn4.addEventListener('mousedown', enleverOuAfficher, false)
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "none";

  //fait apparaitre ou disparaitre l'animation
  function enleverOuAfficher() {
    if (btn4.innerHTML == "<h5>animation 4</h5>") {
      section4.style.display = "flex";
      btn4.innerHTML = "<h5>arreter</h5>";
    }
    else {
      section4.style.display = "none";
      btn4.innerHTML = "<h5>animation 4</h5>";
    }
  }
}