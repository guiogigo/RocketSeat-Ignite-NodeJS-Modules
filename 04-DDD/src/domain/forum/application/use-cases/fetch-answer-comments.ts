import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsRequest {
    answerId: string
    page: number
}

interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments = await this.answersCommentsRepository.findManyByAnswerId(answerId, { page })

    return {
      answerComments,
    }
  }
}
