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
        this.searchInput.addEventListener('input', debounce(this.applyFilters.bind(this), 300));
        this.statusFilter.addEventListener('change', this.applyFilters.bind(this));
        this.platformFilter.addEventListener('change', this.applyFilters.bind(this));

        // Filter chips - FIXED: Update dropdown + apply filters
        document.querySelectorAll('.filter-chips button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.updateDropdownFromChip(e.target.dataset.filter);
                this.applyFilters();
            });
        });

        this.loadHackathons();
    }

    // NEW: Update dropdown when chip clicked
    updateDropdownFromChip(chipFilter) {
        if (chipFilter === 'all') {
            this.statusFilter.value = 'all';
        } else {
            this.statusFilter.value = chipFilter;
        }
    }

    async loadHackathons() {
        this.showLoading();
        
        try {
            // Multiple API sources
            const [devpostData, mockData] = await Promise.all([
                this.fetchDevpostHackathons(),
                this.fetchMockHackathons()
            ]);

            this.hackathons = [...devpostData, ...mockData];
            this.filteredHackathons = [...this.hackathons];
            
            this.applyFilters();
            this.updateFilterOptions();
        } catch (error) {
            console.error('Error loading hackathons:', error);
            this.hackathons = this.getDemoHackathonsSync(); // FIXED: Use sync version
            this.filteredHackathons = [...this.hackathons];
            this.applyFilters();
            this.updateFilterOptions();
        }
    }

    async fetchDevpostHackathons() {
        try {
            const response = await fetch('https://devpost.com/api/hackathons.json');
            if (!response.ok) throw new Error('Devpost API failed');
            const data = await response.json();
            
            return data.hackathons.slice(0, 20).map(hackathon => ({
                id: hackathon.id,
                name: hackathon.title,
                description: hackathon.description || 'Join this exciting hackathon!',
                image: hackathon.image || `https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=${encodeURIComponent(hackathon.title.substring(0,20))}`,
                startDate: hackathon.start_date,
                endDate: hackathon.end_date,
                url: hackathon.absolute_url || `https://devpost.com${hackathon.url}`,
                platform: 'Devpost',
                location: 'Online',
                prize: '$10K+',
                status: this.getStatus(hackathon.start_date, hackathon.end_date),
                participants: Math.floor(Math.random() * 500) + 50
            }));
        } catch (error) {
            console.warn('Devpost API failed:', error);
            return [];
        }
    }

    fetchMockHackathons() {
        // FIXED: Made sync + more real hackathons
        return [
            {
                id: 'devfolio1',
                name: "Solana Summer Camp",
                description: "Build on Solana blockchain with $1M+ prizes",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
                startDate: "2024-07-15",
                endDate: "2024-08-15",
                url: "https://devfolio.co/solana-summer-camp",
                platform: "Devfolio",
                location: "Online",
                prize: "$1M+",
                status: "upcoming",
                participants: 1250
            },
            {
                id: 'mlh1',
                name: "Hack Western 2024",
                description: "Canada's largest collegiate hackathon",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
                startDate: "2024-09-20",
                endDate: "2024-09-22",
                url: "https://hackwestern.com/",
                platform: "MLH",
                location: "London, ON (Hybrid)",
                prize: "$50K+",
                status: "upcoming",
                participants: 800
            },
            {
                id: 'unstop1',
                name: "Smart India Hackathon",
                description: "Government of India official hackathon",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
                startDate: "2024-08-01",
                endDate: "2024-10-01",
                url: "https://unstop.com/hackathons",
                platform: "Unstop",
                location: "India (Offline)",
                prize: "₹2Cr+",
                status: "live",
                participants: 50000
            },
            {
                id: 'devfolio2',
                name: "Hack India 2024",
                description: "India's biggest hackathon with top companies",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
                startDate: "2024-10-01",
                endDate: "2024-10-03",
                url: "https://devfolio.co/hackindia",
                platform: "Devfolio",
                location: "Online",
                prize: "$100K+",
                status: "upcoming",
                participants: 3000
            }
        ];
    }

    // FIXED: Sync version for error fallback
    getDemoHackathonsSync() {
        return this.fetchMockHackathons();
    }

    getStatus(startDate, endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (now < start) return 'upcoming';
        if (now >= start && now <= end) return 'live';
        return 'past';
    }

    applyFilters() {
        this.currentFilters.search = this.searchInput.value.toLowerCase();
        this.currentFilters.status = this.statusFilter.value;
        this.currentFilters.platform = this.platformFilter.value;

        this.filteredHackathons = this.hackathons.filter(hackathon => {
            const matchesSearch = !this.currentFilters.search || 
                hackathon.name.toLowerCase().includes(this.currentFilters.search) ||
                hackathon.description.toLowerCase().includes(this.currentFilters.search);
            
            const matchesStatus = !this.currentFilters.status || hackathon.status === this.currentFilters.status;
            const matchesPlatform = !this.currentFilters.platform || hackathon.platform === this.currentFilters.platform;
            
            return matchesSearch && matchesStatus && matchesPlatform;
        });

        this.renderHackathons();
    }

    renderHackathons() {
        this.hideLoading();
        this.hackathonsGrid.innerHTML = this.filteredHackathons.length 
            ? this.filteredHackathons.map(h => this.createCard(h)).join('')
            : '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: white; font-size: 1.2rem; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px);">No hackathons found 🕵️<br><small>Try different filters or search terms</small></div>';
    }

    createCard(hackathon) {
        const startDate = new Date(hackathon.startDate).toLocaleDateString();
        const locationClass = hackathon.location.toLowerCase().includes('online') ? '' : 
                             hackathon.location.toLowerCase().includes('hybrid') ? 'hybrid' : 'offline';

        return `
            <a href="${hackathon.url}" target="_blank" class="card">
                <div class="card-image">
                    <img src="${hackathon.image}" alt="${hackathon.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Hackathon'">
                    <div class="location-badge ${locationClass}">
                        ${hackathon.location}
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${hackathon.name}</h3>
                        <span class="platform">${hackathon.platform}</span>
                    </div>
                    <p style="color: #64748b; margin: 0.5rem 0 1rem 0; font-size: 0.9rem; line-height: 1.4;">${hackathon.description}</p>
                    <div class="card-meta">
                        <div class="meta-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                            </svg>
                            ${startDate}
                        </div>
                        <div class="meta-item prize">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                            </svg>
                            ${hackathon.prize}
                        </div>
                        <div class="meta-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            ${hackathon.status.toUpperCase()}
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
        
        // Update chip text based on current filter
        const status = this.statusFilter.value;
        const activeChip = document.querySelector(`[data-filter="${status}"]`) || document.querySelector('[data-filter="all"]');
        if (activeChip) activeChip.classList.add('active');
    }

    updateFilterOptions() {
        const platforms = [...new Set(this.hackathons.map(h => h.platform))];
        const platformFilter = document.getElementById('platformFilter');
        platformFilter.innerHTML = '<option value="all">All Platforms</option>';
        platforms.forEach(platform => {
            platformFilter.innerHTML += `<option value="${platform}">${platform}</option>`;
        });
    }

    showLoading() {
        if (this.loadingEl) this.loadingEl.style.display = 'flex';
        this.hackathonsGrid.innerHTML = '';
    }

    hideLoading() {
        if (this.loadingEl) this.loadingEl.style.display = 'none';
    }
}

// Utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new HackathonFinder();
});