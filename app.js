new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      let damage = this.checkDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    specialAttack: function() {
      let damage = this.checkDamage(5, 20);
      this.monsterHealth = damage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Monster gets hit badly by " + damage
      });
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 97) {
        max = 15;
        min = 3;
        heal = Math.max(Math.floor(Math.random() * max) + 1, min);
        this.playerHealth += heal;
      } else playerHealth = 100;

      this.turns.unshift({
        isPlayer: true,
        text: "Player gets healed by " + heal
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttack: function() {
      damage = this.checkDamage(5, 12);
      this.playerHealth -= damage;

      this.turns.unshift({
        isMonster: true,
        text: "Monster hits Player for " + damage
      });
      this.checkWin();
    },
    checkDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won, Wanna play again?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("you lost, wanna play again?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
