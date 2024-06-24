const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Supprimer le compte utilisateur
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findByIdAndDelete(id);

    if (!userToDelete) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    return res.status(200).json(userToDelete);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Mettre à jour l'utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      updatedUser,
      success: true,
      message: "L'utilisateur a été mis à jour avec succès",
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Supprimer l'utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, error: "Utilisateur supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Suivre un utilisateur
exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          followers: { userid },
        },
      },
      { new: true }
    );

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Ne plus suivre un utilisateur
exports.unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          followers: { userid },
        },
      },
      { new: true }
    );

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Mettre à jour le profil
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, website, user, bio, phone } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        website,
        user,
        bio,
        phone,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Votre profil a été modifié avec succès",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};

// Mettre à jour le mot de passe
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastpassword, newpassword, confirmnewpassword } = req.body;

    const user = await User.findById(id);

    // Vérifier si l'ancien mot de passe est correct
    const checkedPassword = await bcrypt.compare(lastpassword, user.password);
    if (!checkedPassword) {
      return res
        .status(400)
        .json({ error: "L'ancien mot de passe est incorrect" });
    }

    // Vérifier si les nouveaux mots de passe sont similaires
    else if (newpassword === confirmnewpassword) {
      const hashedNewPassword = await bcrypt.hash(newpassword, 10);

      // Mettre à jour le mot de passe dans la base de données
      const updatedUser = await User.findByIdAndUpdate(id, {
        password: hashedNewPassword,
      });

      return res.status(200).json({
        message: "Mot de passe mis à jour avec succès",
        updatedUser,
      });
    }
    // Les nouveaux mots de passe ne sont pas similaires
    else {
      return res
        .status(400)
        .json({ error: "Les mots de passe ne sont pas similaires" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};
