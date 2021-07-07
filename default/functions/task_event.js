const got = require("got");

exports.handler = function (context, event, callback) {
  let response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  console.log(event);
  console.log(context);

  got
    .post(context.SERVICE_NOW_API_ROOT + "status_v2", {
      body: event,
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
