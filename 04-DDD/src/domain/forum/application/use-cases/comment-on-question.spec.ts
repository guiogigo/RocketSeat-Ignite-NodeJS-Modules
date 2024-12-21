
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase
// sut : System Under Test

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
        inMemoryQuestionsRepository,
        inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()


    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Comentário teste')
  })
})
