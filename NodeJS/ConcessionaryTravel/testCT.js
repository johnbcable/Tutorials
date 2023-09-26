#! /usr/bin/env node

 

const axios = require('axios').default;

 

const fetchToken = async (username, password) => {

  try {

    const resp = await axios.post('https://warwickshiretest.smartcitizen.net/api/tokenRequest', {

      Username: username,

      Password: password

    })

 

    return resp.data;

  } catch (err) {

    console.log(err);

  }

};

 

const run = async function() {

  let username = process.env.USERNAME; // Using env var to pass data for test.

  let password = process.env.PASSWORD; // Using env var to pass data for test.

  console.log(username);
  console.log(password); 

  let token = await fetchToken(username, password);

  console.log(token);

}

 

run();