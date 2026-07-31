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

let hpText;
let monsterText;

let playerHP = 100;
let monsterHP = 100;

let playerDead = false;

let playerEXP = 0;
let expText;

let playerLevel = 1;
let expNeed = 100;
let levelText;

let attackRange = 80;

let canAttack = true;
let monsterCanAttack = true;

let monsterSpeed = 80;

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

    this.physics.add.existing(monster);
monster.body.setCollideWorldBounds(true);
this.physics.add.collider(
    monster,
    obstacles
);
    
    // Player
    player = this.add.rectangle(
        400,
        300,
        32,
        32,
        0x3498db
    );

    player.setDepth(2);
hpText = this.add.text(
    20,
    20,
    "Player HP: 100",
    {
        fontSize: "24px",
        fill: "#ffffff"
    }
);

hpText.setScrollFactor(0);


monsterText = this.add.text(
    20,
    50,
    "Monster HP: 100",
    {
        fontSize: "24px",
        fill: "#ff4444"
    }
);

monsterText.setScrollFactor(0);

    expText = this.add.text(
    20,
    80,
    "EXP: 0",
    {
        fontSize: "24px",
        fill: "#ffff00"
    }
);

expText.setScrollFactor(0);

    levelText = this.add.text(
20,
110,
"Level: 1",
{
    fontSize: "24px",
    fill: "#00ff00"
}
);

levelText.setScrollFactor(0);
    
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


// Monster mengejar player
if (monster)
{
    let monsterDistance = Phaser.Math.Distance.Between(
        monster.x,
        monster.y,
        player.x,
        player.y
    );


    if (monsterDistance > attackRange)
    {
        let angle = Phaser.Math.Angle.Between(
            monster.x,
            monster.y,
            player.x,
            player.y
        );


        monster.body.setVelocity(
            Math.cos(angle) * monsterSpeed,
            Math.sin(angle) * monsterSpeed
        );
    }
    else
    {
        monster.body.setVelocity(0);
    }
}


// Player menyerang monster
if (keys.SPACE.isDown && canAttack && monster)
{
    let distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        monster.x,
        monster.y
    );


    if (distance <= attackRange)
    {
        monsterHP -= 10;

        monsterText.setText(
            "Monster HP: " + monsterHP
        );

        console.log(
            "Monster HP:",
            monsterHP
        );


        canAttack = false;


        this.time.delayedCall(500, () => {
            canAttack = true;
        });


        if (monsterHP <= 0)
{
    monster.destroy();

    monster = null;

    playerEXP += 10;


    if (playerEXP >= expNeed)
    {
        playerLevel++;

        playerEXP = 0;

        expNeed += 100;


        playerHP += 20;

        levelText.setText(
            "Level: " + playerLevel
        );


        hpText.setText(
            "Player HP: " + playerHP
        );


        console.log(
            "LEVEL UP!",
            playerLevel
        );
    }


    expText.setText(
        "EXP: " + playerEXP
    );


    monsterText.setText(
        "Monster mati!"
    );


    console.log(
        "Monster mati! EXP:",
        playerEXP
    );
}
}
    else
    {
        console.log("Terlalu jauh!");
    }
}


// Monster menyerang player
// Monster menyerang player
if (monster && monsterCanAttack && !playerDead)
{
    let monsterDistance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        monster.x,
        monster.y
    );


    if (monsterDistance <= attackRange)
    {
        playerHP -= 5;


        if (playerHP <= 0)
        {
            playerHP = 0;

            playerDead = true;

            hpText.setText(
                "Player Mati!"
            );

            console.log(
                "GAME OVER"
            );

            monster.body.setVelocity(0);
        }
        else
        {
            hpText.setText(
                "Player HP: " + playerHP
            );
        }


        console.log(
            "Player HP:",
            playerHP
        );


        monsterCanAttack = false;


        this.time.delayedCall(1000, () => {
            monsterCanAttack = true;
        });
    }
}
}
