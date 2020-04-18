const express = require("express")
const projectDb = require("./data/helpers/projectModel")

const router = express.Router()


//get all the projects
router.get("/", (req, res) => {
    projectDb.get()
    .then((projects) => {
        res.json(projects)
    })
    .catch((error) => {
        res.status(500).json({ error: "The projects information could not be retrieved." })
    })
})

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

//create a new project
router.post("/", (req, res) => {
    projectDb.insert(req.body)
    .then((project) => {
        res.json(project)
    })
    .catch((error) => {
        res.status(500).json({ error: "The project information could not be saved." })
    })
})

//update a project with a specific ID
router.put("/:id", (req, res) => {
    if (!req.body.name, !req.body.description) {
        return res.status(400).json({ errorMessage: "Please provide the name or description for the user." })
    }
    projectDb.update(req.params.id, req.body)
    .then((project) => {
        res.status(200).json({message: "The information is updated"})
    })
    .catch((error) => {
        res.status(500).json({ error: "The project information could not be updated."})
    })
})

//remove a project
router.delete("/:id", (req, res) => {
    projectDb.remove(req.params.id)
    .then((project) => {
        res.status(200).json({message: "project is deleted"})
    })
    .catch((error) => {
        res.status(500).json({ error: "The project could not be deleted"})
    })
})

//get a project's actions
router.get("/:id/actions", (req, res) => {
    projectDb.getProjectActions(req.params.id)
    .then((actions) => {
        res.json(actions)
    })
    .catch((error) => {
        res.status(500).json({ error: "The projects information could not be retrieved." })
    })
})
module.exports = router