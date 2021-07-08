const names = require('../data/weapon-names.json');
const seedrandom = require('seedrandom');

const getRandom = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// basic weapon (TYPE)
const basic = (rng) => {
  return getRandom(rng, names.type);
};

// normal weapon (ADJ TYPE)
const normal = (rng) => {
  const prefix = getRandom(rng, names.prefix);
  const type = getRandom(rng, names.type);

  return `${prefix} ${type}`;
};

// material weapon (ADJ MAT TYPE)
const material = (rng) => {
  const prefix = getRandom(rng, names.prefix);
  const type = getRandom(rng, names.type);
  const material = getRandom(rng, names.material);

  return `${prefix} ${material} ${type}`;
};

// special weapon (SPC)
const special = (rng) => {
  return getRandom(rng, names.specialtype);
};

// super special weapon (OWN, SPEC SUFF)
const owned = (rng) => {
  const prefix = getRandom(rng, names.specialprefix);
  const type = getRandom(rng, names.specialtype);
  const suffix = getRandom(rng, names.suffix);

  return `${prefix} ${type} ${suffix}`;
};


exports.getWeaponNameFromSeed = (seed, stars) => {
  const rng = seedrandom(seed.toString());

  const roll = Math.floor(rng() * 100);

  if(stars === 1) {
    return basic(rng);
  }

  if(stars <= 3) {
    if(roll <= 25) return material(rng);
    return normal(rng);
  }

  if(stars === 4) {
    if(roll <= 1) return special(rng);
    if(roll <= 50) return material(rng);
    return normal(rng);
  }

  if(stars === 5) {
    if(roll <= 75) return special(rng);
    return owned(rng);
  }

  if(stars > 5) {
    return owned(rng);
  }

  return basic(rng);
};