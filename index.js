import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.get('/tweets', function(req, res){
    const listTweets = tweets.map(tweet =>{
        for(let i=0; i<users.length; i++){
            if(users[i].username === tweet.username){
                return {...tweet, avatar: users[i].avatar}
            }
        }
    })

    const lastTweets = listTweets.slice(-10).reverse();
        res.send(lastTweets);
        return;
    }
);

/*server.get('/tweets/:username', function(req, res){
    const {username} = req.params;
    console.log(username);
    console.log(tweets)
    const posts = users.find((post) => tweets.username === username);

    res.send(posts);

});*/


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