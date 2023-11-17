const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

const {
  createApplication,
} = require("../controllers/applicationsController.js");

// Create a new application
router.post("/users/:id/applications", createApplication);
router.delete(
  "/users/:userId/applications/:applicationId",
  async (req, res) => {
    const { userId, applicationId } = req.params;

    try {
      // Find the user
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the application in the user's applications array
      const applicationIndex = user.applications.findIndex(
        (app) => app._id.toString() === applicationId
      );

      if (applicationIndex === -1) {
        return res.status(404).json({ error: "Application not found" });
      }

      // Remove the application from the array
      user.applications.splice(applicationIndex, 1);

      // Save the updated user
      await user.save();

      res.json({ message: "Application deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
