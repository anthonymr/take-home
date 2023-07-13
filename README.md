## 📅 Initial plan
  When I see the original `updateBenefitValue` method realized that it would be a waste of time trying to understand that code. It was built using multiple inner `if` ([if-else hell](https://www.freecodecamp.org/news/so-youre-in-if-else-hell-here-s-how-to-get-out-of-it-fc6407fec0e/)). Taking this into count, my initial idea was to build the basic functionality from scratch using class methods and save some time.

  But, also, as the exercise was to add a new drug with unique characteristics, I thought in building this having in mind the ability to easily add new drugs. So, another idea I had was to create an object containing each drug's unique characteristics.

## 🛠️ Implemented

  ⭐ All requirements were implemented. Here you can see a description of all implemented methods:

  #### In the Drug class:
  - <b>`GENERIC_DRUG` method:</b> returns an object with generic drug's characteristics: 
  ```js
  {
      benefitChangeRate: () => this.expired() ? -2 : -1,
      expires: true,
      nonBenefitOnExpiration: false,
  }
  ```
  - <b>`DRUGS` method:</b> returns an object with all special drug characteristics. ❗❗ If you want to add a new unique drug, this is the place ❗❗
  - <b>`drug` method:</b> returns the drug object according to the current instance name. its object could be the one returned by GENERIC_DRUG or the one corresponding to the drug if it has unique characteristics.
  - <b>`expired` method:</b> returns `true` if the instanced drug is expired, `false` otherwise.
  - <b>`updateExpiresIn` method:</b> update the `expiresIn` attribute from the instanced drug. If the instanced drug doesn't expires it does nothing.
  - <b>`updateBenefitValue` method:</b> update the `benefit` attribute from the instanced drug taking in the count the callback function stored in `benefitChangeRate` attribute from the instanced drug.

  #### In the Pharmacy class:
  - <b>`updateBenefitValue` method was rebuilt:</b> replace `if-else hell` structure by:

  ```js
    updateBenefitValue() {
    this.drugs.forEach(drug => {
      drug.updateExpiresIn();
      drug.updateBenefitValue();
    });

    return this.drugs;
  }
  ```  

## ❓ Assumptions I made
- I assumed that it is considered an expired drug if `expiresIn` is less than 0. When `expiresIn` is equal to 0 also gives the idea that the product is expired.

## 💡 Suggestions
There are some ideas you maybe can consider in future changes:
- Save `Drug` and `Pharmacy` classes in separate files, so those classes can week growing in a good way.
- Store `DRUGS` and `GENERIC_DRUG` returned objects in a separate `JSON` file. That way will be easier to add new drugs. Even, in the future you can save this information in the database to allow admin-level users to create new drugs from a graphic interface.
- Pass drug configuration object as a parameter to `Drug` constructor. That way you can separate the "fetch drug config logic" from the Drug class.

## 📜 Original instructions

### Inato Take-Home Test Specification

You are a new developer in the Inato team, and your first job is to add a feature to an old existing piece of code.

### System specifications

Hi and welcome to the team. We are in the future, and Inato has extended its activities by opening a pharmacy. Your task is to add a new feature to our system so that we can begin distributing a new drug. First an introduction to our system:

- All drugs have an `expiresIn` value which denotes the number of days we have until the item expires.
- All drugs have a `benefit` value which denotes how powerful the drug is.
- At the end of each day our system lowers both values for every drug

But there is more:

- Once the expiration date has passed, Benefit degrades twice as fast.
- The Benefit of an item is never negative.
- "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date.
- The Benefit of an item is never more than 50.
- "Magic Pill" never expires nor decreases in Benefit.
- "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches. Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.

We have recently signed a supplier of "Dafalgan". This requires an update to our system:

- "Dafalgan" degrades in Benefit twice as fast as normal drugs.

### Instructions

- [ ] Clone this repository (do **not** fork it)
- [ ] Implement the required feature
- [ ] Publish it on your GitHub (or Gitlab, or whatever...)
- [ ] Send us the link and tell us approximatively how much time you spent on this assignment

You are encouraged to refactor the existing code before adding your own, as you would do if this was a real task in real life. We strongly recommend that you write tests to help you during this process.

Feel free to make any changes to the `updateBenefitValue` method implementation and add any new code as long as everything still works correctly. However, do not break the public API of the `Drug` and `Pharmacy` classes, as those are used by other pieces of the software (you can add new methods though).

Please commit as frequently as possible to make the review easier.

### Test

To make sure that you will not break anything in the existing code, we added the result of the simulation in the _output.json_ file. Make sure that your code is able to generate a file with identical content. You can generate a new file by running one of the following commands:

```sh
yarn start
```

```sh
docker-compose up
```
