const { Categories } = require('../models');
module.exports = require('./crudFactory')(Categories, ['nom', 'description']);
