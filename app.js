const randomValue = (min, max) => {
  return Math.ceil(Math.random() * (min, max));
};

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: "",
      logs: [],
    };
  },
  methods: {
    normAttack() {
      this.currentRound++;
      const monsterAttack = randomValue(8, 19);
      const playerAttack = randomValue(5, 15);
      this.monsterHealth > 0 ? (this.monsterHealth -= playerAttack) : "";
      this.playerHealth > 0 ? (this.playerHealth -= monsterAttack) : "";
      this.addLogMessage('player', 'attack', playerAttack)
      this.addLogMessage('monster', 'attack', monsterAttack)
    },
    specialAttack() {
      this.currentRound++;
      const playerAttack = randomValue(10, 25);
      const monsterAttack = randomValue(15, 30);
      this.monsterHealth >= 0 ? (this.monsterHealth -= playerAttack) : "";
      this.playerHealth >= 0 ? (this.playerHealth -= monsterAttack) : "";
      this.addLogMessage('player', 'special attack', playerAttack)
      this.addLogMessage('monster', 'special attack', monsterAttack)
    },
    heal() {
      this.currentRound++;
      const healingValue =  randomValue(5, 20)
      this.playerHealth + healingValue > 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += randomValue(5, 10));
      const monsterAttack = randomValue(8, 19);
      const playerAttack = randomValue(5, 15);
      this.monsterHealth > 0 ? (this.monsterHealth -= playerAttack) : "";
      this.playerHealth > 0 ? (this.playerHealth -= monsterAttack) : "";
      this.addLogMessage('player', 'heal', healingValue)
    },
    reset() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = "";
      this.logs = []
    },
    addLogMessage(who, what, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth > 0) {
        this.winner = "monster";
      } else if (value > 0 && this.monsterHealth <= 0) {
        this.winner = "player";
      } else if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "tie";
      }
    },
    monsterHealth(value) {},
  },
  computed: {
    monsterStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
  },
}).mount("#game");
