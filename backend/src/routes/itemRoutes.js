import express from "express";
import {
  addItem,
  deleteItem,
  getAllItems,
  getItemById,
  searchItems,
  updateItem,
} from "../controllers/itemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/search", searchItems);
router.get("/:id", getItemById);
router.post("/", authMiddleware, addItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

export default router;
