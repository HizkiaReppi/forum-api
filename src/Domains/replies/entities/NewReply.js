class NewReply {
  constructor(payload) {
    this._validatePayload(payload);

    const { content, owner, commentId } = payload;

    this.content = content;
    this.owner = owner;
    this.commentId = commentId;
  }

  _validatePayload({ content, owner, commentId }) {
    if (!content || !owner || !commentId) {
      throw new Error('NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof content !== 'string' ||
      typeof owner !== 'string' ||
      typeof commentId !== 'string'
    ) {
      throw new Error('NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default NewReply;
