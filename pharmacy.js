export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  doesThisExpire() {
    const drugsThatNotExpire = [
      "Magic Pill"
    ];

    return !drugsThatNotExpire.includes(this.name);
  }

  expired() {
    return this.doesThisExpire() && this.expiresIn < 0;
  }

  noBenefit() {
    if(this.name === "Fervex") return this.expiresIn < 0;
  }

  expirationRate() {
    switch (this.name) {
      case "Herbal Tea":
        return this.expired() ? 2 : 1;
      case "Fervex":
        if(this.expired()) return 0;
        if(this.expiresIn < 5) return 3;
        if(this.expiresIn < 10) return 2;
        return 1;
      case "Magic Pill":
        return 0;
      default:
        return this.expired() ? -2 : -1;
    }
  }

  updateExpiresIn() {
    if(this.doesThisExpire()) {
      this.expiresIn -= 1;
    }
  }

  updateBenefitValue() {
    this.benefit += this.expirationRate();
    if(this.benefit > 50) this.benefit = 50;
    if(this.benefit < 0) this.benefit = 0;
    if(this.noBenefit() && this.expired()) this.benefit = 0;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach(drug => {
      drug.updateExpiresIn();
      drug.updateBenefitValue();
    });

    return this.drugs;
  }
}
