const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "cricket-live-data.p.rapidapi.com",
    "X-RapidAPI-Key": "94096509aemshfcfa2acf7bb0938p16044djsnec8f8b9ac47f",
  },
};

function getAPIData() {
  fetch("https://cricket-live-data.p.rapidapi.com/series", options)
    .then((response) => response.json())
    .then((data) => displayTable(data))
    .catch((err) => console.error(err));
}
getAPIData();

function displayTable(data) {
  let t20Data = data.results[1].series;
  let table = `<tr>
    <th style = "width: 10%">Series Id</th>
    <th style = "width: 50%">Series Name</th>
    <th style = "width: 20%">Status</th>
    <th style = "width: 20%">Season</th>
   </tr>`;

  for (let t20 of t20Data) {
    table += `<tr> 
            <td>${t20.series_id} </td>
            <td>${t20.series_name}</td>
            <td>${t20.status}</td> 
            <td>${t20.season}</td>          
        </tr>`;
  }

  document.getElementById("t20-series-table").innerHTML = table;
}

document
  .getElementById("filter-by-country")
  .addEventListener("keyup", filterByCountry);

function filterByCountry(event) {
  const { value } = event.target;
  let table = document.getElementById("t20-series-table");

  let rows = [...table.getElementsByTagName("tr")];
  console.log(rows);
  rows.forEach((row) => {
    if (row) {
      let td = row.getElementsByTagName("td")[1];
      if (td) {
        let text = td.textContent || td.innerHTML;
        if (text.toUpperCase().indexOf(value.toUpperCase()) === -1) {
          row.style.display = "none";
        } else {
          row.style.display = "";
        }
      }
    }
  });
}
