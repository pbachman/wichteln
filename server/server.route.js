"use strict";
/**
 * Includes all Server Routes.
 *
 * @author Philipp Bachmann
 */
let serverRoutes = function () {
  const express = require("express");
  const fs = require("fs");
  const router = express.Router();
  const sendMailer = require("./server.mailer");

  /**
   * Creates a new User
   * @function
   * @param {req} req - Request object.
   * @param {res} res - Response object.
   */
  router.post("/account", (req, res) => {
    if (req.body.email !== undefined) {
      let rawdata = fs.readFileSync("draw.json");
      let data = JSON.parse(rawdata);

      const found = data.find(function (element) {
        return element.name === req.body.email.email.toLowerCase();
      });

      if (found) {
        sendMailer.sendMail(
          found.name,
          process.env.SUBJECT,
          `<b>Ho-Ho-Ho ${found.name}!</b> Du hast ${found.draw} gezogen.`
        );
        res.send(JSON.stringify('Draw successfully.'));
      } else {
        res
          .status(400)
          .send("Es konnte niemand mit dieser E-mail Adresse gefunden werden!");
      }
    } else {
      res.status(400).send("Required fields missing!");
    }
  });

  return router;
};

/**
 * Returns a server oAuth object.
 */
module.exports = serverRoutes();
