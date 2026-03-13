import express from "express";
import {
  getEvents,
  getEventsByLocation,
  getEventById,
} from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/location/:locationId", getEventsByLocation);
router.get("/:id", getEventById);

export default router;
