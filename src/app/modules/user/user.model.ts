import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { TUser, UserModal } from './user.interface';
import paginate from '../plugins/paginate';
import { roles } from '../../middlewares/roles';

const userSchema = new Schema<TUser, UserModal>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
      required: true,
    },
    image: {
      type: String,
      default: '/uploads/users/user.png',
      required: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription', // Associate with the subscription model
      required: false,
    },
    subscriptionStartDate: {
      type: Date,
      required: false,
    },
    subscriptionExpiryDate: {
      type: Date,
      required: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Blocked', 'Delete'],
      default: 'Active',
      required: true,
    },
    isNewsletterSubscribed: {
      type: Boolean,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isResetPassword: {
      type: Boolean,
      default: false,
      required: true,
    },
    oneTimeCode: {
      type: String,
      default: null,
      required: false,
    },
    oneTimeCodeExpire: {
      type: Date,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

// Apply the paginate plugin
userSchema.plugin(paginate);

// Static methods
userSchema.statics.isExistUserById = async function (id: string) {
  return await this.findById(id);
};

userSchema.statics.isExistUserByEmail = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt.saltRounds)
    );
  }
  next();
});

// Create and export the User model
export const User = model<TUser, UserModal>('User', userSchema);
