import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';  

import Role from './Role'

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            ref: 'Role',
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.statics.encryptPassword = async (password)=> {
    //console.log(password)
    const salt = await bcrypt.genSalt(10);
    //console.log(salt)
    const hashPassword  = await bcrypt.hash(password, salt);
    //console.log(hashPassword)
    return hashPassword
};

userSchema.statics.comparePassword = async function (candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};

export default model('User', userSchema);
