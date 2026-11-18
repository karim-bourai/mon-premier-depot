const { Roles } = require('../models');
module.exports = require('./crudFactory')(Roles, ['nom_role']);
