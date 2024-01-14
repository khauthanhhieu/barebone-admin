const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({
    dev,
    conf: {
        experimental: {
            serverComponentsExternalPackages: ['sequelize'],
        },
    },
});

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        var allowlist = [
            "http://localhost:3000",
            "http://admin.localhost"
        ];

        var corsOptionsDelegate = function (req, callback) {
            var corsOptions;
            if (allowlist.indexOf(req.header("Origin")) !== -1) {
                corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = { origin: false }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };

        server.get("*", cors(corsOptionsDelegate), (req, res) => {
            console.log(req, res);
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log("> Ready on http://localhost:" + port);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
