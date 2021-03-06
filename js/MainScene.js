import Player from "./Player.js";
import Resource from "./Resource.js";
import Enemy from "./Enemy.js";

export default class MainScene extends Phaser.Scene {
  constructor(){
    super("MainScene");
    this.enemies = [];
  }

  preload() {
    Player.preload(this);
    Enemy.preload(this);
    Resource.preload(this);
    this.load.image('tiles','assets/images/IceTileset.png');
    this.load.tilemapTiledJSON('map','assets/images/mapp.json');
  }

  create(){
    const map = this.make.tilemap({key: 'map'});
    this.map = map;
    const tileset = map.addTilesetImage('IceTileset','tiles',32,32,0,0);
    const layer1 = map.createStaticLayer('Tile Layer 1',tileset,0,0);
    const layer2 = map.createStaticLayer('Tile Layer 1',tileset,0,0);
    layer1.setCollisionByProperty({collides:true});
    this.matter.world.convertTilemapLayer(layer1);
    this.map.getObjectLayer('Resources').objects.forEach(resource =>new Resource({scene:this,resource}));
    this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({scene:this,enemy})));
    this.player = new Player({scene:this,x:200,y:220,texture:'female',frame:'townsfolk_f_idle_1'});
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    
    
  }

  update(){
    this.enemies.forEach(enemy => enemy.update());
    this.player.update();
    if (this.player.dead)
    {
      const text1 = this.add.text(100, 100, 'Game Over');
      text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
     
    }
  }
}