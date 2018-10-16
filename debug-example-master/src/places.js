const places = [];

module.exports = {
  places,

  addPlace: (city, country) => {
    const id = places.length + 1;
    let numType = 'odd';
    if (id % 2 === 0) {
      numType = 'even';
    }
    places.push({
      id, city, country, numType,
    });
  },
};

// module.exports.addPlace('Mombasa','Kenya');
// module.exports.addPlace('Kingston','Jamaica');
// module.exports.addPlace('Cape Town','South Africa');
