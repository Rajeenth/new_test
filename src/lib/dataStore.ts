export interface ParentPalm {
  id: string;
  code: string;
  name: string;
  age: number;
  location: string;
  healthStatus: string;
  yieldHistory: string;
  description: string;
  nutCharacteristics: string;
  whySelected: string;
  images: string[];
}

export interface Batch {
  id: string;
  batchCode: string;
  parentPalmId: string;
  parentPalmCode: string;
  name: string;
  harvestDate: string; // Coconut Cut From Tree Date
  seededDate: string; // Seeded On Date
  age?: string;
  height?: string;
  totalQuantity: number;
  bookedQuantity: number;
  inventoryAdjustments: number;
  price: number;
  status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT' | 'COMING_SOON';
  description: string;
  viewsCount?: number; // Social proof view counter
  images: string[];
}

export interface InventoryAdjustment {
  id: string;
  batchCode: string;
  quantityChange: number;
  reason: string;
  adminName: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  batchCode: string;
  customerName: string;
  mobile: string;
  whatsapp: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  email?: string;
  farmLocation?: string;
  specialInstructions?: string;
  expectedDeliveryDate?: string;
  deliveryService?: string;
  nearestHub?: string;
  quantity: number;
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING_VERIFICATION' | 'FAILED';
  bookingStatus: 'Payment review' | 'Confirmed' | 'Preparing' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  paymentScreenshotUrl?: string;
  courierName?: string;
  trackingId?: string;
  dispatchDate?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  batchCode: string;
  quantity: number;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  location?: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'RESOLVED';
  createdAt: string;
}

// Helper to compute age & height dynamically from Seeded Date
export function getSaplingMetrics(seededDateStr: string) {
  if (!seededDateStr) return { age: 'N/A', height: 'N/A', monthsCount: 0 };
  
  const seeded = new Date(seededDateStr);
  const now = new Date();
  
  let monthsCount = (now.getFullYear() - seeded.getFullYear()) * 12 + (now.getMonth() - seeded.getMonth());
  if (now.getDate() < seeded.getDate()) {
    monthsCount = Math.max(0, monthsCount - 1);
  }
  
  monthsCount = Math.max(1, monthsCount);

  let estimatedHeight = '0.8–1.5 ft';
  if (monthsCount >= 4 && monthsCount <= 6) {
    estimatedHeight = '1.5–2.5 ft';
  } else if (monthsCount >= 7 && monthsCount <= 9) {
    estimatedHeight = '2.5–4.5 ft';
  } else if (monthsCount >= 10 && monthsCount <= 12) {
    estimatedHeight = '4.5–6.0 ft';
  } else if (monthsCount > 12) {
    estimatedHeight = '6.0+ ft (Ready for Field Planting)';
  }

  return {
    age: `${monthsCount} Month${monthsCount > 1 ? 's' : ''}`,
    height: estimatedHeight,
    monthsCount
  };
}

// Dynamic Batch Status Calculation Rule Engine
export function getDynamicBatchStatus(availableQuantity: number, seededDateStr: string): 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT' | 'COMING_SOON' {
  const metrics = getSaplingMetrics(seededDateStr);
  
  if (metrics.monthsCount < 6) {
    return 'COMING_SOON';
  }
  if (availableQuantity <= 0) {
    return 'SOLD_OUT';
  }
  if (availableQuantity < 50) {
    return 'LIMITED';
  }
  return 'AVAILABLE';
}

// Global Store State with Dedicated Folder Paths
let parentPalms: ParentPalm[] = [
  {
    id: 'mp-1',
    code: 'EM-MP-014',
    name: 'Heritage Mother Tree #14',
    age: 85,
    location: 'Plot A - Old Grove Section 2',
    healthStatus: 'Excellent (Regularly inspected)',
    yieldHistory: 'Consistently 140 - 165 nuts/year documented over 20 consecutive years.',
    description: 'Selected from our original ancestral grove, Mother Palm EM-MP-014 represents the quintessential Eathamozhy tall coconut cultivar known for heavy nut bearing and disease resilience.',
    nutCharacteristics: 'Large spherical nuts with thick endosperm (copra content 170g/nut) and sweet water volume averaging 350ml.',
    whySelected: 'Selected for superior germinability (>92%), thick husk protection, and high tolerance to coastal wind and fluctuating rainfall.',
    images: [
      '/images/parent-palms/EM-MP-014/tree_1.jpg',
      '/images/parent-palms/EM-MP-014/tree_2.jpg'
    ]
  },
  {
    id: 'mp-2',
    code: 'EM-MP-008',
    name: 'High Yield Mother Tree #8',
    age: 72,
    location: 'Plot B - East Riverside Section',
    healthStatus: 'Vigorous',
    yieldHistory: '130 - 150 nuts/year average.',
    description: 'Located in our fertile riverside section, EM-MP-008 has been monitored since 1998 for mother seed nut selection.',
    nutCharacteristics: 'Medium-large nuts, early germinating seednuts.',
    whySelected: 'Outstanding seedling vigor and rapid root emergence in seedbeds.',
    images: [
      '/images/parent-palms/EM-MP-008/tree_1.jpg',
      '/images/parent-palms/EM-MP-008/tree_2.jpg'
    ]
  }
];

