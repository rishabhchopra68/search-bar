let rows_per_page = 15;
let current_page = 1;

let pagination_element =
  document.getElementsByClassName("pagination-element")[0];

document
  .getElementById("filter-by-country")
  .addEventListener("keyup", filterByCountry);

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

function createTable(items) {
  let table = ``;
  for (let t20 of items) {
    table += `<tr> 
            <td>${t20.series_id} </td>
            <td>${t20.series_name}</td>
            <td>${t20.status}</td> 
            <td>${t20.season}</td>          
        </tr>`;
  }
  return table;
}

function displayTable(data) {
  let t20Data = data.results[1].series;
  display_rows(current_page, rows_per_page, t20Data);
  setUpPagination(pagination_element, rows_per_page, t20Data);
}

function filterByCountry(event) {
  const { value } = event.target;
  let table = document.getElementById("t20-series-table-body");

  let rows = [...table.getElementsByTagName("tr")];
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

function display_rows(current_page, rows_per_page, items) {
  let start = (current_page - 1) * rows_per_page;
  let end = start + rows_per_page;

  let paginated_items = items.slice(start, end);
  let table = createTable(paginated_items);

  document.getElementById("t20-series-table-body").innerHTML = table;
}

function setUpPagination(wrapper, rows_per_page, items) {
  wrapper.innerHTML = ``;
  let number_of_pages = Math.ceil(items.length / rows_per_page);

  for (let i = 1; i <= number_of_pages; i++) {
    let btn = createButton(i, items);
    wrapper.appendChild(btn);
  }
}

function createButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  button.addEventListener("click", function () {
    display_rows(page, rows_per_page, items);
  });
  return button;
}
