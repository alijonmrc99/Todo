const submitBtn = document.querySelector("#submit-btn");
const subValUsername = document.querySelector("#username");
const subValEmail = document.querySelector("#email");
const subValPass = document.querySelector("#password");

// ro'yxatdan o'tish uchun verifikatsiya qilingan ma'lumotlarni bazaga kiritish kodini olish uchun yuborish


document.body.onkeyup = (e) => {
  if (e.which == "13") {
    if (valPass && valUserName && valPass) submit2();
  }
};

submitBtn.addEventListener("click", () => {
  if (valPass && valUserName && valPass) submit2();
});

// ma'lumotlarni to'ldirish va yuborish
function submit2() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", subValEmail.value);
  urlencoded.append("password", subValPass.value);
  urlencoded.append("username", subValUsername.value);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  fetch(`${api_url}/sign/up`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.hasError) {
        errorHandle(
          subValEmail.nextElementSibling,
          "rgb(189, 87, 98)",
          90,
          `field-email`,
          `Bu email allaqachon ro'yxatdan o'tgan`
        );
      } else {
        openPassword();
      }
    });
  // .catch((error) => console.log("error", error));

  // emailni tasdiqlash maydonni ekranga chiqarish funksiyasi
}

// emailni tasdiqlash oynasi
const signInLayout = document.querySelector(".singUp");
const checkPasswordLayout = document.querySelector(".checkPpassword");

function openPassword() {
  document.querySelector("#userEmail").innerHTML = subValEmail.value;
  signInLayout.style.transform = "translateY(-30px)";
  signInLayout.style.opacity = "0";
  signInLayout.style.pointerEvents = "none";

  setTimeout(() => {
    checkPasswordLayout.style.transform = "translateY(0)";
    checkPasswordLayout.style.opacity = "1";
    checkPasswordLayout.style.pointerEvents = "all";
  }, 300);
}

/* emailga kelgan varifikatsiya ko'dini tekshirish */

const checkPasswordField = document.querySelector("#verificationField");
const btnCheckVerPass = document.querySelector("#checkPassword");
btnCheckVerPass.addEventListener("click", checkPassword);

function checkPassword() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", subValEmail.value);
  urlencoded.append("code", checkPasswordField.value);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // agar maydonni tekshirish va bazaga jo'natish
  if (checkPasswordField.value.length === 6)
    fetch(`${api_url}/sign/check-ver-code`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setCookie("token", result.token, 1);
          window.location.href = "../todos.html";
        }
        if (result.name) {
          errorHandle(
            checkPasswordField.nextElementSibling,
            "rgb(189, 87, 98)",
            90,
            `field-name2`,
            `Xato parol qaytadan tekshiring`
          );
        }
      });
}

// cookie larni yozib qo'yish
function setCookie(cname, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  } else var expires = "";

  document.cookie = cname + "=" + value + ";" + expires + ";path=/"; // + and " added
}

// email olding ro'yxatga olinganmi tekshirish
function errorHandle(arrow, color, corner, location, error_text) {
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
