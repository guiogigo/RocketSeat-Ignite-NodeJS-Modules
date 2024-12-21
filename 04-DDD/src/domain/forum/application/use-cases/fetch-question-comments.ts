import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsRequest {
    questionId: string
    page: number
}

interface FetchQuestionCommentsResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionsCommentsRepository: QuestionsCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments = await this.questionsCommentsRepository.findManyByQuestionId(questionId, { page })

    return {
      questionComments,
    }
  }
}
