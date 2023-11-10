const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models");
const db = require("../db/connection");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const json = await Restaurant.findByPk(id);
  res.json(json);
});

router.post("/", [
  check("name").not().isEmpty(),
  check("location").not().isEmpty(),
  check("cuisine").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
  } else {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
  }
});

router.put("/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedRestaurant);
});

router.delete("/:id", async (req, res) => {
  const deletedRestaurant = await Restaurant.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedRestaurant);
});

module.exports = router;
