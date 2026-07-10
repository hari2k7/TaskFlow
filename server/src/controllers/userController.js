import { registerUserService, loginUserService } from "../services/userService.js";

export async function registerUser(req, res) {
    try {
        const user = await registerUserService(req.body)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function loginUser(req, res) {
    try {
        const user = await loginUserService(req.body)

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}