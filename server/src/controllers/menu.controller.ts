
import mongoose  , {Types}from "mongoose";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import { Request , Response } from "express";
import { IMenu } from "../models/menu.model";
//get Menu for restaurant


// addMenu
const addMenu = asyncHandler(async(req: Request, res: Response) => {
    const _id = req.user?._id;
   
    // Log the request body to debug
    console.log("Request body:", req.body);
    
    const { name, description, price } = req.body;
    
    // Validate required fields
    if(!name || !description || !price) {
        throw new ApiError(400, 'Name, description and price are required');
    }

    // Validate string fields
    if([name, description].some((field) => 
        typeof field !== 'string' || field.trim() === "")) {
        throw new ApiError(400, 'Name and description must be non-empty strings');
    }

    // Validate price
    const numericPrice = Number(price);
    if(isNaN(numericPrice) || numericPrice < 0) {
        throw new ApiError(400, 'Price must be a positive number');
    }

    let imageUrl: string | null = null;

    if(req.file?.path) {
        const response = await uploadImageOnCloudinary(req.file.path);
        if(!response) {
            throw new ApiError(400, 'Failed to upload image');
        }
        imageUrl = response;
    }

    const menu = await Menu.create({
        name: name.trim(),
        description: description.trim(),
        price: numericPrice,
        imageUrl
    });

    if(!menu) {
        throw new ApiError(500, 'Failed to create menu item');
    }

    const restaurant = await Restaurant.findOne({ user: _id });
    
    if(!restaurant) {
        await Menu.findByIdAndDelete(menu._id)
        throw new ApiError(404, 'Restaurant not found');
    }

    (restaurant.menu as mongoose.Schema.Types.ObjectId[]).push(menu._id)
    
    await restaurant.save({ validateBeforeSave: false });

    return res.status(201).json(
        new ApiResponse(201, 'Menu item created successfully', {menu}  )
    );
});

// updateMenu
const updateMenu = asyncHandler(async(req : Request , res : Response)=>{
   
    const restaurant_id = req.user?._id
    const { name , description , price , _id} = req.body;
    console.log("Resquest " , req.body)
    const restaurant = await Restaurant.findOne({user  : restaurant_id});
    if(!restaurant)
        throw new ApiError(400 , 'restaurant not found');
    const availableMenu = await Menu.findById(_id);
    if(!availableMenu)
        throw new ApiError(400 , 'Menu not avalaible');
    if(name?.trim() !== "")
        availableMenu.name = name
    if(description!.trim() != "")
        availableMenu.description = description
    if(Number(price) > 0 )
        availableMenu.price = price

    if(req.file && req.file.path){
        const response = await uploadImageOnCloudinary(req.file.path)
        if(response?.trim() == "")
            throw new ApiError(404 , 'not able to upload image on Cloudinary');
        availableMenu.imageUrl = response
    }
    
    await availableMenu.save({validateBeforeSave : false})
    return res.status(200).json(
        new ApiResponse(200 , 'menu updated!' , availableMenu )
    )
}) 

export {addMenu , updateMenu}