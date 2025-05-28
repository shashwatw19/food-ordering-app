import {z} from 'zod';

export const restaurantFromSchema = z.object({
    restaurantName: z.string().nonempty({ message: "Restaurant name is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    deliveryTime: z.number().min(0, { message: "Delivery time cannot be negative" }),
    cuisines: z.array(z.string()).min(1, { message: "At least one cuisine is required" }),
    images:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFromSchema>