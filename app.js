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


btn.addEventListener('click', () => {
    fetch(`https://api.github.com/users/${input.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            profileName.textContent = data.name;
            username.textContent = `@${data.login}`

            bio.textContent = data.bio;
            bio.innerHTML = data.bio  ? data.bio : 'This profile has no bio'; // If there is no bio, display a message saying so instead of an empty string

            image.src = data.avatar_url;
            followers.textContent = data.followers;
            following.textContent = data.following;
            repos.textContent = data.public_repos;

            const createdAt = new Date(data.created_at);
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const formattedDate = data.created_at ? createdAt.toLocaleDateString('en-GB', options) : 'N/A';
            registration.textContent = `Joined ${formattedDate}`;

            // Clear the existing text content
            websiteInfo.innerHTML = '';
            twitterInfo.innerHTML = '';
            workplaceInfo.innerHTML = '';
            userLocationInfo.innerHTML = '';

            // Create a new anchor element for the website link
            let websiteLink = document.createElement('a');
            websiteLink.href = data.blog;
            websiteLink.textContent = 'Website';
            websiteLink.target = '_blank';
            let websiteIcon = document.createElement('img');
            websiteIcon.src = './assets/icon-website.svg';
            websiteIcon.alt = 'Website icon';
            websiteInfo.appendChild(websiteIcon);
            websiteInfo.appendChild(websiteLink);

            if (twitterInfo === null) {
                twitterInfo.innerHTML = 'N/A';
            } else {
                // Create a new anchor element for the Twitter link
                let twitterLink = document.createElement('a');
                twitterLink.href = `https://twitter.com/${data.twitter_username}`;
                twitterLink.textContent = data.twitter_username;
                let twitterIcon = document.createElement('img');
                twitterIcon.src = './assets/icon-twitter.svg';
                twitterIcon.alt = 'Twitter icon';
                twitterInfo.appendChild(twitterIcon);
                twitterInfo.appendChild(twitterLink);

            }

            // For the workplace and location, create new text nodes and append them
            let workplaceText = document.createTextNode(data.company);
            let workplaceIcon = document.createElement('img');
            workplaceIcon.src = './assets/icon-company.svg';
            workplaceIcon.alt = 'Workplace icon';
            workplaceInfo.appendChild(workplaceIcon);
            workplaceInfo.appendChild(workplaceText);

            let locationText = document.createTextNode(data.location);
            let locationIcon = document.createElement('img');
            locationIcon.src = './assets/icon-location.svg';
            locationIcon.alt = 'Location icon';
            userLocationInfo.appendChild(locationIcon);
            userLocationInfo.appendChild(locationText);

        });
});


