import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import NotificationBell from "../components/NotificationBell";
import "./Services.css";


function Services() {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [providerName, setProviderName] = useState("");
  const [providerPhoto, setProviderPhoto] = useState("");
  const [providerExperience, setProviderExperience] = useState("");
  const [providerRating, setProviderRating] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerLocation, setProviderLocation] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate();

  const serviceImages = {
  plumber: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJIhK4xhgoA-xJJ5tc5uxraeb2XADsZQt6Q&s",
  electrician: "https://media.istockphoto.com/id/1469656864/photo/electrician-engineer-uses-a-multimeter-to-test-the-electrical-installation-and-power-line.jpg?s=612x612&w=0&k=20&c=h70UOpNbJYT5G2oGT-KUeIE3yXwEgsCpr25yR1rnGtU=",
  carpenter: "https://5.imimg.com/data5/SELLER/Default/2024/1/381655494/QE/IQ/QE/155969258/home-carpenter-services.jpeg",
  cleaner: "https://realworldcleaningservices.com/media/images/imported/2024/09/dayton-img02-600x580.jpg",
  painter: "https://www.shutterstock.com/shutterstock/videos/3747457217/thumb/1.jpg?ip=x480",

  "ac repair": "https://www.shutterstock.com/image-photo/repairman-fixing-ac-outdoor-unit-600nw-2672593305.jpg",
  "fridge repair": "https://img.freepik.com/premium-photo/refrigerator-with-malfunctioning-ice-maker-being-repaired_1283887-12116.jpg?semt=ais_hybrid&w=740&q=80",
  "washing machine repair": "https://acservice299.com/wp-content/uploads/elementor/thumbs/Washing-Machine-Repair-1_11zon-qz6n0d7phtvay0idnmrrmck65keuhca1zhem52w0a8.jpg",
  "tv repair": "https://content.jdmagicbox.com/v2/comp/visakhapatnam/e8/0891px891.x891.240819052145.h9e8/catalogue/vizag-multy-brand-led-tv-experts-yendada-visakhapatnam-tv-repair-and-services-xvw47tr9cr.jpg",
  "mobile repair": "https://media.istockphoto.com/id/512756266/photo/fixing-mobile-phone.jpg?s=612x612&w=0&k=20&c=Lgzw_qxkcqgOoPmI1LqQFA2LVtBVyj6kF5CoQXYpbfg=",
  "laptop repair": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwI9y4cNct5-LOh2pDzXShUJC51P-B6c2Iag&s",

  mechanic: "https://media.istockphoto.com/id/1497239622/photo/customer-and-automotive-technician-talking-about-the-car-problem-in-a-workshop.jpg?s=612x612&w=0&k=20&c=w-vftkUlyYFu0awn6ElDdc1BWocdPgyyw3Qc9BBD1-w=",
  driver: "https://media.gettyimages.com/id/1183087605/photo/young-male-gig-driver-waiting-to-get-started-on-deliveries.jpg?s=612x612&w=gi&k=20&c=-9dvO8AvojU5vVB0jP0YNp4x8CxOCscQlx2Edz0kzWA=",
  cook: "https://www.shutterstock.com/image-photo/professional-chefs-cooperation-cooking-vegitables-600nw-2657870871.jpg",
  "baby care": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz07UJdw-vgLuMl-dZiPiJYt6cucexbPECdQ&s",
  "home nurse": "https://thumbs.dreamstime.com/b/old-senior-home-care-patient-nurse-old-senior-home-care-nurse-helping-patient-to-dress-shoes-212490821.jpg",

  gardener: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgqKlfevKLK3SBj03GgfRo6twlCc0xGJBVA&s",
  "security guard": "https://securityservicesinindia.com/wp-content/uploads/2025/02/13-12-2024.jpg",
  "interior designer": "https://www.ikninteriors.com/images/residential-interior1.webp",
  photographer: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhiGZVEr-mu8WxvNHMMJJElqfNa-O292xUg&s",
  tutor: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtFJjSs74hc_M77qt_3KEfgxwCnqkfbJcww&s",
  "event planner": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpquaqPoGaoSthJh87b_KKvqowMJwyMIHWlA&s",
};



  const fetchServices = async () => {
  try {
    const token = localStorage.getItem("token");

    let url = `${BASE_URL}/api/services`;

    let params = [];

    if (filterCategory !== "") {
      params.push("category=" + filterCategory);
    }

    if (search !== "") {
      params.push("search=" + search);
    }

    if (params.length > 0) {
      url = url + "?" + params.join("&");
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });

    const data = await res.json();
    setServices(data);

  } catch (error) {
    console.log(error);
  }
};

 useEffect(() => {
  const token = localStorage.getItem("token");

  let url = `${BASE_URL}/api/services`;
  let params = [];

  if (filterCategory !== "") {
    params.push("category=" + filterCategory);
  }

  if (search !== "") {
    params.push("search=" + search);
  }

  if (status !== "") {
    params.push("status=" + status);
  }

  if (sort !== "") {
    params.push("sort=" + sort);
  }

  if (params.length > 0) {
    url = url + "?" + params.join("&");
  }

  // 🔥 START loading
  setLoading(true);
  setError("");

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }
      return res.json();
    })
    .then((data) => setServices(data))
    .catch((err) => {
      console.log(err);
      setError("Something went wrong");
    })
    .finally(() => setLoading(false)); // 🔥 STOP loading

}, [filterCategory, search,status,sort]);


  const addService = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Sending:", {
        title,
        description,
        category,
        providerName,
        providerPhoto,
        providerExperience,
        providerRating,
        providerPhone,
        providerLocation,
      });
      await fetch(`${BASE_URL}/api/services/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          currency,
          category,
          image: serviceImages[category],
          providerName,
          providerPhoto,
          providerExperience,
          providerRating,
          providerPhone,
          providerLocation,
        }),
      });

      // RESET FORM
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory(""); 
      setProviderName("");
      setProviderPhoto("");
      setProviderExperience("");
      setProviderRating("");
      setProviderPhone("");
      setProviderLocation("");

      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };

const handleEdit = (service) => {
  setEditId(service._id);
  setTitle(service.title);
  setDescription(service.description);
  setPrice(service.price);
  setCategory(service.category);
  setProviderName(service.providerName || "");
  setProviderPhoto(service.providerPhoto || "");
  setProviderExperience(service.providerExperience || "");
  setProviderRating(service.providerRating || "");
  setProviderPhone(service.providerPhone || "");
  setProviderLocation(service.providerLocation || "");

  // 🔥 ADD THIS
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

  const updateService = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/services/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          currency,
          category,
          providerName,
          providerPhoto,
          providerExperience,
          providerRating,
          providerPhone,
          providerLocation, // 🔥 ADD THIS
        }),
      });

      setEditId(null);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory(""); // 🔥 RESET

      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    navigate("/home");
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/services/${id}/toggle`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };

