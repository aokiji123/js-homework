document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let message = document.getElementById('message').value;
    let currentDateTime = new Date();
    let formattedTime = currentDateTime.toLocaleTimeString('uk-UA', { hour12: false });
    let formattedDate = currentDateTime.toLocaleDateString('uk-UA');

    let li = document.createElement('li');
    li.innerHTML = `<strong>${username}: ${message}</strong> <br> <em>${formattedTime} - ${formattedDate}</em>`;
    document.getElementById('messageList').appendChild(li);

    document.getElementById('username').value = '';
    document.getElementById('message').value = '';
});
