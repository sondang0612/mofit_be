export enum EOrderStatus {
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
