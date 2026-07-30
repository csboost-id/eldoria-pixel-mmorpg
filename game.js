const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#4a8f4a",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let keys;

function preload() {
}

function create() {


    // Membuat dunia rumput
    this.add.rectangle(
    400,
    300,
    800,
    600,
    0x5aa05a
);

    grass.setDepth(0);


    player = this.add.rectangle(400, 300, 32, 32, 0x3498db);

    player.setDepth(1);

    this.physics.add.existing(player);


    // Ukuran dunia
this.physics.world.setBounds(0, 0, 800, 600);

player.body.setCollideWorldBounds(true);


// Kamera mengikuti player
// Kamera dimatikan dulu untuk test
// this.cameras.main.startFollow(player);
// this.cameras.main.setBounds(0, 0, 800, 600);
// this.cameras.main.setZoom(1);

    cursors = this.input.keyboard.createCursorKeys();

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

    if (keys.A.isDown || cursors.left.isDown)
        player.body.setVelocityX(-speed);

    if (keys.D.isDown || cursors.right.isDown)
        player.body.setVelocityX(speed);

    if (keys.W.isDown || cursors.up.isDown)
        player.body.setVelocityY(-speed);

    if (keys.S.isDown || cursors.down.isDown)
        player.body.setVelocityY(speed);

}
