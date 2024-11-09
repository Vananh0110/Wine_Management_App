# Backend Setup Guide

## Yêu cầu

- Đảm bảo rằng bạn đã cài đặt [Node.js](https://nodejs.org/) và [npm](https://www.npmjs.com/) trên máy.

## Cài đặt

1. **Clone dự án từ repository:**

   ```bash
   git clone https://github.com/Vananh0110/Wine_Management_App.git
   ```

2. **Di chuyển vào thư mục backend**

   ```bash
   cd backend
   ```

3. **Cài đặt các package cần thiết**
   ```bash
   npm install
   ```
4. **Chạy server**

   ```bash
   nodemon index
   ```

5. **Thư viện cần cài thêm**

```
   npm install multer
```

6. **Các câu lệnh tự build db**

```
-- Thêm một số quốc gia
INSERT INTO Countries (CountryCode, CountryName, Description) VALUES
('FR', 'France', 'France - Known for premium wine production.'),
('IT', 'Italy', 'Italy - Renowned for diverse wine varieties.'),
('US', 'United States', 'United States - Major producer of wines.'),
('ES', 'Spain', 'Spain - Famous for rich, robust red wines.'),
('AU', 'Australia', 'Australia - Known for Shiraz and Chardonnay.');

-- Thêm một số loại rượu
INSERT INTO Wines (WineCode, WineName, AlcoholPercentage, Age, CountryCode, Image) VALUES
('W001', 'Chateau Margaux', 13.5, 10, 'FR', 'http://localhost:5000/images/Chateau_Margaux.jpeg'),
('W002', 'Barolo', 14.0, 8, 'IT', 'http://localhost:5000/images/Barolo.jpeg'),
('W003', 'Napa Valley Cabernet', 13.8, 5, 'US', 'http://localhost:5000/images/Napa_Valley.jpeg'),
('W004', 'Rioja Reserva', 13.0, 7, 'ES', 'http://localhost:5000/images/Ostatu_Rioja_Reserva.jpeg'),
('W005', 'Penfolds Grange', 14.5, 6, 'AU', 'http://localhost:5000/images/PenfoldsGrange.jpeg'),
('W006', 'Champagne Moet', 12.0, 3, 'FR', 'http://localhost:5000/images/Moet_Champagne_Hampers.jpeg'),
('W007', 'Chianti Classico', 13.2, 4, 'IT', 'http://localhost:5000/images/Tenuta_di_Arceno_Chianti.jpeg');

-- Các câu lệnh truy vấn filter
Truy vấn từng loại rượu quốc gia
 `
      SELECT
          Countries.CountryName,
          Wines.WineCode,
          Wines.WineName,
          Wines.AlcoholPercentage,
          Wines.Age,
          Wines.Image
      FROM
          Wines
      JOIN
          Countries ON Wines.CountryCode = Countries.CountryCode
      WHERE
          Countries.CountryName = ?
      ORDER BY
          Countries.CountryName
      `,
      [country_name]


Truy vấn tìm loại rượu có nồng độ cồn > 5 độ và sản xuất ở pháp
Cách 1: Làm đầy đủ join bảng lấy country name
SELECT
    Wines.WineCode,
    Wines.WineName,
    Wines.AlcoholPercentage,
    Wines.Age
FROM
    Wines
JOIN
    Countries ON Wines.CountryCode = Countries.CountryCode
WHERE
    Wines.AlcoholPercentage > 5
    AND Countries.CountryName = 'France';

Cách 2: Dựa vào mã country code
SELECT
    WineCode,
    WineName,
    AlcoholPercentage,
    Age
FROM
    Wines
WHERE
    AlcoholPercentage > 5
    AND CountryCode = 'FR';

Lưu ý: mỗi tài khoản root trên db ta đặt 1 pass riêng nên nhớ vào file db.js tìm trường password mà đổi theo cái mình đặt

File .sql này có thể được sử dụng để khôi phục lại cơ sở dữ liệu trên bất kỳ máy chủ MySQL nào bằng cách chạy các lệnh SQL từ file này.
Để import lại file .sql, bạn có thể sử dụng MySQL Workbench hoặc các công cụ dòng lệnh MySQL (mysql -u username -p database_name < path/to/file.sql).
```
