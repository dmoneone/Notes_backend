const path = require('path')
const fs = require('fs')

class Notes {

    constructor(note) {
        this.title = note.title
        this.id = note.id,
        this.descr = note.descr
    }

    static async fetchData() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'database', 'db.json'), 'utf-8', (err, data) => {
                if(err) reject(err)
                else resolve(JSON.parse(data))
            })
        })
    }

    static async writeToDB(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'database', 'db.json'), JSON.stringify(data), err => {
                if(err) reject(err)
                else resolve(true)
            })
        })
    }

    async save() {
        const note = {
            title: this.title,
            id: this.id,
            date: new Date().toDateString(),
            descr: this.descr
        }

        const notes = await Notes.fetchData()
        notes.push(note)
        await Notes.writeToDB(notes)
    }

    static async findById(id) {
        const notes = await Notes.fetchData()

        return notes.findIndex(note => note.id === id)
    }

    static async removeNote(id) {
        const notes = await Notes.fetchData()
        const ind = await Notes.findById(id)

        notes.splice(ind, 1)
        await Notes.writeToDB(notes)
    }

    static async updateNote(id, title, descr) {
        const notes = await Notes.fetchData()
        const ind = await Notes.findById(id)
        
        notes[ind].title = title 
        notes[ind].descr = descr 

        await Notes.writeToDB(notes)     
    }
}

module.exports = Notes