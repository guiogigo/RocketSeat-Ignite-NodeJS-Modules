import { Either, left, right } from '@/core/either'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionsCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment = await this.questionCommentsRepository.findById(questionCommentId)

    if (!questioncomment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != questioncomment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questioncomment)

    return right({})
  }
}
