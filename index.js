import { AllocatorCharacterArray, Character, CharacterAllocator, CharacterMeta } from "./character";
import { dino_layout, stone_layout, themes, cloud_layout, pit_layout, bird_layout, cactus_layout, retry_layout, star_layout } from "./layouts";
import { applyVelocityToPosition, isCollided, Position, Velocity } from "./physics";

const canvas = document.getElementById("board");
const canvas_ctx = canvas.getContext('2d');


const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "name",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "dataType",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct Attribute[]",
                "name": "_attributes",
                "type": "tuple[]"
            },
            {
                "internalType": "string",
                "name": "_imagesBaseURI",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_strings",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_defaultValues",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "attrMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "attributeList",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "dataType",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "defaultValues",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "imagesBaseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stringList",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "tokenDataOf",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokenMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct AttributeUpdate[]",
                "name": "_updates",
                "type": "tuple[]"
            }
        ],
        "name": "updateAttributes",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let wallet;
let contract;
let metadata;
let upgrading = false;

const CELL_SIZE = 2;
const ROWS = 300;
let COLUMNS = 1000;
const FLOOR_VELOCITY = new Velocity(0, -7);
let CACTUS_MIN_GAP = 20;

if (screen.width < COLUMNS) {
    COLUMNS = screen.width;
    FLOOR_VELOCITY.add(new Velocity(0, 2));
    CACTUS_MIN_GAP = 50;
}

const DINO_INITIAL_TRUST = new Velocity(-11, 0);
const ENVIRONMENT_GRAVITY = new Velocity(-0.6, 0);
const DINO_FLOOR_INITIAL_POSITION = new Position(200, 10);
let dino_current_trust = new Velocity(0, 0);
let dino_ready_to_jump = true;
let game_over = null;
let is_first_time = true;
let game_score = null;
let game_score_step = 0;
let game_hi_score = null;
let game_level = null
let game_speed = null;
let step_velocity = new Velocity(0, -0.1);
let cumulative_velocity = null;
let current_theme = null;
let level_colors = {
    1: '#535353',
    2: '#f1c232',
    3: '#FF7600',
    4: '#f44336',
    5: '#6a040f',
}

let harmless_characters_pool = null;
let harmfull_characters_pool = null;

let harmless_character_allocator = [
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta([stone_layout.large], 0, new Position(240, COLUMNS), FLOOR_VELOCITY), 0.9)
            .add_character(new CharacterMeta([stone_layout.medium], 0, new Position(243, COLUMNS), FLOOR_VELOCITY), 0.75)
            .add_character(new CharacterMeta([stone_layout.small], 0, new Position(241, COLUMNS), FLOOR_VELOCITY), 0.6)
        , 2, 0
    ),
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta([cloud_layout], 0, new Position(100, COLUMNS), new Velocity(0, -1)), 0.9)
            .add_character(new CharacterMeta([cloud_layout], 0, new Position(135, COLUMNS), new Velocity(0, -1)), 0.85)
            .add_character(new CharacterMeta([cloud_layout], 0, new Position(150, COLUMNS), new Velocity(0, -1)), 0.8)
        , 350, 300
    ),
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta([star_layout.small_s1], 0, new Position(90, COLUMNS), new Velocity(0, -0.3)), 0.9)
            .add_character(new CharacterMeta([star_layout.small_s2], 0, new Position(125, COLUMNS), new Velocity(0, -0.3)), 0.85)
            .add_character(new CharacterMeta([star_layout.small_s1], 0, new Position(140, COLUMNS), new Velocity(0, -0.3)), 0.8)
        , 350, 250
    ),
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta([pit_layout.large], 0, new Position(223, COLUMNS), FLOOR_VELOCITY), 0.97)
            .add_character(new CharacterMeta([pit_layout.up], 0, new Position(227, COLUMNS), FLOOR_VELOCITY), 0.90)
            .add_character(new CharacterMeta([pit_layout.down], 0, new Position(230, COLUMNS), FLOOR_VELOCITY), 0.85)
        , 100, 50
    )
];

let harmfull_character_allocator = [
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta([cactus_layout.small_d1], 0, new Position(201, COLUMNS), FLOOR_VELOCITY), 0.8)
            .add_character(new CharacterMeta([cactus_layout.small_s1], 0, new Position(201, COLUMNS), FLOOR_VELOCITY), 0.7)
            .add_character(new CharacterMeta([cactus_layout.small_s2], 0, new Position(201, COLUMNS), FLOOR_VELOCITY), 0.6)
            .add_character(new CharacterMeta([cactus_layout.medium_d1], 0, new Position(193, COLUMNS), FLOOR_VELOCITY), 0.5)
            .add_character(new CharacterMeta([cactus_layout.medium_s1], 0, new Position(193, COLUMNS), FLOOR_VELOCITY), 0.4)
            .add_character(new CharacterMeta([cactus_layout.medium_s2], 0, new Position(193, COLUMNS), FLOOR_VELOCITY), 0.3)

        , CACTUS_MIN_GAP, 100
    ),
    new CharacterAllocator(
        new AllocatorCharacterArray()
            .add_character(new CharacterMeta(bird_layout.fly, 0, new Position(170, COLUMNS), FLOOR_VELOCITY.clone().add(new Velocity(0, -1))), 0.98)
            .add_character(new CharacterMeta(bird_layout.fly, 0, new Position(190, COLUMNS), FLOOR_VELOCITY.clone().add(new Velocity(0, -1))), 0.9)
        , 500, 50
    )
]

