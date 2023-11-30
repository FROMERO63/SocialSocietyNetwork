const users = [
    {
        username: "Frank1234",
        email: "firstuser1234@test.com",
        thoughts: [
            {
                thoughtText: "This is an initial thought. What do you think?",
                username: "firstuser1234@test.com"
            },
            {
                thoughtText: "I have lots of thoughts to tell you about",
                username: "firstuser1234@test.com"
            }]
    },
    {
        username: "fakeprofile5643",
        email: "profileisFake99@gmail.com",
        thoughts: [
            {
                thoughtText: "I dont have a lot of thoughts",
                username: "fakeprofile5643"
            },
            {
                thoughtText: "What were you thinking about today?",
                username: "fakeprofile5643"
            }]
    },
    {
        username: "simpleUser9876",
        email: "R3AL45@hotmail.com",
        thoughts: [
            {
                thoughtText: "Tell me about your weekend",
                username: "simpleUser9876"
            },
            {
                thoughtText: "I have the most comments",
                username: "simpleUser9876"
            },
            {
                thoughtText: "I need to go to the gym",
                username: "simpleUser9876"
            }]
    },
    {
        username: "b0ring12#",
        email: "tiredGuy22@gmail.com",
        thoughts: [
            {
                thoughtText: "I am super tired and bored",
                username: "b0ring12#"
            }]
    },
]

const thoughts= [
    {
        thoughtText: "Tired ZZZZZZZZZZZZ!!",
        username: "b0ring12#",
        reactions: [
            {
                responseBody: "Why are you so tired?",
                username: "simpleUser9876"
            }
        ]
    },
    {
        thoughtText: "I want to go on a trip. Any reccomendations?",
        username: "username1234",
        reactions: [
            {
                responseBody: "I think you would love Japan",
                username: "simpleUser9876"
            }
        ]
    },
    {
        thoughtText: "Today was a good day",
        username: "abcdeeee123333",
        reactions: [
            {
                responseBody: "Glad you had a good day",
                username: "LOLing56$"
            },
            {
                responseBody: "Me too!",
                username: "fakeprofile5643"
            }
        ]
    }
];



module.exports = {users, thoughts};