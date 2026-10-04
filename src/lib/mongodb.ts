import mongoose from 'mongoose';
import { DataStore } from './dataStore';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eathamozhy_coconut';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully to:', MONGODB_URI);
      return mongooseInstance;
    }).catch((err) => {
      console.warn('MongoDB connection fallback to in-memory store:', err.message);
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

// Mongoose Schemas
const ParentPalmSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  location: String,
  healthStatus: String,
  yieldHistory: String,
  description: String,
  nutCharacteristics: String,
  whySelected: String,
  images: [String]
});

const BatchSchema = new mongoose.Schema({
  batchCode: { type: String, required: true, unique: true },
  parentPalmId: String,
  parentPalmCode: String,
  name: String,
  plantingDate: String,
  age: String,
  height: String,
  totalQuantity: Number,
  bookedQuantity: Number,
  inventoryAdjustments: Number,
  price: Number,
  status: { type: String, enum: ['AVAILABLE', 'LIMITED', 'SOLD_OUT', 'COMING_SOON'] },
  description: String,
  images: [String]
});

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  batchCode: String,
  customerName: String,
  mobile: String,
  whatsapp: String,
  address: String,
  district: String,
  state: String,
  pinCode: String,
  email: String,
  farmLocation: String,
  specialInstructions: String,
  quantity: Number,
  subtotal: Number,
  deliveryCharge: Number,
  totalAmount: Number,
  paymentStatus: String,
  bookingStatus: String,
  courierName: String,
  trackingId: String,
  dispatchDate: String,
  createdAt: { type: Date, default: Date.now }
});

const InventoryAdjustmentSchema = new mongoose.Schema({
  batchCode: String,
  quantityChange: Number,
  reason: String,
  adminName: String,
  createdAt: { type: Date, default: Date.now }
});

export const ParentPalmModel = mongoose.models.ParentPalm || mongoose.model('ParentPalm', ParentPalmSchema);
export const BatchModel = mongoose.models.Batch || mongoose.model('Batch', BatchSchema);
export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export const InventoryAdjustmentModel = mongoose.models.InventoryAdjustment || mongoose.model('InventoryAdjustment', InventoryAdjustmentSchema);