const SPEED_STEP = -1;

function get_game_level(score) {
    if (score >= 400) {
        return 5;
    } else if (score >= 300) {
        return 4;
    } else if (score >= 200) {
        return 3;
    } else if (score >= 100) {
        return 2;
    } else {
        return 1;
    }
}
async function initialize() {

    try {
        let metadataStr = await contract.methods.tokenDataOf(wallet).call();
        metadata = JSON.parse(metadataStr);
    } catch (err) {
        console.log(err);
        $("#container").html("<h2 class='text-danger text-center'>There was an unexpected error.<br/>Please refresh and try again.</h2>");
        return;
    }


    current_theme = themes.classic;
    //   cumulative_velocity = new Velocity(0, 0);
    game_over = false;
    game_score = 0;
    game_score_step = 0;
    game_hi_score = metadata.attributes[1].value || 0;
    game_speed = Math.max(0, Math.floor(game_hi_score / 100)) + 1;
    game_level = get_game_level(game_hi_score);
    cumulative_velocity = new Velocity(0, SPEED_STEP * game_speed);

    canvas.height = ROWS;
    canvas.width = COLUMNS;

    harmless_characters_pool = [];
    harmfull_characters_pool = [
        new Character(new CharacterMeta(dino_layout.run, 4, DINO_FLOOR_INITIAL_POSITION.clone(), new Velocity(0, 0)))
    ];

    document.ontouchstart = () => {
        if (upgrading) {
            return;
        }

        if (game_over && (Date.now() - game_over) > 1000) {
            initialize();
            return;
        }

        if (dino_ready_to_jump) {
            dino_ready_to_jump = false;
            dino_current_trust = DINO_INITIAL_TRUST.clone();
        }
    };

    document.body.onclick = () => {
        if (game_over && !upgrading) {
            document.ontouchstart();
        }
    };

    document.body.onkeydown = event => {
        // keyCode is depricated
        if (event.keyCode === 32 || event.key === ' ') {
            document.ontouchstart();
        }
    };

    event_loop();
}

