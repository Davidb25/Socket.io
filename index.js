//const { Socket } = require("dgram");

// on instancie (inclut) express
var app = require("express")();

//on crée le serveur http
var http = require("http").createServer(app);

// on instancie socket.io
var io = require("socket.io")(http);

// on crée la route / pour le définir / en fin de http://127.0.0.1:3000/ avec une fonction Callback (fonction fléchée) => {}
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// on crée l'événement "connectionn" de socket.io
io.on("connection", (socket) => {
    console.log("La connexion est activée");   

    // on crée les déconnections
    socket.on("disconnect", () => {
        console.log("UN utilisateur s'est déconnecté");
    });

    //on gère le chat
    socket.on("envoi_message", (msg) => {
        // on relaie le message vers tous les utilisateurs connectés
        io.emit("recoit_message", msg);
    });


});

// on va demander au serveur http de répondre sur le port 3000 avec une fonction Callback (fonction fléchée) => {}
http.listen(3000,  () => {
    console.log("le serveur est connecté le port 3000");
});