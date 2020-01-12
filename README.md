# Programming Summative Assessment 2



## Getting Started

This is user's guide to Dumb Luck - a website where you can prove that you are amongst the luckiest people on Earth. Briefly, this website just gives you a random number between 1 and 7,000,000,000 (Earth population)

API documentation

There are get and post modules in API for my website.
There are also many types of entities:

People
Comment
Pictures

Methods:

Get /list is used to iterate all available data for the main table

Get /list/usernames/:username displays all information about a particular user: it is used for the search

Get /list/usernames/:username/... (3 methods) are used to get a specific data about the user: photo or the randomly assigned number or the comment

Post /add method add the information about you - a new user. The information includes your name, random number assigned to you, your comment, photo and a token which makes sure that you are logged in, otherwise it will throw an error 403.

Delete /list/usernames/:username deletes the user