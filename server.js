var http = require('http');
var express = require('express');
var Twit = require('twit');
var mongoose = require('mongoose');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var i=0;
var kullanicilar=[];
var nicknames = {};
var namesUsed = [];
var odalar=[];

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/oyun', function(err){
	if(err) {
		console.log("Baglanti hatasi..");
	} else {
		console.log('MongoDB ye baglandi..');
	}
});

var schema = mongoose.Schema({
	KullaniciAdi: String,
	Skor: String,
	tarih: {type: Date, default: Date.now}
});
var DB = mongoose.model('Skorlar', schema);

var T = new Twit({
  consumer_key:         'zkVTYP5ZCBN0eJQd3ENOG0Iey',
  consumer_secret:      '2SyFuwY3TNy2CPzpz4wRypZx98GRvCg3NIT9muuIVLZkGJunhm',
  access_token:         '859442163423350785-GucQxo0jkwNAhTDYlFnjLLfSjTfngX4',
  access_token_secret:  'xnmE2umT3Fc0t6Ix3nkyJaUwRqMvc6X8JriRcpoXQMcyg',
  timeout_ms:           60*1000,
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});
app.route('/skorlar')
    .get(SkorlariGetir);


app.route('/skorlar/:taskId').get(SkorlariGetir);
var Skorlar=mongoose.model('Skorlar');
function SkorlariGetir(req,res){
    Skorlar.find({}, function(err, skor) {
    if (err)
      res.send(err);
    res.json(skor);
  });
}
var player_id;
var oyuncu;
io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){

  });
  socket.on('mesaj',function(data){
      io.to(data.oda_isim).emit('mesaj',data);
  });
  socket.on('OdayaGiris',function(data){
      console.log(data);
      socket.join(data);
  });
  socket.on('OyunaGiris',function(oda_isim,data){
      var oda= io.nsps['/'].adapter.rooms[oda_isim];
      console.log(oda);
      if(oda.length==2){
          io.to(oda_isim).emit('OyunaBasla');
      }
  });
  socket.on('OyunuBitir',function(data){

      io.to(data).emit('OyunuBitti');
  });
  socket.on('twitter_giris',function(data){
      T.post('statuses/update', { status: data.GonderKullaniciAdi + ' bir skor yapti : ' + data.Skor }, function(err, data, response) {});
      var kayit = new DB({KullaniciAdi: data.GonderKullaniciAdi, Skor: data.Skor});
      kayit.save(function(err){});
  });
}); 
