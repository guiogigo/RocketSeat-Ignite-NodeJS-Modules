import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionsCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment = await this.questionCommentsRepository.findById(questionCommentId)

    if (!questioncomment) {
      throw new Error('QuestionComment not found')
    }

    if (authorId != questioncomment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questioncomment)

    return {}
  }
}
