import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css';
import { fetchNews, fetchInsuranceIssuers } from './NetworkManager'; 

function Home() {
  const [articles, setArticles] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [insurance, setInsurance] = useState('');
  const [location, setLocation] = useState('');
  const [insuranceIssuers, setInsuranceIssuers] = useState([]);
  const wrapperRef = useRef(null);
  const sourcesRef = useRef(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsArticles = await fetchNews('women health obgyn');
        setArticles(newsArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    
    const loadInsuranceIssuers = async () => {
      try {
        const issuers = await fetchInsuranceIssuers();
        setInsuranceIssuers(issuers);
      } catch (error) {
        console.error('Error fetching insurance issuers:', error);
      }
    };

    getNews();
    loadInsuranceIssuers();
  }, []);

  const handleScroll = (direction) => {
    const cardWidth = wrapperRef.current.offsetWidth / 4; 
    const totalCards = articles.length;
    const maxScroll = cardWidth * (totalCards - 4); 

    let newScrollPosition = scrollPosition + direction * cardWidth;
    if (newScrollPosition < 0) newScrollPosition = 0;
    if (newScrollPosition > maxScroll) newScrollPosition = maxScroll;

    setScrollPosition(newScrollPosition);
    sourcesRef.current.style.transform = `translateX(-${newScrollPosition}px)`;
  };

  const handleSearchClick = () => {
    navigate(`/find-doctor?insurance=${insurance}&location=${location}`);
  };

  return (
    <div>
      <div className="header-section-a">
        <Navbar />
        <div className="search-section">
          <h1>
            We're Glad You're Here
            <br />
            Find the Perfect OB/GYN for You
          </h1>
          <div className="search-box">
            <select 
              value={insurance} 
              onChange={(e) => setInsurance(e.target.value)}
              placeholder="Select insurance..."
            >
              <option value="">Select Insurance</option>
              {insuranceIssuers.map((issuer, index) => (
                <option key={index} value={issuer.name}>
                  {issuer.name}
                </option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Enter city or zip" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
            />
            <button id="searchButton" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>What can we provide for you?</h2>
        <div className="infographic-section">
          <div className="infographic-item">
            <h3>Interactive Map Search</h3>
            <p>
              Our interactive map search allows visitors to filter through OB/GYN caregivers in the Washington area and learn more about the professionals in the area.
            </p>
          </div>
          <div className="infographic-item">
            <h3>Doctor Profiles</h3>
            <p>
              We provide detailed information about gynecologists, such as their contact information, services, which insurances they accept, and more.
            </p>
          </div>
          <div className="infographic-item">
            <h3>Community-Provided Reviews</h3>
            <p>
              On doctor profiles, visitors can see reviews of other people's experiences with that specific doctor. This helps to provide visitors with personalized insights and informed choices.
            </p>
          </div>
        </div>
        <div className="featured-sources-container">
          <h2>Featured sources</h2>
          <div className="buttons-container d-flex justify-content-end">
            <button className="arrow-button arrow-left" onClick={() => handleScroll(-1)}>‹</button>
            <button className="arrow-button arrow-right" onClick={() => handleScroll(1)}>›</button>
          </div>
          <div className="featured-sources-wrapper" ref={wrapperRef}>
            <div className="featured-sources" ref={sourcesRef}>
              {articles.map((article, index) => (
                <div className="source-card" key={index}>
                  {article.imageUrl && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <img src={article.imageUrl} alt={article.title} className="article-image" />
                    </a>
                  )}
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;