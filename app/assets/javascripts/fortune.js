$(function() {
  $("form#new_fortune").submit(function(event) {
    event.preventDefault();
    var newFortuneContent = $('#fortune_content').val();
    var newFortune = {
      fortune: {
        content: newFortuneContent
      }
    };

    var request = $.ajax({
      method: "POST",
      data: newFortune,
      url: "/api/fortunes.json"
    });

    request.done(function() {
      var html = "<div class='callout success'>" +
          newFortuneContent +
        "</div>";

      $("div.fortunes").append(html);
      $('#fortune_content').val("");
    });
  });

  $('.edit').click(function(){
     $(this).parent().find('.update-form').toggle();
  });

  $('form.edit_fortune').submit(function(event){
    event.preventDefault();
    var fortuneId = $(this).find('#fortune_id').val();
    var newFortuneContent = $(this).find('#fortune_content').val();
    var newFortune = {
      fortune: {
        id: fortuneId,
        content: newFortuneContent
      }
    };

    var request = $.ajax({
      method: "PUT",
      data: newFortune,
      url: "/api/fortunes/" + fortuneId
    });

    request.done(function() {
      $("div#fortune-"+fortuneId).find('span').text(newFortuneContent);
      $("div#fortune-"+fortuneId).find('.update-form').toggle();
    });

  });


});


$(function() {
  $('.button_to').click(function(event) {
    event.preventDefault();

    var id = event.target.id;
    var element = event.target;

    var requestData = {
      method: "DELETE",
      url: 'api/fortunes/' + id
    };

    var request = $.ajax(requestData);

    request.done(function() {
      $(element).parent().parent().remove();
      alert("Deleted that terrible fortune.");
    });
  });
});
