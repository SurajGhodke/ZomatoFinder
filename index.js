function search(){
    var city = document.getElementById("location_input");
    search_location(city.value);
}

function search_location(city){
    var data = null;
    //var base_url = "https://developers.zomato.com/api/v2.1/locations";
    var base_url = "https://developers.zomato.com/api/v2.1/locations?count=10&query=";
    var query = "query=";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.responseText);
            var parsedObject = parser(this.responseText);
            console.log(parsedObject);
            showData(parsedObject,city);
        }
    });

    //xhr.open("GET", base_url+'?'+query+city);
    xhr.open("GET", base_url+city);
    xhr.setRequestHeader("user-key", "b7756edf1524a20cceef8122c4644fed");

    xhr.send(data);
}

function parser(data){
    return JSON.parse(data);
}
var count=0;
function showData(parsedObject,city){
    var location_suggestions = parsedObject.location_suggestions;
    count = count+location_suggestions.length;
    document.getElementById("location_found").innerHTML="currently showing "+count+" results";
    console.log(location_suggestions);
    location_suggestions.forEach(fetchEachLocation);
}

function fetchEachLocation(location){
    var city_id = location.city_id;
    var city_name = location.city_name;
    var country_name = location.country_name;
    var country_id = location.country_id;
    var entity_type = location_entity_class(location.entity_type);
    var loc_title = location.title;
    var lat = location.latitude;
    var long = location.longitude;
    var imageURL = "https://static-news.moneycontrol.com/static-mcnews/2017/07/restaurant-cafe-hotel-eateri-657x435.jpg";


    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    /*let cardheader = document.createElement('div');
    cardheader.className = 'card-header';*/



    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var cardImage = document.createElement('img');
    cardImage.src = imageURL;
    cardImage.className="card-img-top";

    let cardlist = document.createElement("ul");

    let title = document.createElement('h5');
    title.innerText = city_name;
    title.className = 'card-title';

    let cityid = document.createElement('li');
    cityid.innerText = "city-id: "+city_id;

    let countryname = document.createElement("li");
    countryname.innerHTML = "country-name: "+country_name;

    let countryid = document.createElement("li");
    countryid.innerHTML = "country-id: "+country_id;

    let entitytype = document.createElement("li");
    entitytype.innerHTML = "country-id: "+entity_type;
    //color.className = 'card-color';

    let loctitle = document.createElement("li");
    loctitle.innerHTML = "Title: "+loc_title;

    let latitude = document.createElement("li");
    latitude.innerHTML = "latitude: "+lat;

    let longitude = document.createElement("li");
    longitude.innerHTML = "longitude: "+long;


    cardBody.appendChild(title);
    cardlist.appendChild(cityid);
    cardlist.appendChild(countryname);
    cardlist.appendChild(countryid);
    cardlist.appendChild(entitytype);
    cardlist.appendChild(loctitle);
    cardlist.appendChild(latitude);
    cardlist.appendChild(longitude);
    cardBody.appendChild(cardlist);
    /*cardheader.appendChild(cardImage);
    card.appendChild(cardheader);*/
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    let cardContainer = document.getElementById("card_container")
    cardContainer.appendChild(card);

}

function location_entity_class(location_entity_type)
{
    if (location_entity_type == "city")
    {
        return "cityClass";
    }
    else if (location_entity_type == "group")
    {
        return "groupClass";
    }
    else if (location_entity_type == "metro")
    {
        return "metroClass";
    }
    else
    {
        return "subzoneClass";
    }
}