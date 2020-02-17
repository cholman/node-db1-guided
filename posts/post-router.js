const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();


router.get('/', (req, res) => {
    // list of post
    // select from posts
    db.select(`*`).from('posts').then(posts => {
        res.status(200).json(posts)

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'failed to get posts' })
    })


});

router.get('/:id', (req, res) => {
    //a post by its id
    db('posts')
        .where({ id: req.params.id })
        .first() //grab the first item on returned array
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to get post" });
        })
});

router.post('/', (req, res) => {
    //add a post
    //insert into posts () values ()
    db('posts').insert(req.body, 'id') //will generate a warning in console when using sqlite, ignore that
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to add the post" });
        })
});

router.put('/:id', (req, res) => {
    //update a post
    const id = req.params.id;
    const changes = req.body;

    db('posts')
        .where({ id }) // remember to filter or all records will be updated (BAD PANDA!!)
        .update(changes) // could be partial changes, only one column is enough
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to update post"})
        })
});

router.delete('/:id', (req, res) => {
    //remove a post
    const id = req.params.id;
    db('posts')
        .where({ id }) // remember to filter or all records will be DELETED (BAD PANDA!!)
        .del() // could be partial changes, only one column is enough
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to delete post"})
        })
});

module.exports = router;