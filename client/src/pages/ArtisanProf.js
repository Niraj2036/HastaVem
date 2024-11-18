import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css'; // Reusing the existing CSS file

const ArtisanProfile = () => {
  const { id } = useParams(); // Get artisan_id from URL parameters
  const [artisan, setArtisan] = useState(null); // State to store artisan details

  useEffect(() => {
    // Fetch artisan details based on ID from API
    fetch(`http://localhost:8080/api/v1/artisan/${id}`)
      .then((response) => response.json())
      .then((data) => setArtisan(data))
      .catch((error) => console.error('Error fetching artisan details:', error));
  }, [id]);

  if (!artisan) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <Layout showHeader={true} showFooter={false}>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center image-container">
                <img
                  className="rounded-4 fit square-image"
                  src={artisan.image_link}
                  alt={artisan.name}
                />
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{artisan.name}</h4>
                <div className="mb-3">
                  <strong>Age: </strong>{artisan.age}
                </div>
                <div className="mb-3">
                  <strong>Location: </strong>{artisan.location}
                </div>
                <div className="mb-3">
                  <strong>Experience: </strong>{artisan.experience}
                </div>
                <div className="mb-3">
                  <strong>Specialization: </strong>{artisan.specialization}
                </div>
                <div className="mb-3">
                  <strong>Contact: </strong>{artisan.contact}
                </div>
                
              </div>
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArtisanProfile;
