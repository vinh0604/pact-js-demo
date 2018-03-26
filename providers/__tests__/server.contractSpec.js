import { Verifier } from '@pact-foundation/pact'
import path from 'path'
import start from '../server'

start(3001)
describe('Pact Verification', () => {
    it('should verify contract for Book Service', (done) => {
        let opts = {
            provider: 'BookService',
            providerBaseUrl: 'http://localhost:3001',
            pactBrokerUrl: 'http://localhost:8080'
        }

        new Verifier().verifyProvider(opts).then(() => { done() })
    })
})
