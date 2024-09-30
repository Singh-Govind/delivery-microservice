const Delivery = require("../model/delivery");

const { STATUS_OK, STATUS_FORBIDDEN, STATUS_BAD_REQUEST } = require("../constants/status-codes");
const { throwError } = require("../utils/error-maker");
const { FORBIDDEN_ERROR, VALIDATION_ERROR } = require("../constants/error-constants");
const sendTask = require("../tasks/sendMsgQueue");

// main functions
const getStatus = async (req, res, next) => {
    try {
        const items = await Delivery.find({
            $and: [{ userId: req.user.id }, { $or: [{ status: "waiting" }, { status: "picked" }, { status: "en_route" }] }],
        });

        res.status(STATUS_OK).json({ msg: "list of items", deliveryItems: items, status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

const updateStatus = async (req, res, next) => {
    const { status, deliveryId } = req.body;
    const statusValues = ["waiting", "picked", "en_route", "delivered"];

    try {
        if (req.user.role !== "delivery-person") {
            throwError("You are not authorized to make this change", FORBIDDEN_ERROR, STATUS_FORBIDDEN);
        }

        if (!statusValues.includes(status)) {
            throwError("Status value is not as expected", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        await Delivery.findOneAndUpdate({ _id: deliveryId }, { status });
        const delivery = await Delivery.find({ _id: deliveryId });

        if (status === "delivered") {
            sendTask(delivery);
        }

        res.status(STATUS_OK).json({ msg: "delivery status updated", delivery, status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

const getItemsToDeliver = async (req, res, next) => {
    try {
        if (req.user.role !== "delivery-person") {
            throwError("You are not authorized to make this change", FORBIDDEN_ERROR, STATUS_FORBIDDEN);
        }

        const deliveryItems = await Delivery.find({ status: "waiting" });

        res.status(STATUS_OK).json({ msg: "Items to deliver", deliveryItems, status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { getStatus, updateStatus, getItemsToDeliver };
