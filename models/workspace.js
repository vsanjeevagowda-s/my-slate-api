const mongoose = require('mongoose');

const { Schema } = mongoose;

const workspaceSchema = new Schema({
  date: { type: Date, default: Date.now },
  record: { type: String },
  updated_at: { type: Date, default: Date.now },
  created_date: { type: Date, default: Date.now },
});

workspaceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
