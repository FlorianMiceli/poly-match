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

module.exports = router;