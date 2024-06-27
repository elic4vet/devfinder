const profileName = document.getElementById('name');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const btn = document.getElementById('btn');
const input = document.getElementById('input');
const image = document.getElementById('image');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repos = document.getElementById('repos');
const registration = document.getElementById('registration');
const websiteInfo = document.getElementById('website-info');
const twitterInfo = document.getElementById('twitter-info');
const workplaceInfo = document.getElementById('workplace-info');
const userLocationInfo = document.getElementById('location-info');
const darkBtn = document.getElementById('dark-button');
const form = document.getElementById('form');
const error = document.getElementById('error');
const errorMessage = document.createElement('p');

btn.addEventListener('click', () => {
    const username = input.value.trim();
    if (username) {
        fetchUserData(username)
            .then(data => {
                displayBasicInfo(data);
                displayWebsiteInfo(data);
                displayTwitterInfo(data);
                displayWorkplaceInfo(data);
                displayLocationInfo(data);
            })
            .catch(err => {
                displayError('No user found');
                console.error('Error fetching user data:', err);
            });
    }
});

function fetchUserData(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`User not found: ${response.status}`);
            }
            return response.json();
        });
}

function displayBasicInfo(data) {
    error.textContent = '';

    if (!data || !data.login) {
        displayError('No user found');
        return;
    }

    profileName.textContent = data.name || 'N/A';
    username.textContent = `@${data.login}`;
    bio.textContent = data.bio || 'This profile has no bio';
    image.src = data.avatar_url;
    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.public_repos;

    const createdAt = new Date(data.created_at);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = data.created_at ? createdAt.toLocaleDateString('en-GB', options) : 'N/A';
    registration.textContent = `Joined ${formattedDate}`;
}

function displayWebsiteInfo(data) {
    websiteInfo.innerHTML = '';
    if (data.blog) {
        let websiteLink = document.createElement('a');
        websiteLink.href = data.blog;
        websiteLink.textContent = 'Website';
        websiteLink.target = '_blank';
        let websiteIcon = document.createElement('img');
        websiteIcon.src = './assets/icon-website.svg';
        websiteIcon.alt = 'Website icon';
        websiteInfo.appendChild(websiteIcon);
        websiteInfo.appendChild(websiteLink);
    } else {
        websiteInfo.textContent = 'Not available';
    }
}

function displayTwitterInfo(data) {
    twitterInfo.innerHTML = '';
    if (data.twitter_username) {
        let twitterLink = document.createElement('a');
        twitterLink.href = `https://twitter.com/${data.twitter_username}`;
        twitterLink.textContent = data.twitter_username;
        let twitterIcon = document.createElement('img');
        twitterIcon.src = './assets/icon-twitter.svg';
        twitterIcon.alt = 'Twitter icon';
        twitterInfo.appendChild(twitterIcon);
        twitterInfo.appendChild(twitterLink);
    } else {
        let twitterText = document.createTextNode('Not available');
        let twitterIcon = document.createElement('img');
        twitterIcon.src = './assets/icon-twitter.svg';
        twitterIcon.alt = 'Twitter icon';
        twitterInfo.appendChild(twitterIcon);
        twitterInfo.appendChild(twitterText);
    }
}

function displayWorkplaceInfo(data) {
    workplaceInfo.innerHTML = '';
    if (data.company) {
        let workplaceText = document.createTextNode(data.company);
        let workplaceIcon = document.createElement('img');
        workplaceIcon.src = './assets/icon-company.svg';
        workplaceIcon.alt = 'Workplace icon';
        workplaceInfo.appendChild(workplaceIcon);
        workplaceInfo.appendChild(workplaceText);
    } else {
        workplaceInfo.textContent = 'Not available';
    }
}

function displayLocationInfo(data) {
    userLocationInfo.innerHTML = '';
    if (data.location) {
        let locationText = document.createTextNode(data.location);
        let locationIcon = document.createElement('img');
        locationIcon.src = './assets/icon-location.svg';
        locationIcon.alt = 'Location icon';
        userLocationInfo.appendChild(locationIcon);
        userLocationInfo.appendChild(locationText);
    } else {
        userLocationInfo.textContent = 'Not available';
    }
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.fontWeight = 'bold';
    errorMessage.style.gap = '10px';

    error.appendChild(errorMessage);
}

darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    document.querySelector('.nav').classList.toggle('dark');
    document.querySelector('.search_form').classList.toggle('dark');
    darkBtn.classList.toggle('dark');

    if (darkBtn.textContent.includes('Light')) {
        darkBtn.innerHTML = 'Dark <img src="./assets/icon-moon.svg" alt="Dark Mode icon">';
    } else {
        darkBtn.innerHTML = 'Light <img src="./assets/icon-sun.svg" alt="Light Mode icon">';
    }
});
