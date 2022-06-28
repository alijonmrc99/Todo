document.addEventListener("DOMContentLoaded", function (event) {
  let images = document.getElementsByTagName("img");
  for (i = 0; i < images.length; i++) {
    if (images[i].alt == "www.000webhost.com") {
      images[i].style.display = "none";
    }
  }
});

const api_url = "http://todolist.firefox.uz/api";

// junatishdan oldin tekshirigan natijalarni bir oladigan o'garuvchilar
let valUserName;
let valEmail;
let valPass;

// forma elementlarini animatsiya qilish
function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-down");

  arrows.forEach((arrow) => {
    const input = arrow.previousElementSibling;
    const parent = arrow.parentElement;

    input.addEventListener("change", () => {
      if (input.name == "username") {
        valUserName = validateUser(input);
      }
      if (input.name == "email") {
        valEmail = validateEmail(input);
      }
      if (input.name == "password") {
        valPass = validatePass(input);
      }
    });
    const emailRe = /^([A-z0-9_/-/.]+)\@([A-z0-9_/-/.]+)\.([A-z0-9]{2,9})$/;
    const nameRe = /^[\w]{3,50}$/;
    const passwordRe = /^([\w\W]{6,128})$/;
    //    Username maydonini tekshirish
    function validateUser(input) {
      if (!nameRe.test(input.value)) {
        error(
          input.nextElementSibling,
          "rgb(189, 87, 98)",
          90,
          `field-name`,
          `Username 3 belgidan kam bo'lmasligi kerak`
        );
        return false;
      } else {
        error(input.nextElementSibling, "rgb(87,189,130)", 0);
        return true;
      }
    }
    //    Email maydonini tekshirish
    function validateEmail(input) {
      if (!emailRe.test(input.value)) {
        error(
          input.nextElementSibling,
          "rgb(189, 87, 98)",
          90,
          `field-email`,
          `Email maydonini to'g'ri kiriting`
        );
        return false;
      } else {
        error(input.nextElementSibling, "rgb(87,189,130)", 0);
        return true;
      }
    }
    //  Password maydonini tekshirish
    function validatePass(input) {
      if (!passwordRe.test(input.value)) {
        error(
          input.nextElementSibling,
          "rgb(189, 87, 98)",
          90,
          `field-password`,
          `Parol 6 belgidan kam bo'lmasligi kerak`
        );
        return false;
      } else {
        error(input.nextElementSibling, "rgb(87,189,130)", 0);
        return true;
      }
    }

    //  Xato maydonni ko'rsatish
    function error(arrow, color, corner, location, error_text) {
      arrow.style.color = color;
      arrow.style.transform = `rotateZ(${corner}deg)`;

      let error_loc = document.querySelector(`.${location}`);

      if (error_text) {
        span = document.createElement("span");
        span.innerText = error_text;
        span.classList.add("error_verify");
        error_loc.appendChild(span);
      } else {
        if (document.querySelector(".error_verify"))
          document.querySelector(".error_verify").remove();
      }
    }
  });
}
animatedForm();
