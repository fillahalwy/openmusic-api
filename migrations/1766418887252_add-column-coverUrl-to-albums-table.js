export const up = (pgm) => {
  pgm.addColumn('albums', {
    coverUrl: {
      type: 'TEXT',
      default: null,
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('albums', 'coverUrl');
};
