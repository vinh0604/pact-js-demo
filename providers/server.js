import express from 'express'

let app = express()
            .use(express.json())

app.get('/favorites/:userId', (req, res) => {
    res.json([
        {
            book: 'Sapien'
        },
        {
            book: 'Homo Deus'
        },
        {
            book: 'Data and Goliath'
        }
    ])
})

export default function start(port) {
    app.listen(port, () => "Provider started")
}
