const APIkey =
  "709f63cbc5d1cd89d708b4fb5620c93d99dede599d27b7285e1a579a6f08db16";

const countryDropdown = document.getElementById("country-dropdown");

fetch(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${APIkey}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((result) => {
    result.forEach(({ country_name, country_id }) => {
      const option = document.createElement("option");
      option.text = country_name;
      option.value = country_id;
      countryDropdown.appendChild(option);
      console.log(option.value);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

countryDropdown.addEventListener("change", () => {
  const selectedCountryId = countryDropdown.value;
  fetch(
    `https://apiv3.apifootball.com/?action=get_leagues&country_id=${selectedCountryId}&APIkey=${APIkey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      const tableContent = document.getElementById("table-content");
      tableContent.innerHTML = "";

      result.forEach(
        ({
          country_logo,
          country_name,
          league_logo,
          league_name,
          league_season,
        }) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td scope="row" class="align-middle"><img style="height: 24px;" src="${country_logo}" alt="${country_name}"></th>
      <td class="align-middle"><img style="height: 62px;" src="${league_logo}" alt="${league_name}"></td>
      <td class="align-middle">${league_name}</td>
      <td class="align-middle">${league_season}</td>
    `;
          tableContent.appendChild(row);
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching leagues:", error);
    });
});
