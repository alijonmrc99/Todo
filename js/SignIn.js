// agar login qilgan bo'lsa
window.onload = () => {
  if (document.cookie) {
    window.location.href = "../todos.html";
  }
};

const SignInBtn = document.querySelector("#signIn");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");

document.body.onkeyup = (e) => {
  if (e.which == "13") {
    if (valEmail && valPass) submit1();
  }
};

SignInBtn.addEventListener("click", () => {
  if (valEmail && valPass) submit1();
});

function submit1() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();

  urlencoded.append("email", email.value);
  urlencoded.append("password", pass.value);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(`${api_url}/sign/in`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.token) {
        setCookie("token", result.token, 365);
        window.location.href = "../todos.html";
      } else {
        let errorParagraf = document.querySelector(".error-signIn");
        errorParagraf.innerHTML = "Bunday hisob mavjud emas";
      }
    });
  // .catch((error) => console.log("error", error));
}

function setCookie(cname, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  } else var expires = "";

  document.cookie = cname + "=" + value + ";" + expires + ";path=/"; // + and " added
}

/*----------------------------------------------------*/
