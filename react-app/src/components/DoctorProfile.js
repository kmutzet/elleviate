// Inside DoctorProfile.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { fetchDoctorReviews } from './NetworkManager';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DoctorProfile = () => {
  const query = useQuery();
  const doctor = {
    name: query.get('name'),
    credential: query.get('credential'),
    gender: query.get('gender'),
    type: query.get('type'),
    address: query.get('address'),
    phone: query.get('phone'),
    insurance: query.get('insurance')
  };

  const [reviews, setReviews] = useState({ reviews: [] });

  useEffect(() => {
    if (doctor.name) {
      fetchDoctorReviews(doctor.name, doctor.address)
        .then(data => {
          setReviews(data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [doctor.name, doctor.address]);

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md">
            {doctor ? (
              <div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h2>{doctor.name}</h2> {/* name */}
                    <h5 className="text-muted">{doctor.type}</h5> {/* provider type */}
                    <h5 className="text-muted">{doctor.credential}</h5> {/*credential*/}
                    <p>
                      <span className="badge bg-success" style={{ backgroundColor: '#28a745' }}>{doctor.gender}</span> {/* gender */}
                    </p>
                    <p className="clinic-address">
                      <strong>{doctor.address}</strong><br /> {/* address */}
                      <i className="fas fa-phone"></i> {doctor.phone} {/* phone */}
                    </p>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h4>Insurance</h4>
                    <p>{doctor.insurance}</p> {/* insurance */}
                  </div>
                </div>
                {reviews && reviews.reviews ? (
                <div className="card mb-4">
                  <div className="card-body">
                    <h4>Reviews</h4>
                    <p>Overall Rating: {reviews.rating}</p>
                    {reviews.reviews.map((review, index) => (
                      <div key={index}>
                        <p>{review.text}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No reviews available.</p>
              )}
              </div>
            ) : (
              <p>Loading doctor information...</p>
            )}
          </div>
        </div>
      </div>
      <script src="https://kit.fontawesome.com/a076d05399.js"></script> 
    </div>
  );
};

export default DoctorProfile;
