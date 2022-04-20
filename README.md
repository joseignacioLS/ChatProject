This is a fullstack project using the react, nodejs and mongoDB technologies

In order to make it run it is necessary to modify de db.mjs file to add the URL to de DB <databaseURL>.

## DEMO

https://dreamy-kashata-c2bb32.netlify.app/

1. First register your user
2. Create new conversation with another registered user
3. Start chatting

## FRONT
The front part is a mobile-first designed react web interface, which includes:
1. Login view
2. Register view
3. Chat list view
4. Chat view
5. Modal component (for alerts)

Features:
1. User register and login
2. List of chats
3. User+nickname functionality
4. Unread messages functionality

## BACK

User API: +/user

1. +/allUsers --> Gets (GET) all users
2. +/getId/:id --> Gets (GET) the id of an user given an username
3. +/nick/:id --> Gets (GET) the nick of an user given an id
4. +/registerS --> Registers (POST) an user, providing the username, nick and password in the body of the request (user, nick and password parameters, respectively). Returns the user if the register is correct
5. +/loginS --> Logins (POST) the user. user and password parameters are passed as request body params. Answers with the user object if login is correct
6. +/delete/:id --> Deletes (DELETE) an user given an id. It also deletes all the conversations of this user
7. +/deleteAll --> Deletes (DELETE) all users and conversations
8. +/changeNick --> Updates (PUT) the nick of an user. Request body params: id, newNick and password.

Conversation API: +/conversation

1. +/getConversation?from=id1&to=id2 --> Gets (GET) a conversation between two users given two ids as query params (from and to keys). Returns the whole conversation
2. +/all --> Gets (GET) all the conversations
3. +/cleanDB --> Deletes (DELETE) all the conversations
4. +/:id --> Gets (GET) all the open conversations for the given user id. Returns an array of arrays. Second-dimensional array contains 3 elements: the nick of the other user in the conversation, the id of the other user in the conversation, and a bool indicating whether there is unread messages.
5. +/saveMsg --> Send (POST) a new message to a conversation. from (id), to (id) and msg (string) parameters are send as request body parameters. If the conversation exists, pushes a new message, if not creates a new conversation between the two given users.
6. +/setRead --> Updates (PUT) a conversation setting the messages of an user as read. from (id) and to (id) parameters are send as request body parameteres. All messages send to the "from" user in the conversation between the "from" and "to" users are marked as read.
7. +/remove --> Deletes (DELETE) a conversation between two users. from (id) and to (id) are passed as request body parameters.
