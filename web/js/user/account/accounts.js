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
