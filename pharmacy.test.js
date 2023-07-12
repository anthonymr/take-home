import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("should decrease the benefit twice as fast when expired", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)]
    );
  });

  it("should never have a negative benefit", () => {
    expect(new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)]
    );
  });

  it("should increase the benefit of Herbal Tea", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 4)]);
  });

  it("should increase the benefit of Herbal Tea twice as fast when expired", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 5)]);
  });

  it("should never have a benefit greater than 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 50)]);
  });

  it("should never have a benefit greater than 50 even when expired", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", -1, 49)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -2, 50)]);
  });

  it("should incresase the benefit of Fervex by 3 if expires in less than 5 days", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 4, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 3, 6)]);
  });

  it("should incresase the benefit of Fervex by 2 if expires in less than 10 days", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 9, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 8, 5)]);
  });

  it("should drop the benefit of Fervex to 0 after expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should never loss benefit of Magic Pill", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 0, 3)]);
  });

  it("should never change the expiration date of Magic Pill", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 0, 3)]);
  });

  it("should decrease the benefit twice as fast for Dafalgan", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 1, 1)]);
  });

  it("should decrease the benefit four times as fast for Dafalgan when expired", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 4)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -1, 0)]);
  });
});
