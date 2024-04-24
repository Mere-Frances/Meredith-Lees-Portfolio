alert("Disclaimer\nThis site is currently under construction\nPlease view the temporary files below");

AOS.init();

let openHam = document.getElementById("openHam")
let closeHam = document.getElementById("closeHam");
let navigationItems = document.getElementById("navigationItems");

const hamburgerEvent = (navigation, close, open) => {
    navigationItems.style.display = navigation;
    closeHam.style.display = close;
    openHam.style.display = open;
}

//  add click event functions to correct parameters

openHam.addEventListener("click", () => hamburgerEvent("flex", "block", "none"));
closeHam.addEventListener("click", () => hamburgerEvent("none", "none", "block"));



const arrowBtns = document.querySelectorAll('.arrow-btn')
const cardBtns = document.querySelectorAll('.card')
let currentCard = 0;
let dir = 1;
moveCards()

arrowBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 3px 4px #00000050'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 6px 8px #00000030'
  })
  
  btn.onclick = (e)=> {
    dir = (i==0)? 1:-1
    if (i==0) {
      currentCard--
      currentCard = Math.max(0, currentCard)
    }
    else {
      currentCard++
      currentCard = Math.min(4, currentCard)
    }
    moveCards(0.75)
  }
})

cardBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 6px 11px #00000030'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 0px 0px #00000030'
  })

  btn.onclick = (e)=> {
    dir = (i<currentCard)? 1:-1
    currentCard = i
    moveCards(0.75)
  }
})

function moveCards(dur=0){
  gsap.timeline({defaults:{ duration:dur, ease:'power3', stagger:{each:-0.03*dir} }})
    .to('.card', {
      x:-270*currentCard,
      y:(i)=>(i==currentCard)?0:15,
      height:(i)=>(i==currentCard)?270:240,
      ease:'elastic.out(0.4)'
    }, 0)
    .to('.card', {
      cursor:(i)=>(i==currentCard)?'default':'pointer',
      'box-shadow':(i)=>(i==currentCard)?'0 6px 11px #00000030':'0 0px 0px #00000030',
      border:(i)=>(i==currentCard)?'2px solid #26a':'0px solid #fff',
      background:(i)=>(i==currentCard)?'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)':'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
      ease:'expo'
    }, 0)
    .to('.icon svg', {
      attr:{
        stroke:(i)=>(i==currentCard)?'transparent':'#36a',  
        fill:(i)=>(i==currentCard)?'#36a':'transparent'
      }
    }, 0)
    .to('.arrow-btn-prev', {
      autoAlpha:(currentCard==0)?0:1
    }, 0)
    .to('.arrow-btn-next', {
      autoAlpha:(currentCard==4)?0:1
    }, 0)
    .to('.card h4', {
      y:(i)=>(i==currentCard)?0:8,    
      opacity:(i)=>(i==currentCard)?1:0,
    }, 0)
}


document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.dot');
  
    // Function to update active card and dot
  function updateCarousel(index) {
    // Update active card
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update active dot
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Initialize carousel
  let currentIndex = 0;
  updateCarousel(currentIndex);

  // Event listeners for next and previous buttons
  // Assuming you have some way to trigger the card change, e.g., buttons
  // Here's just a simple example:
  document.getElementById('nextButton').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel(currentIndex);
  });

  document.getElementById('prevButton').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel(currentIndex);
  });
});

function checkCurrentView() {
  let navElems = document.getElementsByClassName("navbar__link-item");
  for (i in navElems) {
    if (navElems[i].id) {
      var name = navElems[i].id.replace(/Nav/g, "");
      if (isVisible(name)) {
        navElems[i].setAttribute("style", "font-weight: 800; text-decoration: underline;");
      } else {
        navElems[i].setAttribute("style", "background: none;");
      }
    }
  }
}


function isVisible(element){
  element = document.getElementById(element);
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ); 

}
