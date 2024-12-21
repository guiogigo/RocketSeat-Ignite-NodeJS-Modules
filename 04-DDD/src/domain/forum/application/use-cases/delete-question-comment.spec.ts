import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase
// sut : System Under Test

describe('Delete QuestionComment Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('questioncomment-1'),
    )

    inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      questionCommentId: 'questioncomment-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('questioncomment-1'),
    )

    inMemoryQuestionCommentsRepository.create(newQuestionComment)

    const result = await sut.execute({
      questionCommentId: 'questioncomment-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
