const express = require('express');
const router = express.Router();
const { supabase } = require('../supabase.js');
const axios = require('axios');

/**
 * @swagger
 * /user/create:
 *   get:
 *     description: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                instagram_username:
 *                  type: string
 *                school_year:
 *                  type: string
 *                school_major:
 *                  type: string
 */
router.post('/create', async (req, res) => {
    try {
        // Sign up in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password
        });
        if (error) throw error

        // Insert user in Supabase User table
        const { data: data2, error: error2 } = await supabase
            .from("User")
            .insert([
                {
                    id: data.user.id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    instagram_username: req.body.instagram_username,
                    school_year: req.body.school_year,
                    school_major: req.body.school_major,
                    profile: {}
                },
            ])
            .select()
        if (error2) throw error2;

        res.send(data2);
    } catch (error) {
        console.error('Error /user/create :', error);
        res.status(500).send({ error_message: error.message });
    }
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Login user with email
 *     tags:
 *       - User
 *     parameters:
 *       - name: email
 *         type: string
 *       - name: password
 *         type: string
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error
        const { data: userData, error: error2 } = await supabase
            .from('User')
            .select('*')
            .eq('id', data.user.id)
            .single()
        if (error2) throw error2
        res.send(userData)
    } catch (error) {
        console.log('Error /user/login :', error);
        res.status(500).send({ error_message: error.message })
    }
});


/**
 * @swagger
 * /user/profile:
 *   get:
 *     description: Get the profile of a user
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User profile
 *       500:
 *         description: Server error
 */
router.get('/profile', async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).send({ error_message: "User ID is required" });
        }

        const { data, error } = await supabase
            .from('User')
            .select('profile')
            .eq('id', user_id)
            .single();

        if (error) throw error;

        res.send(data.profile);
    } catch (error) {
        console.error('Error /user/profile:', error);
        res.status(500).send({ error_message: error.message });
    }
});



/**
 * @swagger
 * /user/updateProfile:
 *   post:
 *     description: Update the profile of a user
 *     tags:
 *       - User
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                profile:
 *                  type: object
 *                user_id:
 *                  type: string
 */
router.post('/updateProfile', async (req, res) => {
    try {
        const { profile, user_id } = req.body;

        const { data, error } = await supabase
            .from('User')
            .update({ profile: profile })
            .eq('id', user_id)
            .select()

        if (error) throw error;

        res.send(data);
    } catch (error) {
        console.error('Error /user/updateProfile :', error);
        res.status(500).send({ error_message: error.message });
    }
});

/**
 * @swagger
 * /user/loginEmail:
 *   get:
 *     description: Login user with email
 *     tags:
 *       - User
 *     parameters:
 *       - name: email
 *         type: string
 *       - name: password
 *         type: string
 */
router.get('/loginEmail', async (req, res) => {
    try {
        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.query.email,
            password: req.query.password,
        })
        if (error) throw error

        // Get user data from Supabase User table
        const { data: userData, error: error2 } = await supabase
            .from('User')
            .select('*')
            .eq('id', data.user.id)
        if (error2) throw error2

        res.send(userData[0])
    } catch (error) {
        console.log('Error /user/loginEmail :', error);
        res.status(500).send({ error_message: error.message })
    }
})

/**
 * @swagger
 * /user/get:
 *   get:
 *     description: Get a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - name: user_id
 *         type: string
 *         description: The ID of the user to retrieve
 *         required: true
 *     responses:
 *       200:
 *         description: User data
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Server error
 */
router.get('/get', async (req, res) => {
    try {
        const { user_id } = req.query;
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('id', user_id)
            .single()
        if (error) throw error;
        res.send(data);
    } catch (error) {
        console.log('Error /user/get :', error);
        res.status(500).send({ error_message: error.message });
    }
})

router.get('/getSongMatches', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Find matches for other users with the same favorite songs
        const { data, error } = await supabase
            .rpc('get_song_matches', { target_user_id: user_id })

        if (error) throw error;

        console.log(data)
        res.send(data);
    } catch (error) {
        console.log('Error /user/getSongMatches :', error);
        res.status(500).send({ error_message: error.message });
    }
})





// Scrape instagram profile picture
// router.get('/instagram/profile-picture', async (req, res) => {
//     try {
//         // const test = await axios.get("https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/448021750_2038560433206788_1640816194731066395_n.jpg?stp=dst-jpg_e0_s150x150&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=XFnKR_1xuKYQ7kNvgHscTAc&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAJfaZOJE8IvuwcPBqOtBY0b4ucMFSQOdWaJUWOdhSdVw&oe=66F13605&_nc_sid=8b3546", {
//         //     headers: {
//         //       "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
//         //       "accept-language": "fr-FR,fr;q=0.9",
//         //       "priority": "i",
//         //       "sec-fetch-dest": "image",
//         //       "sec-fetch-mode": "cors",
//         //       "sec-fetch-site": "cross-site",
//         //       "Referer": "https://www.instagram.com/",
//         //       "Referrer-Policy": "strict-origin-when-cross-origin"
//         //     }
//         // });

