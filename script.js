document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith("index.html") || path === "/") {
        loadMembers();
        loadProjectDescription();
    } else if (path.endsWith("productions.html")) {
        loadProductions();
    } else if (path.endsWith("events.html")) {
        loadEvents();
    }
});

async function loadJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur HTTP ! Status : ${response.status}`);
    return response.json();
}

async function loadProjectDescription() {
    const data = await loadJSON('data/project.json');
    document.getElementById('project-description').innerHTML = `<p>${data.description}</p>`;
}

async function loadMembers() {
    const members = await loadJSON('data/members.json');
    const container = document.getElementById('members-container');
    members.forEach(member => {
        container.innerHTML += `
            <div class="member-item">
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <h3>${member.name} (${member.pseudo})</h3>
                <p><strong>Fonction :</strong> ${member.role}</p>
                <p>${member.description}</p>
            </div>`;
    });
}

async function loadProductions() {
    const data = await loadJSON('data/productions.json');
    const container = document.getElementById('productions-container');
    data.productions.forEach(production => {
        container.innerHTML += `
            <div class="production-item">
                <h3>${production.title}</h3>
                <iframe src="${production.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <p><strong>Auteur :</strong> ${production.author}</p>
                <p><strong>Date :</strong> ${production.date}</p>
                <p>${production.description}</p>
            </div>`;
    });
}

async function loadEvents() {
    const data = await loadJSON('data/events.json');
    const container = document.getElementById('events-container');
    data.events.forEach(event => {
        container.innerHTML += `
            <div class="event-item">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <h3>${event.title}</h3>
                <p><strong>Lieu :</strong> ${event.location}</p>
                <p><strong>Date :</strong> ${event.date}</p>
                <p>${event.description}</p>
            </div>`;
    });
}
