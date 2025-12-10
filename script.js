
const jobs = [
    {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "Vercel",
        location: "Remote",
        type: "Full Time",
        category: "engineering",
        salary: "Rs12,000 - 15,000",
        posted: "2 days ago",
        tags: ["React", "Next.js", "TypeScript"],
        logo: "V"
    },
    {
        id: 2,
        title: "Product Designer",
        company: "Airbnb",
        location: "Chandigarh, India",
        type: "Full Time",
        category: "design",
        salary: "Rs10,000 - 13,000",
        posted: "5 hours ago",
        tags: ["Figma", "UI/UX", "Prototyping"],
        logo: "A"
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "Spotify",
        location: "Bangalore, India",
        type: "Full Time",
        category: "data",
        salary: "Rs30,000 - 40,000",
        posted: "1 day ago",
        tags: ["Python", "Machine Learning", "SQL"],
        logo: "S"
    },
    {
        id: 4,
        title: "Backend Developer",
        company: "Stripe",
        location: "Remote",
        type: "Contract",
        category: "Engineering",
        salary: "Rs20,000 - 25,000",
        posted: "3 days ago",
        tags: ["Go", "AWS", "API Design"],
        logo: "S"
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "Discord",
        location: "Maharashtra,Pune",
        type: "Full Time",
        category: "marketing",
        salary: "Rs15,000 - 18,000",
        posted: "1 week ago",
        tags: ["Strategy", "SEO", "Growth"],
        logo: "L"
    },
    {
        id: 6,
        title: "UX Researcher",
        company: "Notion",
        location: "Remote",
        type: "Part Time",
        category: "design",
        salary: "Rs800/hour",
        posted: "4 hours ago",
        tags: ["User Testing", "Interviewing"],
        logo: "N"
    }
];

// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const searchBtn = document.getElementById('search-btn');
const titleInput = document.getElementById('job-title');
const locationInput = document.getElementById('job-location');
const tabBtns = document.querySelectorAll('.tab-btn');
const categoryCards = document.querySelectorAll('.category-card');

// Initial Render
renderJobs(jobs);

// Functions
function renderJobs(jobsData) {
    jobsContainer.innerHTML = '';

    if (jobsData.length === 0) {
        jobsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No jobs found matching your criteria.</div>';
        return;
    }

    jobsData.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <div class="job-card-header">
                <div class="company-logo">${job.logo}</div>
                <div class="time-badge">${job.posted}</div>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <p class="company-name">${job.company} • ${job.location}</p>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="salary">${job.salary}</span>
                <a href="#" class="apply-btn">Apply Now</a>
            </div>
        `;
        jobsContainer.appendChild(card);
    });
}

function filterJobs(category, searchTerm, locationTerm) {
    const filtered = jobs.filter(job => {
        const matchesCategory = category === 'all' || job.category === category;
        const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());

        return matchesCategory && matchesTitle && matchesLocation;
    });

    renderJobs(filtered);
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    filterJobs(activeTab, titleInput.value, locationInput.value);
});

// Allow Enter key to trigger search
titleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Category Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active State
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter
        const category = btn.dataset.tab;
        filterJobs(category, titleInput.value, locationInput.value);
    });
});

// Category Cards (Clicking one scrolls to jobs and filters)
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;

        // Find corresponding tab and click it
        document.querySelector(`.tab-btn[data-tab="${category}"]`).click();

        // Scroll to jobs
        document.querySelector('.jobs-section').scrollIntoView({ behavior: 'smooth' });
    });
});
