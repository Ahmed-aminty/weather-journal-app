/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//the url to retrieve weather information from his api country

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//&units=metric to get celsius temp
//personal api key for open weather map
const apiKey = ",&appid=ca00eb283561e8381b1fc23d7f25984b=metric";

//url of the server to post data
const server = "http://127.0.0.1:4000";

// show the mistake to the user
let mistake = document.getElementById("mistake");
/*
1 generateInf
this function to get input 
call the getWeatherData to fetch the data from api 
create object from api object by using destructuring
post the data in the server 
get the data to update UI
*/
let generateInf = () => {
  //get value after click
  const zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;

  //getWeatherData to return promise
  getWeatherData(zip).then((data) => {
    if (data) {
      let {
        main: { tempr },
        name: city1,
        weather: [{ description }],
      } = data;

      let info = {
        newDate,
        city1,
        tempr: Math.round(tempr),
        description,
        feelings,
      };
      postInf(server + "/add", info);
      updatingUI();
      document.getElementById("entry").style.opacity = 1;
    }
  });
};

// even listener to add function to HTML DOM
//function called by even listener
document.getElementById("generate").addEventListener("click", generateInf);

//function to get web api
let getWeatherData = async (zip) => {
  try {
    let res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      mistake.innerHTML = data.message;
      setTimeout((_) => (mistake.innerHTML = ""), 3000);
      throw `${data.message}`;
    }
    return data;
  } catch (mistake) {
    console.log(mistake);
  }
};

//function to post data
let postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "post",
    headers: {
        "content-type": "application/json",
    },
});

  try {
    let newData = await res.json();
    console.log(`you just save`, newData);
    return newData;
} catch (mistake) {
    console.log(mistake);
}
};

//function to get project data
//updating ui by this data
let updatingUI = async () => {
const res = await fetch(server + "/all");

  try {
    let keepData = await res.json();

    document.getElementById("date").innerHTML = keepData.newData;
    document.getElementById("city1").innerHTML = keepData.city1;
    document.getElementById("tempr").innerHTML = keepData.tempr + "&degC";
    document.getElementById("description").innerHTML = keepData.description;
    document.getElementById("content").innerHTML = keepData.feelings;
  } catch (mistake) {
    console.log(mistake);
  }
};
