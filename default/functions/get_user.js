const got = require("got");

exports.handler = function (context, event, callback) {
  let response = new Twilio.Response();
  console.log(`From: ${event.From}`);

  got
    .post(context.SERVICE_NOW_API_ROOT + "find_user_phone", {
      body: { phoneNumber: event.From },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            context.SERVICE_NOW_USERNAME + ":" + context.SERVICE_NOW_PASSWORD
          ).toString("base64"),
      },
      json: true,
    })
    .then((data) => {
      console.log(data);
      response.appendHeader("Content-Type", "application/json");
      response.setBody(data.body);
      console.log(`ServiceNow Data: ${data}`);
      callback(null, response);
    })
    .catch((error) => {
      console.log(error);
      response.appendHeader("Content-Type", "application/json");
      response.setBody(JSON.stringify({ error: error.message }));
      response.setStatusCode(500);
      callback(response);
    });
};
