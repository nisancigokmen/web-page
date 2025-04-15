let card = document.querySelector(".card"); //declearing profile card element
let displayPicture = document.querySelector(".display-picture"); //declearing profile picture

let body = document.querySelector("body");

displayPicture.addEventListener("click", function() { //on click on profile picture toggle hidden class from css

    card.classList.toggle("hidden")});


    [].forEach.call(document.querySelectorAll('#tel'), function (tel) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault()
            let matrix = "+90 (___) ___ __ __",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                newValue = newValue.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        tel.addEventListener("tel", mask, false);
        tel.addEventListener("focus", mask, false);
        tel.addEventListener("blur", mask, false);
        tel.addEventListener("keydown", mask, false);
        tel.addEventListener('mouseup', event => {
          event.preventDefault()
          if (tel.value.length < 4) {
            tel.setSelectionRange(4, 4)
          } else {
            tel.setSelectionRange(tel.value.length, tel.value.length)
          }
        })
    });

    const list = document.querySelectorAll(".nav__item");
list.forEach((item) => {
  item.addEventListener("click", () => {
    list.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});

const fromCurrency = document.getElementById("from_currency");
const fromAmount = document.getElementById("fromAmount");
const toCurrency = document.getElementById("to_currency");
const toAmount = document.getElementById("toAmount");

const rateValue = document.getElementById("rate");
const exchange = document.getElementById("exchange");

fromCurrency.addEventListener("change", calculate);
fromAmount.addEventListener("input", calculate);
toCurrency.addEventListener("change", calculate);
toAmount.addEventListener("input", calculate);

exchange.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  calculate();
});

function calculate() {
  const from_currency = fromCurrency.value;
  const to_currency = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
    .then((res) => res.json())
    .then((res) => {
      const rate = res.rates[to_currency];
      rateValue.innerText = `1 ${from_currency} = ${rate} ${to_currency}`;
      toAmount.value = (fromAmount.value * rate).toFixed(2);
    });
}

calculate();

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImage = (image) => {
  image.src = image.dataset.src;
  image.onload = () => {
    image.classList.add('loaded');  // Optional: Add class when image is loaded
  };
};

const lazyLoad = () => {
  const windowHeight = window.innerHeight;
  lazyImages.forEach((image) => {
    const rect = image.getBoundingClientRect();
    if (rect.top <= windowHeight) {
      loadImage(image);
    }
  });
};

// Efficient image rendering with requestAnimationFrame
const renderImage = () => {
  requestAnimationFrame(() => {
    // Rendering logic, for example, drawing on canvas or manipulating DOM
    console.log('Rendering...');
  });
};

// Example of rendering an image on canvas (for illustration)
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'image-url.jpg';

img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Optimize animations
let lastFrameTime = 0;
const frameRate = 60; // 60 FPS limit

const optimizedAnimation = (timestamp) => {
  if (timestamp - lastFrameTime >= 1000 / frameRate) {
    renderImage();
    lastFrameTime = timestamp;
  }
  requestAnimationFrame(optimizedAnimation);
};

// Initial lazy load check
window.addEventListener('scroll', lazyLoad);
lazyLoad();  // Initial check for lazy loading

// Start optimized rendering
requestAnimationFrame(optimizedAnimation);
