import { anim1 } from './animation-01.mjs'  //anim1 est deja defini dans animation-01.mjs
import { anim2 } from './animation-02.mjs'  //anim1 est deja defini dans animation-01.mjs
import { anim3 } from './animation-03.mjs'
import { anim4 } from './animation-04.mjs'
import { animmenu } from './animation-menu.mjs'

let menu = document.querySelector('.showmenu')

let section1 = document.getElementById('section1')
let section2 = document.getElementById('section2')
let section3 = document.getElementById('section3')
let section4 = document.getElementById('section4')

let bnt1 = document.getElementById('btn1')
let bnt2 = document.getElementById('btn2')
let bnt3 = document.getElementById('btn3')
let bnt4 = document.getElementById('btn4')

anim1(btn1)
anim2(btn2)
animmenu(menu)
anim3(btn3)
anim4(btn4)

