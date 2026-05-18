import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaCalendar, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { indianHackathons } from './data.js';
import './index.css';

function App() {
  const [filters, setFilters] = useState({ search: '', platform: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const filteredData = useMemo(() => {
    return indianHackathons.filter(h => {
      const matchPlatform = !filters.platform || filters.platform === '' || h.platform === filters.platform;
      const matchLocation = !filters.location || filters.location === '' || h.location === filters.location;
      const matchSearch = !filters.search || h.title.toLowerCase().includes(filters.search.toLowerCase());
      return matchPlatform && matchLocation && matchSearch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredData.length / limit);
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div> Loading hackathons...
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Hackathon Finder</h1>
        <p>Discover upcoming hackathons in India</p>
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
          <button 
            className={filters.platform === 'Unstop' ? 'active' : ''} 
            onClick={() => setFilters({...filters, platform: filters.platform === 'Unstop' ? '' : 'Unstop'})}>
            Unstop
          </button>
          <button 
            className={filters.platform === 'Devfolio' ? 'active' : ''} 
            onClick={() => setFilters({...filters, platform: filters.platform === 'Devfolio' ? '' : 'Devfolio'})}>
            Devfolio
          </button>
          <button 
            className={filters.location === 'Online' ? 'active' : ''} 
            onClick={() => setFilters({...filters, location: filters.location === 'Online' ? '' : 'Online'})}>
            Online
          </button>
          <button 
            className={filters.location === 'Offline' ? 'active' : ''} 
            onClick={() => setFilters({...filters, location: filters.location === 'Offline' ? '' : 'Offline'})}>
            Offline
          </button>
        </div>
      </div>

      {paginatedData.length === 0 ? (
        <div className="no-results">No hackathons found 😢</div>
      ) : (
        <>
          <div className="hackathons-grid">
            {paginatedData.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <FaChevronLeft /> Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              Next <FaChevronRight />
            </button>
          </div>
        </>
      )}

      <footer className="footer">
        <p>Made with ❤️ for Indian Hackers</p>
      </footer>
    </div>
  );
}

function HackathonCard({ hackathon }) {
  const daysLeft = hackathon.deadline 
    ? Math.ceil((new Date(hackathon.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;
  
  const handleClick = () => {
    if (hackathon.url) {
      window.open(hackathon.url, '_blank');
    }
  };
  
  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="card-image">
        <img src={hackathon.image} alt={hackathon.title} />
        <span className={`location-badge ${hackathon.location?.toLowerCase()}`}>
          {hackathon.location}
        </span>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{hackathon.title}</h3>
          <span className="platform">{hackathon.platform}</span>
        </div>
        <p className="card-desc">{hackathon.description}</p>
        <div className="card-meta">
          {daysLeft > 0 && (
            <div className="meta-item">
              <FaCalendar /> {daysLeft} days left
            </div>
          )}
          {hackathon.prize && (
            <div className="meta-item prize">
              <FaTrophy /> {hackathon.prize}
            </div>
          )}
        </div>
        <div className="card-footer">
          <button className="apply-btn" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;