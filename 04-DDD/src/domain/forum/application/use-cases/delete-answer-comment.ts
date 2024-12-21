import { Either, left, right } from '@/core/either'
import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(answerCommentId)

    if (!answercomment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != answercomment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answercommentsRepository.delete(answercomment)

    return right({})
  }
}
