import { indianHackathons } from './data/hackathons.js';

// Convert data format to match the app
const convertedHackathons = indianHackathons.map(h => ({
    id: h.id,
    name: h.title,
    description: h.description,
    image: h.image,
    startDate: h.startDate,
    endDate: h.endDate,
    deadline: h.deadline,
    url: h.url,
    platform: h.platform,
    location: h.location,
    prize: h.prize,
    status: getStatus(h.startDate, h.endDate),
    participants: Math.floor(Math.random() * 5000) + 100
}));

function getStatus(startDate, endDate) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'live';
    return 'past';
}

class HackathonFinder {
    constructor() {
        this.hackathons = [];
        this.filteredHackathons = [];
        this.currentFilters = {
            search: '',
            status: 'all',
            platform: 'all'
        };
        this.init();
    }

    init() {
        this.searchInput = document.getElementById('searchInput');
        this.statusFilter = document.getElementById('statusFilter');
        this.platformFilter = document.getElementById('platformFilter');
        this.hackathonsGrid = document.getElementById('hackathonsGrid');
        this.loadingEl = document.querySelector('.loading');

        // Event listeners
        this.searchInput.addEventListener('input', debounce(() => this.applyFilters(), 300));
        this.statusFilter.addEventListener('change', () => this.applyFilters());
        this.platformFilter.addEventListener('change', () => this.applyFilters());

        // Filter chips
        document.querySelectorAll('.filter-chips button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chipBtn = e.target.closest('button');
                this.setActiveFilter(chipBtn);
                this.updateDropdownFromChip(chipBtn.dataset.filter);
                this.applyFilters();
            });
        });

        this.loadHackathons();
    }

    updateDropdownFromChip(chipFilter) {
        this.statusFilter.value = chipFilter;
    }

    loadHackathons() {
        this.showLoading();
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            this.hackathons = [...convertedHackathons];
            this.filteredHackathons = [...this.hackathons];
            
            this.hideLoading();
            this.applyFilters();
            this.updateFilterOptions();
        }, 500);
    }

    applyFilters() {
        this.currentFilters.search = this.searchInput.value.toLowerCase().trim();
        this.currentFilters.status = this.statusFilter.value;
        this.currentFilters.platform = this.platformFilter.value;

        this.filteredHackathons = this.hackathons.filter(hackathon => {
            const matchesSearch =
                !this.currentFilters.search ||
                hackathon.name.toLowerCase().includes(this.currentFilters.search) ||
                hackathon.description.toLowerCase().includes(this.currentFilters.search);

            const matchesStatus =
                this.currentFilters.status === 'all' ||
                hackathon.status === this.currentFilters.status;

            const matchesPlatform =
                this.currentFilters.platform === 'all' ||
                hackathon.platform === this.currentFilters.platform;

            return matchesSearch && matchesStatus && matchesPlatform;
        });

        this.renderHackathons();
    }

    renderHackathons() {
        this.hideLoading();

        if (!this.filteredHackathons.length) {
            this.hackathonsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: white; font-size: 1.2rem; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px);">
                    No hackathons found 🕵️<br>
                    <small>Try different filters or search terms</small>
                </div>
            `;
            return;
        }

        this.hackathonsGrid.innerHTML = this.filteredHackathons.map(h => this.createCard(h)).join('');
    }

    createCard(hackathon) {
        const startDate = new Date(hackathon.startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const deadline = new Date(hackathon.deadline).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const locationClass = hackathon.location.toLowerCase().includes('online')
            ? ''
            : hackathon.location.toLowerCase().includes('hybrid')
                ? 'hybrid'
                : 'offline';

        const statusColors = {
            live: '#22c55e',
            upcoming: '#3b82f6',
            past: '#6b7280'
        };

        return `
            <a href="${hackathon.url}" target="_blank" rel="noopener noreferrer" class="card">
                <div class="card-image">
                    <img src="${hackathon.image}"
                         alt="${hackathon.name}"
                         loading="lazy"
                         onerror="this.src='https://picsum.photos/400/250?grayscale'">
                    <div class="location-badge ${locationClass}">${hackathon.location}</div>
                    <div class="status-badge" style="background: ${statusColors[hackathon.status]}">
                        ${hackathon.status.toUpperCase()}
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${hackathon.name}</h3>
                        <span class="platform">${hackathon.platform}</span>
                    </div>
                    <p>${hackathon.description}</p>
                    <div class="card-meta">
                        <div class="meta-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                            </svg>
                            Start: ${startDate}
                        </div>
                        <div class="meta-item deadline">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-5a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V9z"/>
                            </svg>
                            Deadline: ${deadline}
                        </div>
                        <div class="meta-item prize">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            ${hackathon.prize}
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="apply-btn">Apply Now →</button>
                    </div>
                </div>
            </a>
        `;
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-chips button').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    updateFilterOptions() {
        const platforms = [...new Set(this.hackathons.map(h => h.platform))];
        const platformFilter = document.getElementById('platformFilter');

        platformFilter.innerHTML = '<option value="all">All Platforms</option>';
        platforms.sort().forEach(platform => {
            platformFilter.innerHTML += `<option value="${platform}">${platform}</option>`;
        });
    }

    showLoading() {
        if (this.loadingEl) {
            this.loadingEl.style.display = 'flex';
        }
        this.hackathonsGrid.innerHTML = '';
    }

    hideLoading() {
        if (this.loadingEl) {
            this.loadingEl.style.display = 'none';
        }
    }
}

// Utility function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new HackathonFinder();
});