'use strict';
{
  const loginForm = document.getElementById('welcome-form');
  const messageSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');
  let userName = '';

  function login(e) {
    e.preventDefault();

    if (userNameInput.value == '' || userNameInput.value == undefined) {
      alert('Please type the user name!');
    } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messageSection.classList.add('show');
    }
  }

  function sendMessage(e) {
    e.preventDefault();

    if (
      messageContentInput.value == '' ||
      messageContentInput.value == undefined
    ) {
      alert('Please type the message!');
    } else {
      addMessage(userName, messageContentInput.value);
    }
  }

  function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

  loginForm.addEventListener('submit', (e) => {
    login(e);
  });

  addMessageForm.addEventListener('submit', (e) => {
    sendMessage(e);
  });
}
