// Name: Add Comment
// Path: /add_comment
// Check for valid Twilio signature = CHECKED

const got = require("got");

exports.handler = function (context, event, callback) {
  let response = new Twilio.Response();

  got
    .post(context.SERVICE_NOW_API_ROOT + "update_ticket", {
      body: {
        ticketNumber: event.ticketNumber,
        comment: event.comment,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            context.SERVICE_NOW_USERNAME + ":" + context.SERVICE_NOW_PASSWORD
          ).toString("base64"),
      },
      json: true,
    })
    .then(function (data) {
      response.appendHeader("Content-Type", "application/json");
      response.setBody(data.body);
      callback(null, response);
    })
    .catch(function (error) {
      response.appendHeader("Content-Type", "plain/text");
      response.setBody(error.message);
      response.setStatusCode(500);
      callback(response);
    });
};
