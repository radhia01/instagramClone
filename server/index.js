const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://instagramclone-radhia-rahmani.vercel.app","http://localhost:3000"],
  })
);
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://instagramclone-radhia-rahmani.vercel.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Vous etes bien connecté à la base de données");
  })
  .catch((error) => {
    console.log(error.message, "Erreur de connexion à la base de données ");
  });
app.get("/", (req, res) => {
  res.send({ message: "Bienvenue " });
});
app.use("/", require("./routes/auth.route"));
app.use("/", require("./routes/user.route"));
app.use("/", require("./routes/post.route"));
