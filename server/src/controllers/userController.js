import pool from '../config/db.js'
import bcrypt from 'bcrypt'

export async function registerUser (req, res) {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(name.length < 3){
            return res.status(400).json({
                success: false,
                message: "Name must be atleast three charecters"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 8 charecters"
            })
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const result = await pool.query(
            `INSERT INTO users(name, email, password)\
            VALUES($1, $2, $3)
            RETURNING id, name, email`,
            [name, email, hashedpassword]
        )

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.rows[0]
        })
    } catch(error){
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}