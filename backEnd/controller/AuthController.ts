import { Router } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_TOKEN || 'tokenkeytest';
const JWT_TOKEN_SSO = process.env.JWT_TOKEN || 'tokenkeysso';
const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: 'utilisateur créer'})
    } catch(error:any) {
        res.status(400).json({error: error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const{username, password} = req.body;
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password))) {
            throw new Error('Identifiants invalides')
        }
        const token = jwt.sign({userId: user.id}, JWT_TOKEN);
        const userNameById = await user.getUserByHisId();
        res.json({message: 'connecté avec succes',  token, userNameById});
        user.isConnected = true;
    }
     catch(error:any) {
        res.status(400).json({error: error.message});
     }
});

router.get('/sso', async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw new Error('Pas de header d\'autorisation');
        }
        //const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(authHeader, JWT_TOKEN);
        if(!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            throw new Error('Token invalide');
        }

        const user = await User.findById(decoded.userId);
            if(!user) {
                throw new Error('Utilisateur non trouvé');
            }

            const ssoToken = jwt.sign(
                {userId: user.id, username: user.username},
                JWT_TOKEN_SSO,
                {expiresIn: '9d'}
            );
            
            res.json({message: 'Connexion SSO ok', ssoToken})
    } catch(error) {
        res.status(400).json({error: error});
    }
});

router.get('/getUserByName/:username' , async (req, res) =>{
    try {
      const user = await User.findOne({username: req.params.username});
      res.json({ username: user?.username, userid: user?._id });
    }
   catch (error: any) {
    // En cas d'erreur message d'erreur
    res.status(400).json({ error: error.message });
  }});




export default router;