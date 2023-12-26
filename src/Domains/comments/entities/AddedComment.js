class AddedComment {
  constructor(payload) {
    this._validatePayload(payload);

    const { id, content, owner } = payload;

    this.id = id;
    this.content = content;
    this.owner = owner;
  }

  _validatePayload({ id, content, owner }) {
    if (!id || !content || !owner) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof owner !== 'string' ||
      typeof content !== 'string'
    ) {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

export default AddedComment;
