import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'


interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswersCommentsRepository
) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) throw new Error('Answer not found.')

    const answerComment = AnswerComment.create({
        authorId: new UniqueEntityID(authorId),
        content,
        answerId: new UniqueEntityID(answerId),
    })
    
    await this.answersCommentsRepository.create(answerComment)

    return {
        answerComment
    }

    
  }
}
