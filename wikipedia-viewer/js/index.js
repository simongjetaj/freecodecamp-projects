querySelector('#search').addEventListener('click', fetchData);

function fetchData() {
    let searchItem = querySelector('#searchItem').value;
    let api = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchItem}&format=json`;
    if(searchItem.trim() !== "") {
      fetch(api)
        .then(blob => blob.json())
        .then(data => {
          querySelector("#output").innerHTML = "";
          for(let i in data[1]) {
            querySelector("#output").innerHTML += `
            <a href="${data[3][i]}" target="_blank">          
              <ul class="each"> 
                <h3>${data[1][i]}</h3>
                <p>${data[2][i]}</p>
              </ul>
            </a> 
            `;
          }
        querySelector('input[type="search"]').style.border = "none";
      })
      .catch(err => alert(err));
      } else {
        querySelector('input[type="search"]').style.cssText = "border: 2.5px solid #D50000";
      } 
    }

querySelector('#searchItem').addEventListener('keydown', function(e){ 
  if(e.keyCode === 13) fetchData();
});

function querySelector(str) {
  return document.querySelector(str);
}