const express = require("express")
const projectDb = require("./data/helpers/projectModel")

const router = express.Router()

//get a project with specific ID
router.get("/:id", (req, res) => {
    projectDb.get(req.params.id)
    .then((project) => {
        if (project) {
            res.json(project)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "The project information could not be retrieved." })
    })
})

module.exports = router