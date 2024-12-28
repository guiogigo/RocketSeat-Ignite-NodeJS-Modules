import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase
// sut : System Under Test

describe('Delete AnswerComment Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answercomment-1'),
    )

    inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      answerCommentId: 'answercomment-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answercomment-1'),
    )

    inMemoryAnswerCommentsRepository.create(newAnswerComment)

    const result = await sut.execute({
      answerCommentId: 'answercomment-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
