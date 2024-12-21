import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(answerCommentId)

    if (!answercomment) {
      throw new Error('AnswerComment not found')
    }

    if (authorId != answercomment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answercommentsRepository.delete(answercomment)

    return {}
  }
}
