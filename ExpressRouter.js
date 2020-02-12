const express = require('express');
const Blog = require('./data/db.js');
const router = express.Router();

// Posts
    // GETS
      // GET	/api/posts
      router.get('/', (req, res) => {
                Blog.find().then(posts => {
                res.status(200).json(posts)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({errorMessage: "The posts information could not be retrieved."})
            });
        });

      // GET	/api/posts/:id
      router.get('/:id', (req, res) => {
        if (!req.params.id){
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
        }
        Blog.findById(req.params.id).then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "The posts information could not be retrieved."})
            });
        
        })  

    // POST
      // POST	/api/posts
      router.post('/', (req, res) => {
        const postContent = req.body;
         if (!postContent.title || !postContent.contents){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else { 
                Blog.insert(postContent)
                .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
            });
        }   
    });

    // DELETE
        // DELETE	/api/posts/:id
        router.delete('/:id', (req, res) => {
                if(!req.params.id){
                    res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
                } else { 
                    Blog.remove(req.params.id)
                    .then(post => {
                    res.status(200).json(post)
                })
                .catch(error => {
                    res.status(500).json({errorMessage: "The post could not be removed"})
                });
            }   
        });

    // PUT
        // PUT	/api/posts/:id
        router.put('/:id', (req, res) => {
            const postContent = req.body;

                if(!req.params.id){
                    res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
                } else if (!postContent.title || !postContent.contents){
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                } else { 
                    Blog.update(req.params.id, postContent)
                    .then(post => {
                    res.status(200).json(post)
                })
                .catch(error => {
                    res.status(500).json({errorMessage: "The post information could not be modified."})
                });
            }   
        });
         

// Comments 
    // GET
        // GET	/api/posts/:id/comments
        router.get('/:id/comments', (req, res) => {
            if (!req.params.id){
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
            }
            Blog.findCommentById(req.params.id).then(posts => {
                res.status(200).json(posts)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({errorMessage: "The comments information could not be retrieved."})
            });
            
        })  
    // POST
        // POST	/api/posts/:id/comments
        router.post('/:id/comments', (req, res) => {
            const {id} = req.params;
            const comment = { ...req.body, post_id: id }
            if(!comment){
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
            } else if (!comment.text){
                res.status(400).json({ errorMessage: "Please provide text for the comment."})
            } else { 
                Blog.insertComment(comment)
                .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({errorMessage: "There was an error while saving the comment to the database"})
            });
         }
        });
       

module.exports = router;