/* ==========================================
   ZOMBIE SURVIVAL QUIZ
========================================== */


/* ==========================================
   QUESTIONS
========================================== */

const questions = [

    {
        question: "What's your most useful skill?",

        answers: [
            {
                text: "🎯 I'm great with weapons",
                role: "fighter"
            },
            {
                text: "🔧 I can build or fix anything",
                role: "mechanic"
            },
            {
                text: "👥 I'm a natural leader",
                role: "leader"
            },
            {
                text: "📦 I'm good at finding supplies",
                role: "scout"
            }
        ]
    },


    {
        question: "You find an abandoned building. What do you do?",

        answers: [
            {
                text: "🔎 Check every room for supplies",
                role: "scout"
            },
            {
                text: "🛡️ Secure the building first",
                role: "fighter"
            },
            {
                text: "👥 Organize everyone into teams",
                role: "leader"
            },
            {
                text: "🔧 Look for tools and materials",
                role: "mechanic"
            }
        ]
    },


    {
        question: "Your group needs food. What's your plan?",

        answers: [
            {
                text: "🥫 Search nearby stores",
                role: "scout"
            },
            {
                text: "🌱 Start growing a food supply",
                role: "mechanic"
            },
            {
                text: "👥 Organize a supply team",
                role: "leader"
            },
            {
                text: "🏹 Hunt for food",
                role: "fighter"
            }
        ]
    },


    {
        question: "A zombie suddenly attacks. How do you react?",

        answers: [
            {
                text: "⚔️ Fight it immediately",
                role: "fighter"
            },
            {
                text: "🏃 Get everyone to safety",
                role: "leader"
            },
            {
                text: "👀 Stay quiet and hide",
                role: "scout"
            },
            {
                text: "🔧 Create a trap",
                role: "mechanic"
            }
        ]
    },


    {
        question: "Your group needs a safe shelter. What matters most?",

        answers: [
            {
                text: "🧱 Strong walls and defenses",
                role: "mechanic"
            },
            {
                text: "👀 A good view of the area",
                role: "scout"
            },
            {
                text: "🛡️ Plenty of weapons",
                role: "fighter"
            },
            {
                text: "👥 Enough space for everyone",
                role: "leader"
            }
        ]
    },


    {
        question: "What would keep you alive the longest?",

        answers: [
            {
                text: "💪 Courage",
                role: "fighter"
            },
            {
                text: "🧠 Intelligence",
                role: "scout"
            },
            {
                text: "🤝 Teamwork",
                role: "leader"
            },
            {
                text: "🛠️ Resourcefulness",
                role: "mechanic"
            }
        ]
    }

];


/* ==========================================
   RESULTS
========================================== */

const results = {

    scout: {

        title: "THE SCOUT",

        description:
            "You're quick, observant, and resourceful. You know how to move fast, stay quiet, and find what the group needs to survive.",

        strengths: [
            "Situational Awareness",
            "Speed & Agility",
            "Resourcefulness"
        ],

        stats: {
            combat: 3,
            crafting: 3,
            leadership: 3,
            stealth: 5,
            survival: 5
        },

        tip:
            "Knowledge is power. Stay alert, keep exploring, and never stop learning your surroundings."
    },


    fighter: {

        title: "THE FIGHTER",

        description:
            "When danger appears, you're the person everyone wants beside them. You're brave, confident, and ready to protect your group.",

        strengths: [
            "Combat Skills",
            "Courage",
            "Physical Strength"
        ],

        stats: {
            combat: 5,
            crafting: 2,
            leadership: 3,
            stealth: 2,
            survival: 4
        },

        tip:
            "Don't fight every battle. Sometimes the smartest weapon is knowing when to walk away."
    },


    mechanic: {

        title: "THE MECHANIC",

        description:
            "You can turn almost anything into something useful. Broken vehicles, tools, shelters—you know how to keep the group running.",

        strengths: [
            "Problem Solving",
            "Building & Repair",
            "Resourcefulness"
        ],

        stats: {
            combat: 2,
            crafting: 5,
            leadership: 3,
            stealth: 3,
            survival: 5
        },

        tip:
            "Never underestimate a toolbox. The ability to repair and create can be more valuable than weapons."
    },


    leader: {

        title: "THE LEADER",

        description:
            "People naturally look to you when things go wrong. You keep everyone focused, organized, and moving toward the same goal.",

        strengths: [
            "Leadership",
            "Teamwork",
            "Decision Making"
        ],

        stats: {
            combat: 3,
            crafting: 3,
            leadership: 5,
            stealth: 2,
            survival: 5
        },

        tip:
            "A good leader doesn't have all the answers. Listen to your team and use everyone's strengths."
    }

};


