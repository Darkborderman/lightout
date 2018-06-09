
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

let Tiles={};

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('tileset');

    Tiles.light=map.getTile(1, 0,'tileLayer');
    Tiles.dark=map.getTile(0,0,'tileLayer');

    currentTile=Tiles.dark;

    layer = map.createLayer('layer1');

    layer.resizeWorld();

    marker = game.add.graphics();
    marker.lineStyle(2, 0x888888, 1);
    marker.drawRect(0, 0, 8, 8);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

}

function render() {}

function detect(map)
{
    let counter=0;
    map.forEach(function(tile){
        if(tile.index==3) counter++;
    })
    if(counter==0) console.log('you win');
}

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

            for(let i=0;i<=2;i++)
            {
                for(let j=0;j<=2;j++)
                {
                    if(aroundtiles[i*3+j].index==3)
                        map.putTile(Tiles.light,layer.getTileX(marker.x-8+j*8),layer.getTileY(marker.y-8+i*8));
                    else if(aroundtiles[i*3+j].index==4)
                        map.putTile(Tiles.dark,layer.getTileX(marker.x-8+j*8),layer.getTileY(marker.y-8+i*8));

                }
            }
            detect(map);
        }
    });

});
