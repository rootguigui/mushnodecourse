console.log('Before');

// Asynchronous
getUser(1, getRepositories);

function getRepositories(user) {
    getRepositories(user.gitHubUserName, getCommits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

// Synchronous
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUserName);
// const commits = getCommits(repos[0]);
// console.log(commits);
// console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database ...');
        callback({ id: id, gitHubUserName: 'Guilherme' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Consult github API ...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}