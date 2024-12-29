const express = require('express');
const router = express.Router();
const { createClient } = require("../supabase.js");
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});
const fs = require('fs');

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
        const supabase = createClient({ req, res });
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
router.get('/login', async (req, res) => {
    try {
        const supabase = createClient({ req, res });
        const { email, password } = req.query;
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
        const supabase = createClient({ req, res });
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
        const supabase = createClient({ req, res });
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
        const supabase = createClient({ req, res });
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
        const supabase = createClient({ req, res });
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
        const supabase = createClient({ req, res });
        const { user_id } = req.query;

        // Find matches for other users with the same favorite songs
        const { data, error } = await supabase
            .rpc('get_song_matches', { target_user_id: user_id })

        if (error) throw error;

        res.send(data);
    } catch (error) {
        console.log('Error /user/getSongMatches :', error);
        res.status(500).send({ error_message: error.message });
    }
})

router.get('/profile-picture', async (req, res) => {
  try {
    const supabase = createClient({ req, res });
    const { user_id } = req.query;
    
    const { data, error } = await supabase
      .storage
      .from('profile_pictures')
      .createSignedUrl(`${user_id}.jpg`, 3600); // URL valid for 1 hour

    if (error) {
        console.log('Error getting profile picture:', error);
        res.send('')
        return
    }
    res.send(data.signedUrl);
  } catch (error) {
    console.error('Error getting profile picture:', error);
    res.status(500).send({ error_message: 'Failed to get profile picture' });
  }
});

router.post('/updateProfilePicture', upload.single('file'), async (req, res) => {
  try {
    const supabase = createClient({ req, res });
    // const { user_id } = req.body
    const user = await supabase.auth.getUser();
    const user_id = user.data.user.id;
    const file = req.file;

        // Convert the file buffer to Uint8Array which Supabase expects
        const fileBuffer = new Uint8Array(file.buffer);

        // Try to update first
        const { data, error } = await supabase
            .storage
            .from('profile_pictures')
            .update(`${user_id}.jpg`, fileBuffer, {
                contentType: 'image/jpeg',
                upsert: true
            });
            
        if (error && error.message === "Object not found") {
            // If update fails because file doesn't exist, try uploading
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('profile_pictures')
                .upload(`${user_id}.jpg`, fileBuffer, {
                    contentType: 'image/jpeg'
                });
            
            if (uploadError) throw uploadError;
        } else if (error) {
            throw error;
        } 
        res.status(200).send('Profile picture updated');
        
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).send({ error_message: error.message || 'Failed to update profile picture' });
    }
});

router.post('/deleteProfilePicture', async (req, res) => {
    try {
        const supabase = createClient({ req, res });
        const { user_id } = req.body;

        const { data, error } = await supabase
            .storage
            .from('profile_pictures')
            .remove([`${user_id}.jpg`]);
            
        if (error) throw error;
        
        res.send(data);
    } catch (error) {
        console.error('Error deleting profile picture:', error);
        res.status(500).send({ error_message: error.message || 'Failed to delete profile picture' });
    }
});

module.exports = router