/* ==========================================
   VARIABLES
========================================== */

let currentQuestion = 0;

let scores = {

    scout: 0,

    fighter: 0,

    mechanic: 0,

    leader: 0

};


/* ==========================================
   GET ELEMENTS
========================================== */

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("question");

const answersContainer =
    document.getElementById("answers");

const quizProgress =
    document.getElementById("quizProgress");

const quizSection =
    document.querySelector(".quiz-section");

const resultSection =
    document.getElementById("resultSection");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const strengths =
    document.getElementById("strengths");

const survivalTip =
    document.getElementById("survivalTip");

const restartButton =
    document.getElementById("restartButton");

const shareButton =
    document.getElementById("shareButton");


/* ==========================================
   SHOW QUESTION
========================================== */

function showQuestion() {

    const current =
        questions[currentQuestion];


    questionNumber.textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    questionText.textContent =
        current.question;


    answersContainer.innerHTML = "";


    current.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.className =
            "answer-button";


        button.textContent =
            answer.text;


        button.addEventListener(
            "click",
            () => selectAnswer(answer.role)
        );


        answersContainer.appendChild(button);

    });


    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    quizProgress.style.width =
        progress + "%";

}


/* ==========================================
   SELECT ANSWER
========================================== */

function selectAnswer(role) {

    scores[role]++;


    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


/* ==========================================
   CALCULATE RESULT
========================================== */

function calculateResult() {

    let winner = "scout";

    let highestScore = -1;


    for (const role in scores) {

        if (scores[role] > highestScore) {

            highestScore =
                scores[role];

            winner = role;

        }

    }


    return winner;

}


/* ==========================================
   SHOW RESULT
========================================== */

function showResult() {

    const winner =
        calculateResult();


    const result =
        results[winner];


    resultTitle.textContent =
        result.title;


    resultDescription.textContent =
        result.description;


    survivalTip.textContent =
        result.tip;


    /* STRENGTHS */

    strengths.innerHTML = "";


    result.strengths.forEach(strength => {

        const item =
            document.createElement("div");

        item.className =
            "strength";

        item.textContent =
            strength;

        strengths.appendChild(item);

    });


    /* STATS */

    showStat(
        "combat",
        result.stats.combat
    );

    showStat(
        "crafting",
        result.stats.crafting
    );

    showStat(
        "leadership",
        result.stats.leadership
    );

    showStat(
        "stealth",
        result.stats.stealth
    );

    showStat(
        "survival",
        result.stats.survival
    );


    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   SHOW STAT SKULLS
========================================== */

function showStat(id, score) {

    const container =
        document.getElementById(id);


    container.innerHTML = "";


    for (let i = 1; i <= 5; i++) {

        const skull =
            document.createElement("span");


        if (i <= score) {

            skull.textContent = "☠";

        } else {

            skull.textContent = "☠";

            skull.classList.add("empty");

        }


        container.appendChild(skull);

    }

}


/* ==========================================
   RESTART QUIZ
========================================== */

restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;


        scores = {

            scout: 0,

            fighter: 0,

            mechanic: 0,

            leader: 0

        };


        resultSection.classList.add("hidden");

        quizSection.classList.remove("hidden");


        showQuestion();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ==========================================
   SHARE RESULT
========================================== */

shareButton.addEventListener(
    "click",
    async () => {

        const winner =
            calculateResult();

        const message =
            `I survived the Zombie Survival Quiz! My role is ${results[winner].title}! ☣️`;


        if (navigator.share) {

            try {

                await navigator.share({

                    title:
                        "Zombie Survival Quiz",

                    text:
                        message

                });

            } catch (error) {

                console.log(
                    "Share cancelled."
                );

            }

        } else {

            await navigator.clipboard.writeText(
                message
            );

            alert(
                "Your result has been copied!"
            );

        }

    }
);


/* ==========================================
   START QUIZ
========================================== */

showQuestion();