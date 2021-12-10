//window.onload = init;
var pickUpLatitude;
var pickUpLongitude;
var destinyLatitude;
var destinyLongitude;
var origin_address;
var dest_address;
var seats=new Array();
var error_flag_2;
var message_2;
var booking_ref=0;

const bookingType = "website";
const cardId = "";
const countryShortCode = "US";





function initMap() {
const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: { lat: 25.276987, lng: 55.296249 },
    zoom: 13,
  });

  new AutocompleteDirectionsHandler(map);
	
}

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  //travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    //const modeSelector = document.getElementById("mode-selector");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);

    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);

    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);
	  
	  

    /*
    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
*/

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  /*setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  */
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
			
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
	
}

/*
function get_origin_coord(){
		var geocoder1 = new google.maps.Geocoder();
    	origin_address = document.getElementById("origin-input").value;
		geocoder1.geocode({ 'address': origin_address }, function (origin_results, origin_status) {
        if (origin_status == google.maps.GeocoderStatus.OK) {
			getPickLat(origin_results[0].geometry.location.lat());
            getPickLong(origin_results[0].geometry.location.lng());
			//document.getElementById("origin_coord").innerHTML = "Pickup Location Latitude/Longitude: "+origin_results[0].geometry.location.lat()+"/"+origin_results[0].geometry.location.lng();
			document.getElementById("orig_text_content").innerHTML=origin_address;
			get_dest_coord();
		} else {
            alert("Request failed.Kindly select the Pickup Location!");
		}
		});
		
}

function get_dest_coord(){
		var geocoder2 = new google.maps.Geocoder();
   		dest_address = document.getElementById("destination-input").value;
    	geocoder2.geocode({ 'address': dest_address }, function (dest_results, dest_status) {
        if (dest_status == google.maps.GeocoderStatus.OK) {
			var loc2=new Array();
            getDestLat(dest_results[0].geometry.location.lat());
            getDestLong(dest_results[0].geometry.location.lng());
			//document.getElementById("dest_coord").innerHTML = "Dropoff Location Latitude/Longitude: "+dest_results[0].geometry.location.lat()+"/"+dest_results[0].geometry.location.lng();
			document.getElementById("dest_text_content").innerHTML=dest_address;
			api_comms_1();
        } else {
            alert("Request failed.Kindly select the dropoff Location!");
		}
		});
}

function getPickLat(origin_results){
	pickUpLatitude = truncate(origin_results,8);
	//alert("Pickup latitude:"+pickUpLatitude);
}
function getPickLong(origin_results){
	pickUpLongitude = truncate(origin_results,8);
	//alert("Pickup longitude:"+pickUpLongitude);
}
function getDestLat(dest_results){
	destinyLatitude = truncate(dest_results,8);
	//alert("Destination latitude:"+destinyLatitude);
}
function getDestLong(dest_results){
	destinyLongitude = truncate(dest_results,8);
	//alert("Destination longitude:"+destinyLongitude);
}
function truncate (num, places) {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Code when the Select Ride Type Button is clicked..............................
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
async function getLocation() {
	    //alert("Test 1");
		get_origin_coord();
}


async function api_comms_1(){
	const api_data_sent = {"pickUpLatitude":pickUpLatitude,"pickUpLongitude":pickUpLongitude,"destinyLatitude":destinyLatitude,"destinyLongitude":destinyLongitude,"countryShortCode":countryShortCode};
	//const api_data_sent = {"pickUpLatitude":"24.453","pickUpLongitude":"54.377","destinyLatitude":"25.800","destinyLongitude":"55.976","countryShortCode":"US"};
	const options = {
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(api_data_sent)
	};
	console.log(options);
	//alert("Test 2");
	const api_response = await fetch('https://xxride.lagoontechcloud.com:3000/api/booking/rideTypeforSite',options);
	const api_data_rxd = await api_response.json();
	const api_obj_rxd = JSON.parse(JSON.stringify(api_data_rxd));
	
	let error_flag = api_obj_rxd.error;
	let message = api_obj_rxd.msg;
	let vehicle_count = 0;
	
	vehicle_count = api_obj_rxd.data.length;
	//alert("AED "+parseFloat(api_obj_rxd.data[0].priceValue).toFixed(2));
	//alert(message);
			
	if(error_flag==false && message=="Data loaded successfully"){
		
	for (var vc=0;vc<vehicle_count;vc++) {
           document.getElementById("car_logo"+(vc+1)).src=api_obj_rxd.data[vc].iconActive;
           document.getElementById("ride_title"+(vc+1)).innerHTML=api_obj_rxd.data[vc].name;
		   document.getElementById("ride_icon"+(vc+1)).innerHTML=api_obj_rxd.data[vc].capacity+' <i class="fas fa-user-friends" style="color:#aaa"></i>';
		   document.getElementById("ride_desc"+(vc+1)).innerHTML=api_obj_rxd.data[vc].shortDesc;
		   document.getElementById("pricing"+(vc+1)).innerHTML="AED "+parseFloat(api_obj_rxd.data[vc].priceValue).toFixed(2);
		   document.getElementById("tax_charges"+(vc+1)).innerHTML='Tax: '+api_obj_rxd.data[vc].tax;
		   document.getElementById("waiting_charges"+(vc+1)).innerHTML='Waiting Charges: '+api_obj_rxd.data[vc].waitingCharge+'/minute';
		   seats[vc] = api_obj_rxd.data[vc].capacity;
    }
	
	if(vehicle_count==4){
		  vehicle_blocker(vehicle_count);
	}else if(vehicle_count==3){
		  vehicle_blocker(vehicle_count);
	}else if(vehicle_count==2){
		  vehicle_blocker(vehicle_count);
	}else if(vehicle_count==1){
		  vehicle_blocker(vehicle_count);
	}else if(vehicle_count==0){
		  vehicle_blocker(vehicle_count);
		  var theDiv1 = document.getElementById("car_select");
          var error_content1 = document.createTextNode("Sorry, No Vehicle Available for Dispatch");
          theDiv1.appendChild(error_content1);
		  document.getElementById("pay_select").className +=" block_hidden";
		  document.getElementById("book_now").className += " block_hidden";
	}
	
	      document.getElementById("search_form").className += " block_hidden";
	      document.getElementById("orig_dest").classList.remove("block_hidden");
	      document.getElementById("car_select").classList.remove("block_hidden");
		  
		
	}else{
		  var theDiv2 = document.getElementById("search_form");
          var error_content2 = document.createTextNode("Server Error, Sorry for the Inconvenience, No Vehicle Available for Dispatch");
          theDiv2.appendChild(error_content2);
	}
	
	function vehicle_blocker(vehicle_count){
		for(i=5; i>vehicle_count; i--){
			document.getElementById("car_select"+i).className +=" block_hidden";
		}
	}
	
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Code when the Book Now Button is clicked..............................
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ride_type_selection="";
var selected_pay_option="";


async function book_vehicle(){
	document.getElementById("book_now").className +=" disabled";
	ride_type_selection=ride_type_finder(ride_type_selection);
	if(ride_type_selection==""||selected_pay_option==""||selected_pay_option=="Select Payment Method"){
		alert("Kindly select a 'Ride Type' & 'Payment Option' for Booking");
	}else{
		switch(selected_pay_option) {
              case "cash":
                  //alert("Cash");
                  api_comms_2_cash(ride_type_selection,selected_pay_option);
                  break;
              case "card":
                  alert("Card");
                  break;
              case "Pay Tab":
                  alert("Pay Tab");
                  break;
         }
		
		//alert(pickUpLatitude+"/"+pickUpLongitude+"/"+destinyLatitude+"/"+destinyLongitude+"/"+origin_address+"/"+dest_address);
	}
	document.getElementById("book_confirm").classList.remove("block_hidden");
}

function ride_type_finder(ride){
	ride_type_selection =  ride.replace('car_select','');
	return ride_type_selection;
	
}

//Function call from PHP/HTML form
function ride_option_click(clicked_id)
{
      //alert(clicked_id);
	  var ride_sel = document.getElementsByClassName("ride_option");
	  var ride_length = ride_sel.length;
	  for(var ri=0;ri<ride_length;++ri){
	  ride_sel[ri].style.backgroundColor = '#fff';
	  }
	  document.getElementById(clicked_id).style.backgroundColor = '#edf2fb';
	  ride_type_selection=clicked_id;
}

//Function call from PHP/HTML
function getPayOption(){
	selected_pay_option = document.getElementById("pay_select").value;
}


async function api_comms_2_cash(ride_type,payment_mode){	
	//alert("payment_mode:"+payment_mode);
	//alert(seats[ride_type-1]);
    const api_data_sent_2_cash = {
		"bookingType": "website",
		"cardId": "",
		"destinyLatitude": destinyLatitude,
 		"destinyLongitude": destinyLongitude,
		"dropLocation": dest_address,
 		"paymentMode": payment_mode,
		"pickUpLatitude": pickUpLatitude,
 		"pickUpLocation": origin_address,
 		"pickUpLongitude": pickUpLongitude,
 		"rideType": ride_type,
		"seats" : seats[ride_type-1],
 		"auth": { "Id": 14,"Device": 10, "iat": 1631531151 }
		};
	const options_2_cash = {
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(api_data_sent_2_cash)
	};	
	
	//alert(pickUpLatitude+"/"+pickUpLongitude+"/"+destinyLatitude+"/"+destinyLongitude+"/"+origin_address+"/"+dest_address+"/"+payment_mode+"/"+ride_type+"/"+seats[ride_type-1]);
	try{
	const api_response_2_cash = await fetch('https://xxride.lagoontechcloud.com:3000/api/booking/sitebooking',options_2_cash);
	const api_data_rxd_2_cash = await api_response_2_cash.json();
	const api_obj_rxd_2_cash = await JSON.parse(JSON.stringify(api_data_rxd_2_cash));
	//const api_obj_rxd_2 = await api_data_rxd_2;
	//const end = await trial(api_obj_rxd_2);
	error_flag_2 = api_obj_rxd_2_cash.error;
		//alert(error_flag_2);
	
	if(error_flag_2==false){
		
		//alert(api_obj_rxd_2_cash.error);
		message_2 = api_obj_rxd_2_cash.msg;
		booking_ref = api_obj_rxd_2_cash.data.bookingNo;
		
		//alert(error_flag_2+" / "+message_2+" / "+booking_ref);
		document.getElementById("modal-body").innerHTML = "Booking is Successful"+"<br>"+"Booking Ref: "+booking_ref+"<br>"+"Enjoy your Ride.....";
	}else{
		//alert("Booking not successful. Our representative will call back on the registered number");
		document.getElementById("modal-body").innerHTML = "Booking is not successful. Our representative will call you back on the registered mobile number";
	}
	}
	catch(err){
		console.error(err);
	}
	//window.location.href = 'https://www.xxride.com/booking_confirmation/';
	//document.getElementById("book_full-width").className += " block_hidden";
	
	
	
}


function the_end_call(){
	window.location.href = 'https://www.xxride.com/';
}

*/





























































































