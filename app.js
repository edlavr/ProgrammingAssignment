let express = require('express');
let app = express();

app.use(express.static('client'));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

let data =
    [
        {
            "randomNumber": 146456467,
            "username": "Tony Stark",
            "quote": "I am Iron Man",
            "photo": "https://i.pinimg.com/564x/13/60/7c/13607c1dd5682967f5e3733f717d6ce7.jpg"
        },
        {
            "randomNumber": 25675675657,
            "username": "John Cena",
            "quote": "My name is John Cena",
            "photo": "https://shop.wwe.com/on/demandware.static/-/Sites/default/dw3c0e2459/images/slot/landing/superstar-landing/john-cena_ct.png"
        },
        {
            "randomNumber": 464920,
            "username": "Lana Del Rey",
            "quote": "I don't like summer",
            "photo": "https://images-na.ssl-images-amazon.com/images/I/81rtMLV8RoL.jpg"
        },
        {
            "randomNumber": 9995384,
            "username": "Felix Kjellberg",
            "quote": "Subscribe to PewDiePie",
            "photo": "https://ichef.bbci.co.uk/news/660/cpsprodpb/BC3A/production/_92868184_gettyimages-494848232.jpg"
        },
        {
            "randomNumber": 248593993,
            "username": "Jay-Z",
            "quote": "I love New York",
            "photo": "https://static.hiphopdx.com/2018/05/180528-JAY-Z-Paternity-Getty-800x600.jpg"
        },


        {
            "randomNumber": 27937583,
            "username": "`Vilat`",
            "quote": "Black Hole",
            "photo": "https://pbs.twimg.com/profile_images/1005494299625185280/Pg7DbcuW_400x400.jpg"
        },
        {
            "randomNumber": 100034343,
            "username": "Batman",
            "quote": "Where is detonator?",
            "photo": "https://www.sideshow.com/storage/product-images/9032461/batman_dc-comics_feature.jpg"
        },
        {
            "randomNumber": 8243892998,
            "username": "David Guetta",
            "quote": "DJ Society",
            "photo": "https://suntimesmedia.files.wordpress.com/2018/11/guetta.jpg?w=763"
        },
        {
            "randomNumber": 419299329,
            "username": "Kanye West",
            "quote": "Ye",
            "photo": "https://s1.r29static.com//bin/entry/4af/680x816,85/1975546/image.webp"
        },
        {
            "randomNumber": 344584970,
            "username": "Michael Jordan",
            "quote": "Swish swish",
            "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jordan_Lipofsky.jpg"
        },
        {
            "randomNumber": 189274381,
            "username": "Mario",
            "quote": "It's me",
            "photo": "https://upload.wikimedia.org/wikipedia/ru/thumb/1/15/Mario2small.jpg/500px-Mario2small.jpg"
        },
        {
            "randomNumber": 58939,
            "username": "Ariana Grande",
            "quote": "Thank you, next",
            "photo": "https://ichef.bbci.co.uk/news/660/cpsprodpb/339B/production/_103611231_gettyimages-966528980.jpg"
        },
        {
            "randomNumber": 340233,
            "username": "MLK",
            "quote": "I have a dream",
            "photo": "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2015%2F01%2Fmlk.jpeg&w=800&c=sc&poi=face&q=85"
        },
        {
            "randomNumber": 749349944,
            "username": "Michael Jackson",
            "quote": "Smooth Criminal",
            "photo": "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE1ODA0OTcxMjkwNTYwMDEz/michael-jackson-pepsi-commercial-raw.jpg"
        }
    ];

app.get('/list', function (req, resp){
    resp.send(data);
});

app.get('/list/usernames/:username', (req, res) => {
        const databit = data.find(c => c.username.toLowerCase() === req.params.username.toLowerCase());
        res.send(databit)
});

app.get('/list/usernames/:username/photo', (req, res) => {
        const databit = data.find(c => c.username.toLowerCase() === req.params.username.toLowerCase());
        res.send(databit.photo)
});

app.get('/list/usernames/:username/number', (req, res) => {
    const databit = data.find(c => c.username.toLowerCase() === req.params.username.toLowerCase());
    res.send(JSON.stringify(databit.randomNumber))
});

app.get('/list/usernames/:username/comment', (req, res) => {
    const databit = data.find(c => c.username.toLowerCase() === req.params.username.toLowerCase());
    res.send(databit.quote)
});

app.post('/add', function (req, resp) {
    const element = {
        "randomNumber": req.body.randomNumber,
        "username": req.body.username,
        "quote": req.body.quote,
        "photo": req.body.photo,
        "uid": req.body.uid
    };

    for(let i = 1; i < data.length; i += 1) {
        if (element.username === data[i].username) {
            resp.status(400).send({error: 'not logged in'});
        }
    }
    const token = req.body.uid;
    
    if(!token){
        resp.status(403).send({error: 'not logged in'});
        return;
    }
    data.push(element);
    resp.send('added')

});

app.delete('/list/usernames/:username', (req, res) => {
    const databit = data.find(c => c.username === JSON.parse(req.params.username));
    if (!databit) return res.status(404).send('not found');
    const index = data.indexOf(databit);
    data.splice(index, 1);
    res.send(databit);
});

module.exports = app;
