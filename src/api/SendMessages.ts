async function SendStartGame() {
  try {
    const response = await fetch("http://localhost:5000/startgame");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error starting game:", error);
    return "Error";
  }
}

async function SendHit() {
  try {
    const response = await fetch("http://localhost:5000/getcard");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error starting game:", error);
    return "Error";
  }
}
async function SendStand() {
  try {
    const response = await fetch("http://localhost:5000/stand");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error starting game:", error);
    return "Error";
  }
}

export { SendStartGame, SendHit, SendStand };
