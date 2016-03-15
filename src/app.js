var Spawn = [320,480,650];
var p = 0;
var HelloWorldLayer = cc.Layer.extend({
    c_drops: [],
    b_drops:[],
    sprFondo:null,
    sprConejo:null,
    points:null,
    moves: function(location,event){
        var game = event.getCurrentTarget();
        var ubic = location.getLocation();
        cc.log("x: "+ubic.x+" y: "+ubic.y);
        if(ubic.y<=170){
            if(ubic.x>=236 && ubic.x<=380){
                game.sprConejo.setPosition(320,96);
            }
            if(ubic.x>=380 && ubic.x<=560){
                game.sprConejo.setPosition(480,96);
            }
            if(ubic.x>=560 && ubic.x<=719){
                //game.addChild(game.sprConejo,1);
                game.sprConejo.setPosition(650,96);
                //game.sprConejo.setGlobalZOrder(1);
            }
        }
    },
    drop: function(){
        var bombs = new cc.Sprite(res.bomba_png);
        var carrots = new cc.Sprite(res.carrot_png);
        var floor = new cc.rect(0,0,720,150);
        var bomb_x = Spawn[Math.floor(Math.random()*3 +0)];
        var carr_x = Spawn[Math.floor(Math.random()*3 +0)];
        bombs.setPosition(bomb_x,630);
        carrots.setPosition(carr_x,630);
        this.addChild(bombs,1);
        this.addChild(carrots,1);
        var carr_fall = cc.moveTo(Math.floor(Math.random()*5 +1),carr_x,0);
        var bomb_fall = cc.moveTo(Math.floor(Math.random()*5 +1),bomb_x,0);
        bombs.runAction(bomb_fall);
        carrots.runAction(carr_fall);
        this.b_drops.push(bombs);
        this.c_drops.push(carrots);
        var bunny = this.sprConejo.getBoundingBox();
        //cc.log("here!");
        for(var bombs of this.b_drops){
            var b_box = bombs.getBoundingBox();
            if(cc.rectIntersectsRect(floor,b_box)){
                bombs.setVisible(false);
                bombs.setPosition(917,409);
            }
            if(cc.rectIntersectsRect(bunny,b_box)){
                confirm("GAME OVER");
                p = 0;
                this.removeChild(this.points,true);
                this.points = new cc.LabelTTF("Points: "+p,"Arial",16);
                this.points.x = 760;
                this.points.y = 630;
                this.addChild(this.points,5);
            }
        }
        for(var bombs of this.b_drops){
            if(bombs.isVisible=== false){
                this.b_drops.pop();
            }
        }
        for(var carrots of this.c_drops){
            var c_box = carrots.getBoundingBox();
            if(cc.rectIntersectsRect(bunny,c_box)){
                p+=10;
                this.removeChild(this.points,true);
                this.points = new cc.LabelTTF("Points: "+p,"Arial",16);
                this.points.x = 760;
                this.points.y = 630;
                this.addChild(this.points,5);
                carrots.setVisible(false);
                this.removeChild(carrots,true);
                carrots.setPosition(917,409);
            }
            if(cc.rectIntersectsRect(floor,c_box)){
                carrots.setVisible(false);
                this.removeChild(carrots,true);
                carrots.setPosition(917,409);
            }
        }

        
    },
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.points = new cc.LabelTTF("Points: "+p,"Arial",16);
        this.points.x = 760;
        this.points.y = 630;
        cc.log(size.width / 2+" "+size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        this.addChild(this.points,5);
        this.schedule(this.drop,2);
        
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.moves
        },this);



        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

