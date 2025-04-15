let card = document.querySelector(".card"); //declearing profile card element
let displayPicture = document.querySelector(".display-picture"); //declearing profile picture

let body = document.querySelector("body");

displayPicture.addEventListener("click", function () {
  //on click on profile picture toggle hidden class from css

  card.classList.toggle("hidden");
});

function orderClick() {
  Swal.fire({
    title: "Siparişiniz Yolda!",
    customClass: "swalwides",
    confirmButtonColor: "#FF8000",
  });
}



// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function titret(sure) {
  navigator.vibrate(sure);
  console.log(sure + "ms");
}

const list = document.querySelectorAll(".nav__item");
list.forEach((item) => {
  item.addEventListener("click", () => {
    list.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});




/*--------------DONATE-------------- */
$(document)
    .ready(function() {
        $('.frame')
            .click(function() {
                $('.top')
                    .addClass('open');
                $('.message')
                    .addClass('pull');
            })
    });

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



const input = document.getElementById("text");
const copyButton = document.getElementById("copy");

const copyText = (e) => {
  // window.getSelection().selectAllChildren(textElement);
  input.select(); //select input value
  document.execCommand("copy");
  e.currentTarget.setAttribute("tooltip", "Copied!");
};

const resetTooltip = (e) => {
  e.currentTarget.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));







