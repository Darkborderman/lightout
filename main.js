
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render });

function preload() {

    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'tileset.png');
}

var map;
var layer;

var marker;
var currentTile;
var cursors;

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('tileset');

    currentTile = map.getTile(1, 0,'tileLayer');

    layer = map.createLayer('layer1');

    layer.resizeWorld();

    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 8, 8);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (game.input.mousePointer.isDown)
    {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {
            currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
        }
        else
        {
            if (map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index != currentTile.index)
            {
                map.putTile(currentTile, layer.getTileX(marker.x), layer.getTileY(marker.y));
            }
        }
    }
}

function render() {}

document.addEventListener("DOMContentLoaded",function(){

    document.addEventListener('keypress',function(e){
        if(e.key=='s') marker.y+=8;
        else if(e.key=='d') marker.x+=8;
        else if(e.key=='w') marker.y-=8;
        else if(e.key=='a') marker.x-=8;
        else if(e.key=="p"){
            let aroundtiles=[];
            for(let i=0;i<=2;i++)
            {
                for(let j=0;j<=2;j++)
                {
                    aroundtiles[i*3+j]=map.getTile(layer.getTileX(marker.x-8+j*8),layer.getTileY(marker.y-8+i*8));
                }
            }
            console.log(aroundtiles);
            for(let i=0;i<=2;i++)
            {
                for(let j=0;j<=2;j++)
                {
                    map.putTile(currentTile,layer.getTileX(marker.x-8+j*8),layer.getTileY(marker.y-8+i*8));
                }
            }
        }
        console.log(e);
    });

});
