const axios = require('axios'); // Importing axios for making HTTP requests

// Function to synchronize selected Confluence spaces with your system
exports.syncSpaces = async (req, res) => {
  const { selectedSpaces } = req.body; // Extracting selected spaces from the request body
  const email = 'preshitech111@gmail.com'; // Atlassian account email
  const apiToken = 'ATATT3xFfGF0H04y3k3lLfq5ruP_jWTHocBqYbvCN2nPYJwVqNEU0eKPmDOB1Sfl_X7KvdtObNLzEAEvRjbWvvHMvCXstydwAJYSLQkKbTTTnVejIRY5B4NLDduCehiFK0LUfrOvf-w8JlajlEiKrohNDG9U48OGWOsySxUzgiD2oyWtk3ZIgUE=8340F818'; // API token for authentication
  const authString = `${email}:${apiToken}`; // Combining email and API token for Basic Auth
  const encodedAuthString = Buffer.from(authString).toString('base64'); // Encoding the auth string in Base64

  try {
    // Fetch all spaces from the Confluence API
    const response = await axios.get('https://vladeeno.atlassian.net/wiki/rest/api/space', {
      headers: {
        'Authorization': `Basic ${encodedAuthString}`, // Setting the Authorization header with encoded credentials
        'Content-Type': 'application/json'
      }
    });

    // Filtering the spaces to match the selected spaces
    //console.log(req);
    const spaces = response.data.results.filter(space => selectedSpaces.includes(space.key));
    

    // Function to fetch all pages within a specific space
    const fetchAllPages = async (spaces) => {
      let pages = [];
      let start = 0;

      console.log("key is: "+selectedSpaces.toString()); // Debugging output to verify selected spaces
      while (true) {
        // Fetch pages for the given space
        const pageResponse = await axios.get(`https://vladeeno.atlassian.net/wiki/rest/api/content`, {
          params: {
            spaceKey: spaces,
            type: 'page',
            start: 0 // Start pagination at 0
          },
          auth: {
            username: email,
            password: apiToken
          }
        });

        console.log(pageResponse.data.results); // Debugging output to see the fetched pages
        pages = pages.concat(pageResponse.data.results); // Concatenate the fetched pages to the pages array

        if (!pageResponse.data._links.next) {
          break; // Break the loop if there are no more pages to fetch
        }

        start += pageResponse.data.size; // Increment the start value by the number of fetched pages
      }

      return pages; // Return the collected pages
    };

    // Fetch pages for each selected space and combine the results
    const spacesWithPages = await Promise.all(spaces.map(async (space) => {
      const pages = await fetchAllPages(space.key);
      return { ...space, pages }; // Combine the space object with its pages
    }));

    res.json(spacesWithPages); // Send the final result as a JSON response
  } catch (error) {
    console.error(error); // Log any errors to the console
    res.status(500).send('Server Error: ' + error.toString()); // Return a 500 status code with the error message
  }
};

// Function to get all Confluence spaces
exports.getSpace = async (req, res) => {
  const email = 'preshitech111@gmail.com'; // Atlassian account email
  const apiToken = 'ATATT3xFfGF0H04y3k3lLfq5ruP_jWTHocBqYbvCN2nPYJwVqNEU0eKPmDOB1Sfl_X7KvdtObNLzEAEvRjbWvvHMvCXstydwAJYSLQkKbTTTnVejIRY5B4NLDduCehiFK0LUfrOvf-w8JlajlEiKrohNDG9U48OGWOsySxUzgiD2oyWtk3ZIgUE=8340F818'; // API token for authentication
  const authString = `${email}:${apiToken}`; // Combining email and API token for Basic Auth
  const encodedAuthString = Buffer.from(authString).toString('base64'); // Encoding the auth string in Base64

  try {
    // Fetch all spaces from the Confluence API
    const response = await axios.get('https://vladeeno.atlassian.net/wiki/rest/api/space', {
      headers: {
        'Authorization': `Basic ${encodedAuthString}`, // Setting the Authorization header with encoded credentials
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data); // Send the fetched spaces as a JSON response
  } catch (error) {
    console.error(error); // Log any errors to the console
    res.status(500).send('Server Error'); // Return a 500 status code with a generic error message
  }
};
