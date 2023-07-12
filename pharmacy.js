export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  GENERIC_DRUG() {
    return {
      benefitChangeRate: () => this.expired() ? -2 : -1,
      expires: true,
      nonBenefitOnExpiration: false,
    }
  }

  DRUGS() {
    return {
      "Herbal Tea": {
        benefitChangeRate: () => this.expired() ? 2 : 1,
        expires: true,
        nonBenefitOnExpiration: false,
      },
      "Fervex": {
        benefitChangeRate: () => {
          if(this.expired()) return 0;
          if(this.expiresIn < 5) return 3;
          if(this.expiresIn < 10) return 2;
          return 1;
        },
        expires: true,
        nonBenefitOnExpiration: true,
      },
      "Magic Pill": {
        benefitChangeRate: () => 0,
        expires: false,
        nonBenefitOnExpiration: false,
      },
    }
  }
  
  drug() {
    return this.DRUGS()[this.name] || this.GENERIC_DRUG();
  }

  expired() {
    return this.drug().expires && this.expiresIn < 0;
  }

  updateExpiresIn() {
    if(this.drug().expires) {
      this.expiresIn -= 1;
    }
  }

  updateBenefitValue() {
    this.benefit += this.drug().benefitChangeRate();
    if(this.benefit > 50) this.benefit = 50;
    if(this.benefit < 0) this.benefit = 0;
    if(this.drug().nonBenefitOnExpiration && this.expired()) this.benefit = 0;
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
