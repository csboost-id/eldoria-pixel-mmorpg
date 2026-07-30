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

    player = this.add.rectangle(400, 300, 32, 32, 0x3498db);

    this.physics.add.existing(player);


    // Ukuran dunia
    this.physics.world.setBounds(0, 0, 3000, 3000);

    // Player tidak bisa keluar dunia
    player.body.setCollideWorldBounds(true);


// Kamera sementara dimatikan
// this.cameras.main.setBounds(0, 0, 3000, 3000);
// this.cameras.main.startFollow(player);

// Zoom sementara dimatikan
// this.cameras.main.setZoom(2);


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
