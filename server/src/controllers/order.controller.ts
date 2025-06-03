import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Order } from "../models/order.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";
const findOrderStatus = asyncHandler(async (req, res) => {
  const order_id = req.body;
  if (!order_id) throw new ApiError(404, "order id not found");
  const validOrder = await Order.findById(order_id);
  if (!validOrder) throw new ApiError(404, "order not found with this id");
  return res
    .status(200)
    .json(new ApiResponse(200, "order status", validOrder.status));
});

const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { order_id, status } = req.body;
  console.log("req.body from updateStatus" , req.body)
  if (!order_id || !status)
    throw new ApiError(404, "orderId or order status not found");

  const validOrder = await Order.findById(order_id);
  if (!validOrder) throw new ApiError(404, "order not found with this id");

  validOrder.status = status;
  await validOrder.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "order status", validOrder.status));
});

const getDeliveredOrdersForUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  console.log(req.user?._id)
  const orders = await Order.find({ user: userId , status : { $in : "delivered"}}).populate('restaurant');

  if (!orders) {
    return res.status(200).json(new ApiResponse(200, "No orders found"));
  }

  return res.status(200).json(new ApiResponse(200, "orders found", orders));
});
const getPendingOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const orders = await Order.find({ user: userId , status : { $ne : "delivered"}}).populate('restaurant');

  if (!orders) {
    return res.status(200).json(new ApiResponse(200, "No orders found" , orders));
  }

  return res.status(200).json(new ApiResponse(200, "orders found", orders));
});
const findOrderForRestaurant = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const restaurant = await Restaurant.findOne({user : userId})

    if(!restaurant)
        throw new ApiError(404 , 'restaurant not found')

    const orders = await Order.find({restaurant: restaurant._id, status: { $ne: "delivered" }})
    if(!orders)
        res.status(200).json(
            new ApiResponse(200 , "No active orders found")
        )
    return res.status(200).json(
        new ApiResponse(200 , 'active orders' , orders)
    )
  }
);

const getAllOrdersForRestaurant = asyncHandler( async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const restaurant = await Restaurant.findOne({user : userId})

    if(!restaurant)
        throw new ApiError(404 , 'restaurant not found')

    const orders = await Order.find({restaurant: restaurant._id, status: { $in: "delivered" }})
    if(!orders)
        res.status(200).json(
            new ApiResponse(200 , "No active orders found")
        )
    return res.status(200).json(
        new ApiResponse(200 , 'active orders' , orders)
    )
  })
export { findOrderStatus, updateStatus, getDeliveredOrdersForUser , findOrderForRestaurant , getAllOrdersForRestaurant , getPendingOrders };
