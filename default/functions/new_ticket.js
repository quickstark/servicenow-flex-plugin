// Name: Net Tcket
// Path: /new_ticket
// Check for valid Twilio signature = CHECKED

const got = require("got");

exports.handler = function (context, event, callback) {
  let response = new Twilio.Response();

  console.log(`ticketCategory: ${event.ticketCategory}`);
  console.log(`ticketShortDesc: ${event.ticketShortDesc}`);
  console.log(`mediaURL: ${event.mediaURL}`);

  if (event.mediaURL) {
    media = event.mediaURL;
  } else {
    media = `No media attached`;
  }

  let from = `Bud Richman`;

  let category = ``;

  typeofCat = typeof event.ticketCategory;
  console.log(`Type of ticketCategory: ${typeofCat}`);

  switch (event.ticketCategory) {
    case `1`:
      category = "Hardware";
      break;
    case `2`:
      category = "Software";
      break;
    case `3`:
      category = "Password Reset";
      break;
    case `4`:
      category = "Other";
      break;
    default:
      category = "Hardware";
      break;
  }

  console.log(`ticketCategoryText: ${category}`);

  got
    .post(context.SERVICE_NOW_API_ROOT + "new_ticket", {
      body: {
        ticketCategory: category,
        ticketShortDesc: event.ticketShortDesc,
        ticketFrom: from,
        mediaURL: media,
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
