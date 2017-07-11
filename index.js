"use strict";
const hapi = require("hapi");
const Joi = require("joi");

const {check} = require("./servercheck");

const server = new hapi.Server();
server.connection({
    host: "localhost",
    port: 8001
});

server.route({
    method: "POST",
    path: "/check",
    handler: function(request, reply){
        process.stdout.write("[Server] " + request.payload.address); //does not put a newline like console.log
        check(request.payload.address)
            .then(function(response){
                process.stdout.write((" : " + (response.alive? "Online" : "Offline") + "\n"));
                reply(response.alive);
            });
    }
});

server.start(err =>{
    if(err) throw err;

    console.log("Server running at: ", server.info.uri);
});