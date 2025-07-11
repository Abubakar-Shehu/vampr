class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let counter = 0
    if (this.creator === null) {
      return counter
    }
    let creatorNest = this.creator

    while (creatorNest) {
      counter++
      creatorNest = creatorNest.creator
    }
    
    return counter
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const getAncestors = (vampire) => {
      let ancestors = []; // or use a Set for faster lookups
    while (vampire) {
      ancestors.push(vampire);
      vampire = vampire.creator;
    }
    return ancestors;
    }

    const thisAncestor = getAncestors(this);
    const paramAncestor = getAncestors(vampire);

    for (const ancestor of thisAncestor) {
      if (paramAncestor.includes(ancestor)) {
        return ancestor;
      }
    }
    return null;
  }
}

module.exports = Vampire;

