let users = ["simongjetaj", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
];
const clientId = "9c1zh48p6w4gvq0tejahra4q2fp934";
let obj = {};
let output = "";

// getting the name and the logo for each user
// adding the necessary properties to the object for each user
users.forEach(user => {
  let streamersApi = `https://api.twitch.tv/kraken/users/${user}?client_id=${clientId}`;
  fetch(streamersApi)
    .then(response => response.json())
    .then(userData => {
      obj.name = userData.display_name;
      obj.logo = userData.logo;

      // is a user streaming or not?
      let isStreaming = `https://api.twitch.tv/kraken/streams/${user}?client_id=${clientId}`;
      fetch(isStreaming)
        .then(response => response.json())
        .then(streamData => {
          obj.name = userData.display_name;
          obj.logo = userData.logo || "https://dummyimage.com/50/fff/000";
          if (streamData.stream === null) {
            obj.online = false;
            obj.status = "";
            obj.text = " is currently offline";
            obj.icon = "fa-ban";
          } else {
            obj.online = true;
            obj.status = streamData.stream.channel.status;
            obj.text = " is currently streaming ";
            obj.icon = "fa-check";
          }

          output += `
                  <div class="columns">
                    <div class="column">
                        <a href="https://www.twitch.tv/${obj.name}" target="_blank">
                          <img width="50" height="50" src="${obj.logo}">
                        </a>
                    </div>
                    <div class="column is-8 has-text-centered">
                      <p>
                        <a class="${obj.online}" href="https://www.twitch.tv/${user}" target="_blank">
                          <strong>${obj.name}</strong>
                        </a>
                        ${obj.text}${obj.status}.
                      </p>
                      </div>
                      <div class="column">
                        <span><i class="fa ${obj.icon} is-pulled-right" aria-hidden="true"></i></span>
                      </div>
                    </div>
                `;
          document.getElementById("output").innerHTML = output;
        })
        .catch(err => console.log(err));
    });
});

// filtering the streamers by their names
let filterInput = document.getElementById("filterInput");
filterInput.addEventListener("keyup", filterUsers);
function filterUsers() {
  filterValue = filterInput.value.toUpperCase();
  let divs = document.querySelectorAll("#output div.columns");

  divs.forEach(a => {
    let names = a.getElementsByTagName("strong")[0];
    // If matched
    if (names.innerHTML.toUpperCase().indexOf(filterValue) != -1) {
      a.style.display = "";
    } else {
      a.style.display = "none";
    }
  });
}