const clearFilters = () => {
  setFilterCategory("");
  setStatus("");
  setSearch("");
};

const confirmDelete = async () => {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/api/services/${selectedServiceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  setShowModal(false);
  window.location.reload(); // simple refresh
};

  return ( 
    <div className="dashboard">
      <button
          className="provider-dashboard-btn"
          onClick={() => navigate("/provider/bookings")}
        >
          Provider Dashboard
        </button>
       <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total</h3>
            <p>{services.length}</p>
          </div>

          <div className="stat-card">
            <h3>Active</h3>
            <p>{services.filter(s => s.isActive).length}</p>
          </div>

          <div className="stat-card">
            <h3>Inactive</h3>
            <p>{services.filter(s => !s.isActive).length}</p>
          </div>
       </div>
       

      {/* HEADER */}
      <div className="topbar">
        <h2>🚀 ServiceHub Dashboard</h2>
        <NotificationBell />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CREATE SERVICE */}
      <div className="create-card">
        <h3>Create Service</h3>

        <div className="form-group">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Painter">Painter</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Fridge Repair">Fridge Repair</option>
            <option value="Washing Machine Repair">Washing Machine Repair</option>
            <option value="TV Repair">TV Repair</option>
            <option value="Mobile Repair">Mobile Repair</option>
            <option value="Laptop Repair">Laptop Repair</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Driver">Driver</option>
            <option value="Cook">Cook</option>
            <option value="Baby Care">Baby Care</option>
            <option value="Home Nurse">Home Nurse</option>
            <option value="Gardener">Gardener</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Interior Designer">Interior Designer</option>
            <option value="Photographer">Photographer</option>
            <option value="Tutor">Tutor</option>
            <option value="Event Planner">Event Planner</option>
          </select>

          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Provider Name"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Provider Photo URL"
            value={providerPhoto}
            onChange={(e) => setProviderPhoto(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience (Example: 5 Years)"
            value={providerExperience}
            onChange={(e) => setProviderExperience(e.target.value)}
          />

          <div className="price-row">
            <input
              type="text"
              placeholder="Rating"
              value={providerRating}
              onChange={(e) => setProviderRating(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={providerPhone}
              onChange={(e) => setProviderPhone(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            value={providerLocation}
            onChange={(e) => setProviderLocation(e.target.value)}
          />


          {/* PRICE */}
          <div className="price-row">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>

          <button
            type="button"
            className="primary-btn"
            onClick={editId ? updateService : addService}
          >
            {editId ? "Update Service" : "Add Service"}
          </button>
        </div>
      </div>

      {/* SERVICES */}
      <div className="services-section">
        <div className="filter-box">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Painter">Painter</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Fridge Repair">Fridge Repair</option>
            <option value="Washing Machine Repair">Washing Machine Repair</option>
            <option value="TV Repair">TV Repair</option>
            <option value="Mobile Repair">Mobile Repair</option>
            <option value="Laptop Repair">Laptop Repair</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Driver">Driver</option>
            <option value="Cook">Cook</option>
            <option value="Baby Care">Baby Care</option>
            <option value="Home Nurse">Home Nurse</option>
            <option value="Gardener">Gardener</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Interior Designer">Interior Designer</option>
            <option value="Photographer">Photographer</option>
            <option value="Tutor">Tutor</option>
            <option value="Event Planner">Event Planner</option>
          </select>

            {/* ✅ ADD STATUS HERE */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />    

          <button onClick={clearFilters} className="clear-btn">
            Clear Filters
          </button> 
        </div>
        {loading && <p className="loading">Loading services...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && services.length === 0 && (
            <p className="empty">No services found</p>
        )}
        <h3>Your Services</h3>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service._id}>
              <img
                src={serviceImages[service.category] || "https://via.placeholder.com/150"}
                alt="service"
                className="service-img"
              />

              <div className="card-header">
                <h4>{service.title}</h4>
                <span className="status">
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* CATEGORY SHOW */}
              <p className="category">{service.category}</p>

              <p className="desc">{service.description}</p>

              <p className="price">
                {service.currency} {service.price}
              </p>

              <p className="date">
                Created on: {new Date(service.createdAt).toLocaleDateString()}
               </p>
               

             <div className="provider-preview">
              <img
                src={
                  service.providerPhoto ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="provider"
                className="provider-preview-img"
              />

              <div className="provider-preview-info">
                <h5>{service.providerName || "Provider Name"}</h5>
                <p>⭐ {service.providerRating || "4.5"}</p>
              </div>
            </div>

            <button
              className="view-btn"
              onClick={() => setSelectedService(service)}
            >
              View Details
            </button>


              <div className="card-actions">
                <button
                  className="edit"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>

                <button onClick={() => toggleStatus(service._id)}>
                  {service.isActive ? "Deactivate" : "Activate"}
                </button>

                <button 
                  className="delete" 
                  onClick={() => {
                    setSelectedServiceId(service._id);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
          {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>⚠️ Confirm Delete</h3>
              <p>Are you sure you want to delete this service?</p>

              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button 
                  className="confirm-btn"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
            {selectedService && (
          <div
            className="provider-details-overlay"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="provider-details-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="provider-close-btn"
                onClick={() => setSelectedService(null)}
              >
                ×
              </button>

              <img
                src={
                  serviceImages[selectedService.category?.toLowerCase()] ||
                  "https://via.placeholder.com/600x250"
                }
                alt="service"
                className="provider-banner"
              />

              <h2>{selectedService.title}</h2>

              <p className="provider-main-desc">
                {selectedService.description}
              </p>

              <div className="provider-full-card">
                <img
                  src={
                    selectedService.providerPhoto ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="provider"
                  className="provider-full-img"
                />

                <div className="provider-full-info">
                  <h3>{selectedService.providerName}</h3>
                  <p>⭐ {selectedService.providerRating}</p>
                  <p>🛠 {selectedService.providerExperience}</p>
                  <p>📞 {selectedService.providerPhone}</p>
                  <p>📍 {selectedService.providerLocation}</p>

                  <p className="provider-price">
                    {selectedService.currency} {selectedService.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Services;