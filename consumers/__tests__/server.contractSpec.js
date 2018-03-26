import { Pact } from '@pact-foundation/pact'
import pact from '@pact-foundation/pact-node'
import path from 'path'
import request from 'supertest'
import build from '../server'

const MOCK_PROVIDER_PORT = 3001
const MOCK_CONSUMER_API_PORT = 3000

describe('Pact', () => {
    const provider = new Pact({
        consumer: 'UserService',
        provider: 'BookService',
        port: MOCK_PROVIDER_PORT,
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        logLevel: 'INFO',
        spec: 2
    })

    const EXPECTED_BODY = [
        {
            book: 'Sapien'
        },
        {
            book: 'Homo Deus'
        },
        {
            book: 'Data and Goliath'
        }
    ]

    const app = build(`http://localhost:${MOCK_PROVIDER_PORT}`)


    context('/users/:id', () => {
        before((done) => {
            provider.setup()
                .then(() => {
                    return provider.addInteraction({
                        state: 'I have a list of favorite books',
                        uponReceiving: 'a request for favorite books for user with id 2',
                        withRequest: {
                            method: 'GET',
                            path: '/favorites/2',
                            headers: { 'Accept': 'application/json' }
                        },
                        willRespondWith: {
                            status: 200,
                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                            body: EXPECTED_BODY
                        }
                    })
                })
                .then(() => done())
        })

        it('should get the list of favorite books from BookService', (done) => {
            request(app)
                .get('/users/2')
                .expect('Content-Type', /application\/json/)
                .expect(200, {
                    id: 2,
                    user: 'John Doe',
                    favorites: EXPECTED_BODY
                }, done)
        })

        after((done) => {
            provider.finalize()
            let opts = {
                consumerVersion: "1.0.0",
                pactBroker: 'http://localhost:8080',
                pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')]
            }
            pact.publishPacts(opts).then(() => { done() })
        })
    })
})
