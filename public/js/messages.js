const { response } = require("express");

const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

const getMsgs = () => {
  fetch("/api/messages", {
    method: "GET",
    success: (response) => {
      console.log(response);
      const messages = document.getElementById("messages");
      const data = JSON.parse(response);
      for (const i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = data[i].body;
        messages.appendChild(li);
      }
    },
  })
    .then((response) => response.json())
    .then((data) => {
      messages = data;
    });
};
