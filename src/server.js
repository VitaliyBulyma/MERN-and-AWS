import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const articleInfo = {
    'learn-react' : {
        upvotes: 0,
        comments: []
    },
    'learn-node': {
        upvotes:0,
        comments: []
    },
    'my-thoughts-on-resume': {
        upvotes:0,
        comments: []
    },
};

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

app.post('/api/articles/:name/upvote', (req,res)=>{
    const articleNAme =req.params.name;
    articleInfo[articleNAme].upvotes +=1;
    res.status(200).send(`${articleNAme} now has ${articleInfo[articleNAme].upvotes}`);
});
app.post('/api/articles/:name/add-comment', (req, res)=>{
    const {username, text} =req.body;
    const articleNAme =req.params.name;

    articleInfo[articleNAme].comments.push({username, text});
    res.status(200).send(articleInfo[articleNAme]);

});

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, ()=> console.log("server started at 8000..."));