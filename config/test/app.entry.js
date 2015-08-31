var context = require.context("../../src/specs", true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);

module.exports = context;
