$(document).ready(function(){
  var parts = location.href.split("/");
  var url_id = parts[parts.length-1];
  $('#stat_table').DataTable( {
    "ajax": "/admin/urls/"+url_id+"/stats/dataTables",
    "columns": [
      { "data": "id" },
      { "data": "url",
        "render": function(data){
          return '<a href="'+data+'" target="_blank">'+data+'</a>';
        }
      },
      { "data": "clickdate",
        "render": function (data) {
            return formatDate(data);
        }
      },
      { "data": "ip" },
      { "data": "referer",
        "render": function(data){
          return '<a href="'+data+'" target="_blank">'+data+'</a>';
        }
      },
      { "data": "user_agent_string" }
    ]
  });
});
