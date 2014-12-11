Snacks = new Mongo.Collection("snacks");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    snacks: function () {
      return Snacks.find({}, {sort: {score: -1, created_at: 1}});
    }
  });

  Template.hello.events({
    'submit .new-snack': function() {
      var text = event.target.text.value;
      var image = event.target.image_url.value;

      // Insert snacks to database
      Snacks.insert({
        text: text,
        image: image,
        score: 0,
        created_at: new Date()
      });

      // Clear input
      event.target.text.value = "";

      // Prevents default for submit
      return false;
    }
  });

  Template.snack.events({
    'click .snack': function() {
      if (this.score >= 20) {
        Snacks.remove(this._id);
      } else {
        Snacks.update(this._id, {$inc: {score: 1}});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
