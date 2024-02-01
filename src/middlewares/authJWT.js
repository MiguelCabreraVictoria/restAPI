import jwt from 'jsonwebtoken';
import User from '../models/User'
import Role from '../models/Role';

export const verifyToken = async (req, res, next) =>{
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(403).json("Not Token Provided");
    const decoded = jwt.verify(token, 'secret key');
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password: 0});
    console.log(user)

    if (!user){
        return res.json("Not User Found")
    }

    next()
}

export const isModerator = async (req, res, next)=>{
    const user  = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in: user.roles}}) 

    console.log(roles)

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'moderator'){
            next()
            return
        }

    }
    res.json("Require moderator Role")
}

export const isAdmin = async (req, res, next)=>{
    const user  = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in: user.roles}}) 

    console.log(roles)

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'admin'){
            next()
            return
        }

    }
    res.json("Require admin Role")
}