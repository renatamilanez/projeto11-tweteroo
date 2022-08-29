import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.get('/tweets', function(req, res){
    res.send(tweets);
});

server.post('/tweets', function(req, res){
    const {username, tweet} = req.body;

    if(username !== "" && username !== undefined && tweet !== "" && tweet !== undefined){
        tweets.push({
            username, 
            tweet
        });
        res.status(201).send(tweets);
    } else {
        res.status(400).send({error: "Todos os campos são obrigatórios!"});
        return;
    }
})

server.post('/sign-up', function(req, res){
    const {username, avatar} = req.body;

    if(username !== "" && username !== undefined && avatar !== "" && avatar !== undefined && avatar.includes('http')){
        users.push({
            username,
            avatar
        });
        res.status(201).send(users);
    } else {
        res.status(400).send({error: "Todos os campos são obrigatórios!"});
        return;
    }
})

server.listen(3000, () => console.log('Listening on 5000'));