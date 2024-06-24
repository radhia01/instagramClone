const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Inscription
exports.signUp = async (req, res) => {
  try {
    const { username, email, password, user } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Utilisateur avec cette adresse email existe déjà" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      user,
      Useravatar:
        "https://res.cloudinary.com/db8b6npfz/image/upload/v1700921258/user_bgjn60.png",
    });

    await newUser.save();

    return res.status(200).json({ user: newUser, success: true });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error.message);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement, veuillez réessayer." });
  }
};

// Connexion
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Comparer les mots de passe
    const comparedPasswords = await bcrypt.compare(password, user.password);

    if (!comparedPasswords) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Générer le jeton
    const token = jwt.sign({ id: user._id }, "jcderfgrs");

    return res.status(200).json({ token, user, success: true });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    return res
      .status(500)
      .json({ error: "Erreur lors de la connexion, veuillez réessayer." });
  }
};
