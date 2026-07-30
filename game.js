const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    backgroundColor: "#4a8f4a",

    scene: {
        create,
        update
    }
};

const game = new Phaser.Game(config);

function create() {

    this.add.text(
        220,
        280,
        "Eldoria Pixel MMORPG",
        {
            fontSize: "32px",
            color: "#ffffff"
        }
    );

}

function update() {

}
