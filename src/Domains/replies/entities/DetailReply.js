class DetailReply {
  constructor(payload) {
    this._validatePayload(payload);

    const { id, content, date, username, commentId, isDeleted } = payload;

    this.id = id;
    this.content = isDeleted ? '**balasan telah dihapus**' : content;
    this.username = username;
    this.commentId = commentId;
    this.date = date;
  }

  _validatePayload({ id, content, date, username, commentId, isDeleted }) {
    if (
      !id ||
      !content ||
      !date ||
      !username ||
      !commentId ||
      isDeleted === 'undefined'
    ) {
      throw new Error('DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof date !== 'string' ||
      typeof username !== 'string' ||
      typeof commentId !== 'string' ||
      typeof isDeleted !== 'boolean'
    ) {
      throw new Error('DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default DetailReply;
