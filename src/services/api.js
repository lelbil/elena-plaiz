// const uri = 'http://localhost:9000';
const uri = 'http://35.181.29.44:9000';
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'

const getUri = () => (uri);

const get = async (path) => {
  try {
    const result = await fetch(`${uri}${path}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': jwt,
      },
    });
    const data = await result.json();
    return { data };
  } catch (err) {
    console.log(`Error getting ${path}`, err);
    return { err };
  }
}

const post = async (path, body={}) => {
  try {
    const result = await fetch(`${uri}${path}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': jwt,
      },
      body: JSON.stringify(body),
    });
    const data = await result.json();
    return { data };
  } catch (err) {
    console.log(`Error posting ${path}`, err);
    return { err };
  }
}

const put = async (path, body={}) => {
  try {
    const result = await fetch(`${uri}${path}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': jwt,
      },
      body: JSON.stringify(body),
    });
    const data = await result.json();
    return { data };
  } catch (err) {
    console.log(`Error posting ${path}`, err);
    return { err };
  }
}

// delete is a reserved keyword
const _delete = async (path, body={}) => {
  try {
    const result = await fetch(`${uri}${path}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': jwt,
      },
      body: JSON.stringify(body),
    });
    const data = await result.json();
    return { data };
  } catch (err) {
    console.log(`Error posting ${path}`, err);
    return { err };
  }
}

export {
  getUri,
  get,
  post,
  put,
  _delete,
}
