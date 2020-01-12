/* eslint-disable */
const request = require('supertest');
const app = require('./app');

let checkDeliaDerbyshire = function  (res) {

    const jContent = res.body;
    if(typeof jContent !== 'object'){
        throw new Error('not an object');
    }

    if(jContent.username !== 'David'){
        console.log(jContent);
        throw new Error('username should be David');
    }

    if(jContent.quote !== 'yeet'){
        throw new Error('comment should be yeet');
    }
}

/*
 * Thanks to Nico Tejera at https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
 * returns something like "access_token=concertina&username=bobthebuilder"
 */
function serialise (obj){
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).
join('&');
}

describe('Test the people service', () => {
    test('GET /list succeeds', () => request(app).
            get('/list').
            expect(200));

    test('GET /list returns JSON', () => request(app).
            get('/list').
            expect('Content-type', /json/));

    test('GET /list includes curly', () => request(app).
            get('/list').
            expect(/David/));

    test('GET /list/usernames/david succeeds', () => request(app).
            get('/list/usernames/david').
            expect(200));

    test('GET /list/usernames/david returns JSON', () => request(app).
            get('/list/usernames/david').
            expect('Content-type', /json/));

    test('GET /list/usernames/david includes name details', () => request(app).
            get('/list/usernames/david').
            expect(checkDeliaDerbyshire));


    test('POST /add needs access_token', () => request(app).
            post('/add').
            expect(403));

    test('POST /people cannot replicate', () => {
        const elements = {"username": "David",
            "uid": 'token'};

        return request(app).
            post('/add').
            send(serialise(elements)).
            expect(400);
    });

});
