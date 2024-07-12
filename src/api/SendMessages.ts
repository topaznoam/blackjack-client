const ERROR_MASSAGE = "Error";
export async function sendStartGame() {
  try {
    const response = await fetch("http://localhost:5000/startgame");
    const data = response.json();
    return data;
  } catch (error) {
    return ERROR_MASSAGE;
  }
}

export async function sendHit() {
  try {
    const response = await fetch("http://localhost:5000/getcard");
    const data = response.json();
    return data;
  } catch (error) {
    return ERROR_MASSAGE;
  }
}
export async function sendStand() {
  try {
    const response = await fetch("http://localhost:5000/stand");
    const data = response.json();
    return data;
  } catch (error) {
    return ERROR_MASSAGE;
  }
}
