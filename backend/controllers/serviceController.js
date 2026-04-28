const Service = require("../models/Service");

// ✅ CREATE SERVICE
const createService = async (req, res) => {
  try {
   let {
  title,
  description,
  price,
  currency,
  category,
  providerName,
  providerPhoto,
  providerExperience,
  providerRating,
  providerPhone,
  providerLocation,
  image
} = req.body;

    // 🔥 validation
    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 default currency
    if (!currency) {
      currency = "INR";
    }

    const service = await Service.create({
      title,
      description,
      price: Number(price),
      currency,
      category: category.trim().toLowerCase(),
      image,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error); // 🔥 debug
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL SERVICES
const getServices = async (req, res) => {
  try {
    console.log("USER:", req.user);

    // 🔥 get both category + search
    const { category, search,status,sort } = req.query;

    // 🔥 base filter (only logged in user)
    let filter = { user: req.user.id };

    // 🔥 category filter
    if (category) {
      filter.category = category.trim().toLowerCase();
    }

    if (status) {
      if (status === "active") {
        filter.isActive = true;
      } else if (status === "inactive") {
        filter.isActive = false;
      }
    }

    // 🔥 search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // 🔥 FINAL QUERY
    let query = Service.find(filter);

    // 🔽 SORT LOGIC
    if (sort === "low") {
      query = query.sort({ price: 1 });
    } else if (sort === "high") {
      query = query.sort({ price: -1 });
    }

    const services = await query;

    res.status(200).json(services);

  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET SINGLE SERVICE
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("user", "name email");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log("GET BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.deleteOne();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE SERVICE (FIXED 🔥)
const updateService = async (req, res) => {
  try {
    let {
  title,
  description,
  price,
  currency,
  category,
  providerName,
  providerPhoto,
  providerExperience,
  providerRating,
  providerPhone,
  providerLocation
} = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 🔥 safe updates
    service.title = title || service.title;
    service.description = description || service.description;
    service.providerName = providerName || service.providerName;
    service.providerPhoto = providerPhoto || service.providerPhoto;
    service.providerExperience =
      providerExperience || service.providerExperience;

    if (providerRating !== undefined) {
      service.providerRating = providerRating;
    }

    service.providerPhone = providerPhone || service.providerPhone;
    service.providerLocation = providerLocation || service.providerLocation;

    if (price !== undefined) {
      service.price = Number(price);
    }

    if (currency) {
      service.currency = currency;
    }

    const updated = await service.save();

    res.json({
      message: "Service updated successfully",
      service: updated,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 🔥 Toggle logic
    service.isActive =
  service.isActive === undefined ? false : !service.isActive;

    await service.save();

    res.json({
      message: "Status updated",
      service,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPublicServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  deleteService,
  updateService,
  toggleStatus,
  getPublicServices,
};