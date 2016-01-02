var table;

$(document).ready(function(){
  table = $('#url_table').DataTable( {
    "ajax": "/admin/urls/dataTables",
    "columns": [
      { "data": "id" },
      { "data": "url",
        "render": function(data){
          return '<a href="'+data+'" target="_blank">'+data+'</a>';
        }
      },
      { "data": "segment" },
      { "data": "datetime_added",
        "render": function (data) {
            return formatDate(data);
        }
      },
      { "data": "ip" },
      { "data": "num_of_clicks",
        "render": function(data, type, url){
          return '<a href="admin/stats/'+url.id+'">'+data+'</a>';
        }
      },
      { "render": function(data, type, url){
        return '<a href="#" onClick="deleteURL('+url.id+');return false;">Delete</a>'
      }
    }
    ]
  });
});

function deleteURL(id){
  if(confirm(resources.are_you_sure)){
    $.ajax({
      url: '/admin/urls/'+id,
      type: 'DELETE'
    })
    .done(function() {
      toastr.success(resources.url_deleted);
      table.ajax.reload();
    })
    .fail(function(err) {
      toastr.error(resources.something_went_wrong);
    });
  }
}
