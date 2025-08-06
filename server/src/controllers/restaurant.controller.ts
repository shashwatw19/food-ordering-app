import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Restaurant } from "../models/restaurant.model";
import { Request, Response } from "express";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import { Menu } from "../models/menu.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";
// createRestautant
const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;
  console.log("REQUEST :", req.body);
  const { restaurantName, city, country, deliveryTime, cuisines, address } =
    req.body;

  if (
    [restaurantName, city, country, address].some((field) => field?.trim() == "")
  )
    throw new ApiError(400, "restaurant name or city is missing");

  if (deliveryTime < 0) throw new ApiError(400, "Delivery time cannot be zero");

  let cuisinesArray: string[] = [];
  console.log("cuisines from req , " , cuisines)
  try {
    cuisinesArray = JSON.parse(cuisines)
      ?.map((cuisine: string) => cuisine?.trim())
      .filter((cuisine: string) => cuisine.length > 0);
  } catch (e) {
    console.log("Error parsing cuisines:", e);
  }

  let response: string | null = "";
  if (req.file && req.file.path) {
    response = await uploadImageOnCloudinary(req.file.path);
    if (response?.trim() === "")
      throw new ApiError(404, "image upload not possible");
  }

  const alreadyOwer = await Restaurant.findOne({ user: _id });

  if (alreadyOwer)
    throw new ApiError(400, "restaurant already registered for this user!");

  const newRestaurant = await Restaurant.create({
    restaurantName,
    city,
    deliveryTime,
    cuisines: cuisinesArray,
    country,
    address,
    imageUrl: response == "" ? null : response,
    user: _id,
  });

  if (!newRestaurant)
    throw new ApiError(401, "Not able to create restaurant the moment!");
  
  
  await User.findByIdAndUpdate(_id , {
    isAdmin : true
  })
  return res
    .status(200)
    .json(
      new ApiResponse(201, "restaurant created successfully !", newRestaurant)
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
    .json(new ApiResponse(200, "menu found",  {menu: restaurantMenu.menu} ));
});
// updateRestaurant
const updateRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;
  const { restaurantName, city, deliveryTime, cuisines } = req.body;
  console.log(typeof cuisines);
  // find the restautrant
  const restaurant = await Restaurant.findOne({ user: _id });
  if (!restaurant) throw new ApiError(401, "restaurant not found ");

  if (restaurantName?.trim() !== "") restaurant.restaurantName = restaurantName;

  if (city?.trim() !== "") restaurant.city = city;

  if ([restaurantName, city].some((field) => field.trim() === ""))
    throw new ApiError(400, "restaurant name or city is missing");

  if (deliveryTime && deliveryTime !== restaurant.deliveryTime)
    restaurant.deliveryTime = deliveryTime;

  let cuisinesArray: string[] = [];
  console.log("cuisines from req , " , cuisines)
  if (cuisines) {
    try {
      cuisinesArray = JSON.parse(cuisines)
        ?.map((cuisine: string) => cuisine.trim())
        .filter((cuisine: string) => cuisine.length > 0);
      restaurant.cuisines = cuisinesArray
    } catch (e) {
      console.log("Error parsing cuisines:", e);
    }
  }

  if (req.file && req.file.path) {
    const response = await uploadImageOnCloudinary(req.file.path);
    if (response?.trim() === "")
      throw new ApiError(404, "image upload not possible");

    restaurant.imageUrl = response;
  }

  await restaurant.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "restaurant updated successfully !", { restaurant })
    );
});

// getRestaurantOrder
const getRestaurantOrder = asyncHandler(async (req: Request, res: Response) => {
  const restaurant_id = req.params._id;

  const validRestaurant = await Restaurant.findById(restaurant_id);
  if (!validRestaurant) throw new ApiError(400, "not a valid restaurant");

  const orders = await Order.find({ restaurant: restaurant_id });

  if (!orders)
    return res.status(201).json(new ApiResponse(200, "no orders found!", {}));
  return res.status(200).json(new ApiResponse(200, "orders found", { orders }));
});
// updateOrderStatus
const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { order_id, status } = req.body;
  if (!order_id) throw new ApiError(400, "order id not found");

  const validOrder = await Order.findOne({ _id: order_id });

  if (!validOrder) throw new ApiError(404, "order not found");

  if (validOrder.status !== status) validOrder.status = status;

  await validOrder.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(400, "order status updated ", {
        status: validOrder?.status,
      })
    );
});
// getSingleRestaurant
const searchRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const restaurant_id = req.params._id;

  if (!restaurant_id) throw new ApiError(400, "restaurant id not found");

  const restaurant = await Restaurant.findById(restaurant_id);
  if (restaurant) throw new ApiError(404, "restaurant not found");

  return res.status(200).json(new ApiResponse(201, "restaurant found"));
});

// searchRestaurant
const searchRestaurantWithFilters = asyncHandler(
  async (req: Request, res: Response) => {
   
    const searchLocation = req.params.location || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((item) => item);
      console.log(searchLocation ,searchQuery,selectedCuisines)
    const query: any = {};

    if (searchLocation) {
       query.city = { $regex: `^${searchLocation}$`, $options: "i" };
    }
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (selectedCuisines?.length > 0) {
      // Use case-insensitive regex matching for cuisines
      query.cuisines = { 
        $in: selectedCuisines.map(cuisine => new RegExp(cuisine, "i"))
      };
    }

    console.log("Final query:", JSON.stringify(query, null, 2));
    const restaurants = await Restaurant.find(query);
    console.log("Found restaurants:", restaurants.length);
    return res
      .status(200)
      .json(new ApiResponse(200, "query completed", restaurants));
  }
);
const getRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id;
  const restaurant = await Restaurant.findOne({ user: _id }).populate('menu');
  if (!restaurant) {
    return res.status(200).json(new ApiResponse(200, "no restaurant found"));
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "restaurant found", restaurant));
});
const getSingleRestaurant = asyncHandler(async(req : Request , res :Response)=>{
  const {_id} = req.params
  if(!_id)
    throw new ApiError(404 , 'restaurant id not found ')
  const restaurant = await Restaurant.findById(_id).populate('menu')

  if(!restaurant){
    throw new ApiError(404 , 'restaurant not found')
  }

  return res.status(200).json(
    new ApiResponse(200 , 'Restaurant found' , restaurant )
  )

})
// remaning.......................
export {
  createRestaurant,
  getResturantMenu,
  getRestaurant,
  getRestaurantOrder,
  updateOrderStatus,
  searchRestaurant,
  updateRestaurant,
  searchRestaurantWithFilters,
  getSingleRestaurant
};
