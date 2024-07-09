async function SendStartGame() {
  try {
    const response = await fetch('http://localhost:5000/receive-data?message=Hello%20from%20client!', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  });
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error('Error starting game:', error);
    return 'Error';
  }
}
  
async function SendHit() {
  try {
    const response = await fetch('http://localhost:5000/receive-data?message=get%20card', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
  }
  catch (error) {
    console.error('Error starting game:', error);
    return 'Error';
  }
}
async function SendStand(){
  try {
    const response = await fetch('http://localhost:5000/receive-data?message=Stand', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
  }
  catch (error) {
    console.error('Error starting game:', error);
    return 'Error';
  }
}

  export {SendStartGame, SendHit, SendStand};
  