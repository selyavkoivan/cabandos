# 📌 Kanban Application

## 🚀 Overview
Kanban Application is a task management tool with real-time chat and comprehensive change history tracking. It ensures seamless team collaboration and efficient project tracking.

## ✨ Features
- **Task Board**: Perform full CRUD operations for task management.
- **Change History**: Track all modifications with a detailed timeline.
- **Real-time Chat**: Enables communication between users within the application.
- **WebSockets Support**: Ensures instant message delivery and task updates.
- **Cloudinary Integration**: Handles image storage efficiently.

---

## 🖥️ Server-Side
### 🔧 Tech Stack
- **C# (ASP.NET Core)**
- **Entity Framework (MySQL Database)**
- **MediatR Pattern**: Maintains structured architecture.

### ⚙️ Middleware
1. **Error Handling Middleware**: Captures and sends structured error messages to the client.
2. **Logging Middleware**: Logs all actions performed on the server.
3. **Email Confirmation Attribute**: Temporarily disabled but functions like middleware.

### 📊 Database Handling
- Due to the **Code-First** approach, a **server-side pseudo-trigger** is implemented to log changes.

### 🔒 Data Validation
- Input validation at both **server** and **database** levels to ensure data integrity.

---

## 🌐 Client-Side
### 🔧 Tech Stack
- **React** with **Redux** for state management.
- **Reactstrap** for UI styling.
- **React-calendar-timeline** for timeline visualization.

### ⚙️ Error Handling
- Robust error-catching mechanism, including server response handling.

### 🛡️ Data Validation
- Prevents incorrect data submission to the server.
- Ensures proper rendering of received data.

### 📦 Dependencies
```json
{
  "@eslint/js": "9.14.0",
  "@fortawesome/fontawesome-svg-core": "6.7.1",
  "@fortawesome/free-solid-svg-icons": "6.7.1",
  "@fortawesome/react-fontawesome": "0.2.2",
  "@reduxjs/toolkit": "2.5.0",
  "@types/react-dom": "18.3.1",
  "@types/react": "18.3.12",
  "@vitejs/plugin-react": "4.3.3",
  "bootstrap": "5.3.3",
  "core-js": "3.40.0",
  "eslint-plugin-react-hooks": "5.0.0",
  "eslint-plugin-react-refresh": "0.4.14",
  "eslint-plugin-react": "7.37.2",
  "eslint": "9.14.0",
  "globals": "15.12.0",
  "moment": "2.30.1",
  "react-calendar-timeline": "0.30.0-beta.3",
  "react-dom": "18.3.1",
  "react-error-boundary": "5.0.0",
  "react-icons": "5.3.0",
  "react-modal": "3.16.3",
  "react-redux": "9.2.0",
  "react-router-dom": "7.0.1",
  "react-toastify": "11.0.2",
  "react": "18.3.1",
  "reactstrap": "9.2.3",
  "redux": "5.0.1",
  "vite": "5.4.11"
}
```

---

## 🖥️ Server Dependencies
```xml
<ItemGroup>
  <PackageReference Include="CloudinaryDotNet" Version="1.27.1" />
  <PackageReference Include="Google.Apis.Auth" Version="1.68.0" />
  <PackageReference Include="MailKit" Version="4.9.0" />
  <PackageReference Include="MediatR" Version="12.4.1" />
  <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="8.0.11" />
  <PackageReference Include="Microsoft.AspNetCore.SpaProxy">
    <Version>8.*-*</Version>
  </PackageReference>
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  </PackageReference>
  <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.0">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  </PackageReference>
  <PackageReference Include="Microsoft.Extensions.Identity.Core" Version="9.0.0" />
  <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
</ItemGroup>
```

---

## ⚡ Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/selyavkoivan/cabandos.git
   ```
2. **Configure the database connection.**
3. **Run the backend server:**
   ```sh
   dotnet run
   ```
4. **Start the frontend application:**
   ```sh
   npm install
   npm run dev
   ```

---

## 🤝 Contribution
Contributions are welcome! Please follow the standard pull request process.

🔗📩 **Contact**: selyavkosh2@gmail.com

