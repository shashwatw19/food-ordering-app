import { Otp } from '../models/otp.model'
import { User } from '../models/user.model'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/asyncHandler'
import { Request } from 'express'
import { Response } from 'express'
import { uploadImageOnCloudinary } from '../utils/cloudinary'

export type tokenType = {
  verificationToken: string
  refreshToken: string
}
const generateAccessAndRefreshToken = async (
  userId: unknown
): Promise<tokenType> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  const verificationToken = await user.generateAccessToken()
  const refreshToken = await user.generateRefreshToken()

  user.verificationToken = verificationToken
  user.refreshToken = refreshToken

  await user.save({ validateBeforeSave: false })

  return { verificationToken, refreshToken }
}
//signup
const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullname, email, password, contact, otp } = req.body
  console.log(req.body)
  if ([fullname, email, password].some((field) => field?.trim() === ''))
    throw new ApiError(400, 'All fields are required')

  if (contact?.length == 0 || otp?.length == 0)
    throw new ApiError(400, 'invalid length fields are not allowed')
  const existedUser = await User.findOne({ email })
  if (existedUser) throw new ApiError(400, 'User already registered ')

  let currentOtp = otp
  const generatedOtp = await Otp.find({ email })
    .sort({ createdAt: -1 })
    .limit(1)

  if (!generatedOtp) throw new ApiError(404, `Otp not found with ${email}`)
  if (generatedOtp[0]?.otp != currentOtp) throw new ApiError(401, 'Invalid Otp')

  const user = await User.create({ fullname, email, password, contact })

  if (!user) throw new ApiError(401, 'Not able to create User')

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  return res
    .status(201)
    .json(new ApiResponse(200, 'User created successfully ', { createdUser }))
})
//login
const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if ([email, password].some((field) => field?.trim() === ''))
    throw new ApiError(404, 'all fields are required')

  const validUser = await User.findOne({
    $or: [{ email }, { password }],
  })
  if (!validUser) throw new ApiError(401, 'invalid User')

  const isPasswordMatched = await validUser.matchPassword(password)

  if (!isPasswordMatched) throw new ApiError(401, 'inValid Password')

  const { verificationToken, refreshToken } =
    await generateAccessAndRefreshToken(validUser._id)

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none' as const,
    path: '/',
  }

  validUser.refreshToken = undefined
  validUser.verificationToken = undefined
  validUser.password = undefined

  return res
    .status(201)
    .cookie('verificationToken', verificationToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, 'User loggedIn Succesfully', validUser))
})
// forgotPassword
const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body

  const validUser = await User.findOne({ email })

  if (!validUser) throw new ApiError(404, 'User not found')

  const resetToken = validUser.createResetPasswordToken()
  console.log(resetToken)
  if (resetToken?.trim() === '') return new ApiError(402, 'invalid resetToken')

  validUser.resetPasswordToken = resetToken

  await validUser.save()

  return res
    .status(201)
    .json(new ApiResponse(200, 'reset token created successfully!'))
})
// resetPassword
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params
  const { newPassword } = req.body

  if (token?.trim() === '') throw new ApiError(404, 'reset token not found')

  const validUser = await User.findOne({ resetPasswordToken: token })

  if (!validUser) throw new ApiError(404, 'user with resetToken not found')

  if (await validUser.matchPassword(newPassword))
    throw new ApiError(401, 'new password cant be same as old one')

  validUser.password = newPassword
  validUser.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, ' password reset successfully!'))
})

// updateProfile
const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id
  console.log(_id, 'USER IDs')
  const user = await User.findById(_id)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  console.log('reached here...')
  if (req.file && req.file.path) {
    const response = await uploadImageOnCloudinary(req.file.path)
    if (response?.trim() === '')
      throw new ApiError(404, 'image upload not possible')

    user.avatarImage = response
  }

  const { fullname, address, city } = req.body
  if (fullname && fullname.trim() !== '') {
    user.fullname = fullname
  }
  if (address && address.trim() !== '') {
    user.address = address
  }
  if (city && city.trim() !== '') {
    user.city = city
  }
  await user.save({ validateBeforeSave: false })

  const updatedUser = await User.findById(_id).select('-password -refreshToken')

  return res
    .status(200)
    .json(new ApiResponse(200, 'Profile updated successfully', { updatedUser }))
})

// checkAuth
const checkAuth = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id
  const validUser = await User.findById(_id)

  if (!validUser) {
    throw new ApiError(404, 'user is not found..')
  }

  return res.status(200).json(new ApiResponse(200, 'valid user'))
})
const logout = asyncHandler(async (req, res) => {
  const currentUser = req.user?._id

  const logOutUser = await User.findByIdAndUpdate(
    currentUser,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  if (!logOutUser) {
    throw new ApiError(401, 'LogOut Failed')
  }

  return res
    .status(201)
    .clearCookie('verificationToken', options)
    .clearCookie('refreshToken', options)
    .json(
      new ApiResponse(200, 'User logged out successfully', {
        user: req.user?.fullname,
      })
    )
})

export {
  signup,
  signin,
  forgotPassword,
  updateProfile,
  resetPassword,
  checkAuth,
  logout,
}
