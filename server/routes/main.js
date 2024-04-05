const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// HOME
// GET
router.get('', async (req, res) => {

    try {
        const data = await Post.find();
        res.render('index', { title: 'Home index', data});
    } catch(error) {
        console.log(error);
    }

})


// POST: id
// GET
router.get('/post/:id', async (req, res) => {

    try {
        let slug = req.params.id;


        const data = await Post.findById({ _id: slug });
        res.render('post', { title: 'Post: ' + data.title, data});
    } catch(error) {
        console.log(error);
    }

})





router.get('/about', (req, res) => {
    res.render('about', { title: 'Abo0ut'});
})

module.exports = router;



// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Building a lbof [PART 2]",
//             body: "GWEwewgwe"
//         },
//         {
//             title: "BAnother 2f [PART 2]",
//             body: "Gthsh sit tedidfeere nonee"
//         }
//     ])
// }
// insertPostData();