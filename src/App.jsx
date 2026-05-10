import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaCalendar, FaTrophy } from 'react-icons/fa';
import './index.css';

function App() {
  const [hackathons, setHackathons] = useState([]);
  const [filters, setFilters] = useState({ search: '', platform: '', location: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons();
  }, [filters]);

  const fetchHackathons = () => {
    setLoading(true);
    // ✅ MOCK INDIAN HACKATHONS WITH ₹ PRIZES
    setTimeout(() => {
      const mockHackathons = [
        {
          id: 1,
          title: "India Fintech Hackathon 2026",
          platform: "Unstop",
          location: "Online",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&fit=crop",
          url: "https://unstop.com/hackathon/india-fintech-2026",
          prize: "₹5,00,000"
        },
        {
          id: 2,
          title: "Devfolio AI Challenge India",
          platform: "Devfolio",
          location: "Bangalore",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&fit=crop", 
          url: "https://devfolio.co/ai-challenge",
          prize: "₹3,25,000"
        },
        {
          id: 3,
          title: "Unstop ML Hackathon",
          platform: "Unstop",
          location: "Delhi",
          image: "https://images.unsplash.com/photo-1664682001826-9bba0d77f0c4?w=400&fit=crop",
          url: "https://unstop.com/hackathon/ml-delhi",
          prize: "₹2,50,000"
        },
        {
          id: 4,
          title: "Web3 India Hackathon",
          platform: "Devfolio",
          location: "Online", 
          image: "https://images.unsplash.com/photo-1644611240432-4d8b8f785d69?w=400&fit=crop",
          url: "https://devfolio.co/web3-india",
          prize: "₹4,00,000"
        },
        {
          id: 5,
          title: "Productathon by Unstop",
          platform: "Unstop",
          location: "Mumbai",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&fit=crop",
          url: "https://unstop.com/productathon-mumbai",
          prize: "₹1,75,000"
        },
        {
          id: 6,
          title: "HackNITP 2026",
          platform: "Devfolio",
          location: "NIT Patna",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400&fit=crop",
          url: "https://devfolio.co/hacknitp",
          prize: "₹2,00,000"
        }
      ].filter(hack => {
        // Apply filters
        return (!filters.search || hack.title.toLowerCase().includes(filters.search.toLowerCase())) &&
               (!filters.platform || hack.platform === filters.platform) &&
               (!filters.location || hack.location === filters.location);
      });
      
      setHackathons(mockHackathons);
      setLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="loading">
        <FaSearch className="spin" /> Loading hackathons...
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎉 Hackathon Finder</h1>
        <p>Discover hackathons from Unstop, Devfolio & more! 🇮🇳</p>
      </header>

      <div className="filters">
        <div className="search-box">
          <FaSearch />
          <input 
            placeholder="Search hackathons..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        <div className="filter-chips">
          <button className={filters.platform === 'Unstop' ? 'active' : ''} 
                  onClick={() => setFilters({...filters, platform: filters.platform === 'Unstop' ? '' : 'Unstop'})}>
            Unstop
          </button>
          <button className={filters.platform === 'Devfolio' ? 'active' : ''} 
                  onClick={() => setFilters({...filters, platform: filters.platform === 'Devfolio' ? '' : 'Devfolio'})}>
            Devfolio
          </button>
          <button className={filters.location === 'Online' ? 'active' : ''} 
                  onClick={() => setFilters({...filters, location: filters.location === 'Online' ? '' : 'Online'})}>
            Online
          </button>
        </div>
      </div>

      <div className="hackathons-grid">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>

      <div className="footer">
        <p>Found {hackathons.length} hackathons • Made with ❤️ for Indian hackers</p>
      </div>
    </div>
  );
}

// Hackathon Card Component (unchanged)
function HackathonCard({ hackathon }) {
  const daysLeft = Math.floor(Math.random() * 30) + 5;
  
  return (
    <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="card">
      <div className="card-image">
        <img src={hackathon.image} alt={hackathon.title} />
        <span className={`location-badge ${hackathon.location.toLowerCase()}`}>
          {hackathon.location}
        </span>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{hackathon.title}</h3>
          <span className="platform">{hackathon.platform}</span>
        </div>
        <div className="card-meta">
          <div className="meta-item">
            <FaCalendar /> {daysLeft} days left
          </div>
          {hackathon.prize && (
            <div className="meta-item prize">
              <FaTrophy /> {hackathon.prize}
            </div>
          )}
        </div>
        <div className="card-footer">
          <button className="apply-btn">Apply Now →</button>
        </div>
      </div>
    </a>
  );
}

export default App;