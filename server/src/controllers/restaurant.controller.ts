import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Restaurant } from "../models/restaurant.model";
import { Request, Response } from "express";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import { Menu } from "../models/menu.model";
import { Order } from "../models/order.model";
// createRestautant
const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;

  const { restaurantName, city, deliveryTime, cuisines } = req.body;

  if ([restaurantName, city].some((field) => field.trim() === ""))
    throw new ApiError(400, "restaurant name or city is missing");

  if (deliveryTime < 0) throw new ApiError(400, "Delivery time cannot be zero");

  if (cuisines?.legnth == 0)
    throw new ApiError(400, "cuisines or menu is missing");

  let response: string | null = "";
  if (req.file && req.file.path) {
    response = await uploadImageOnCloudinary(req.file.path);
    if (response?.trim() === "")
      throw new ApiError(404, "image upload not possible");
  }

  const alreadyOwer = await Restaurant.findOne({user : _id});

  if(alreadyOwer)
    throw new ApiError(400 , 'restaurant already registered for this user!');

  const newRestaurant = await Restaurant.create({
    restaurantName,
    city,
    deliveryTime,
    cuisines,
   
    imageUrl: response == "" ? null : response,
    user: _id,
  });

  if (!newRestaurant)
    throw new ApiError(401, "Not able to create restaurant the moment!");

  return res
    .status(200)
    .json(
      new ApiResponse(201, "restaurant created successfully !", {
        newRestaurant,
      })
    );
});
// getRestaurantMenu
const getResturantMenu = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;

  const restaurantMenu = await Restaurant.findOne({ user: _id }).populate(
    "menu"
  );

  if (!restaurantMenu)
    return new ApiError(401, "not able to find the restaurant!");

  return res
    .status(201)
    .json(new ApiResponse(200, "menu found", { menu :  restaurantMenu.menu }));
});
// updateRestaurant
const updateRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;
  const { restaurantName, city, deliveryTime, cuisines } = req.body;
  console.log(typeof(cuisines))
  // find the restautrant
  const restaurant = await Restaurant.findOne({ user: _id });
  if (!restaurant) throw new ApiError(401, "restaurant not found ");

  if (restaurantName?.trim() !== "") restaurant.restaurantName = restaurantName;

  if (city?.trim() !== "") restaurant.city = city;

  if ([restaurantName, city].some((field) => field.trim() === ""))
    throw new ApiError(400, "restaurant name or city is missing");

  if (deliveryTime && deliveryTime !== restaurant.deliveryTime)
    restaurant.deliveryTime = deliveryTime;

  if (cuisines) {
    let cuisinesArray: string[] = [];
    
    if (typeof cuisines === 'string') {
      // If cuisines is a comma-separated string, split it
      cuisinesArray = cuisines.split(',').map(cuisine => cuisine.trim());
    } else if (Array.isArray(cuisines)) {
      // If it's already an array, use it directly
      cuisinesArray = cuisines;
    }

    // Validate cuisines
    if (cuisinesArray.length > 0) {
      if (cuisinesArray.some(cuisine => !cuisine || cuisine.trim() === '')) {
        throw new ApiError(400, "Invalid cuisine found in the array");
      }
      restaurant.cuisines = cuisinesArray;
    }
  }

  if (req.file && req.file.path) {
    const response = await uploadImageOnCloudinary(req.file.path);
    if (response?.trim() === "")
      throw new ApiError(404, "image upload not possible");

    restaurant.imageUrl = response;
  }

  await restaurant.save({validateBeforeSave : false});

  return res.status(200).json(
    new ApiResponse(200 , 'restaurant updated successfully !' , {restaurant})
  )
});

// getRestaurantOrder
const getRestaurantOrder = asyncHandler(async(req : Request , res : Response)=>{
    const restaurant_id = req.params._id

    const validRestaurant = await Restaurant.findById(restaurant_id)
    if(!validRestaurant)
        throw new ApiError(400 , 'not a valid restaurant');

    const orders = await Order.find({restaurant : restaurant_id});

    if(!orders)
        return res.status(201).json(
            new ApiResponse(200 , 'no orders found!' , {})
        )
    return res.status(200).json(
        new ApiResponse(200 , 'orders found' , {orders} )
    )
})
// updateOrderStatus
const updateOrderStatus = asyncHandler(async(req : Request , res : Response)=>{
    const {order_id , status} = req.body;
    if(!order_id)
        throw new ApiError(400 , 'order id not found');

    const validOrder = await Order.findOne({_id : order_id})

    if(!validOrder)
        throw new ApiError(404 , 'order not found');

    if(validOrder.status !== status)
        validOrder.status = status

    await validOrder.save({validateBeforeSave : false});

    return res.status(200).json(
        new ApiResponse(400 , 'order status updated ' , {status : validOrder?.status})
    )
})
// getSingleRestaurant
const searchRestaurant = asyncHandler(async(req : Request , res : Response)=>{
    const restaurant_id = req.params._id

    if(!restaurant_id)
        throw new ApiError(400 , 'restaurant id not found');

    const restaurant = await Restaurant.findById(restaurant_id);
    if(restaurant)
        throw new ApiError(404 , 'restaurant not found');

    return res.status(200).json(
       new ApiResponse(201 , 'restaurant found')
    )
})

// searchRestaurant
// remaning.......................
export { createRestaurant, getResturantMenu  , getRestaurantOrder , updateOrderStatus , searchRestaurant , updateRestaurant};
