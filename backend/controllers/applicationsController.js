const ApplicationModel = require("../models/application");
const UserModel = require("../models/user");

const createApplication = async (req, res) => {
  // Destructure 'applications' from the request body
  const { applications } = req.body;
  const user = await UserModel.findById(req.params.id);

  try {
    const newApplication = await ApplicationModel.create({
      unitType: applications.unitType,
      street: applications.street,
      streetNumber: applications.streetNumber,
      zipcode: applications.zipcode,
      area: applications.area,
      isOpen: applications.isOpen,
      images: applications.image,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.applications.push(newApplication);

    await user.save();

    res.json({
      message: "Application added to user's applications array successfully",
      newApplication: {
        _id: newApplication._id,
        unitType: newApplication.unitType,
        street: newApplication.street,
        streetNumber: newApplication.streetNumber,
        zipcode: newApplication.zipcode,
        area: newApplication.area,
        isOpen: newApplication.isOpen,
        images: newApplication.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
};
