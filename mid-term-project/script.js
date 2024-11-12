document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("gameContainer");
    const storyText = document.getElementById("storyText");
    const choicesDiv = document.getElementById("choices");
    const image = document.getElementById("image");

    // Story data for the space exploration game
    const story = {
        start: {
            text: "Welcome, Captain. Your spaceship is docked at the Galactic Hub. Where do you want to go next?",
            choices: [
                { text: "Explore Aleron (Uncharted Planet)", next: "aleron" },
                { text: "Explore Zorath (War-torn Planet)", next: "zorath" }
            ],
            image: "images/galactic_hub.avif"
        },
        aleron: {
            text: "You arrive at Aleron. The planet looks mysterious. Do you land or explore the asteroid field?",
            choices: [
                { text: "Land on the planet", next: "planetLanding" },
                { text: "Explore asteroid field", next: "asteroidField" }
            ],
            image: "images/aleron_planet.jpg"
        },
        zorath: {
            text: "Zorath is a war-torn planet. Do you attempt to make contact with the alien race or avoid them?",
            choices: [
                { text: "Make contact with aliens", next: "alienEncounter" },
                { text: "Avoid the aliens", next: "asteroidField" }
            ],
            image: "images/zorath.jpg"
        },
        planetLanding: {
            text: "You land on Aleron. Suddenly, your sensors pick up a distress signal. Do you investigate?",
            choices: [
                { text: "Investigate the distress signal", next: "distressSignal" },
                { text: "Ignore and return to the ship", next: "returnShip" }
            ],
            image: "images/planet_landing.jpeg"
        },
        asteroidField: {
            text: "You enter the asteroid field, but your ship takes some damage. Do you try to repair it or escape?",
            choices: [
                { text: "Repair the ship", next: "repairShip" },
                { text: "Escape the field", next: "escapeField" }
            ],
            image: "images/asteroid_field.jpg!bw700"
        },
        alienEncounter: {
            text: "The aliens have detected your ship! Do you fight them or try to negotiate peace?",
            choices: [
                { text: "Fight the aliens", next: "alienFight" },
                { text: "Negotiate with the aliens", next: "alienNegotiation" }
            ],
            image: "images/alien_ship.jpg"
        },
        distressSignal: {
            text: "You investigate the distress signal and find a stranded ship. They need a rescue. Do you help them?",
            choices: [
                { text: "Rescue the crew", next: "rescueSuccess" },
                { text: "Leave them behind", next: "rescueFailure" }
            ],
            image: "images/distress_signal.jpg"
        },
        returnShip: {
            text: "You return to the ship safely, but the mission was a failure. Try again next time.",
            choices: [],
            image: "images/return_ship.jpg"
        },
        repairShip: {
            text: "You repair the ship and continue exploring. But the damage takes a toll on your resources. Do you head back to the hub or continue?",
            choices: [
                { text: "Head back to the hub", next: "start" },
                { text: "Continue exploring", next: "alienEncounter" }
            ],
            image: "images/repair_ship.jpg"
        },
        escapeField: {
            text: "You manage to escape the asteroid field but sustain some damage. Do you return to the hub or land somewhere for repairs?",
            choices: [
                { text: "Return to the hub", next: "start" },
                { text: "Land for repairs", next: "repairShip" }
            ],
            image: "images/escape_field.jpg"
        },
        alienFight: {
            text: "You engage in a fierce battle with the aliens! Unfortunately, your ship is destroyed. Game over.",
            choices: [],
            image: "images/alien_fight.jpg"
        },
        alienNegotiation: {
            text: "You successfully negotiate peace with the alien race! They offer you valuable resources as a sign of goodwill.",
            choices: [],
            image: "images/alien_negotiation.jpg"
        },
        rescueSuccess: {
            text: "You successfully rescue the stranded crew and bring them to safety. Congratulations on your successful mission!",
            choices: [],
            image: "images/rescue_success.jpg"
        },
        rescueFailure: {
            text: "You abandon the stranded crew, and they perish. Your actions haunt you. Game over.",
            choices: [],
            image: "images/rescue_failure.jpg"
        }
    };

    let currentStage = null;

    // Start the game
    startGame();

    // Function to start the game
    function startGame() {
        currentStage = story.start;
        updatePage();
    }

    // Function to update the page with the current stage of the story
    function updatePage() {
        console.log("Updating page to:", currentStage.text); // Debugging line

        // Update the text and image
        storyText.innerHTML = currentStage.text;
        image.src = currentStage.image;

        // Remove old choices and add new ones
        choicesDiv.innerHTML = '';
        currentStage.choices.forEach(choice => {
            const button = document.createElement("button");
            button.innerHTML = choice.text;
            button.addEventListener("click", function() {
                currentStage = story[choice.next];
                updatePage();
            });
            choicesDiv.appendChild(button);
        });

        // If there are no choices, display a restart button
        if (currentStage.choices.length === 0) {
            const restartButton = document.createElement("button");
            restartButton.innerHTML = "Restart Game";
            restartButton.addEventListener("click", startGame);
            choicesDiv.appendChild(restartButton);
        }
    }
});
// </script>
