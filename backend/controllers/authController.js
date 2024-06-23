import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json("All fields are required")
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json("User not found")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json("Wrong password")
        }

        const token = createToken(user.id)
        res.status(200).json({ user, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json("All fields are required")
        }

        const exist = await User.findOne({ email })
        if (exist) {
            return res.status(400).json("User already exists, please try loging in");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json("Please enter a valid email")
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        const token = createToken(newUser.id)
        res.status(200).json({ newUser, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUser = async (req, res) => {
    const { id } = req.user.id
    try {
        const user = await User.findById(id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { loginUser, signupUser, getUser }
