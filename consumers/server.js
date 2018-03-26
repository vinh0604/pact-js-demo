import express from 'express'
import rp from 'request-promise-native'


export default function build(bookServiceUrl) {
    let app = express()
                .use(express.json())

    app.get('/users/:id', async (req, res) => {

        let favoriteBooks = await rp({
            uri: bookServiceUrl + '/favorites/' + req.params.id,
            json: true
        })

        res.json({
            id: req.params.id,
            user: "John Doe",
            favorites: favoriteBooks
        })
    })

    return app
}
