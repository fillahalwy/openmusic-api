export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createTable('playlists', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    name: { type: 'TEXT', notNull: true },
    owner: { type: 'VARCHAR(50)', references: '"users"', onDelete: 'cascade' },
  });
};

export const down = (pgm) => pgm.dropTable('playlists');
