import {z} from 'zod'

export const menuFromSchema = z.object({
    name: z.string().nonempty({ message: "menu name is required" }),
    description: z.string().nonempty({ message: "add a small description" }),
    price: z.number().min(0, { message: "price cannot be negative" }),
    images: z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),
    _id : z.string().optional()
});

export type MenuFormSchema = z.infer<typeof menuFromSchema>