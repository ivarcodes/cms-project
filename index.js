import express from 'express';
import {user}from '../new/userschema.js'
import connectDb from './db.js';



const app = express();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.get('/',(req,res)=>{
res.render('index');
})

//create users
app.post('/create', async (req, res) => {
    try {
        const { name, email, image } = req.body;
        // console.log(req.body)

        // validation of data from frontend
        if (!name || !email || !image) {
            return res.status(400).json({ message: "Name, email, and profile picture URL are required." });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        //creating a new user
        await user.create({ name, email, image });

        res.redirect('/read')

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
});



//look all users
app.get('/read',async(req,res)=>{
   let users  =await user.find();

    res.render('read',{users});
})

//delete user
app.get('/delete/:id', async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.redirect('/read');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
});

app.listen(3000,()=>{
    console.log("Server running...");
})