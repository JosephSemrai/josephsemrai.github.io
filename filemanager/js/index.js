var t, togg = true;

$(".loading").on({

  "click": function(e) {

    clearTimeout(t);

    togg = !togg;
    $(this)
      .trigger("reset");
console.log("test")
  },

  "saved": function(e) {

    $(this)
      .addClass("ok")
      .removeClass("danger")
      .text("Done!");

  },



  "reset": function(e) {

    $(this)
      .removeClass("ok danger")
      .text("Save?");

    t = setTimeout( function() {

      if(!togg) {

        $(".loading")
          .trigger("saved");

      } else {

        $(".loading")
          .trigger("error");

      }

    }, 100);

  }

}).trigger("reset");
