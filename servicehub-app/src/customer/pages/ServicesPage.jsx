import React, { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../config";
import "./ServicesPage.css";
import { useNavigate } from "react-router-dom";

const defaultImages = {
  plumber:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJIhK4xhgoA-xJJ5tc5uxraeb2XADsZQt6Q&s",
  electrician:
    "https://media.istockphoto.com/id/1469656864/photo/electrician-engineer-uses-a-multimeter-to-test-the-electrical-installation-and-power-line.jpg?s=612x612&w=0&k=20&c=h70UOpNbJYT5G2oGT-KUeIE3yXwEgsCpr25yR1rnGtU=",
  carpenter:
    "https://5.imimg.com/data5/SELLER/Default/2024/1/381655494/QE/IQ/QE/155969258/home-carpenter-services.jpeg",
  cleaner:
    "https://realworldcleaningservices.com/media/images/imported/2024/09/dayton-img02-600x580.jpg",
  painter:
    "https://www.shutterstock.com/shutterstock/videos/3747457217/thumb/1.jpg?ip=x480",
  "ac repair":
    "https://www.shutterstock.com/image-photo/repairman-fixing-ac-outdoor-unit-600nw-2672593305.jpg",
  "fridge repair":
    "https://img.freepik.com/premium-photo/refrigerator-with-malfunctioning-ice-maker-being-repaired_1283887-12116.jpg?semt=ais_hybrid&w=740&q=80",
  "washing machine repair":
    "https://acservice299.com/wp-content/uploads/elementor/thumbs/Washing-Machine-Repair-1_11zon-qz6n0d7phtvay0idnmrrmck65keuhca1zhem52w0a8.jpg",
  "tv repair":
    "https://content.jdmagicbox.com/v2/comp/visakhapatnam/e8/0891px891.x891.240819052145.h9e8/catalogue/vizag-multy-brand-led-tv-experts-yendada-visakhapatnam-tv-repair-and-services-xvw47tr9cr.jpg",
  "mobile repair":
    "https://media.istockphoto.com/id/512756266/photo/fixing-mobile-phone.jpg?s=612x612&w=0&k=20&c=Lgzw_qxkcqgOoPmI1LqQFA2LVtBVyj6kF5CoQXYpbfg=",
  "laptop repair":
    "https://www.laptopservicecenter.net/wp-content/uploads/2021/04/Laptop-Repair-World-Official-Store-in-Madhapur-Hyderabad-Telangana.jpg",
  mechanic:
    "https://media.istockphoto.com/id/1497239622/photo/customer-and-automotive-technician-talking-about-the-car-problem-in-a-workshop.jpg?s=612x612&w=0&k=20&c=w-vftkUlyYFu0awn6ElDdc1BWocdPgyyw3Qc9BBD1-w=",
  driver:
    "https://media.gettyimages.com/id/1183087605/photo/young-male-gig-driver-waiting-to-get-started-on-deliveries.jpg?s=612x612&w=gi&k=20&c=-9dvO8AvojU5vVB0jP0YNp4x8CxOCscQlx2Edz0kzWA=",
  cook:
    "https://www.shutterstock.com/image-photo/professional-chefs-cooperation-cooking-vegitables-600nw-2657870871.jpg",
  "baby care":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz07UJdw-vgLuMl-dZiPiJYt6cucexbPECdQ&s",
  
  "home nurse":
    "https://thumbs.dreamstime.com/b/old-senior-home-care-patient-nurse-old-senior-home-care-nurse-helping-patient-to-dress-shoes-212490821.jpg",
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const handleLogout = () => {
      localStorage.removeItem("customerLoggedIn");
      window.location.href = "/";
    };
  const navigate = useNavigate();
  console.log("Selected:", selectedService);
  
 useEffect(() => {
  fetch(`${BASE_URL}/api/services/public`)
    .then((res) => res.json())
    .then((data) => {
      console.log("SERVICES DATA:", data); // debug
      setServices(data); // IMPORTANT
    })
    .catch((err) => console.log(err));
}, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const text = `${service.title} ${service.category} ${service.description}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [services, search]);

  return (
    <div className="customer-page">
      <section className="hero-section">
        <div className="top-bar">
            <div className="brand-name">ServiceHub</div>

            <div className="top-actions">
              <button
                className="my-bookings-btn"
                onClick={() => navigate("/customer/my-bookings")}
              >
                My Bookings
              </button>

              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem("customerLoggedIn");
                  navigate("/home");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        <div className="hero-content">
          <h1>Find Trusted Services Near You</h1>
          <p>
            Book verified professionals for plumbing, repair, electrician,
            home care and more.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search plumber, electrician, AC repair..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div className="service-card" key={service._id}>
              <div className="image-wrapper">
                <img
                  src={
                    service.image && service.image !== ""
                      ? service.image
                      : defaultImages[service.category?.toLowerCase()] ||
                        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={service.title}
                  className="service-image"
                />

                <div className="category-badge">{service.category}</div>
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="provider-row">
                  <img
                    className="provider-photo"
                    src={
                      service.providerPhoto && service.providerPhoto !== ""
                        ? service.providerPhoto
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={service.providerName}
                  />

                  <div>
                    <h4 className="provider-name">
                      {service.providerName || "Service Provider"}
                    </h4>
                    <span className="provider-exp">
                      {service.providerExperience || "Experience not added"}
                    </span>
                  </div>
                </div>

                <div className="service-meta">
                  <span>⭐ {service.providerRating || 4.8}</span>
                  <span>📍 {service.providerLocation || "Location not available"}</span>
                </div>

                <div className="card-footer">
                  <div>
                    <small>Starting From</small>
                    <h2>
                      {service.currency} {service.price}
                    </h2>
                  </div>

                  <button
                    className="book-btn"
                    onClick={() => setSelectedService(service)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>

            <img
              src={
                selectedService.image && selectedService.image !== ""
                  ? selectedService.image
                  : defaultImages[selectedService.category?.toLowerCase()]
              }
              alt={selectedService.title}
              className="modal-image"
            />

            <div className="modal-content">
              <span className="modal-category">
                {selectedService.category}
              </span>

              <h2>{selectedService.title}</h2>
              <p>{selectedService.description}</p>

              <div className="modal-provider">
                <img
                  src={
                    selectedService.providerPhoto &&
                    selectedService.providerPhoto !== ""
                      ? selectedService.providerPhoto
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={selectedService.providerName}
                />

                <div>
                  <h3>{selectedService.providerName || "Service Provider"}</h3>
                  <p>{selectedService.providerExperience || "Experience not available"}</p>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <span>Rating</span>
                  <strong>⭐ {selectedService.providerRating || 4.8}</strong>
                </div>

                <div className="detail-box">
                  <span>Phone</span>
                  <strong>{selectedService.providerPhone || "Not Available"}</strong>
                </div>

                <div className="detail-box">
                  <span>Location</span>
                  <strong>{selectedService.providerLocation || "Not Available"}</strong>
                </div>

                <div className="detail-box">
                  <span>Price</span>
                  <strong>
                    {selectedService.currency} {selectedService.price}
                  </strong>
                </div>
              </div>

                          <button
              className="final-book-btn"
             onClick={() => {
                window.scrollTo(0, 0); // 🔥 FORCE scroll BEFORE navigation

                 navigate("/customer/booking", {
                  state: {
                    service: {
                      ...selectedService,
                      image: selectedService.image
                    }
                  },
                });
              }}
            >
              Book This Service
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}