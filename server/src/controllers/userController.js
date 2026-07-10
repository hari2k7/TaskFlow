import { registerUserService } from "../services/userService";

export async function registerUser (req, res) {
    try{
        const user = await registerUser(req,res)

        return res.status(201).json({
            success: true,
            user
        })

    }catch(error){
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}