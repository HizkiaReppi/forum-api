exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    },
    date: {
      type: 'TEXT',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint(
    'replies',
    'fk_replies.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'replies',
    'fk_replies.comment_id_comments.id',
    'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('replies', 'fk_replies.owner_users.id');
  pgm.dropConstraint('replies', 'fk_replies.comment_id_comments.id');
  pgm.dropTable('replies');
};
