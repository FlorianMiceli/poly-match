const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /music/song:
 *   get:
 *     description: Search a song 
 *     tags:
 *       - Music
 *     parameters:
 *       - name: song_name
 *         type: string
 */
router.get('/song', async (req, res) => {
    try {
        const response = await fetch(
            `https://musicbrainz.org/ws/2/recording/?query=${req.query.song_name}&limit=5&fmt=json`,
            {
                headers: {
                    'User-Agent': 'PolyMusicMatch/1.0.0 ( florian.82.miceli@gmail.com )'
                }
            }
        );
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log('Error /music/song:', error);
        res.status(500).send({ error_message: error.message })
    }
});

/**
 * @swagger
 * /music/releaseCover:
 *   get:
 *     description: Get the cover of a release 
 *     tags:
 *       - Music
 *     parameters:
 *       - name: release_id
 *         type: string
 */
    router.get('/releaseCover', async (req, res) => {
    try {
        const response = await fetch(
            `https://coverartarchive.org/release/${req.query.release_id}`
        )
        let data
        try {
            // if data is not json, coverartarchive is returning an error message
            data = await response.json()
        } catch (error) {
            data = {}
        }
        res.send(data);
    } catch (error) {
        console.log('Error /music/releaseCover:', error);
        res.status(500).send({ error_message: error.message })
    }
});

module.exports = router;