class Character {
  constructor(name, hitPoints, attack, counterAttack, portrait, color) {
    this.id = Math.floor(Math.random() * 100 + 1);
    this.name = name;
    this.hitPoints = hitPoints;
    this.baseAttack = attack;
    this.attack = attack;
    this.counterAttack = counterAttack;
    this.portrait = portrait;
    this.color = color;
    this.dead = false;
  }

  generateCard() {
    return `
        <div id="${this.id}" class="character-card">
        <h3>${this.name}</h3>
         <img class="character-portrait" src=${this.portrait} alt="image of ${
      this.name
    }" />
        <div id="${this.id}-hp">
          <p class="hit-point-counter">Hit Points: ${this.hitPoints}</p>
    </div>
        </div>      
      `;
  }

  updateHitPoints(impact) {
    let hpDisplay = document.getElementById(`${this.id}-hp`);
    let hpImpact = document.createElement("p");
    hpImpact.classList.add("hit-counter");
    hpImpact.textContent = `- ${impact} hp`;
    hpDisplay.appendChild(hpImpact);
    if (this.hitPoints - impact > 0) {
      this.hitPoints -= impact;
    } else {
      this.hitPoints = 0;
      this.dead = true;
    }
    setTimeout(function() {
      hpDisplay.removeChild(hpImpact);
    }, 1000);
  }

  removeImpact(container, child) {
    container.removeChild(child);
  }

  performAttack(target) {
    if (this.hitPoints > 0) {
      let dmg = Math.floor(Math.random() * this.attack + this.attack / 2);

      if (target.hitPoints > 0) {
        target.updateHitPoints(dmg);
        this.receiveCounterAttack(target.counterAttack);
      }
      this.increaseAttack();
    }
  }

  receiveCounterAttack(dmgPool) {
    let dmg = Math.floor(Math.random() * dmgPool + dmgPool / 2);
    this.updateHitPoints(dmg);
  }

  increaseAttack() {
    this.attack += this.baseAttack;
  }

  terminate() {
    this.dead = true;
  }
}

export { Character };
