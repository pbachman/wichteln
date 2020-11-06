"use strict";
/**
 * Represents the Server Logic (made with NodeJS/Express)
 *
 * @author Philipp Bachmann
 */
const server = function () {
  /**
   * Initialize the packages we need
   */
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const router = require("./server.route");
  const helmet = require("helmet");
  const compression = require("compression");

  /** Use Body Parser */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /** Cross origin configuration */
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      res.header("Access-Control-Allow-Origin", process.env.CORSALLOWORIGIN);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });

  const port = process.env.PORT || 61016;

  /** Register routes */
  app.use("/api", router);

  /** compress all responses */
  app.use(compression());

  /** static files */
  app.use(express.static("dist"));

  /** Use Helmet to secure REST API */
  app.use(helmet());

  return {
    start: () => {
      console.log(`Listen to http://localhost: ${port}`);
      return app.listen(port);
    },
  };
};

/**
 * Returns a server object (with autostart).
 */

module.exports = server().start();
