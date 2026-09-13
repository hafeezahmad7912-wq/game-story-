/* ==========================================
   GAME STORY WEBSITE
   ========================================== */


/* Default Games */

const defaultGames = [

    {
        id: 1,

        name: "GTA V",

        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",

        story:
`Michael De Santa, Franklin Clinton and Trevor Philips are three criminals whose lives become connected through a series of dangerous events.

Michael is a retired bank robber living in Los Santos with his family. Franklin is a young man trying to escape the criminal world and build a better life.

Trevor, Michael's old friend, is unpredictable and extremely dangerous.

The three characters eventually become involved in a series of robberies and criminal operations.

As their enemies become more dangerous, they must work together while dealing with betrayals, government agents, rival gangs and other criminals.

Their story eventually leads to a major final decision that can determine the fate of the three protagonists.`
    },


    {
        id: 2,

        name: "Mafia II",

        image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1000&q=80",

        story:
`Vito Scaletta returns home after serving in the military during World War II.

He wants to make money and help his family, but he soon becomes involved with organized crime.

Together with his friend Joe Barbaro, Vito begins working for different criminal organizations.

As Vito rises through the criminal world, he becomes involved in increasingly dangerous jobs.

His decisions eventually bring him into conflict with powerful people and put his friendship with Joe at risk.`
    },


    {
        id: 3,

        name: "Resident Evil 4",

        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",

        story:
`Leon S. Kennedy is sent to a remote European village to rescue Ashley Graham, the daughter of the President of the United States.

The village is controlled by a mysterious group connected to a parasite known as Las Plagas.

Leon discovers that Ashley has been kidnapped by the group and must fight through dangerous villagers, creatures and powerful enemies.

During his mission, Leon encounters Ada Wong, who has her own mysterious objectives.

The mission becomes a fight for survival and a race to prevent the parasite from spreading.`
    }

];


/* Load Games From Browser */

let games = JSON.parse(
    localStorage.getItem("gameStories")
);


/* If no saved games exist */

if (!games) {

    games = defaultGames;

    saveGames();

}


/* Current Selected Game */

let currentGameId = null;


/* Save Games */

function saveGames() {

    localStorage.setItem(
        "gameStories",
        JSON.stringify(games)
    );

}


/* Display Games */

function displayGames(gameList = games) {

    const container =
        document.getElementById("gamesContainer");

    const noGames =
        document.getElementById("noGames");


    container.innerHTML = "";


    if (gameList.length === 0) {

        noGames.style.display = "block";

        return;

    }


    noGames.style.display = "none";


    gameList.forEach(game => {

        const card =
            document.createElement("div");

        card.className = "game-card";


        card.innerHTML = `

            <img
                class="game-image"
                src="${game.image || createPlaceholder(game.name)}"
                alt="${escapeHTML(game.name)}"
                onerror="this.src='${createPlaceholder(game.name)}'"
            >

            <div class="game-info">

                <h3>
                    ${escapeHTML(game.name)}
                </h3>

                <p>
                    ${escapeHTML(
                        game.story.substring(0, 150)
                    )}...
                </p>

                <button
                    class="read-button"
                    onclick="openStory(${game.id})"
                >
                    📖 Read Story
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* Create Placeholder */

function createPlaceholder(name) {

    return `https://placehold.co/800x500/11151d/00d9f5?text=${encodeURIComponent(name)}`;

}


/* Escape HTML */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* Search Games */

function searchGames() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    const filteredGames =
        games.filter(game =>
            game.name.toLowerCase().includes(search)
        );


    displayGames(filteredGames);


    document
        .getElementById("games")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Search While Typing */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const search =
                this.value
                    .trim()
                    .toLowerCase();


            if (search === "") {

                displayGames();

                return;

            }


            const filtered =
                games.filter(game =>
                    game.name
                        .toLowerCase()
                        .includes(search)
                );


            displayGames(filtered);

        }
    );


/* Enter Key Search */

document
    .getElementById("searchInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchGames();

            }

        }
    );


/* Add Game */

function addGame() {

    const name =
        document
            .getElementById("gameName")
            .value
            .trim();


    const image =
        document
            .getElementById("gameImage")
            .value
            .trim();


    const story =
        document
            .getElementById("gameStory")
            .value
            .trim();


    if (!name) {

        alert("Please enter the game name.");

        return;

    }


    if (!story) {

        alert("Please paste the game story.");

        return;

    }


    const newGame = {

        id: Date.now(),

        name: name,

        image: image || createPlaceholder(name),

        story: story

    };


    games.push(newGame);


    saveGames();

    displayGames();


    /* Clear Form */

    document.getElementById("gameName").value = "";

    document.getElementById("gameImage").value = "";

    document.getElementById("gameStory").value = "";


    alert(
        `"${name}" story has been added successfully!`
    );


    document
        .getElementById("games")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Open Story */

function openStory(id) {

    const game =
        games.find(game => game.id === id);


    if (!game) return;


    currentGameId = id;


    document
        .getElementById("modalTitle")
        .textContent = game.name;


    document
        .getElementById("modalStory")
        .textContent = game.story;


    const image =
        document.getElementById("modalImage");


    image.src =
        game.image || createPlaceholder(game.name);


    image.onerror = function() {

        this.src =
            createPlaceholder(game.name);

    };


    document
        .getElementById("storyModal")
        .style.display = "block";


    document.body.style.overflow = "hidden";

}


/* Close Story */

function closeStory() {

    document
        .getElementById("storyModal")
        .style.display = "none";


    document.body.style.overflow = "auto";

}


/* Close Modal When Clicking Outside */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("storyModal");


        if (event.target === modal) {

            closeStory();

        }

    }
);


/* Delete Game */

function deleteCurrentGame() {

    if (currentGameId === null) return;


    const game =
        games.find(game =>
            game.id === currentGameId
        );


    if (!game) return;


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${game.name}"?`
        );


    if (!confirmDelete) return;


    games =
        games.filter(game =>
            game.id !== currentGameId
        );


    saveGames();

    displayGames();

    closeStory();


    currentGameId = null;

}


/* Edit Game */

function editCurrentGame() {

    if (currentGameId === null) return;


    const game =
        games.find(game =>
            game.id === currentGameId
        );


    if (!game) return;


    const newName =
        prompt(
            "Enter new game name:",
            game.name
        );


    if (newName === null) return;


    const newStory =
        prompt(
            "Edit game story:",
            game.story
        );


    if (newStory === null) return;


    game.name =
        newName.trim() || game.name;


    game.story =
        newStory.trim() || game.story;


    saveGames();

    displayGames();

    openStory(currentGameId);

}


/* Start Website */

displayGames();