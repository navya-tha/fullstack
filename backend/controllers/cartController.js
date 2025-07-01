const userModel = require('../models/userModel');

const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = userData.cartData || {};
        const itemId = req.body.itemId;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.status(200).json({ cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = userData.cartData || {};
        const itemId = req.body.itemId;

        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(req.userId, { cartData });
        }

        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
