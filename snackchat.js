Snacks = new Mongo.Collection("snacks");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    snacks: function () {
      return Snack.find({}, {sort: {score: -1, created_at: 1}});
    }
  });

  Template.hello.events({
    'submit .new-snack': function () {
      // // increment the counter when button is clicked
      // Session.set("counter", Session.get("counter") + 1);

      var text = event.target.text.value;
      var image_url = event.target.image_url.value;

      // Insert snacks into database
      Snacks.insert({
        text: text,
        image: image_url,
        score: 0,
        created_at: new Date()
      });

      // Clear form
      event.target.text.value = "";
      event.target.image_url.value = "";

      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
