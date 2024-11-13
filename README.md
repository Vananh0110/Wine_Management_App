# Wine Managemen App
Dự án này gồm 2 phần chính: **Frontend** (sử dụng React Native - Expo) và ** Backend ** (sử dụng NodeJs và mySQL)

## Yêu cầu cài đặt
Để có thể chạy được dự án, bạn cần cài đặt:
- **Node.js**: Tải từ [Node.js](https://nodejs.org/)
- **MySQL**: Tải [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) và [MySQL Workbench](https://dev.mysql.com/downloads/workbench/). Tham khảo cách cài đặt tại: https://www.youtube.com/watch?v=dq1L1Lrbg6s
- **Android Studio**: Tải từ [Android Studio](https://developer.android.com/studio) và tạo máy ảo android. Tham khảo cách cài đặt tại: https://www.youtube.com/watch?v=QgavP9yBceQ
-  **Expo CLI**: Để cài đặt Expo CLI, chạy lệnh:
  ```bash
  npm install -g expo-cli
```
  
## Chạy dự án

1. **Tạo database**
   - Vào workbench tạo 1 database mới đặt tên là "wine_management_app"
   - Sau đó vào trong thư mục backend > exported-sql-files: hãy copy 2 file trong thư mục đó vào phần sql editor của workbench và thực thi.
   - Vào file db.js của thư mục backend để chỉnh lại cấu hình:
   ```bash
      host: "localhost",
      user: "root",
      password: "011002", (password bạn đã đặt cho mysql)
      database: "wine_management_db",
      port: 3360 (cổng kết nối)
   ```
3. **Chạy backend**
   
   - Vào thư mục backend
   ```bash
   cd backend
   ```
   - Cài đặt các thư viện cần thiết
   ```bash
   npm install
   ```
   - Chạy server
   ```bash
   nodemon index
   ```
   
4. **Chạy frontend**
   - Vào thư mục frontend
   ```bash
   cd backend
   ```
   - Cài đặt các thư viện cần thiết
   ```bash
   npm install
   ```
   - Chạy server
   ```bash
   npm start
   ```
   Sau khi chạy lên thì sẽ có chỗ hỏi Open Android thì hãy nhập a để chạy máy ảo
5. **Kết nối backend với frontend**
   - Nếu chạy máy ảo thì khi đó hãy vào trong thư mục frontend (tạo 1 terminal khác 2 terminal chạy backend và frontend)
   Chạy câu lệnh:
   ```bash
   adb reverse tcp:5000 tcp:5000
   ```
