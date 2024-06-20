const APIkey =
  "709f63cbc5d1cd89d708b4fb5620c93d99dede599d27b7285e1a579a6f08db16";

const countryDropdown = document.getElementById("country-dropdown");
const leagueDropdown = document.getElementById("league-dropdown");

fetch(`https://apiv3.apifootball.com/?action=get_leagues&APIkey=${APIkey}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((result) => {
    result.forEach(({ league_name, league_id, country_name }) => {
      const option = document.createElement("option");
      option.text = `${league_name} (${country_name})`;
      option.value = league_id;
      leagueDropdown.appendChild(option);
      console.log(option.value);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

leagueDropdown.addEventListener("change", () => {
  const selectedLeagueId = leagueDropdown.value;
  fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=${selectedLeagueId}&APIkey=${APIkey}`,
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
          overall_league_position,
          team_name,
          overall_league_W,
          overall_league_D,
          overall_league_L,
          overall_league_GF,
          overall_league_GA,
          overall_league_PTS,
        }) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td class="align-middle">${overall_league_position}</td>
      <td class="align-middle">${team_name}</td>
      <td class="align-middle">${overall_league_W}</td>
      <td class="align-middle">${overall_league_D}</td>
      <td class="align-middle">${overall_league_L}</td>
      <td class="align-middle">${overall_league_GF}</td>
      <td class="align-middle">${overall_league_GA}</td>
      <td class="align-middle">${overall_league_GF - overall_league_GA}</td>
      <td class="align-middle">${overall_league_PTS}</td>
    `;
          tableContent.appendChild(row);
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching leagues:", error);
    });
});
