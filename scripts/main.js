function formatDate(dateString){
  var date = new Date(dateString);
  var day = date.getDate() + "";
  var month = date.getMonth() + 1 + "";
  var hour = date.getHours() + "";
  var minute = date.getMinutes() + "";
  return date.getFullYear() + "-" + (month.length > 1 ? month : "0" + month) + "-" + (day.length > 1 ? day : "0" + day) + " " + (hour.length > 1 ? hour : "0" + hour) + ":" + (minute.length > 1 ? minute : "0" + minute);
}
