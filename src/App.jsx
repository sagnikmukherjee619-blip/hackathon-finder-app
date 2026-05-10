
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaCalendar, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';
import './index.css';

function App() {
  const [hackathons, setHackathons] = useState([]);
  const [filters, setFilters] = useState({ search: '', platform: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchHackathons();
  }, [filters, page]);

  const fetchHackathons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, page, limit: 9 });
      const res = await fetch(`/api/hackathons?${params}`);
      const data = await res.json();
      setHackathons(data.hackathons);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
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
        <p>Discover hackathons from Unstop, Devfolio & more!</p>
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
        <p>Found {hackathons.length} hackathons • Made with ❤️ for hackers</p>
      </div>
    </div>
  );
}

// Hackathon Card Component
function HackathonCard({ hackathon }) {
  const daysLeft = Math.floor(Math.random() * 30) + 5; // Random days for demo
  
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
