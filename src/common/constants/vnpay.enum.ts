export enum EVnpayTransactionStatus {
  SUCCESS = '00',
  INCOMPLETE = '01',
  ERROR = '02',
  REVERSED = '04',
  REFUND_PROCESSING = '05',
  REFUND_PENDING = '06',
  SUSPECTED_FRAUD = '07',
  REFUND_REJECTED = '09',
  CANCELLED = '24',
}

export enum EVnpayTransactionNo {
  FAIL = '00',
}

export const VnpayTransactionStatusDescription = {
  [EVnpayTransactionStatus.SUCCESS]: 'Giao dịch thành công',
  [EVnpayTransactionStatus.INCOMPLETE]: 'Giao dịch chưa hoàn tất',
  [EVnpayTransactionStatus.ERROR]: 'Giao dịch bị lỗi',
  [EVnpayTransactionStatus.REVERSED]:
    'Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)',
  [EVnpayTransactionStatus.REFUND_PROCESSING]:
    'VNPAY đang xử lý giao dịch này (GD hoàn tiền)',
  [EVnpayTransactionStatus.REFUND_PENDING]:
    'VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)',
  [EVnpayTransactionStatus.SUSPECTED_FRAUD]: 'Giao dịch bị nghi ngờ gian lận',
  [EVnpayTransactionStatus.REFUND_REJECTED]: 'GD Hoàn trả bị từ chối',
  [EVnpayTransactionStatus.CANCELLED]: 'Giao dịch bị hủy',
};

export enum EVnpayResponseCode {
  SUCCESS = '00',
  SUSPECTED_FRAUD = '07',
  NO_INTERNET_BANKING = '09',
  WRONG_CARD_INFO = '10',
  PAYMENT_TIMEOUT = '11',
  CARD_LOCKED = '12',
  INVALID_OTP = '13',
  CUSTOMER_CANCELED = '24',
  INSUFFICIENT_FUNDS = '51',
  EXCEEDED_LIMIT = '65',
  BANK_MAINTENANCE = '75',
  WRONG_PASSWORD = '79',
  OTHER_ERROR = '99',
}

export const VnpayResponseCodeDescription = {
  [EVnpayResponseCode.SUCCESS]: 'Giao dịch thành công',
  [EVnpayResponseCode.SUSPECTED_FRAUD]:
    'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)',
  [EVnpayResponseCode.NO_INTERNET_BANKING]:
    'Giao dịch không thành công do: Thẻ/Tài khoản chưa đăng ký dịch vụ InternetBanking tại ngân hàng',
  [EVnpayResponseCode.WRONG_CARD_INFO]:
    'Giao dịch không thành công do: Xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  [EVnpayResponseCode.PAYMENT_TIMEOUT]:
    'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin vui lòng thực hiện lại giao dịch',
  [EVnpayResponseCode.CARD_LOCKED]:
    'Giao dịch không thành công do: Thẻ/Tài khoản bị khóa',
  [EVnpayResponseCode.INVALID_OTP]:
    'Giao dịch không thành công do: Nhập sai mật khẩu xác thực giao dịch (OTP)',
  [EVnpayResponseCode.CUSTOMER_CANCELED]:
    'Giao dịch không thành công do: Khách hàng hủy giao dịch',
  [EVnpayResponseCode.INSUFFICIENT_FUNDS]:
    'Giao dịch không thành công do: Tài khoản không đủ số dư để thực hiện giao dịch',
  [EVnpayResponseCode.EXCEEDED_LIMIT]:
    'Giao dịch không thành công do: Tài khoản đã vượt quá hạn mức giao dịch trong ngày',
  [EVnpayResponseCode.BANK_MAINTENANCE]: 'Ngân hàng thanh toán đang bảo trì',
  [EVnpayResponseCode.WRONG_PASSWORD]:
    'Giao dịch không thành công do: Nhập sai mật khẩu thanh toán quá số lần quy định',
  [EVnpayResponseCode.OTHER_ERROR]:
    'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
};

export enum ERspCode {
  SUCCESS = '00',
  ERROR = '01',
}

export const VNPAY_RESPONSE = {
  SUCCESS: { RspCode: '00', Message: 'success' },
  INVALID_CHECKSUM: { RspCode: '97', Message: 'Invalid checksum' },
  ORDER_NOT_FOUND: { RspCode: '01', Message: 'Order not found' },
  PAYMENT_NOT_FOUND: { RspCode: '01', Message: 'Payment not found' },
  INVALID_AMOUNT: { RspCode: '04', Message: 'Invalid amount' },
  SERVER_ERROR: { RspCode: '99', Message: 'Internal server error' },
};