let batches: Batch[] = [
  {
    id: 'b-1',
    batchCode: 'EM-0926-A',
    parentPalmId: 'mp-1',
    parentPalmCode: 'EM-MP-014',
    name: 'September 2026 Batch (EM-0926-A)',
    harvestDate: '2026-01-05',
    seededDate: '2026-01-15',
    totalQuantity: 500,
    bookedQuantity: 327,
    inventoryAdjustments: 0,
    price: 150,
    status: 'AVAILABLE',
    description: 'These saplings were raised in our farm and belong to the current September 2026 batch. Selected from Mother Palm EM-MP-014 with robust collars and vibrant green fronds.',
    viewsCount: 142,
    images: [
      '/images/batches/EM-0926-A/batch_1.jpg',
      '/images/batches/EM-0926-A/batch_2.jpg'
    ]
  },
  {
    id: 'b-2',
    batchCode: 'EM-1026-B',
    parentPalmId: 'mp-2',
    parentPalmCode: 'EM-MP-008',
    name: 'October 2026 Batch (EM-1026-B)',
    harvestDate: '2026-02-01',
    seededDate: '2026-02-10',
    totalQuantity: 400,
    bookedQuantity: 360,
    inventoryAdjustments: -10,
    price: 150,
    status: 'LIMITED',
    description: 'High vigor saplings from Riverside Plot B seednuts. Almost fully booked due to advance pre-orders.',
    viewsCount: 98,
    images: [
      '/images/batches/EM-1026-B/batch_1.jpg',
      '/images/batches/EM-1026-B/batch_2.jpg'
    ]
  },
  {
    id: 'b-3',
    batchCode: 'EM-1126-C',
    parentPalmId: 'mp-1',
    parentPalmCode: 'EM-MP-014',
    name: 'November 2026 Pre-Booking Batch (EM-1126-C)',
    harvestDate: '2026-06-01',
    seededDate: '2026-06-15',
    totalQuantity: 600,
    bookedQuantity: 0,
    inventoryAdjustments: 0,
    price: 160,
    status: 'COMING_SOON',
    description: 'Upcoming monsoon season batch prepared for late autumn dispatch across Tamil Nadu and South India.',
    viewsCount: 215,
    images: [
      '/images/batches/EM-1126-C/batch_1.jpg',
      '/images/batches/EM-1126-C/batch_2.jpg'
    ]
  }
];

let bookings: Booking[] = [
  {
    id: 'bk-1',
    bookingId: 'EM-0926-A-1047',
    batchCode: 'EM-0926-A',
    customerName: 'Rajeenth Kumar',
    mobile: '9486880641',
    whatsapp: '9486880641',
    address: '12-A Coconut Farm Lane, Main Road',
    district: 'Kanyakumari',
    state: 'Tamil Nadu',
    pinCode: '629001',
    expectedDeliveryDate: '2026-10-12',
    quantity: 25,
    subtotal: 3750,
    deliveryCharge: 250,
    totalAmount: 4000,
    paymentStatus: 'PENDING_VERIFICATION',
    bookingStatus: 'Payment review', // Initial fulfillment status
    createdAt: '2026-09-18T10:30:00Z'
  }
];

let adjustments: InventoryAdjustment[] = [
  {
    id: 'adj-1',
    batchCode: 'EM-1026-B',
    quantityChange: -10,
    reason: 'Damaged / unsuitable saplings rejected during quality check',
    adminName: 'Rajeenth (Farm Admin)',
    createdAt: '2026-09-18T16:00:00Z'
  }
];

const reviews: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Murugan K.',
    location: 'Nagercoil, Kanyakumari',
    batchCode: 'EM-0826-B',
    quantity: 20,
    rating: 5,
    comment: 'Received extremely healthy saplings with thick collars and strong root systems. Packaging was carefully handled and survived transport without damage!',
    verified: true,
    date: '2026-08-28'
  }
];

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Where are your saplings grown?',
    answer: 'All our coconut saplings are raised directly on our own ancestral farm in Eathamozhy, Kanyakumari district, Tamil Nadu.',
    category: 'General'
  }
];

let enquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Suresh Kumar',
    mobile: '9443322110',
    location: 'Tirunelveli, Tamil Nadu',
    message: 'Looking for 150 saplings for my 2-acre farm expansion next month. Please share transport details.',
    status: 'NEW',
    createdAt: '2026-10-04T14:30:00Z'
  }
];

// Helper Functions
export const DataStore = {
  getBatches: () => {
    return batches.map(b => {
      const available = Math.max(0, b.totalQuantity - b.bookedQuantity + b.inventoryAdjustments);
      const metrics = getSaplingMetrics(b.seededDate);
      const computedStatus = getDynamicBatchStatus(available, b.seededDate);

      return {
        ...b,
        age: metrics.age,
        height: metrics.height,
        availableQuantity: available,
        status: computedStatus,
        bookedPercentage: Number(((b.bookedQuantity / b.totalQuantity) * 100).toFixed(1))
      };
    });
  },

  getOldestAvailableBatch: () => {
    const all = DataStore.getBatches();
    const readyAvailable = all.filter(b => b.availableQuantity > 0 && b.status !== 'COMING_SOON');
    readyAvailable.sort((a, b) => new Date(a.seededDate).getTime() - new Date(b.seededDate).getTime());
    return readyAvailable[0] || all.find(b => b.availableQuantity > 0) || all[0];
  },

  getBatchByCode: (code: string) => {
    const b = batches.find(x => x.batchCode.toLowerCase() === code.toLowerCase());
    if (!b) return null;
    b.viewsCount = (b.viewsCount || 100) + 1; // Increment view count
    const available = Math.max(0, b.totalQuantity - b.bookedQuantity + b.inventoryAdjustments);
    const metrics = getSaplingMetrics(b.seededDate);
    const computedStatus = getDynamicBatchStatus(available, b.seededDate);

    return {
      ...b,
      age: metrics.age,
      height: metrics.height,
      availableQuantity: available,
      status: computedStatus,
      bookedPercentage: Number(((b.bookedQuantity / b.totalQuantity) * 100).toFixed(1))
    };
  },

  addBatch: (newBatchData: any) => {
    const combinedName = newBatchData.name.includes(newBatchData.batchCode) 
      ? newBatchData.name 
      : `${newBatchData.name} (${newBatchData.batchCode})`;

    const defaultFolderImages = [`/images/batches/${newBatchData.batchCode}/batch_1.jpg`];

    const created: Batch = {
      id: `b-${Date.now()}`,
      batchCode: newBatchData.batchCode,
      parentPalmId: newBatchData.parentPalmId || 'mp-1',
      parentPalmCode: newBatchData.parentPalmCode || 'EM-MP-014',
      name: combinedName,
      harvestDate: newBatchData.harvestDate,
      seededDate: newBatchData.seededDate,
      totalQuantity: Number(newBatchData.totalQuantity),
      bookedQuantity: 0,
      inventoryAdjustments: 0,
      price: Number(newBatchData.price),
      status: 'AVAILABLE',
      description: newBatchData.description || '',
      viewsCount: 15,
      images: newBatchData.images && newBatchData.images.length > 0 ? newBatchData.images : defaultFolderImages
    };

    batches.unshift(created);
    return DataStore.getBatchByCode(created.batchCode);
  },

  updateBatch: (code: string, updatedFields: Partial<Batch>) => {
    const target = batches.find(b => b.batchCode.toLowerCase() === code.toLowerCase());
    if (!target) throw new Error('Batch not found');

    if (updatedFields.price !== undefined) target.price = Number(updatedFields.price);
    if (updatedFields.totalQuantity !== undefined) target.totalQuantity = Number(updatedFields.totalQuantity);
    if (updatedFields.harvestDate) target.harvestDate = updatedFields.harvestDate;
    if (updatedFields.seededDate) target.seededDate = updatedFields.seededDate;
    if (updatedFields.description) target.description = updatedFields.description;
    if (updatedFields.name) {
      target.name = updatedFields.name.includes(target.batchCode) ? updatedFields.name : `${updatedFields.name} (${target.batchCode})`;
    }
    if (updatedFields.images) {
      target.images = updatedFields.images;
    }

    return DataStore.getBatchByCode(code);
  },

  deleteBatch: (code: string) => {
    batches = batches.filter(b => b.batchCode.toLowerCase() !== code.toLowerCase());
    return true;
  },

  getParentPalms: () => parentPalms,

  getParentPalmByCode: (code: string) => {
    return parentPalms.find(p => p.code.toLowerCase() === code.toLowerCase()) || null;
  },

  addParentPalm: (data: Omit<ParentPalm, 'id'>) => {
    const defaultTreeImages = [`/images/parent-palms/${data.code}/tree_1.jpg`];
    const created: ParentPalm = {
      ...data,
      id: `mp-${Date.now()}`,
      images: data.images && data.images.length > 0 ? data.images : defaultTreeImages
    };
    parentPalms.unshift(created);
    return created;
  },

  updateParentPalm: (identifier: string, updatedFields: Partial<ParentPalm>) => {
    const target = parentPalms.find(p => 
      p.id === identifier || 
      p.code.toLowerCase() === identifier.toLowerCase()
    );
    if (!target) throw new Error('Parent palm mother tree not found');
    Object.assign(target, updatedFields);
    return target;
  },

  deleteParentPalm: (codeOrId: string) => {
    parentPalms = parentPalms.filter(p => p.id !== codeOrId && p.code.toLowerCase() !== codeOrId.toLowerCase());
    return true;
  },

  getEnquiries: () => enquiries,

  addEnquiry: (data: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => {
    const created: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(created);
    return created;
  },

  updateEnquiryStatus: (id: string, status: 'NEW' | 'CONTACTED' | 'RESOLVED') => {
    const target = enquiries.find(e => e.id === id);
    if (target) target.status = status;
    return target;
  },

  getBookings: () => bookings,

  getBookingsByMobile: (mobile: string) => {
    const cleanMob = mobile.trim();
    if (!cleanMob) return [];
    return bookings.filter(b => 
      b.mobile.includes(cleanMob) || 
      b.whatsapp.includes(cleanMob) ||
      b.bookingId.toLowerCase().includes(cleanMob.toLowerCase())
    );
  },

  getBookingById: (bookingId: string, mobile?: string) => {
    const cleanId = bookingId.trim().toUpperCase();
    return bookings.find(b => {
      const matchId = b.bookingId.toUpperCase() === cleanId;
      if (mobile) {
        return matchId && b.mobile.includes(mobile.trim());
      }
      return matchId;
    }) || null;
  },

  createBooking: (data: Omit<Booking, 'id' | 'bookingId' | 'createdAt' | 'paymentStatus' | 'bookingStatus'> & { paymentScreenshotUrl?: string }) => {
    const batch = DataStore.getBatchByCode(data.batchCode);
    if (!batch || batch.availableQuantity < data.quantity) {
      throw new Error('Requested quantity exceeds available stock.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `${data.batchCode}-${randomSuffix}`;
    
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      bookingId,
      paymentStatus: 'PENDING_VERIFICATION',
      bookingStatus: 'Payment review',
      createdAt: new Date().toISOString()
    };

    const targetBatch = batches.find(b => b.batchCode === data.batchCode);
    if (targetBatch) {
      targetBatch.bookedQuantity += data.quantity;
    }

    bookings.unshift(newBooking);
    return newBooking;
  },

  updateBookingStatus: (bookingId: string, status: Booking['bookingStatus'], courierName?: string, trackingId?: string) => {
    const bk = bookings.find(b => b.bookingId === bookingId);
    if (!bk) return null;
    bk.bookingStatus = status;
    if (status === 'Confirmed' || status === 'Preparing' || status === 'Dispatched' || status === 'Delivered') {
      bk.paymentStatus = 'PAID';
    }
    if (courierName) bk.courierName = courierName;
    if (trackingId) bk.trackingId = trackingId;
    if (status === 'Dispatched') bk.dispatchDate = new Date().toISOString().split('T')[0];
    return bk;
  },

  adjustInventory: (batchCode: string, change: number, reason: string, adminName: string) => {
    const targetBatch = batches.find(b => b.batchCode === batchCode);
    if (!targetBatch) throw new Error('Batch not found');
    
    targetBatch.inventoryAdjustments += change;
    
    const newAdj: InventoryAdjustment = {
      id: `adj-${Date.now()}`,
      batchCode,
      quantityChange: change,
      reason,
      adminName,
      createdAt: new Date().toISOString()
    };
    
    adjustments.unshift(newAdj);
    return newAdj;
  },

  getAdjustments: () => adjustments,
  getReviews: () => reviews,
  getFaqs: () => faqs
};
