var express = require('express');
var app = express();

app.route('/').get(function(req, res, next){
  res.send('<h1>Hello world!</h1>');
})
app.listen(3000, function(){
  console.log('It\'s working!');
});
