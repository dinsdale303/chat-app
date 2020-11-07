// Reference

const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

let userName = '';

function login(e) {
  e.preventDefault();

  if (!userNameInput.value) {
    alert('Please type the user name!');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messageSection.classList.add('show');
    socket.emit('join', userName);
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
  } else if (author === 'Chat Bot') {
    message.classList.add('message--chatbot');
  }
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);
}

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('Please type the message!');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

loginForm.addEventListener('submit', (e) => {
  login(e);
});

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});

socket.on('message', ({ author, content }) => addMessage(author, content));

socket.on('newUser', (userName) => {
  addMessage('Chat Bot', `${userName} has joined the conversation!`);
});

socket.on('removedUser', ({ name }) => {
  addMessage('Chat Bot', `${name} has left the conversation... :(`);
});
