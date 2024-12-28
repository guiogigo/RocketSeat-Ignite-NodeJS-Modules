import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
  questionComment: QuestionComment
}>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionsCommentsRepository
) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(authorId),
        content,
        questionId: new UniqueEntityID(questionId),
    })
    
    await this.questionsCommentsRepository.create(questionComment)

    return right({
        questionComment
    })

    
  }
}
