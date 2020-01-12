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
    },
    attack: function() {
      damage = this.checkDamage(3, 10);
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
      this.monsterHealth = this.checkDamage(10, 20);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 97) {
        max = 15;
        min = 3;
        heal = Math.max(Math.floor(Math.random() * max) + 1, min);
        this.playerHealth += heal;
      } else playerHealth = 100;
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttack: function() {
      damage = this.checkDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage
      });
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
