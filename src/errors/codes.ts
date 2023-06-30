/**
 * Mã trạng thái HTTP thành công, được sử dụng khi yêu cầu của client được xử lý 
 * thành công và server trả về kết quả cho client (code = 200). 
 */ 
export const HTTP_STATUS_OK: number = 200

/**
 * Mã trạng thái HTTP thành công, được sử dụng khi yêu cầu của client được xử lý 
 * thành công và server đã tạo mới một tài nguyên trên server (code = 201). 
 */
  export const HTTP_STATUS_CREATED: number = 201

/**
 * Mã trạng thái HTTP thành công, được sử dụng khi yêu cầu của client được xử lý 
 * thành công và server không trả về bất kỳ dữ liệu nào cho client (code = 204). 
 */
  export const HTTP_STATUS_NO_CONTENT: number = 204

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi yêu cầu của client không hợp lệ 
 * hoặc không đủ thông tin để xử lý yêu cầu (code = 400).
 */
  export const HTTP_STATUS_BAD_REQUEST: number = 400

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi client không có quyền truy cập tài 
 * nguyên yêu cầu hoặc chưa được xác thực (code = 401).
 */
  export const HTTP_STATUS_UNAUTHORIZED: number = 401

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi client không được phép truy cập tài 
 * nguyên yêu cầu, thường do lỗi cấu hình hoặc quyền truy cập không đầy đủ (code = 403).
 */
  export const HTTP_STATUS_FORBIDDEN: number = 403

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi server không tìm thấy tài nguyên yêu 
 * cầu trên server (code = 404).
 */
  export const HTTP_STATUS_NOT_FOUND: number = 404

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi có lỗi xảy ra trên server khi xử lý 
 * yêu cầu của client, thường do lỗi logic hoặc lỗi hệ thống (code = 500).
 */
  export const HTTP_STATUS_INTERNAL_SERVER_ERROR: number = 500

/**
 * Mã trạng thái HTTP lỗi, được sử dụng khi server không thể xử lý yêu cầu của 
 * client vì một lý do nào đó, thường do quá tải hoặc bảo trì hệ thống (code = 503).
 */
  export const HTTP_STATUS_SERVICE_UNAVAILABLE: number = 503
