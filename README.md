# Online Store - si410

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Academic project implementing a complete online store system with Spring Boot backend and React frontend.

## 📁 Project Structure
```
online-store/
├── backend/               # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
└── frontend/
    └── my-app/            # React (Vite) application
        ├── src/
        ├── package.json
        └── vite.config.js
```


## 🛠️ Backend Setup (Spring Boot)
### Configuration
1. Navigate to `backend/src/main/resources/`
2. Configure `application.properties`:

You will found a template with data you must change according to your database connection in mysql, the main configuration is required even before running the application.
```properties
spring.application.name=backend

# Database Configuration (REQUIRED)
spring.datasource.url=jdbc:mysql://localhost:3306/online_store
spring.datasource.username=your_username
spring.datasource.password=your_password
```
Some useful settings too (The application works fine even without these settings, it's up to you if you decide to delete them or keep them)
```
# JPA/Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```
Running the Backend
```
cd backend
mvn spring-boot:run
```
The API will be available at http://localhost:8080

## 💻 Frontend Setup (React + Vite)

### Installation
```bash
cd frontend/my-app
npm install
```
Running the Frontend
```bash
npm run dev
```
Acces the application at:
http://localhost:5173
