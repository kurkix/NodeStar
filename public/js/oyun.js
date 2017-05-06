function oyunbasla(){
    var game = new Phaser.Game(1360,600,Phaser.AUTO,'',{preload:preload,create:create,update:update});
var platform;
var oyuncu;
var cursors;
var stars;
var score = 0;
var score2=0;
var scoreText;
var scoreText2;
var su;
var oyuncu2;
var Tabela;
var BenimSkor=0;
var BasaDon;
function preload(){
    game.load.image('duvar','assets/platform/BG/BG.png');
    game.load.image('star','assets/star.png');
    game.load.image('YenidenOynaButonu','assets/buton.png');
    game.load.spritesheet('baddie','assets/baddie.png',32,32);
    game.load.image('tabela','assets/platform/Object/Sign_1.png');
    game.load.image('zemin','assets/platform.png');
    game.load.image('toprak','assets/platform/Tiles/5.png');
    game.load.spritesheet('dude','assets/dude.png',32,48);
    game.load.image('karli_toprak_ilk_kose','assets/platform/Tiles/2.png');
    game.load.image('karli_toprak_koseli','assets/platform/Tiles/3.png');
    game.load.image('su_alt','assets/platform/Tiles/18.png');
    game.load.image('su_ust','assets/platform/Tiles/17.png');
    game.load.image('orta_sol','assets/platform/Tiles/14.png');
    game.load.image('orta_orta','assets/platform/Tiles/15.png');
    game.load.image('orta_sag','assets/platform/Tiles/16.png');
    game.load.image('KardanAdam','assets/platform/Object/SnowMan.png');
    game.load.image('TahtaKutu','assets/platform/Object/Crate.png');
}

function create(){
    game.add.sprite(0,0,'duvar');
    //game.add.sprite(0,250,'duvar');
    oyuncu = game.add.sprite(0,game.world.height-500,'dude');
    oyuncu2 = game.add.sprite(game.world.width-200,game.world.height-500,'baddie');
    oyuncu.scale.setTo(1.5,1.5);
    oyuncu2.scale.setTo(1.5,1.5);
    platform=game.add.group();
    platform.enableBody=true;
    su=game.add.group();
    su.enableBody=true;
    BasaDon=game.add.button(700, 400, 'button', actionOnClick, this, 2, 1, 0);
    BasaDon.visible=false;
    Tabela=game.add.sprite(500,100,'tabela');
    Tabela.scale.setTo(5,5);
    Tabela.visible=false;
    var karli_toprak= platform.create(0,game.world.height-150,'karli_toprak_ilk_kose');
    karli_toprak.body.immovable=true;
    karli_toprak.scale.setTo(4.3,1);
    var karli_toprak2= platform.create(550,game.world.height-100,'karli_toprak_ilk_kose');
    karli_toprak2.body.immovable=true;
    karli_toprak2.scale.setTo(1,0.6);

    var karli_toprak3= platform.create(1105,game.world.height-100,'karli_toprak_ilk_kose');
    karli_toprak3.body.immovable=true;
    karli_toprak3.scale.setTo(2,0.6);

    var su_alt= su.create(678,game.world.height-50,'su_alt');
    //su_alt.body.immovable=true;
    su_alt.scale.setTo(3.4,0.6);

    var su_ust= su.create(678,game.world.height-100,'su_ust');
    //su_ust.body.immovable=true;
    su_ust.scale.setTo(1.7,0.6);

    var su_ust2= su.create(890,game.world.height-100,'su_ust');
    //su_ust2.body.immovable=true;
    su_ust2.scale.setTo(1.67,0.6);

    var zemin=platform.create(0,game.world.height-50,'toprak');
    zemin.scale.setTo(4.3,1);
    zemin.body.immovable=true;
    var zemin2=platform.create(550,game.world.height-50,'toprak');
    zemin2.scale.setTo(1,0.6);
    zemin2.body.immovable=true;
    var zemin2=platform.create(game.world.width,game.world.height-50,'toprak');
    zemin2.scale.setTo(-2,0.6);
    zemin2.body.immovable=true;


    var orta_sol=platform.create(750,350,'orta_sol');
    orta_sol.scale.setTo(0.5,0.6);
    orta_sol.body.immovable=true;

    var orta_orta=platform.create(814,350,'orta_orta');
    orta_orta.scale.setTo(0.5,0.6);
    orta_orta.body.immovable=true;
    
    var orta_sag=platform.create(878,350,'orta_sag');
    orta_sag.scale.setTo(0.5,0.6);
    orta_sag.body.immovable=true;



    var orta_sol2=platform.create(400,200,'orta_sol');
    orta_sol2.scale.setTo(0.5,0.6);
    orta_sol2.body.immovable=true;

    var orta_orta2=platform.create(464,200,'orta_orta');
    orta_orta2.scale.setTo(0.5,0.6);
    orta_orta2.body.immovable=true;
    
    var orta_sag2=platform.create(528,200,'orta_sag');
    orta_sag2.scale.setTo(0.5,0.6);
    orta_sag2.body.immovable=true;

    var KardanAdam=platform.create(400,100,'KardanAdam');
    KardanAdam.scale.setTo(0.5,0.5);
    KardanAdam.body.immovable=true;

    var TahtaKutu=platform.create(1100,400,'TahtaKutu');
    TahtaKutu.body.immovable=true;

    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
    
    scoreText = game.add.text(100, 16, 'score: 0', { fontSize: '32px', fill: 'White' });
    scoreText2 = game.add.text(game.world.width-300, 16, 'score2: 0', { fontSize: '32px', fill: 'white' });
    scoreText3 = game.add.text(600, 250, 'score: 0', { fontSize: '32px', fill: 'white' });
    scoreText4 = game.add.text(600, 300, 'score2: 0', { fontSize: '32px', fill: 'white' });
    scoreText3.visible=false;
    scoreText4.visible=false;
    game.physics.arcade.enable(oyuncu);
    game.physics.arcade.enable(oyuncu2);
    oyuncu.body.bounce.y=0.2;
    oyuncu.body.gravity.y=300;
    oyuncu.body.collideWorldBounds=true;
    oyuncu2.body.bounce.y=0.2;
    oyuncu2.body.gravity.y=300;
    oyuncu2.body.collideWorldBounds=true;
    oyuncu.animations.add('left', [0, 1, 2, 3], 10, true);
    oyuncu.animations.add('right', [5, 6, 7, 8], 10, true);
    oyuncu2.animations.add('left', [0, 1, 2, 3], 10, true);
    oyuncu2.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    

    for (var i = 0; i < 40; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 30, 0, 'star');
            //  Let gravity do its thing
            star.body.gravity.y = 300;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
}

function update(){
    game.physics.arcade.collide(oyuncu,platform);
    game.physics.arcade.collide(oyuncu2,platform);
     game.physics.arcade.collide(stars, platform);
     game.physics.arcade.overlap(oyuncu, stars, collectStar, null, this);
     game.physics.arcade.overlap(oyuncu2, stars, collectStarOyuncu2, null, this);
    //oyuncu.body.velocity.x=0;
    //oyuncu2.body.velocity.x=0;
      
    if (cursors.left.isDown)
    {
        //  Move to the left
        //oyuncu.body.velocity.x = -150;

        //oyuncu.animations.play('left');
        socket.emit('mesaj',{msg:'sol', OyuncuSayisi:OyuncuSayisi,oda_isim:oda_ismi});
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        //oyuncu.body.velocity.x = 150;

        //oyuncu.animations.play('right');
        socket.emit('mesaj',{msg:'sag', OyuncuSayisi:OyuncuSayisi,oda_isim:oda_ismi});
    }
    else
    {
        //  Stand still
        //oyuncu.animations.stop();

        //oyuncu.frame = 4;
        
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)
    {
        //oyuncu.body.velocity.y = -350;
        socket.emit('mesaj',{msg:'yukari', OyuncuSayisi:OyuncuSayisi,oda_isim:oda_ismi});
    }
    if(score + score2 == 300){
        if(OyuncuSayisi=="1"){
            BenimSkor=score;
        }else{
            BenimSkor=score2;
        }
        socket.emit('OyunuBitir',oda_ismi);
        game.paused=true;
    }

    socket.on('OyunuBitti',function(){
                console.log('oyun duruyor.');
                Tabela.visible=true;
                scoreText3.visible=true;
                scoreText4.visible=true;
                BasaDon.visible=true;
                socket.emit('twitter_giris',{ Skor:BenimSkor, GonderKullaniciAdi:aKullaniciAdi});
            });
}

function collectStar (oyuncu, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Oyuncu 1: ' + score;
    scoreText3.text = 'Oyuncu 1: ' + score;
}

function collectStarOyuncu2 (oyuncu, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score2 += 10;
    scoreText2.text = 'Oyuncu 2: ' + score2;
    scoreText4.text = 'Oyuncu 2: ' + score2;

}
socket.on('mesaj',function(data){
    //oyuncu2.body.velocity.x=x;
    //oyuncu2.body.velocity.y=y;
    if(data.OyuncuSayisi=="1"){
        oyuncu.body.velocity.x=0;
        if (data.msg=='sol')
    {
        //  Move to the left
        oyuncu.body.velocity.x = -150;

        oyuncu.animations.play('left');
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
    else if (data.msg=='sag')
    {
        //  Move to the right
        oyuncu.body.velocity.x = 150;

        oyuncu.animations.play('right');
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
    else
    {
        //  Stand still
        oyuncu.animations.stop();

        oyuncu.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (data.msg=='yukari')
    {
        oyuncu.body.velocity.y = -350;
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
}else if(data.OyuncuSayisi=="2"){
    oyuncu2.body.velocity.x=0;
        if (data.msg=='sol')
    {
        //  Move to the left
        oyuncu2.body.velocity.x = -150;

        oyuncu2.animations.play('left');
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
    else if (data.msg=='sag')
    {
        //  Move to the right
        oyuncu2.body.velocity.x = 150;

        oyuncu2.animations.play('right');
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
    else
    {
        //  Stand still
        oyuncu2.animations.stop();

        oyuncu2.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (data.msg=='yukari')
    {
        oyuncu2.body.velocity.y = -350;
        //socket.emit('mesaj',oyuncu.body.velocity.x,oyuncu.body.velocity.y);
    }
    }
});
}

function actionOnClick(){
    location.reload();
}