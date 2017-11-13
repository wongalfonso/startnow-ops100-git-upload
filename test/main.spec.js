const axios = require('axios');
const expect = require('chai').expect;
const repos = require('./repos.json');
const username = require('../username.json').githubUsername;

function expectWithMessage (status) {
  return expect(status, 'Expected request to return 200 OK').to.equal(200)
}

function checkForFile (projectName, file) {
  return axios
    .get(`https://github.com/${username}/${projectName}/blob/master/${file}`)
    .then(res => expectWithMessage(res.status))
    .catch(error => expectWithMessage(error.response.status))
}

describe('GitHub project', function () {
  this.timeout(10000);
  this.slow(3000);

  repos.forEach(([project, file1, file2]) => {
    it(`${project} should have ${file1}`, () =>
      checkForFile(project,  file1))

      it(`${project} should have ${file2}`, () =>
      checkForFile(project, file2))
  });
});
