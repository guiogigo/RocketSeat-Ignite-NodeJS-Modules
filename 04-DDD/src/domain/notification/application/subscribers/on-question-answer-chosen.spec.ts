import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-questions-attachments-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { waitFor } from "test/utils/wait-for"
import { MockInstance } from "vitest"
import { OnQuestionBestAnswerChosen } from "./on-question-answer-chosen"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)

        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)

        inMemoryNotificationRepository = new InMemoryNotificationsRepository()
        sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationRepository)

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnQuestionBestAnswerChosen(
            inMemoryAnswersRepository,
            sendNotificationUseCase
        )
    })
    
    it('should send a notification when question has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({questionId: question.id})

        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })

    })
})