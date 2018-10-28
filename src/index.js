import $ from "jquery";
import characters from "./components/data";

let state = {
  playerCharacter: "",
  currentEnemy: "",
  bodiesOfTheDead: []
};

$(document).ready(function() {
  characters.forEach(character => {
    $("#instructions").html(
      `<p>Select your character by clicking their portrait.</p>`
    );
    $("#diagnostics").append(
      `<div class="hidden" id="${character.id}diag">
        <p>${character.name}</p>
        <p>hp: ${character.hitPoints}</p>
        <p>att: ${character.attack}</p>
        <p>counter: ${character.counterAttack}
      </div>`
    );
    $("#staging").append(character.generateCard());
    let shadow = `0 8px 12px rgba(${
      character.color
    }, 0.69), 0 7px 12px 4px rgba(${character.color}, 0.85)`;
    $(`#${character.id} .character-portrait`).css(
      "background-color",
      `rgb(${character.color})`
    );
    $(`#${character.id}`).css("box-shadow", shadow);

    $(`#${character.id}`).click(function() {
      processSelection(character);
    });
  });

  function processSelection(character) {
    if (!state.playerCharacter) {
      selectCharacter(character);
    } else if (!state.currentEnemy) {
      selectEnemy(character);
    }
  }

  function selectCharacter(character) {
    state.playerCharacter = character;
    $("#instructions").html(
      `<p>Select your opponent by clicking their portrait.</p>`
    );
    $(`#${character.id}`).off();
    characters.forEach(character => {
      if (character.id !== state.playerCharacter.id) {
        $(`#${character.id}`).remove();
        $(character.generateCard()).appendTo("#enemy-pool");
        let shadow = `0 8px 12px rgba(${
          character.color
        }, 0.69), 0 7px 12px 4px rgba(${character.color}, 0.85)`;
        $(`#${character.id} .character-portrait`).css(
          "background-color",
          `rgb(${character.color})`
        );
        $(`#${character.id}`).css("box-shadow", shadow);
        $(`#${character.id}`).click(function() {
          if (!state.playerCharacter) {
            selectCharacter(character);
          } else if (!state.currentEnemy) {
            selectEnemy(character);
          }
        });
      }
    });
  }

  function selectEnemy(character) {
    state.currentEnemy = character;
    $("#instructions").html("");
    $(`#${character.id}`).remove();
    $(character.generateCard()).appendTo("#battleground");
    let shadow = `0 8px 12px rgba(${
      character.color
    }, 0.69), 0 7px 12px 4px rgba(${character.color}, 0.85)`;
    $(`#${character.id} .character-portrait`).css(
      "background-color",
      `rgb(${character.color})`
    );
    $("body").css("background-image", `url(${character.portrait})`);
    $("body").css("background-color", `rgb(${character.color})`);
    $("body").css("background-size", `cover`);
    $("body").css("background-repeat", `no-repeat`);
    $("h1").css("color", `rgb(${character.color})`);
    $("h1").css(
      "text-shadow",
      "0 0 12px rgba(0, 0, 0, 1), 0 0 12px rgba(0, 0, 0, 1)"
    );
    $(`#${character.id}`).css("box-shadow", shadow);
    let char = `#${state.playerCharacter.id}`;
    $(char).off();
    $(`#staging`).prepend(`<button id="attack">Attack</button>`);
    $(`#attack`).click(function() {
      state.playerCharacter.performAttack(state.currentEnemy);
      $(`#${state.currentEnemy.id} .hit-point-counter`).text(
        `Hit Points: ${state.currentEnemy.hitPoints}`
      );
      $(`#${state.playerCharacter.id} .hit-point-counter`).text(
        `Hit Points: ${state.playerCharacter.hitPoints}`
      );
      $(`#${state.playerCharacter.id}diag`).html(
        `<p>${state.playerCharacter.name}</p>
        <p>hp: ${state.playerCharacter.hitPoints}</p>
        <p>att: ${state.playerCharacter.attack}</p>
        <p>counter: ${state.playerCharacter.counterAttack}`
      );
      $(`#${character.id}diag`).html(
        `<p>${character.name}</p>
        <p>hp: ${character.hitPoints}</p>
        <p>att: ${character.attack}</p>
        <p>counter: ${character.counterAttack}`
      );
      checkDead();
    });
  }

  function checkDead() {
    if (state.currentEnemy.dead) {
      $(`#attack`).remove();
      state.bodiesOfTheDead.push(state.currentEnemy);
      $(`#${state.currentEnemy.id}`).remove();
      $("h1").css("color", "rgb(19, 8, 16)");
      $("h1").css(
        "text-shadow",
        "0 0 12px rgba(255, 236, 85, 1), 0 0 12px rgba(255, 236, 85, 1)"
      );
      $("body").css("background-image", "none");
      $("body").css("background-color", `rgb(19, 8, 16)`);
      state.currentEnemy = "";
      $("#instructions").html(`<p>Select your next opponent.</p>`);
    }
    checkWin();
  }

  function checkWin() {
    if (state.playerCharacter.dead) {
      characters.forEach(character => {
        $(`#${character.id}`).off();
      });
      $("#instructions").html(
        '<p>You lose, you melty bastard.</p><button class="reset">New Game</button>'
      );
      $("h1").css("color", "rgb(19, 8, 16)");
      $("h1").css(
        "text-shadow",
        "0 0 12px rgba(255, 236, 85, 1), 0 0 12px rgba(255, 236, 85, 1)"
      );
      $("body").css("background-image", "none");
      $("body").css("background-color", `rgb(19, 8, 16)`);
      $(".reset").click(function() {
        reset();
      });
    }
    if (state.bodiesOfTheDead.length >= 3) {
      characters.forEach(character => {
        $(`#${character.id}`).off();
      });
      $("#instructions").html(
        '<p>You win, you street trash.</p><button class="reset">New Game</button>'
      );
      $(".reset").click(function() {
        reset();
      });
    }
  }

  function reset() {
    characters.forEach(character => {
      $(`#${character.id}`).remove();
      character.hitPoints = Math.floor(Math.random() * 200) + 100;
      character.attack = Math.floor(Math.random() * 8) + 3;
      character.counterAttack = Math.floor(Math.random() * 20) + 4;
      character.dead = false;
      $(`#${character.id} .hit-point-counter`).text(
        `Hit Points: ${character.hitPoints}`
      );
      $("#staging").append(character.generateCard());
      $(`#${character.id}`).click(function() {
        if (!state.playerCharacter) {
          selectCharacter(character);
        } else if (!state.currentEnemy) {
          selectEnemy(character);
        }
      });
      let shadow = `0 8px 12px rgba(${
        character.color
      }, 0.69), 0 7px 12px 4px rgba(${character.color}, 0.85)`;

      $(`#${character.id}`).css("box-shadow", shadow);
      $(`#${character.id} .character-portrait`).css(
        "background-color",
        `rgb(${character.color})`
      );
    });
    state.currentEnemy = "";
    state.playerCharacter = "";
    state.bodiesOfTheDead = [];
    $("#instructions").html(
      `<p>Select your character by clicking their portrait.</p>`
    );
    $(".overlay").remove();
    $("#attack").remove();
    $("body").css("background-image", "none");
    $("body").css("background-color", `rgb(19, 8, 16)`);
  }
});
