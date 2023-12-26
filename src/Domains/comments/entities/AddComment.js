class AddComment {
  constructor(payload) {
    this._validatePayload(payload);

    const { content, owner, threadId } = payload;

    this.content = content;
    this.owner = owner;
    this.threadId = threadId;
  }

  _validatePayload({ content, owner, threadId }) {
    if (!content || !owner || !threadId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof content !== 'string' ||
      typeof owner !== 'string' ||
      typeof threadId !== 'string'
    ) {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

export default AddComment;
