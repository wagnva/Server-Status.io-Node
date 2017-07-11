const Ping = require("ping");

/**
 * Checks the status of a server by pinging it
 */
function check(address){
    return new Promise(function(resolve, reject){
        process.stdout.write(" (" + address + ")");
        ping(address).then(function(state){
            resolve(state);
        });
    });
}

function ping(address){
    return Ping.promise.probe(address);
}

module.exports = {
    check
};