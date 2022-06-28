document.addEventListener("DOMContentLoaded", function (event) {
  let images = document.getElementsByTagName("img");
  for (i = 0; i < images.length; i++) {
    if (images[i].alt == "www.000webhost.com") {
      images[i].style.display = "none";
    }
  }
});

(function () {
  if (
    !document.cookie.split(";").some((item) => item.trim().startsWith("token="))
  ) {
    window.location.href = "../index.html";
    console.log("salom");
  }
})();

// cookie qiymatini olish
const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  .split("=")[1];

const api_url = "http://todolist.firefox.uz/api";

// yangi vazifa qoshish tugmasi
const addNewTaskBtn = document.querySelector(".addNewTask");

// yangi element qayerga qo'shilayotganini ko'rsatisgni tanlash
const whereAdd = document.querySelector(".tanlash");
const pressEnter = document.querySelector(".add input");

// yangi vazifa qoshish funkiyasi
addNewTaskBtn.onclick = addNewItem;
pressEnter.onkeyup = (e) => {
  if (e.which == "13") {
    addNewItem();
  }
};

function addNewItem() {
  if (addNewTaskBtn.previousElementSibling.value != "") {
    // Vazifa yozilgan stringni o'zlashtirish va un yoboriladigan
    // requestni2ng body qismiga yoziladi
    let taskText = addNewTaskBtn.previousElementSibling.value;

    const newTask = document.createElement("li");
    newTask.classList.add("disable");
    // element uchun span yaratamiz va ichiga vazifa stiringini joylaymiz
    const newSpan = document.createElement("span");
    newSpan.innerHTML = taskText;

    // element uchun button check ni yaratamiz
    const newButtonOne = document.createElement("button");
    newButtonOne.classList.add("status", "btn");
    newButtonOne.innerHTML = `<i class='fas fa-check'></i>`;

    // element uchun button delete ni yaratamiz
    const newButtonTwo = document.createElement("button");
    newButtonTwo.classList.add("delete", "btn");
    newButtonTwo.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    // yartilgan elemetntlarni li elementi ichiga joylaysh
    newTask.append(newSpan, newButtonOne, newButtonTwo);

    // yaratigan li elementini ul elementi ichiga joylash
    whereAdd.insertBefore(newTask, whereAdd.firstChild);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookieValue}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // yoboriladigan data
    var urlencoded = new URLSearchParams();
    urlencoded.append("todo", taskText);
    urlencoded.append("status", "0");

    // dataning yuborilish usuli va tansi boshi
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // data junatish
    fetch(`${api_url}/items`, requestOptions)
      .then((response) => response.text())
      .then(function (result) {
        let json = JSON.parse(result);
        newButtonTwo.setAttribute("data-id", json.id);
        newButtonOne.setAttribute("data-id", json.id);
      });
    // .catch((error) => console.log("error", error));

    // elment qo'shilgandan so'ng input maydoni tozalash
    addNewTaskBtn.previousElementSibling.value = "";

    // har safar element qo'shilganda uni qolgan funksiyalarga ko'rsatish
    // getData();
    deleteItem();
    isDone();
  }
}

// --------------

// orqicha elementlarni o'chirib tashlash funksiyasi

const deleteItem = async () => {
  // delete tugmasini tanlab olish
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((item) => {
    item.onclick = () => {
      item.parentElement.classList.add("fall");

      item.parentElement.ontransitionend = () => {
        item.parentElement.remove();
      };

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookieValue}`);

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${api_url}/items/${item.dataset.id}`, requestOptions);
      // .then((response) => response.text())
      // .then((result) => console.log(result))
      // .catch((error) => console.log("error", error));
    };
  });
};

// ishni bajarganmi yo'qmi belgilash funksiyasi

const isDone = async () => {
  // vazifani tekshirish tugmasi
  const statusBtn = document.querySelectorAll(".status");
  statusBtn.forEach((item) => {
    item.onclick = () => {
      if (item.parentElement.classList.value == "enable") {
        item.parentElement.classList.add("disable");
        item.parentElement.classList.remove("enable");
      } else {
        item.parentElement.classList.add("enable");
        item.parentElement.classList.remove("disable");
      }

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookieValue}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      // urlencoded.append("todo", item.dataset.id);
      if (item.dataset.status == "1") {
        urlencoded.append("status", "0");
        item.dataset.status = "0";
      } else {
        urlencoded.append("status", "1");
        item.dataset.status = "1";
      }

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${api_url}/items/${item.dataset.id}`, requestOptions);
      // .then((response) => response.text())
      // .then((result) => console.log(result))
      // .catch((error) => console.log("error", error));
    };
  });
};

// ------------------

// qilingan ishlarni saralash bajarildimi bajarilmadimi va barchasini ko'rsatish

const openBtn = document.querySelector(".fa-sort-amount-down");

openBtn.onclick = openClose;

// ro'yxatni ochib yopish
function openClose() {
  if (!openBtn.nextElementSibling.style.height) {
    openBtn.nextElementSibling.style.height =
      openBtn.nextElementSibling.scrollHeight + "px";
  } else {
    openBtn.nextElementSibling.style.height = null;
  }
}

const selectItems = document.querySelectorAll(".item");

selectItems.forEach((item) => {
  item.onclick = () => {
    const items = document.querySelectorAll(".tanlash li");
    items.forEach((e) => {
      e.style.display = "none";
      if (item.innerHTML == "Barchasi") {
        e.style.display = "block";
        document.querySelector(".selected").innerHTML = "Barchasi";
      }
      if (item.innerHTML == "Bajarilgan" && e.classList.value == "enable") {
        e.style.display = "block";
        document.querySelector(".selected").innerHTML = "Bajarilgan";
      }
      if (item.innerHTML == "Bajarmaganlar" && e.classList.value == "disable") {
        e.style.display = "block";
        document.querySelector(".selected").innerHTML = "Bajarilmaganlar";
      }
    });
    openClose();
  };
});

// bazadan kelgan ma'limotlarni yaratish va chop etish
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${cookieValue}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(`${api_url}/items`, requestOptions)
  .then((response) => response.json())
  .then((result) => getData(result));
// .catch((error) => console.log("error", error));

const getData = (data) => {
  let oldData = [];
  data.map((item) => {
    oldData += `<li class="${item.status == 1 ? "enable" : "disable"}">
        <span>${item.todo}</span>
        <button data-id=${item.id} data-status=${
      item.status
    } class="status btn"><i class="fas fa-check"></i></button>
        <button data-id=${
          item.id
        }  class="delete btn"><i class="fas fa-trash-alt"></i></button></li>`;
  });
  whereAdd.innerHTML = oldData;
  deleteItem();
  isDone();
};

// Accountdan chiqish

const logOut = document.querySelector(".log-out");
logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
  setCookie();
});

function setCookie() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
