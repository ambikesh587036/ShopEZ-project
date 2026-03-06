import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const currency = "bdt";
const deliveryCharges = 10;


// for formatting date
const formatDateTime = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const time = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return `${day}-${month}-${year} ${time}`;
};


// placing order using COD only
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: formatDateTime(Date.now())
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// dummy payment functions (disabled)
const placeOrderStripe = async (req, res) => {
    res.json({ success: false, message: "Stripe disabled" });
};

const placeOrderRazorpay = async (req, res) => {
    res.json({ success: false, message: "Razorpay disabled" });
};

const verifyStripe = async (req, res) => {
    res.json({ success: false, message: "Stripe disabled" });
};

const verifyRazorpay = async (req, res) => {
    res.json({ success: false, message: "Razorpay disabled" });
};


// admin orders
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// update status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Status Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export {
    verifyStripe,
    verifyRazorpay,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    formatDateTime
};


