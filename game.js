// 🎮🎮 YOUR GAME — pick your theme! Change anything with a ✏️ 🎮🎮

// 🌌 BACKGROUND — a colour OR a picture
//    pictures ready to use:  images/bg-space.svg · images/bg-food.svg · images/bg-ocean.svg
const BACKGROUND = "images/bg-space.svg";     // ✏️ or a colour like "#0b1126"

// 🚀 PLAYER — your catcher (an emoji OR a picture)
//    pictures ready to use:  images/rocket.svg · images/basket.svg
const PLAYER = "images/rocket.svg";           // ✏️ or an emoji like "🧺" "🛸" "🐱"

// ⭐ CATCH — things to catch for points (emoji or pictures)
const CATCH = ["⭐","🪐","☄️"];               // ✏️ change these!

// 👾 DODGE — the ONE thing to avoid
const DODGE = "👾";                           // ✏️ change this!

const SPEED = 3;                              // ✏️ how fast things fall (try 2 or 5)
const LIVES = 3;                              // ✏️ how many lives

startGame({ background:BACKGROUND, player:PLAYER, catch:CATCH, dodge:DODGE, speed:SPEED, lives:LIVES });
