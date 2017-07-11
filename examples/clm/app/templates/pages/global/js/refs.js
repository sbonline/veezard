if (window.cur_refs && window.cur_refs.length){
  jQuery(function($){
    $('.refs-btn').click(function(e){
      e.preventDefault();
      if (window.references){
        return append_references();
      }
      $.ajax({
        url: 'global/refs.json',
        success: function(res){
          window.references = res;
          append_references();
        }
      });
    });
    function append_references(){
      var ol = $('<ol>');
      cur_refs.forEach(function(r){
        ol.append('<li value="'+(r+1)+'">'+window.references[r]+'</li>');
      });
      $('#references_container').addClass('references-active').children('.references-content').append(ol);
    }

    $('.references-close-btn,#references_mask').click(function(e){
      $('#references_container').removeClass('references-active').children('.references-content').empty();
    });

    $('.references-content').click(function(e){
      e.stopPropagation();
    })

  });
}
