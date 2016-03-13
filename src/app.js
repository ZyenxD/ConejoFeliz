
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    moves: function(location,event){
        var game = event.getCurrentTarget();
        var ubic = location.getLocation();
        cc.log("x: "+ubic.x+" y: "+ubic.y);
        if(ubic.y<=170){
            if(ubic.x>=236 && ubic.x<=380){
                game.sprConejo.setPosition(300,96);
            }
            if(ubic.x>=380 && ubic.x<=560){
                game.sprConejo.setPosition(480,96);
            }
            if(ubic.x>=560 && ubic.x<=719){
                //game.addChild(game.sprConejo,1);
                game.sprConejo.setPosition(680,96);
                //game.sprConejo.setGlobalZOrder(1);
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
        cc.log(size.width / 2+" "+size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        
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

