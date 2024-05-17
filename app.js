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

const website = document.getElementById('website');
const twitter = document.getElementById('twitter');
const workplace = document.getElementById('workplace');
const userLocation = document.getElementById('location');

input.addEventListener('input', (e) => {
    console.log(e.target.value);
});

btn.addEventListener('click', () => {
    fetch(`https://api.github.com/users/${input.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            profileName.textContent = data.name;
            username.textContent = data.login;
            bio.textContent = data.bio;
            image.src = data.avatar_url;
            followers.textContent = data.followers;
            following.textContent = data.following;
            repos.textContent = data.public_repos;
            const createdAt = new Date(data.created_at);
            registration.textContent = data.created_at ? createdAt.toLocaleDateString() : 'N/A';
            website.textContent = data.blog;
            twitter.textContent = data.twitter_username;
            workplace.textContent = data.company;
            userLocation.textContent = data.location;
        });
}); 