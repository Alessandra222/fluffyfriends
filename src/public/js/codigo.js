var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatcontainer = document.getElementById('chatContainer');

var user = { message: "" };
var respuestas = [
    { message: "Hola", response: "Hola buenos dias" },
    { message: "Tengo una duda", response: "Cuentame" },
    { message: "Para que sirve esta web", response: "Tiene la funcion de gestinar las mascotas de una veterinaria" },
];

function SendMessage(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.margin = "10px";
    messageElement.innerHTML = "<span> Yo: </span>" + "<span>" + userMessage + "</span>";
    chatcontainer.appendChild(messageElement);
};

function chatResponse(userMessage) {

    var chatbotmessage = "no te entiendo";

    if (userMessage == "hola") {
        chatbotmessage = "Hola, como estas"
    } else {
        var result = respuestas.filter(val => val.message.includes(userMessage.toLowerCase()));

        if (result > 0) {
            var response = result[0].response;
            chatbotmessage = response;
        }
    }

    var messageElement = document.createElement('div')
    messageElement.style.textAlign = "left";
    messageElement.style.margin = "10px";
    messageElement.innerHTML = "<span> PetBot: </span>" + "<span>" + chatbotmessage + "</span>";
    chatcontainer.scrollTop  = chatcontainer.scrollHeight;
    setTimeout(()=>{
        messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1},{direction: 1000}]);
        chatcontainer.appendChild(messageElement);
    }, 1000);
};

sendBtn.addEventListener('click', function (e) {
    var userMessage = textbox.value;

    if (userMessage == "") {
        textbox.placeholder = "Ingrese texto...";
    } else {
        let userMessageText = userMessage.trim();
        user.message = userMessageText;
        textbox.value = "";
        SendMessage(userMessageText);
        chatResponse(userMessageText);
    }
});