import Item from "../models/Item.js";

export const addItem = async (req, res, next) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;

    if (!itemName || !description || !type || !location || !date || !contactInfo) {
      return res.status(400).json({ message: "All item fields are required" });
    }

    const item = await Item.create({
      user: req.user.id,
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
    });

    const populatedItem = await item.populate("user", "name email");

    res.status(201).json({
      message: "Item added successfully",
      item: populatedItem,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllItems = async (_req, res, next) => {
  try {
    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate("user", "name email");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can update only your own entries" });
    }

    const allowedFields = [
      "itemName",
      "description",
      "type",
      "location",
      "date",
      "contactInfo",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();
    const updatedItem = await item.populate("user", "name email");

    res.json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own entries" });
    }

    await item.deleteOne();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const searchItems = async (req, res, next) => {
  try {
    const { name = "", type = "" } = req.query;

    const filters = {};

    if (name) {
      filters.itemName = { $regex: name, $options: "i" };
    }

    if (type) {
      filters.type = { $regex: `^${type}$`, $options: "i" };
    }

    const items = await Item.find(filters)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    next(error);
  }
};
