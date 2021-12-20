// Экспортируем express mongose в переменные 
const express = require("express"); 
const mongoose = require("mongoose"); 
const config = require("config"); 
 
 
//Импортируем наши роуты 
const authRouter = require("./routes/auth.routes"); 
 
const cors = require("./middlewear/middleWear")  
 
//Создаём сам сервер из express 
const app = express(); 
 
// Создаём порт, используя функцию get у конфига по ключу и получаем значение 
const PORT = config.get("serverPort"); 
 
app.use(cors) 
app.use(express.json()); 
app.use("/api/auth", authRouter); 
 
//Создаём функцию которая будет подключаться к базе данных и запускать сервер 
const start = async () => { 
  try { 
    await mongoose.connect(config.get("dbUrl")); 
    // Тут передодим в функцию порт и 2 параметром передаём функцию которая сработает после запуска сервера 
    app.listen(PORT, () => { 
      console.log("Server started", PORT); 
    }); 
  } catch (e) {} 
}; 
 
start();