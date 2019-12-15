const mongoose = require('mongoose');

const { Schema } = mongoose;

const versionSchema = new Schema({
  date: { type: Date, default: Date.now },
  record: { type: String }
})

const workspaceSchema = new Schema({
  date: { type: Date, default: Date.now },
  versions: [ versionSchema ],
  updated_at: { type: Date, default: Date.now },
  created_date: { type: Date, default: Date.now },
});

workspaceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
