import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createAccessToken from "../libs/jwt.js"


//FUNCIONALIDAD PARA REGISTRAR
export const register = async (req, res) => {
  
  const {email, password, username} = req.body

  try {

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordHash,
      username
    })
    
    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id})
    
    res.cookie("token", token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAd: userSaved.createdAt,
      updatedAd: userSaved.updatedAt
    })
    
    
  
  } catch (error) {
    res.status(500).json({message: "error.message"})
  }
}


//FUNCIONALIDAD PARA LOGUEAR
export const login = async (req, res) => {
  
  const {email, password} = req.body

  try {

    const foundedUser = await User.findOne({email});   
    if(!foundedUser)
      return res.status(400).json({message: "usuario no encontrado en nuestra base de datos =("})

    const isMatch = await bcrypt.compare(password, foundedUser.password);
    if(!isMatch)
      return res.status(400).json({message: "credenciales inválidas"})
    
    const token = await createAccessToken({id: foundedUser._id})
    
    res.cookie("token", token)
    res.json({
      id: foundedUser._id,
      username: foundedUser.username,
      email: foundedUser.email,
      createdAd: foundedUser.createdAt,
      updatedAd: foundedUser.updatedAt
    })
    
    
  
  } catch (error) {
    res.status(500).json({message: "error.message"})
  }
}
