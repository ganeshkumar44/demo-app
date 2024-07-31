const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const { getUsers, getUser, postUser, putUser, deleteUser } = require("../controllers/user.controller.js");

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", postUser);

router.put("/:id", putUser);

router.delete("/:id", deleteUser);

module.exports = router;