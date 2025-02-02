// Enhanced Debug Script - Theo dõi chi tiết các yêu cầu và phản hồi

const debug = true; // Bật chế độ gỡ lỗi

if (debug) {
  // In ra các header và body của request để theo dõi
  console.log("Request Headers:", JSON.stringify($request.headers, null, 2));
  console.log("Request Body:", JSON.stringify($request.body, null, 2));
}

let obj = {};

// Kiểm tra và xử lý lỗi khi phản hồi không hợp lệ
try {
  obj = JSON.parse($response.body);
} catch (e) {
  console.error("Error parsing response:", e);
  $done({});
  return;
}

// Kiểm tra các key cần thiết trong phản hồi và khởi tạo nếu không có
if (!obj.subscriber) {
  console.log("Error: No subscriber data found!");
  obj.subscriber = {}; // Tạo đối tượng subscriber nếu không có
}

if (!obj.subscriber.entitlements) {
  console.log("Error: No entitlements data found!");
  obj.subscriber.entitlements = {}; // Tạo đối tượng entitlements nếu không có
}

if (!obj.subscriber.subscriptions) {
  console.log("Error: No subscriptions data found!");
  obj.subscriber.subscriptions = {}; // Tạo đối tượng subscriptions nếu không có
}

// Mở khóa các tính năng cần thiết
obj.subscriber.entitlements["Locket_Badge"] = {
  purchase_date: "2025-01-01T00:00:00Z",
  product_identifier: "com.hoangvanbao.badge",
  expires_date: "2099-12-18T01:04:17Z"
};

obj.subscriber.entitlements["Locket_Video_15s"] = {
  purchase_date: "2025-01-01T00:00:00Z",
  product_identifier: "com.hoangvanbao.video.15s",
  expires_date: "2099-12-18T01:04:17Z"
};

if (debug) {
  // In ra phản hồi đã được sửa đổi để kiểm tra
  console.log("Modified Response:", JSON.stringify(obj, null, 2));
}

$done({ body: JSON.stringify(obj) });
