import React from 'react';
import Navbar from './Navbar';
import '../App.css'; // Ensure the path is correct

const AboutUs = () => {
  const members = [
    { name: "Megan", image: "img/Megan.png", role: "Product Manager", info: "Hello! I'm a recent UW graduate with dual degrees in Informatics (HCI) and Interdisciplinary Visual Arts. In my free time, I love drawing and exploring the world with my friends and family :D" },
    { name: "Julie", image: "img/Julie.png", role: "Designer", info: "Hi! I'm a UX Designer with a background in Informatics and Psychology. I love drawing, reading, and recently got into watching baseball! I enjoyed working on this project and I hope it can help those who need it." },
    { name: "Tammy", image: "img/Tammy.png", role: "Developer", info: "Hello! I'm a senior graduating with a degree in Informatics and a minor in Business. I have a passion for exploring new experiences, particularly when it comes to food. I hope you enjoy trying out this site!"},
    { name: "Kate", image: "img/Kate.png", role: "Developer", info: "Hi! I am a senior Informatics BS, minor Data Science student this fall at UW. I love swimming in my free time and spending time with my friends :)"},
    { name: "Sabrina", image: "img/Sab.png", role: "Developer", info: "Hey! I'm a graduating Informatics and Geography: Data Science student at UW. I'm a big fan of doing art and baking, and so excited to share this project with you!"},
    { name: "Diya", image: "img/Diya.png", role: "Developer", info: "Hi! I'm going to be a Junior in Informatics this fall! I love traveling and some of my hobbies include pottery and boxing! I'm excited to have worked on this project and hope it can help everyone who uses it!"},
  ];

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <div className="about-section">
          <h1>About Us</h1>
          <p>We are a team of six from the University of Washington, working together to address UN Sustainable Development Goal 3: Good Health and Well being. This project is part of our INFO 442 class, where we aim to create a solution to improve health and well being. Each of us are excited to share our journey with you. We hope our efforts can make a positive impact and help those in need.</p>
          <div className="team-member">
            {members.map((member) => (
              <div key={member.name} className="member-item">
                <h3>{member.role}</h3>
                <img src={member.image} alt={member.name} className="member-photo" />
                <h2>{member.name}</h2>
                <p>{member.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
