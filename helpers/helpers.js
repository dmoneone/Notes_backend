const Notes = require('../models/notes')

module.exports = {
    async is404(id) {
        const ind = await Notes.findById(id)
        if(ind === -1) return true
        return false
    }
}