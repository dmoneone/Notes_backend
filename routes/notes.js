const { Router } = require('express')
const Notes = require('../models/notes')
const shortid = require('shortid')
const { is404 } = require('../helpers/helpers')
const {body, validationResult} = require('express-validator/check')
const validators = require('../utils/validators')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const notes = await Notes.fetchData()
        notes.forEach(note => delete note.descr)

        res.json({ notes })
    } catch(e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        if(await is404(req.params.id)) return res.status(404).json({ error: 'no such user' })
        const notes = await Notes.fetchData()
        const ind = await Notes.findById(req.params.id)

        res.json({ note: notes[ind] })
    } catch(e) {
        console.log(e)
    }
})

router.post('/', validators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({ //422 some errs with validation
                error: errors.array()[0].msg
            })
        }

        if(!req.body.title || !req.body.descr) return res.json({ message: 'title and descr are undefined' })

        const id = shortid.generate()
        const note = new Notes({
            title: req.body.title,
            id,
            descr: req.body.descr
        })
    
        await note.save()
    
        res.json({
            message: 'note added',
            id
        })
    } catch(e) {
        console.log(e)
    }
})

router.put('/:id', validators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({ //422 some errs with validation
                error: errors.array()[0].msg
            })
        }

        if(!req.body.title || !req.body.descr) return res.json({ message: 'title and descr are undefined' })
        if(await is404(req.params.id)) return res.status(404).json({ error: 'no such user' })

        await Notes.updateNote(req.params.id, req.body.title,  req.body.descr)

        res.json({
            message: 'note updated',
            id: req.params.id
        })
    } catch(e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        if(await is404(req.params.id)) return res.status(404).json({ error: 'no such user' })
        await Notes.removeNote(req.params.id)

        res.json({
            message: 'note removed',
            id: req.params.id
        })
    } catch(e) {
        console.log(e)
    }
})

module.exports = router