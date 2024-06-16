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
const lightBtn = document.getElementById('light-button');
const form = document.getElementById('form');

btn.addEventListener('click', () => {
    fetchUserData(input.value)
        .then(data => {
            displayBasicInfo(data);
            displayWebsiteInfo(data);
            displayTwitterInfo(data);
            displayWorkplaceInfo(data);
            displayLocationInfo(data);
        });
});

function fetchUserData(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json());

}

function displayBasicInfo(data) {
    if (!data || !data.login) {
        form.textContent = 'No user found';
        form.style.color = 'red';
        profileName.textContent = '';
        username.textContent = '';
        bio.textContent = 'This profile has no bio';
        image.src = '';
        followers.textContent = '';
        following.textContent = '';
        repos.textContent = '';
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.addEventListener('click', () => {
            location.reload();
        });
        form.appendChild(resetButton);
        return;
    }

    profileName.textContent = data.name;
    username.textContent = `@${data.login}`;
    bio.textContent = data.bio;
    bio.innerHTML = data.bio ? data.bio : 'This profile has no bio';
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
    let websiteLink = document.createElement('a');
    websiteLink.href = data.blog;
    websiteLink.textContent = 'Website';
    websiteLink.target = '_blank';
    let websiteIcon = document.createElement('img');
    websiteIcon.src = './assets/icon-website.svg';
    websiteIcon.alt = 'Website icon';
    websiteInfo.appendChild(websiteIcon);
    websiteInfo.appendChild(websiteLink);
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
    }
    else {
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
    let workplaceText = document.createTextNode(data.company);
    let workplaceIcon = document.createElement('img');
    workplaceIcon.src = './assets/icon-company.svg';
    workplaceIcon.alt = 'Workplace icon';
    workplaceInfo.appendChild(workplaceIcon);
    workplaceInfo.appendChild(workplaceText);
}

function displayLocationInfo(data) {
    userLocationInfo.innerHTML = '';
    let locationText = document.createTextNode(data.location);
    let locationIcon = document.createElement('img');
    locationIcon.src = './assets/icon-location.svg';
    locationIcon.alt = 'Location icon';
    userLocationInfo.appendChild(locationIcon);
    userLocationInfo.appendChild(locationText);
};

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

