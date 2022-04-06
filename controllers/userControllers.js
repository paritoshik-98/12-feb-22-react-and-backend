const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("92920275652-tqg9eads4vhhm0cn4emei20ccolgtv55.apps.googleusercontent.com")

const getUser = async(req,res)=>{
    try {
        const userId = req.userid
        const user = await User.findOne({_id:userId})
        res.status(200).send(user)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}

// register = post /api/user/signup
const addUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    const user = await User.findOne({email:email})
    if(user){
        res.status(403).send('User already exists')
    }
    else{
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        
        const doc = new User({
            name:name,
            email:email,
            password:hash,
        })
        await doc.save()
        res.status(200).send('User registered successfully')
    });
    }
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

// login 
const loginUser = async(req,res,next)=>{
    try {
        const{email,password}=req.body
        console.log(email,password)
    const user = await User.findOne({email:email})
    if(user)
    {
        const match = await bcrypt.compare(password, user.password);
    if(match) {
        req.name = user.name;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        next()
    }
    else{
        res.status(403).send('incorrect password')
    }
    }
    else{
        res.status(404).send('register to continue')
    }
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
    
}

// Googlelogin 
const loginUserGoogle = async(req,res,next)=>{
    try {
        const {tokenId}=req.body
        console.log(tokenId)
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: "92920275652-tqg9eads4vhhm0cn4emei20ccolgtv55.apps.googleusercontent.com"
            // audience: process.env.CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();
        const user = await User.findOne({email:email})
        if(user)
        {
            req.name = user.name;
            req.email = user.email;
            req.userid = user._id;
            req.profile_pic = user.profile_pic;
            next()
        }
        // register if first login
        else{
            
            // const {name,email,profile_pic} = req.body;
        const password = 'default'
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const doc = new User({
                name:name,
                email:email,
                password:hash,
                profile_pic:picture
            })
            await doc.save()  
            const user = await User.findOne({email:email})
        if(user)
        {
            req.name = user.name;
            req.email = user.email;
            req.userid = user._id;
            req.profile_pic = user.profile_pic;
            next()
        }
        });
       }
    } catch (error) {
        res.status(500).send('internal server error')
    }

}


// generate accesstoken for loggedin user
const genToken = async(req,res) => {
    const at = jwt.sign({name:req.name,userid:req.userid,email:req.email},process.env.JWT_SECRET,{expiresIn:'10m'})
    const rt = jwt.sign({name:req.name,userid:req.userid,email:req.email},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.status(200).cookie('refreshtoken',rt,{
        maxAge:7*24*60*60*1000,
        path:'/',
        // secure:'false',
        httpOnly:true,
    })
    .send({at:at,user:{name:req.name,email:req.email,id:req.userid,profile_pic:req.profile_pic}})
}

// refresh access token
const refreshToken = async(req,res) => {
    const rt = req.cookies['refreshtoken']
    console.log(rt)
    try {
        const {userid,name,email} = jwt.verify(rt,process.env.JWT_SECRET)
        const actoken = jwt.sign({userid:userid,name:name,email:email},process.env.JWT_SECRET,{expiresIn:'10m'})
        res.status(200).send(actoken)
        console.log('sent new access token')
    } catch (error) {
        console.log(error)
        res.status(401).send('unauthorized')
    }
}

// update profile_pic
const updatePic = (req,res)=>{
    try {
        const id = req.userid // from auth user middleware
const {url} = req.body
console.log(id,url)
User.findOneAndUpdate({_id:id}, {profile_pic:url}, {new: true}, (err, doc) => {
    if (err) {
        res.status(500).send('something went wrong when updating profile_pic!')
    }

    res.status(200).send(doc)
});
    } catch (error) {
        res.status(500).send('internal server error')
    }
    
}


//update password
const updatePassword = async(req,res)=>{
    try {
        const token = req.body.jwt
        const pswd = req.body.pswd
        const {userid} = jwt.verify(token,process.env.JWT_SECRET)
        bcrypt.hash(pswd, saltRounds, function(err, hash) {
        User.findOneAndUpdate({_id:userid},{password:hash},{new: true}, (err, doc) =>{
            if (err) {
                console.log(err)
                res.status(500).send('something went wrong when updating password!')
            }
            res.status(200).send('password reset successfully')
        })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('link expired')
    }
        
    }

// logout
const logout = (req,res)=>{
    try {
        res.status(200).cookie('refreshtoken','',{
            maxAge:0,
            path:'/',
            httpOnly:true,
        })
        .send('logout successfull')
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}

var nodemailer = require('nodemailer');
const user = require("../models/user");

const emailPasswordLink = async(req,res)=>{
try {
	var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testblogplatform@gmail.com',
          pass: 'pari1411'
        }
      });

      console.log(req.body.email)

      const u = await user.findOne({email:req.body.email})

      const token  = jwt.sign({userid:u._id},process.env.JWT_SECRET,{expiresIn:'5m'})

      const link = `https://blog-test-1-april.herokuapp.com/reset/${token}`
      
      const data = `Click the link to reset password ${link} . This link is valid for 5 min`

      // verify jwt and set new password form in REACT

      var mailOptions = {
        from: 'testblogplatform@gmail.com',
        to: req.body.email,
        subject: 'PASSWORD RESET LINK',
        text: data
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send(err)
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('link sent')
        }
      });
} catch (err) {
	console.error(err);
    res.status(500).send(err)
}
}

module.exports = {addUser,getUser,loginUser,genToken,loginUserGoogle,updatePic,updatePassword,logout,refreshToken,emailPasswordLink}