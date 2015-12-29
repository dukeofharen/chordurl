$(document).ready(function(){
  $('#shorten_form').submit(function(){
    var url = $('#url').val();
    var customString = $('#custom_string').val();
    if(!url){
      return;
    }
    var apiURL = "shorten/";
    if(customString){
      apiURL += customString+"/";
    }
    apiURL += encodeURIComponent(url);
    $.ajax(apiURL)
          .done(function(shortenedURL) {
            toastr.success(resources.url_is_shortened);

            $('.shortened_url a:nth-child(1)').attr("href", url);
            $('.shortened_url a:nth-child(1)').text(url);

            $('.shortened_url a:nth-child(2)').attr("href", shortenedURL);
            $('.shortened_url a:nth-child(2)').text(shortenedURL);

            $('.shortened_url').slideDown();
          })
          .fail(function(err) {
            if(err){
              if(err.status == 409){
                toastr.error(resources.url_with_custom_string_already_exists);
              }
              else if(err.status == 400){
                toastr.error(resources.url_invalid);
              }
            }
            else{
              toastr.error(resources.url_couldnt_be_shortened);
            }
          });
    return false;
  });
});
