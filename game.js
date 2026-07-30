const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

backgroundColor: "#000000",

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    scene: {
        create,
        update
    }
};


const game = new Phaser.Game(config);


let player;
let keys;
let obstacles;
let monster;
let monsterHP = 100;


function create() {
obstacles = this.physics.add.staticGroup();
    
    // Dunia rumput
    let grass = this.add.rectangle(
        400,
        300,
        800,
        600,
        0x808080
    );

    grass.setDepth(0);


// Pohon collision
let trunk = obstacles.create(
    600,
    330,
    20,
    60
);

trunk.setVisible(false);

// Batang pohon terlihat
let trunkVisual = this.add.rectangle(
    600,
    330,
    20,
    60,
    0x8B4513
);

trunkVisual.setDepth(1);
    
    let leaves = this.add.rectangle(
        600,
        280,
        80,
        80,
        0x228B22
    );

    leaves.setDepth(1);


    // Batu collision
let rockCollider = obstacles.create(
    600,
    430,
    50,
    40
);

rockCollider.setVisible(false);


// Batu visual
let rock = this.add.rectangle(
    600,
    430,
    50,
    40,
    0x555555
);

rock.setDepth(1);


    // Rumah collision
let houseCollider = obstacles.create(
    200,
    200,
    120,
    100
);

houseCollider.setVisible(false);


// Rumah visual
let house = this.add.rectangle(
    200,
    200,
    120,
    100,
    0xaa4444
);

house.setDepth(1);

// Monster test
monster = this.add.rectangle(
    650,
    200,
    40,
    40,
    0xff0000
);

monster.setDepth(1);
    
    // Player
    player = this.add.rectangle(
        400,
        300,
        32,
        32,
        0x3498db
    );

    player.setDepth(2);


    this.physics.add.existing(player);
    this.physics.add.collider(
    player,
    obstacles
);


    // Batas dunia
    this.physics.world.setBounds(0,0,800,600);


    // Batas kamera
    this.cameras.main.setBounds(0,0,800,600);


    player.body.setCollideWorldBounds(true);


    this.cameras.main.startFollow(player);


    // Keyboard
    keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
});

}

function update() {


    player.body.setVelocity(0);


    const speed = 200;


    if (keys.A.isDown)
    {
        player.body.setVelocityX(-speed);
    }


    if (keys.D.isDown)
    {
        player.body.setVelocityX(speed);
    }


    if (keys.W.isDown)
    {
        player.body.setVelocityY(-speed);
    }


    if (keys.S.isDown)
    {
        player.body.setVelocityY(speed);
    }
if (keys.SPACE.isDown)
{
    monsterHP -= 10;

    console.log("Monster HP:", monsterHP);


    if (monsterHP <= 0)
    {
        monster.destroy();

        console.log("Monster mati!");
    }
}
}
