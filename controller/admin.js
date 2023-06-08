const Io = require('../Io');
const Data = new Io('./database/admin.json')
const Model = require('../models/adminModel')
const {v4:uuid} = require('uuid')
const jwt = require('jsonwebtoken')

const Register = async(req,res) => {
    const {user,pass} = req.body;
    const id = uuid()
    const data = await Data.Read();
    const userid = jwt.sign(id,"@secret")
    if (data.length == 0) {
        const newAdmin = new Model(
            id,
            user,
            pass
        )
        
        await Data.Write([newAdmin])
        res.status(201).json({token:userid})
    }
    else {
        res.status(400).json({message:"admin bor!!"})
    }
}


const Login = async(req, res) => {
    const Secret = "@secret"
    const admin = await Data.Read()
    console.log(admin);
    const { user, pass } = req.body;

    const userFilter = admin.find(u => { return u.user=== user && u.pass === pass });

    if (userFilter) {
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, Secret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const Secret = "@secret"

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, Secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};




module.exports = {
    Register,
    Login,
    authenticateJWT
}