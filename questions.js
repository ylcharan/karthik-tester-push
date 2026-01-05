const EmitterEvents = require("events");
const event = EmitterEvents();

event.on("submit", () => {
  console.log("Form got submitted.");
});

event.emit("submit");
