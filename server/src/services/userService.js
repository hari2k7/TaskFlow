import pool from '../config/db.js'
import bcrypt from 'bcrypt'

export async function registerUserService(userData) {
    const { name, email, password } = userData

        if(!name || !email || !password){
            throw new Error("All fields are required");
        }

        if(name.length < 3){
            throw new Error("Name must be atleast three charecters");
        }

        if(password.length < 8){
            throw new Error("Password must be atleast 8 charecters");
        }

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        )

        if(existingUser.rows.length > 0){
            throw new Error("Email already exists")
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const result = await pool.query(
            `INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING id, name, email`,
            [name, email, hashedpassword]
        )

        return result.rows[0];
}