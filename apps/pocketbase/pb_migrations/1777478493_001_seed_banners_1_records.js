/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("banners");

  const record0 = new Record(collection);
    record0.set("name", "ONAK - Revolutionary Natural Solid Toothpaste");
    record0.set("htmlCode", "<!-- START ADVERTISER: ONAK - Revolutionary Natural Solid Toothpaste from awin.com -->\n<a rel=\"sponsored\" href=\"https://www.awin1.com/cread.php?s=3712155&v=102225&q=497654&r=1526061\">\n    <img src=\"https://www.awin1.com/cshow.php?s=3712155&v=102225&q=497654&r=1526061\" border=\"0\">\n</a>\n<!-- END ADVERTISER: ONAK - Revolutionary Natural Solid Toothpaste from awin.com -->");
    record0.set("language", "es");
    record0.set("isActive", true);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})