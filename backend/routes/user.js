const express = require('express');
const router = express.Router();
const { supabase } = require('../supabase.js');

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
                    school_major: req.body.school_major
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

module.exports = router