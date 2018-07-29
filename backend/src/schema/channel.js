const { PubSub } = require('apollo-server')
const pubsub = new PubSub();
exports.PubSub = pubsub
exports.EXERCICE_ADDED = 'exercice_added'
exports.EXERCICE_UPDATED = 'exercice_updated'
exports.EXERCICE_REMOVED = 'exercice_removed'