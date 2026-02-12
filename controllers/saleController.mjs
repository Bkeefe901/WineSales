import Sale from "../models/saleSchema.mjs";

const getAllSales = async (req, res) => {
  try {
    const {} = await Sale.find({});
    res.json(allSales);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const createNewSale = async (req, res) => {
  try {
    const { saleDate, shopName, total, wines } = req.body;

    if (!shopName || !total) {
      return res.status(400).json({
        msg: `The fields: saleDate, shopeName, and total are
            required`,
      });
    }

    const sale = await Sale.create({
      saleDate,
      shopName,
      total,
      wines,
    });

    res.status(201).json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const id = req.param.id;
    const sale = await Sale.findById(id);
    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const id = req.param.id;
    const updatedSale = await Sale.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSale) {
      return res.status(404).json({ msg: "Sale not found" });
    }
    res.json(updatedSale);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const id = req.param.id;
    const deletedSale = await Sale.findByIdAndDelete(id);
    res.json({ msg: `Sale deleted: `, deletedSale });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

export default {
  createNewSale,
  getAllSales,
  updateSale,
  getSaleById,
  deleteSale,
};

