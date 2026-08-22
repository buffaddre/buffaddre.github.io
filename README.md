# ADD FR SHOP

## 1. Frontend GitHub Pages
- Upload `index.html`, `style.css`, `app.js` lên repository.
- Trong `app.js`, đổi `API_BASE` thành URL Vercel backend.

## 2. Backend Vercel
- Tạo project Vercel từ repository chứa thư mục `api`.
- Tạo Environment Variables:
  - `BOT_TOKEN` = token Telegram bot mới
  - `TELEGRAM_CHAT_ID` = chat ID Telegram nhận đơn
- Deploy.

## 3. Lấy CHAT_ID
Nhắn `/start` cho bot rồi gọi:
`https://api.telegram.org/bot<TOKEN>/getUpdates`
Xem trường `message.chat.id`.

## 4. Quan trọng
Không commit BOT_TOKEN vào GitHub. Token đã từng được gửi trong chat nên nên revoke và tạo token mới bằng BotFather trước khi đưa vào Vercel.

## 5. Trạng thái
Bản này có giao diện lịch sử và timeline. Để admin cập nhật `Đã phê duyệt → Đang tiến hành chạy → Đã hoàn thành`, cần thêm database/admin API. Có thể mở rộng ở bước tiếp theo.
