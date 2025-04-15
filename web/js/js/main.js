
// Countdown Timer
function countDown(x) {
  if (x.matches) {
    console.log("Mobile");
  } else {
    // If media query matches
    console.log("Desktop");
    
  }
}

var x = window.matchMedia("(max-width: 768px)");
countDown(x); // Call listener function at run time
x.addListener(countDown); // Attach listener function on state changes

// Click to Copy
var tooltip = document.getElementById("myTooltip");
var copyText = document.getElementById("couponCode");
function myFunction() {
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  tooltip.innerHTML = "Kopyalandı: " + copyText.value;
}
function outFunc() {
  tooltip.innerHTML = "Kuponu Kopyala";
}

// Close
var closebtns =
  document.getElementsByClassName(
    "close"
  ); /* Get all elements with class="close" */
var i;
/* Loop through the elements, and hide the parent, when clicked on */
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function () {
    this.parentElement.style.display = "none";
  });
}


/*Slider Gallery*/

const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});

/*--Home--*/



