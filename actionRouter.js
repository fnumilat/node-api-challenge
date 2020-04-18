const express = require("express")
const actionDb = require("./data/helpers/actionModel")

const router = express.Router()

//get a specific action by its ID from a specific project
router.get("/:id/actions/:id", (req, res) => {
    actionDb.get(req.params.id)
    .then((action) => {
        if (action) {
            res.json(action)
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "The actions information could not be retrieved." })
    })
})

//add a new action to a specific project
router.post("/:id/actions/", (req, res) => {
    if (!req.body.description, !req.body.notes) {
        return res.status(400).json({ errorMessage: "Please provide the description or the note for the action." })
    }

    const { id } = req.params
    actionDb.insert({...req.body, project_id: id})
    .then((action) => {
        res.json(action)
    })
    .catch((error) => {
        res.status(500).json({ error: "The action information could not be saved." })
    })
})

//udpate a specific action from a specific project
router.put("/:id/actions/:id", (req, res) => {
    if (!req.body.description, !req.body.notes) {
        return res.status(400).json({ errorMessage: "Please provide the description or the note for the action." })
    }
    actionDb.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json({message: "The information is updated"})
    })
    .catch((error) => {
        res.status(500).json({ error: "The action information could not be updated."})
    })
})

//delete a specific action from a specific project'
router.delete("/:id/actions/:id", (req, res) => {
    actionDb.remove(req.params.id)
    .then((action) => {
        res.status(200).json({message: "The action is deleted"})
    })
    .catch((error) => {
        res.status(500).json({ error: "The action could not be deleted."})
    })
})


module.exports = router