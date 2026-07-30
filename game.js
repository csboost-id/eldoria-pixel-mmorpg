const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    backgroundColor: "#222222",

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


function create() {

    // Dunia rumput
    this.add.rectangle(
        400,
        300,
        800,
        600,
        0x5aa05a
    );


    // Player
player = this.add.rectangle(
    400,
    300,
    32,
    32,
    0x3498db
);


this.physics.add.existing(player);


// Batas dunia
this.physics.world.setBounds(0,0,800,600);


// Player tidak bisa keluar
player.body.setCollideWorldBounds(true);


// Kamera mengikuti player
this.cameras.main.startFollow(player);

// Keyboard
keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
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

}
