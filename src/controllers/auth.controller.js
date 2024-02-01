import jwt from 'jsonwebtoken'
import User from '../models/User';
import Role from '../models/Role';


export const signUp = async (req,res)=>{
    const { username, email, password, roles} = req.body;
    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        

        if(roles){
            const foundRole = await Role.find({name: {$in: roles}})
            newUser.roles = foundRole.map(role => role._id)
            
        }else{
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id}, "secret key", {
            expiresIn: 86400
        })

        console.log(savedUser)
        res.json({token})



    } catch (error) {
        if (error.code === 11000){
            return res.json("Username or Email already exists")
        }
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email }).populate("roles");

        if (!userFound) {
            return res.status(400).json('User not found');
        }

        const matchedPassword = await User.comparePassword(password, userFound.password);

        if(!matchedPassword){
            return res.status(401).json({
                token:null,
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign({id: userFound._id}, 'secret key',{
            expiresIn: 86400
        })

        res.json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
