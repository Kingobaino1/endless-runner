import 'regenerator-runtime/runtime';

const populateScore = async(user, score) => {
  const data = {
    user,
    score,
  }
  try {
    const url = fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/process.env.API_KEY/scores', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await url;
    const result = response.json();
    const final = await result
    return final;
  } catch (error) {
    return error
  }
};

const fetchScores = async(display) => {
  try {
    const url = fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/process.env.API_KEY/scores', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const response = await url;
    const result = response.json();
    const final = await result
    const arr = final.result;
    let i = 1;
    arr.sort((a, b) => b.score - a.score).slice(0, 10).forEach(element => {
      display.text += `${i}. ${element.user} - [${element.score}] \n`;
      i += 1;
    });
  } catch (error) {
    return error
  }
};

export{
  populateScore,
  fetchScores,
};
