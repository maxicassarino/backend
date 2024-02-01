import express from "express";

const router = express.Router()

router.get("/prueba", (req, res) => {
    res.render('index', {})
})

export default router