function paint_layout(character_layout, character_position) {
    for (let j = 0; j < character_layout.length; j++) {
        for (let k = 0; k < character_layout[j].length; k++) {
            if (current_theme.layout[character_layout[j][k]]) {
                if (character_layout === dino_layout.stand || character_layout === dino_layout.jump || character_layout === dino_layout.run[0] || character_layout === dino_layout.run[1] || character_layout === dino_layout.dead) {
                    if (character_layout[j][k] === 2) {
                        canvas_ctx.fillStyle = level_colors[game_level];

                    } else {
                        canvas_ctx.fillStyle = current_theme.layout[character_layout[j][k]];
                    }
                } else {
                    canvas_ctx.fillStyle = current_theme.layout[character_layout[j][k]];
                }
                let x_pos = character_position[1] + (k * CELL_SIZE);
                let y_pos = character_position[0] + (j * CELL_SIZE);

                canvas_ctx.fillRect(x_pos, y_pos, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function event_loop() {
    game_score_step += 0.15;

    if (game_score_step > 1) {
        game_score_step -= 1;
        game_score++;

        let max = Math.max(game_score, game_hi_score);

        game_speed = Math.max(0, Math.floor(max / 100)) + 1;
        game_level = get_game_level(max);


        // increase velocity
        cumulative_velocity = new Velocity(0, SPEED_STEP * game_speed);

        // if (game_score != 0 && game_score % 300 == 0) {
        //     if (current_theme.id == 1) {
        //         current_theme = themes.dark;
        //     } else {
        //         current_theme = themes.classic;
        //     }
        // }

    }

    canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas_ctx.fillStyle = current_theme.background;
    canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas_ctx.beginPath();

    // Road
    for (let i = 0; i < canvas.width; i++) {
        canvas_ctx.fillStyle = current_theme.road;
        canvas_ctx.fillRect(0, 232, canvas.width, CELL_SIZE * 0.2);
    }

    // score card update
    canvas_ctx.font = "20px Arcade";
    canvas_ctx.fillStyle = current_theme.score_text;
    canvas_ctx.fillText(`H I G H         ${Math.floor(game_hi_score).toString().padStart(4, '0').split('').join(" ")}`, canvas.width - 200, 20);

    // score card update
    canvas_ctx.font = "20px Arcade";
    canvas_ctx.fillStyle = current_theme.score_text;
    canvas_ctx.fillText(`L E V E L    ${game_level.toString().split('').join(" ")} `, canvas.width - 200, 40);

    // score card update
    canvas_ctx.font = "20px Arcade";
    canvas_ctx.fillStyle = current_theme.score_text;
    canvas_ctx.fillText(`S P E E D    ${game_speed.toString().split('').join(" ")} `, canvas.width - 200, 60);


    canvas_ctx.font = "20px Arcade";
    canvas_ctx.fillStyle = current_theme.score_text;
    canvas_ctx.fillText(`S C O R E     ${game_score.toString().padStart(4, '0').split('').join(" ")}`, canvas.width - 200, 80);

    // first time
    if (is_first_time) {
        is_first_time = false;
        paint_layout(dino_layout.stand, harmfull_characters_pool[0].get_position().get());
        game_over = Date.now();

        canvas_ctx.textBaseline = 'middle';
        canvas_ctx.textAlign = 'center';
        canvas_ctx.font = "25px Arcade";
        canvas_ctx.fillStyle = current_theme.info_text;
        canvas_ctx.fillText("J     U     M     P             T     O             S     T     A     R     T", canvas.width / 2, (canvas.height / 2) - 50);
        return;
    }

    // characters
    // new characters generate
    [[harmless_character_allocator, harmless_characters_pool], [harmfull_character_allocator, harmfull_characters_pool]].forEach(character_allocator_details => {
        for (let i = 0; i < character_allocator_details[0].length; i++) {
            const ALLOCATOR = character_allocator_details[0][i];
            ALLOCATOR.tick();
            const RANDOM_CHARACTER = ALLOCATOR.get_character();
            if (RANDOM_CHARACTER) {
                RANDOM_CHARACTER.get_velocity().add(cumulative_velocity);
                character_allocator_details[1].push(RANDOM_CHARACTER);
            }
        }
    });



    // characters display
    [harmless_characters_pool, harmfull_characters_pool].forEach((characters_pool, index) => {

        for (let i = characters_pool.length - 1; i >= 0; i--) {

            // Increase velocity on each cycle
            if ((!(index == 1 && i == 0)) && (game_score % 100 == 0)) {
                characters_pool[i].get_velocity().add(step_velocity);
            }

            characters_pool[i].tick();
            let CHARACTER_LAYOUT = characters_pool[i].get_layout();

            // A special case for dino jump. It's leg should be in standing position while jump
            // Yes, this can be done much better but I am lazy :-)
            if (!dino_ready_to_jump && index == 1 && i == 0) {
                CHARACTER_LAYOUT = dino_layout.stand;
            }
            // ******

            const CHARACTER_POSITION = characters_pool[i].get_position().get();

            if (CHARACTER_POSITION[1] < -150) {
                characters_pool.splice(i, 1);
                continue;
            }

            paint_layout(CHARACTER_LAYOUT, CHARACTER_POSITION);
        }
    });


    // harmfull characters collision detection
    let dino_character = harmfull_characters_pool[0];
    let dino_current_position = dino_character.get_position();
    let dino_current_layout = dino_character.get_layout();
    for (let i = harmfull_characters_pool.length - 1; i > 0; i--) {
        const HARMFULL_CHARACTER_POSITION = harmfull_characters_pool[i].get_position();
        const HARMFULL_CHARACTER_LAYOUT = harmfull_characters_pool[i].get_layout();
        if (isCollided(dino_current_position.get()[0], dino_current_position.get()[1], dino_current_layout.length, dino_current_layout[0].length, HARMFULL_CHARACTER_POSITION.get()[0], HARMFULL_CHARACTER_POSITION.get()[1], HARMFULL_CHARACTER_LAYOUT.length, HARMFULL_CHARACTER_LAYOUT[0].length)) {
            canvas_ctx.textBaseline = 'middle';
            canvas_ctx.textAlign = 'center';
            canvas_ctx.font = "25px Arcade";
            canvas_ctx.fillStyle = current_theme.info_text;
            canvas_ctx.fillText("G     A     M     E             O     V     E     R", canvas.width / 2, (canvas.height / 2) - 50);
            paint_layout(retry_layout, new Position((canvas.height / 2) - retry_layout.length, (canvas.width / 2) - retry_layout[0].length).get());
            paint_layout(dino_layout.dead, harmfull_characters_pool[0].get_position().get());
            game_over = Date.now();


            if (metadata.attributes[1].value < game_score) {
                upgrading = true;
                $("#upgradeNFTModal").off().on('hidden.bs.modal', function () {
                    upgrading = false;
                });

                let $btn = $("#upgradeNFTModal").find('[data-upgrade-btn]');

                $("#upgradeNFTModal").find('.text-normal').show();
                $("#upgradeNFTModal").find('.text-success').hide();
                $("#upgradeNFTModal").find('.text-danger').hide();
                $btn.text('Upgrade now');

                $btn.off().on('click', async function () {
                    // $("#minting").html('Minting...');
                    $("#upgradeNFTModal").find('button').prop('disabled', true);
                    $(this).text('Upgrading...');

                    $("#upgradeNFTModal").find('.text-danger').hide();

                    try {

                        let attrs = [];
                        attrs[0] = [0, String(game_level)];
                        attrs[1] = [1, String(game_level-1)];
                        attrs[2] = [2, String(game_score)];
                        attrs[3] = [3, String(game_level)];
                        attrs[4] = [4, String(game_speed)];
                        await contract.methods.updateAttributes(attrs).send({ from: wallet });

                        $("#upgradeNFTModal").find('.text-normal').hide();
                        $("#upgradeNFTModal").find('.text-success').show();
                        $(this).text('Close');
                        $(this).off().on('click', function () {
                            $("#upgradeNFTModal").modal("hide");
                        });

                    }
                    catch (err) {
                        console.log(err);
                        $(this).text('Upgrade now');
                        if (err.code === 4001 || String(err).indexOf("User denied transaction signature.") >= 0) {
                            return;
                        }
                        $("#upgradeNFTModal").find('.text-danger').show();
                    }
                    finally {
                        $("#upgradeNFTModal").find('button').prop('disabled', false);
                    }
                });
                $("#upgradeNFTModal").modal("show");
            }

            return;
        }
    }

    // dino jump case
    dino_character.set_position(applyVelocityToPosition(dino_character.get_position(), dino_current_trust));

    if (dino_character.get_position().get()[0] > DINO_FLOOR_INITIAL_POSITION.get()[0]) {
        dino_character.set_position(DINO_FLOOR_INITIAL_POSITION.clone());
        dino_ready_to_jump = true;
    }

    dino_current_trust.sub(ENVIRONMENT_GRAVITY);

    requestAnimationFrame(event_loop);
}

async function main() {
    if (window.ethereum) {

        // targets Rinkeby chain, id 4
        const targetNetworkId = '0xaa36a7';

        const checkNetwork = async () => {
            const currentChainId = await window.ethereum.request({
                method: 'eth_chainId',
            });

            // return true if network id is the same
            if (currentChainId == targetNetworkId) return true;
            // return false is network id is different
            return false;
        };

        // switches network to the one provided
        const switchNetwork = async () => {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: targetNetworkId }],
            });
            // refresh
            window.location.reload();
        };

        if (!await checkNetwork()) {
            await switchNetwork();
        } else {
            try {
                let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                web3 = new Web3(window.ethereum);

                $("#wallet").html("Wallet: " + accounts[0].substring(0, 6) + "..." + accounts[0].substring(accounts[0].length - 6));
                wallet = accounts[0];

            } catch (err) {
                $("#container").html("<h1>Please connect your wallet!</h1>").show();
                return;
            }


            async function start() {

                $("#container").show();
                initialize();
            }

            try {
                contract = new web3.eth.Contract(abi, '0xd9698547Ba45Aa6e8dB4f56900D50B40C6C08089');
                let nfts = await contract.methods.balanceOf(wallet).call();
                if (nfts === 0n) {
                    $("#minting").html("You don't have a dino NFT.<br/> <button class='btn btn-primary mt-2' href='javascript:void(0)'>Click here</a> to mint one").show();
                    $("#minting").find('button').off().on('click', async function () {
                        $("#minting").html('Minting...');

                        try {
                            await contract.methods.mint().send({ from: wallet });
                            start();
                        } catch (err) {
                            console.log(err);
                            if (err.code === 4001 || String(err).indexOf("User denied transaction signature.") >= 0) {
                                $("#container").html("<h2 class='text-danger text-center'>You need a dino NFT to play this game.<br/>Please refresh and try again.</h2>");
                            } else {
                                $("#container").html("<h2 class='text-danger text-center'>There was an unexpected error.<br/>Please refresh and try again.</h2>");
                            }
                        } finally {
                            $("#minting").hide();
                            $("#container").show();
                        }
                    });
                } else {
                    start();
                }

            } catch (err) {
                console.log(err);
                $("#container").html("<h1 class='text-danger text-center'>There was an unexpected error.<br/>Please refresh and try again.</h1>");
            }
        }
 

    } else {
       $("#container").html("<h1>Please install Metamask!</h1>").show();
    }


}

$(document).ready(function () {
    document.fonts.load('1rem "Arcade"').then(() => {
        main();
    });
});
