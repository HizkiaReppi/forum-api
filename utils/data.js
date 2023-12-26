const payload = {
  users: [
    {
      id: 'user-123',
    },
    {
      id: 'user-456',
    },
  ],
  threads: [
    {
      id: 'thread-123',
      title: 'What do you prefer between ReactJS and VueJS?',
      body: 'I need to know your opinion about this.',
      date: new Date().toISOString(),
      username: 'john',
    },
    {
      id: 'thread-456',
      title: 'What book are you reading right now?',
      body: 'I need to know your opinion about this.',
      date: new Date().toISOString(),
      username: 'jane',
    },
  ],
  comments: [
    {
      id: 'comment-123',
      username: 'john',
      date: new Date().toISOString(),
      content: 'I prefer ReactJS than VueJS',
      is_deleted: false,
    },
    {
      id: 'comment-456',
      username: 'jane',
      date: new Date().toISOString(),
      content: 'I like "The Final Empire"',
      is_deleted: true,
    },
  ],
  replies: [
    {
      id: 'reply-123',
      username: 'jane',
      date: new Date().toISOString(),
      content: 'I prefer VueJS than ReactJS',
      is_deleted: true,
    },
    {
      id: 'reply-456',
      username: 'john',
      date: new Date().toISOString(),
      content: 'I like "The Final Empire" too',
      is_deleted: false,
    },
  ],
};

export default payload;
