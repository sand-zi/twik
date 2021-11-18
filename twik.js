"use strict";

const validInputs = {
  email: false,
  name: false,
};

const userInput = {
  name: "",
  email: "",
  message: "",
};
function onToggleMenu() {
  const app = document.querySelector(".sandra-codes-app-container");
  app.classList.toggle("open-menu");
  app.classList.remove("open-contact");
  onUpdateInfo();
}

function onUpdateInfo() {
  getNumofImg();
  getNumofFixedPosition();
}

function getNumofImg() {
  const images = document.images;
  const imagesParagraph = document.getElementById("images-count");
  imagesParagraph.innerText = `Number of images is ${images.length}`;
}

function getNumofFixedPosition() {
  const elems = document.body.querySelectorAll("*");
  let count = 0;
  elems.forEach((elem) => {
    if (window.getComputedStyle(elem).getPropertyValue("position") == "fixed") count++;
  });
  const fixedParagraph = document.getElementById("fixed-position-count");
  fixedParagraph.innerText = `Number of elements with position fixed is ${count}`;
}

function onOpenContactMenu() {
  const app = document.querySelector(".sandra-codes-app-container");
  app.classList.toggle("open-contact");
}

function onValidate(el) {
  const name = el.name;
  const value = el.value;
  name === "email" ? validateEmail(value) : validateName(value);
  showSubmit();
}

function showMessage(text, type) {
  const p = document.querySelector(".sandra-codes-app-container .my-user-message");
  p.innerText = text;
  p.classList.toggle(`${type}`);
  setTimeout(() => {
    p.classList.toggle(`${type}`);
  }, 3000);
}

function showSubmit() {
  const isInputValid = validInputs.email && validInputs.name;
  const button = document.querySelector(".sandra-codes-app-container .btn-my-form-submit");
  isInputValid ? button.classList.add("visible") : button.classList.remove("visible");
}

function validateEmail(email) {
  const emailValidation = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "i"
  );
  if (emailValidation.test(email)) {
    validInputs.email = true;
  } else showMessage("Please enter the email in following format example@email.com", "error");
}

function validateName(name) {
  if (name.length > 2) {
    validInputs.name = true;
  } else showMessage("Please name field should contain 2 or more letters", "error");
}

function onSubmitForm() {
  let el;
  for (const property in userInput) {
    el =
      property == "message"
        ? document.querySelector(`.sandra-codes-app-container .my-form textarea[name=${property}]`)
        : document.querySelector(`.sandra-codes-app-container .my-form input[name=${property}]`);
    userInput[property] = el.value;
    el.value = "";
  }

  sendToGoogleSheets(userInput);
}

function onRetriveUserInput() {
  let el;
  for (const [key, value] of Object.entries(userInput)) {
    el =
      key == "message"
        ? document.querySelector(`.sandra-codes-app-container .my-form textarea[name=${key}]`)
        : document.querySelector(`.sandra-codes-app-container .my-form input[name=${key}]`);
    el.value = value;
  }
}

function sendToGoogleSheets(userInfo) {
  console.log(userInfo);
}

(function () {
  let style = `<style>

  .sandra-codes-app-container {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    scroll-behavior: smooth;
  }
  
  .sandra-codes-app-container input,
  textarea {
    outline: none;
    font: inherit;
    font-size: 14px;
    color: inherit;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
  
    width: 80%;
    background: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
  
  .sandra-codes-app-container button {
    cursor: pointer;
    padding: 0;
    font: inherit;
    color: white;
    border: none;
    background-color: #66b6d3;
    border-radius: 3px;
    padding: 5px;
  }
  
  .sandra-codes-app-container .bubble {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: #66b6d3;
    position: absolute;
    right: 0;
    top: 0;
    visibility: visible;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .sandra-codes-app-container .main-screen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(0 0 0 / 70%);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s;
  }
  
  .sandra-codes-app-container.open-menu .main-screen {
    visibility: visible;
    opacity: 1;
  }
  
  .sandra-codes-app-container.open-menu .bubble {
    visibility: hidden;
  }
  
  .sandra-codes-app-container .info-container {
    background: rgba(255, 255, 255, 0.85);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s;
    padding: 10px;
  }
  
  .sandra-codes-app-container .form-container {
    background: rgba(255, 255, 255, 0.85);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s;
  }
  
  .sandra-codes-app-container.open-menu .info-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    visibility: visible;
    opacity: 1;
  }
  
  .sandra-codes-app-container.open-contact .info-container {
    visibility: hidden;
  }
  
  .sandra-codes-app-container.open-menu .form-container {
    visibility: hidden;
  }
  
  .sandra-codes-app-container.open-menu.open-contact .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    visibility: visible;
    opacity: 1;
  }
  
  .sandra-codes-app-container .form-container {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    width: 300px;
  }
  
  .sandra-codes-app-container .form-container label {
    align-items: flex-start;
  }
  
  .sandra-codes-app-container .form-container .buttons-container {
    display: flex;
    justify-content: space-between;
  }
  
  .sandra-codes-app-container .form-container .my-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .sandra-codes-app-container .form-container .my-user-message {
    display: none;
  }
  
  .sandra-codes-app-container .form-container .my-user-message.error {
    display: block;
    color: red;
  }
  
  .sandra-codes-app-container .form-container .my-user-message.info {
    display: block;
    color: blue;
  }
  
  .sandra-codes-app-container .form-container .btn-my-form-submit {
    visibility: hidden;
  }
  
  .sandra-codes-app-container .form-container .btn-my-form-submit.visible {
    visibility: visible;
  }
  
</style>`;

  document.head.insertAdjacentHTML("beforeend", style);
})();

(function () {
  let html = `<div class="sandra-codes-app-container">
  <div class="bubble" onclick="onToggleMenu()"><span>Click Me</span></div>
  <div class="main-screen" onclick="onToggleMenu()"></div>
  <section class="info-container" id="info-container">
    <button onclick="onToggleMenu()">Close</button>
    <button onclick="onUpdateInfo()">Refresh</button>
    <h3>Info</h3>
    <div class="description"></div>
    <p id="images-count"></p>
    <p id="fixed-position-count"></p>
    <button onclick="onOpenContactMenu()">Contact Us</button>
  </section>
  <section class="form-container">
    <div class="buttons-container">
      <button onclick="onOpenContactMenu()">Close</button>
      <button onclick="onRetriveUserInput()">Refresh</button>
    </div>

    <h3>Contact Us</h3>
    <p class="my-user-message"></p>
    <div class="my-form">
      <label for="my-email">Email </label>
      <div class="my-form-box">
        <input type="text" id="my-email" name="email" required onchange="onValidate(this)" autocomplete="false" />
      </div>
      <label for="my-name">Name </label>
      <div class="my-form-box">
        <input type="text" id="my-name" name="name" required onchange="onValidate(this)" autocomplete="false" />
      </div>
      <label for="my-message">Message </label>
      <div class="my-form-box">
        <textarea type="text" id="my-message" name="message" required></textarea>
      </div>
      <button class="btn-my-form-submit" onclick="onSubmitForm()">Submit</button>
    </div>
  </section>
</div>`;

  document.body.insertAdjacentHTML("afterbegin", html);
})();
