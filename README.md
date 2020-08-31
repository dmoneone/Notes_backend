# Notes Backend
## How to launch Backend?
1) git clone https://github.com/dmoneone/Notes_backend or download <br/>
2) npm install <br/>
3) npm start <br/>
*backend port - process.env.PORT || 3005*
## Docs
### get all notes
GET: *http://localhost:3005/api/notes* <br/>
### get specified notes
GET: *http://localhost:3005/api/notes/:id* <br/>
### create note
POST: *http://localhost:3005/api/notes* <br/>
body: { title: string, descr: string } <br/>
### update note
PUT: *http://localhost:3005/api/notes/:id* <br/>
body: { title: string, descr: string } <br/>
### delete note
DELETE: *http://localhost:3005/api/notes/:id* <br/>