//         // const test = await fetch("https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/448021750_2038560433206788_1640816194731066395_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=XFnKR_1xuKYQ7kNvgHscTAc&_nc_gid=576e3de4a2474e75b588f2011b53a500&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAuRl1E2SDZMCmQ-IKuxfIhLe1QR-9j30ajl-0cxF00iw&oe=66F28785&_nc_sid=8b3546", {
//         //     "headers": {
//         //       "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
//         //       "accept-language": "fr-FR,fr;q=0.9",
//         //       "priority": "i",
//         //       "sec-fetch-dest": "image",
//         //       "sec-fetch-mode": "no-cors",
//         //       "sec-fetch-site": "cross-site",
//         //       "Referer": "https://www.instagram.com/",
//         //       "Referrer-Policy": "strict-origin-when-cross-origin"
//         //     },
//         //     "body": null,
//         //     "method": "GET"
//         // });

//         const test = await axios.get("https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/448021750_2038560433206788_1640816194731066395_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=XFnKR_1xuKYQ7kNvgHscTAc&_nc_gid=576e3de4a2474e75b588f2011b53a500&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAuRl1E2SDZMCmQ-IKuxfIhLe1QR-9j30ajl-0cxF00iw&oe=66F28785&_nc_sid=8b3546", {
//             headers: {
//               "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
//               "accept-language": "fr-FR,fr;q=0.9",
//               "priority": "i",
//               "sec-fetch-dest": "image",
//               "sec-fetch-mode": "no-cors",
//               "sec-fetch-site": "cross-site",
//               "Referer": "https://www.instagram.com/",
//               "Referrer-Policy": "strict-origin-when-cross-origin"
//             }
//         });
        

//         // Convert the image data to base64
//         const base64Image = Buffer.from(test.data, 'binary').toString('base64')

//         console.log(base64Image)    
        
//         // Set the response content type to JSON
//         res.set('Content-Type', 'image/jpeg');
        
//         // Send the base64 encoded image data
//         return res.json({ image: base64Image });

//         res.set('Content-Type', 'image/jpeg');
//         res.send(test.data);
//     } catch (error) {
//         console.log('Error /user/instagram/profile-picture :', error);
//         res.status(500).send({ error_message: error.message });
//     }
// });

// // Scrape instagram profile picture
// router.get('/instagram/profile-picture2', async (req, res) => {
//     // const response = await axios.get('https://www.instagram.com/f_mcl/', {
//     //     headers: {
//     //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//     //         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     //         'Accept-Language': 'en-US,en;q=0.9',
//     //         'Accept-Encoding': 'gzip, deflate, br',
//     //         'Connection': 'keep-alive',
//     //         'Upgrade-Insecure-Requests': '1',
//     //         'Cache-Control': 'max-age=0',
//     //     }
//     // });
//     const response = await fetch('https://www.instagram.com/f_mcl/',  { headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//                 'Accept-Language': 'en-US,en;q=0.9',
//                 'Accept-Encoding': 'gzip, deflate, br',
//                 'Connection': 'keep-alive',
//                 'Upgrade-Insecure-Requests': '1',
//                 'Cache-Control': 'max-age=0',
//             }
// });
//     const $ = cheerio.load(response);
//     // const imageUrl = $('div.mount_0_0_yD > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div:nth-child(2) > div > div.x10o80wk.x14k21rp.xh8yej3.x8vgawa > section > main > div > div.x7a106z.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x11njtxf.xwonja6.x1dyjupv.x1onnzdu.xwrz0qm.xgmu61r.x1nbz2ho.xbjc6do > div.x9f619.xjbqb8w.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1oa3qoh.x6s0dn4.x1amjocr.x78zum5.xl56j7k').text()
//     const imageUrl = $('div.mount_0_0_yD > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div:nth-child(2) > div > div.x10o80wk.x14k21rp.xh8yej3.x8vgawa > section > main > div > div.x7a106z.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x11njtxf.xwonja6.x1dyjupv.x1onnzdu.xwrz0qm.xgmu61r.x1nbz2ho.xbjc6do > div.x9f619.xjbqb8w.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1oa3qoh.x6s0dn4.x1amjocr.x78zum5.xl56j7k').text()
//     console.log('Image URL:', imageUrl)
    
    
//     // if (imageUrl) {
//     //     const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     //     const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
//     //     res.set('Content-Type', 'image/jpeg');
//     //     res.send(base64Image);
//     // } else {
//     //     res.status(404).send('Profile picture not found');
//     // }
// });

module.exports = router