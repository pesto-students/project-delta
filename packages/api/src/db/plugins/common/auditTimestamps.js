function auditTimestampsPlugin(schema, options) {
  schema.add({
    created_at: { type: Date, default: new Date() },
    last_updated_at: { type: Date, default: new Date() },
  });

  schema.pre('save', function updateTimestamps(next) {
    this.created_at = this.created_at || new Date();
    this.last_updated_at = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('created_at').index(options.index);
    schema.path('last_updated_at').index(options.index);
  }
}

module.exports = auditTimestampsPlugin;
