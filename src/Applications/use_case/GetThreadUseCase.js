class GetThreadUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
    likeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCaseParams) {
    const { threadId } = useCaseParams;
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(
      threadId,
    );
    const replies = await this._replyRepository.getRepliesByThreadId(threadId);

    thread.comments = this._getRepliesForComment(comments, replies);

    return thread;
  }

  _getRepliesForComment(comments, replies) {
    comments.forEach((comment) => {
      const filteredReplies = replies
        .filter((reply) => reply.commentId === comment.id)
        .map((reply) => {
          delete reply.commentId;

          return reply;
        });

      comment.replies = filteredReplies;
    });

    return comments;
  }
}

export default GetThreadUseCase;
