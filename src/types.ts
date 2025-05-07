export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid',
  LPG = 'LPG',
  OTHER = 'Other',
}

export enum ServiceType {
  OIL_CHANGE = 'Oil Change',
  TYRE_ROTATION = 'Tyre Rotation',
  TYRE_REPLACEMENT = 'Tyre Replacement',
  BRAKE_SERVICE = 'Brake Service',
  BATTERY_CHECK = 'Battery Check',
  AIR_FILTER_REPLACEMENT = 'Air Filter Replacement',
  SPARK_PLUG_REPLACEMENT = 'Spark Plug Replacement',
  COOLANT_FLUSH = 'Coolant Flush',
  TRANSMISSION_FLUID_CHANGE = 'Transmission Fluid Change',
  WIPER_BLADE_REPLACEMENT = 'Wiper Blade Replacement',
  ANNUAL_SERVICE = 'Annual Service',
  MAJOR_SERVICE = 'Major Service',
  MOT = 'MOT',
  REPAIR = 'Repair',
  OTHER = 'Other',
}

export enum MediaType {
  IMAGE = 'Image',
  PDF = 'PDF',
  VIDEO = 'Video',
  OTHER = 'Other',
}

export enum BodyType {
  COUPE = 'Coupe',
  ESTATE = 'Estate',
  HATCHBACK = 'Hatchback',
}

/**
 * Vehicle
 * Represents a single vehicle owned by a user.
 * Each vehicle will be a sub-collection or referenced by the User.
 */
export interface Vehicle {
  id?: string // Firestore document ID (auto-generated)
  userId: string // UID of the owner
  make: string
  model: string
  year?: number
  vin?: string
  registrationNumber?: string
  colour?: string
  fuelType: FuelType
  engineSize: string
  bodyType: BodyType
  purchaseDate?: Date
  notes?: string
  imageUrl?: string
  createdAt: Date
  updatedAt?: Date
}

/**
 * MediaItem
 * Represents an uploaded file (image, PDF) associated with a service history item.
 */
export interface MediaItem {
  id?: string
  fileName: string
  url: string
  type: MediaType
  size?: number
  uploadedAt: Date
  notes?: string
}

export type Currency = 'USD' | 'GBP' | 'EUR'

/**
 * ServiceHistoryItem
 * Represents a single service or maintenance event for a vehicle.
 * These will typically be a sub-collection under a specific Vehicle.
 */
export interface ServiceHistoryItem {
  id?: string
  vehicleId: string
  userId: string
  serviceDate: Date
  serviceType: ServiceType
  serviceProvider?: string // Name of the garage or person who did the service
  mileage?: number
  cost?: number
  currency?: Currency
  notes?: string
  nextServiceDate?: Date
  nextServiceMileage?: number
  media?: MediaItem[]
  createdAt: Date
  updatedAt?: Date

  // Undecided on these two
  isRecurring?: boolean
  recurrenceInterval?: string // e.g., '6 months', '10000 miles'
}
