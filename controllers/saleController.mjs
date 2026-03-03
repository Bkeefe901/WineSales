import Sale from "../models/saleSchema.mjs";
import User from "../models/userSchema.mjs";

const getAllSales = async (req, res) => {
  try {
    const user = req.params.id;

    const allSales = await Sale.find({ user: user });

    res.json(allSales);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const createNewSale = async (req, res) => {
  try {
    const { user, invoiceId, saleDate, shopName, total, wines } = req.body;

    if (!shopName || !total || !user || !invoiceId) {
      return res.status(400).json({
        msg: `The fields: user (userId), invoiceId, shopeName, and total are
            required`,
      });
    }

    const existingUser = await User.findOne({ _id: user });

    if(!existingUser){
      return res.status(400).json({ msg: `No user exists with the ID: ${user}`});
    }

    const sale = await Sale.create({
      user,
      invoiceId,
      saleDate,
      shopName,
      total,
      wines
    });

    res.json({ msg: "New Sale Created: ", sale});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// const getSaleById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const sale = await Sale.findById(id);
//     res.json(sale);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: err.message });
//   }
// };

const updateSale = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSale = await Sale.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSale) {
      return res.status(404).json({ msg: "Sale not found" });
    }
    res.json({ msg: `Sale was updated: `, updatedSale});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSale = await Sale.findByIdAndDelete(id);

    if(!deletedSale){
      res.status(404).json({ msg: `The sale with id: ${id}, does not exist`})
    }

    res.json({ msg: `Sale succesfully deleted: `, deletedSale });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

export default {
  createNewSale,
  getAllSales,
  updateSale,
//getSaleById,
  deleteSale,
};
