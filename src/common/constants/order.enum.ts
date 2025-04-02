export enum EOrderStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
  RETURNED = 'returned',
}

export enum EShippingMethod {
  OWN_DELIVERY = 'own_delivery',
}

export enum EPaymentMethod {
  COD = 'cod',
  PAYMENT_GATEWAY = 'payment_gateway',
}

export enum EPaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDING = 'refunding',
  REFUNDED = 'refunded',
}
