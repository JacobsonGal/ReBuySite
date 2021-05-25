import React, { Component } from "react";
import api from "../../../API/API";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Geocode from "react-geocode";
import Search from "../Home/Search";
import PopUp from "../../Utils/PopUp";

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: [],
      users: [],
      product: null,
      locations: [{}],
      selected: "tel-aviv",
      center: {
        lat: 31.96996095111596,
        lng: 34.77278720495645,
      },
      zoom: 10,
      isModelOpen: false,
      setLoading: this.props.setLoading,
      directionsService: null,
      directionsDisplay: null,
      map: null,
      maps: null,
    };
    this.state.setLoading(true);
  }
  componentDidMount = async () => {
    this.state.setLoading(false);

    Geocode.setApiKey("AIzaSyDzTw-IhXNRYDH1QpvVVNp_ix9AzFC0McM");
    Geocode.setLanguage("He");
    Geocode.setRegion("Il");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
        product.data.data.map((p, i) => {
          p["address"] &&
            Geocode.fromAddress(p["address"]).then(
              // Geocode.fromAddress("RISHON-LE-ZION").then(
              (response) => {
                var { lat, lng } = response.results[0].geometry.location;
                // lat = lat + i * 0.005;
                // lng = lng + i * 0.005;
                lat = lat;
                lng = lng;
                console.log(p);

                this.setState({
                  locations: this.state.locations.concat([
                    { id: p.name, lat: lat, lng: lng },
                  ]),
                });
                // console.log(this.state.locations);
              },
              (error) => {
                console.error(error);
              }
            );
        });
        this.setState((state) => {
          const [first, ...rest] = state.locations;
          return {
            locations: rest,
          };
        });
      });
      await api.getAllImages().then((image) => {
        this.setState({
          images: image.data.data,
        });
      });
      await api.getAllUsers().then((user) => {
        this.setState({
          users: user.data.data,
        });
      });
      this.state.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  searchHandler = (products) => {
    this.setState({
      products,
    });
  };
  productHandler = (product) => {
    this.setState({
      product,
      selected: product["address"],
    });
  };
  modalHandler = (isModelOpen) => {
    this.setState({
      isModelOpen,
    });
  };
  render() {
    const {
      products,
      images,
      users,
      center,
      zoom,
      isModelOpen,
      product,
      locations,
      selected,
      map,
      maps,
    } = this.state;

    const apiIsLoaded = (map, maps) => {
      console.log(map);
      console.log(maps);
      map &&
        this.setState({
          map,
        });
      maps &&
        this.setState({
          maps,
        });
      // if (map) {
      //   this.setState(map);
      //   const directionsService = new maps.DirectionsService();
      //   const directionsDisplay = new maps.DirectionsRenderer();
      //   directionsDisplay.setMap(map);

      //   let infoWindow = new maps.InfoWindow();
      //   const locationButton = document.createElement("button");
      //   locationButton.textContent = "Pan to Current Location";
      //   locationButton.classList.add("custom-map-control-button");
      //   map.controls[maps.ControlPosition.TOP_CENTER].push(locationButton);
      //   locationButton.addEventListener("click", () => {
      //     if (navigator.geolocation) {
      //       navigator.geolocation.getCurrentPosition(
      //         (position) => {
      //           const pos = {
      //             lat: position.coords.latitude,
      //             lng: position.coords.longitude,
      //           };
      //           directionsService.route(
      //             {
      //               origin: pos,
      //               destination: product ? product["address"] : "Tel-Aviv",
      //               travelMode: maps.TravelMode.DRIVING,
      //             },
      //             (response, status) => {
      //               if (status === "OK") {
      //                 directionsDisplay.setDirections(response);

      //                 console.log(response.routes[0]);
      //               } else {
      //                 console.log(status);
      //                 // window.alert("Directions request failed due to " + status);
      //               }
      //             }
      //           );
      //           infoWindow.setPosition(pos);
      //           var marker = new maps.Marker({
      //             position: pos,
      //             map: map,
      //             title: "",
      //             icon: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
      //           });

      //           infoWindow.setContent(
      //             <img
      //               src="https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"
      //               alt="place"
      //             />
      //           );
      //           infoWindow.open(map);
      //           map.setCenter(pos);
      //         },
      //         () => {
      //           handleLocationError(true, infoWindow, map.getCenter());
      //         }
      //       );
      //     } else {
      //       // Browser doesn't support Geolocation
      //       handleLocationError(false, infoWindow, map.getCenter());
      //     }
      //   });
      // }
      // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent(
      //     browserHasGeolocation
      //       ? "Error: The Geolocation service failed."
      //       : "Error: Your browser doesn't support geolocation."
      //   );
      //   infoWindow.open(map);
      // }
    };

    function navigate(address, image) {
      console.log("address : " + address);
      console.log("image : " + image);
      let Gaddress;
      Geocode.fromAddress(address).then(
        // Geocode.fromAddress("RISHON-LE-ZION").then(
        (response) => {
          // var { lat, lng } = response.results[0].geometry.location;
          // lat = lat;
          // lng = lng;
          Gaddress = response.results[0].geometry.location;
        },
        (error) => {
          console.error(error);
        }
      );
      console.log("Gaddress" + Gaddress);
      console.log(map);
      const directionsService = new maps.DirectionsService();
      const directionsDisplay = new maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      let infoWindow = new maps.InfoWindow();
      // const locationButton = document.createElement("button");
      // locationButton.textContent = "Pan to Current Location";
      // locationButton.classList.add("custom-map-control-button");
      // map.controls[maps.ControlPosition.TOP_CENTER].push(locationButton);
      console.log(map);
      console.log(directionsService);
      console.log(directionsDisplay);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            directionsService.route(
              {
                origin: pos,
                destination: Gaddress ? Gaddress : address,
                travelMode: maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === "OK") {  
                  directionsDisplay.setDirections(response);
                  console.log(response.routes[0]);
                  // infoWindow.setPosition(pos);
                  // var marker = new maps.Marker({
                  //   position: pos,
                  //   map: map,
                  //   title: "",
                  //   icon: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
                  // });

                  // infoWindow.setContent(
                  //   <img
                  //     src={
                  //       image
                  //         ? image
                  //         : "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"
                  //     }
                  //     alt="place"
                  //   />
                  // );
                  // infoWindow.open(map);
                  map.setCenter(pos);
                } else {
                  console.log(status);
                  alert("Directions request failed due to " + status);
                }
              }
            );
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }
    }
    function wazeNavigate(address, image) {
      Geocode.fromAddress(address).then(
        (response) => {
          var { lat, lng } = response.results[0].geometry.location;
          let url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
          window.open(url, "_blank").focus();
          //  window.location.href = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    function getMapOptions(maps) {
      return {
        streetViewControl: true,
        scaleControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
        gestureHandling: "greedy",
        disableDoubleClickZoom: true,
        minZoom: 0,
        maxZoom: 30,
        layerTypes: ["TrafficLayer"],
        mapTypeControl: true,
        mapTypeId: maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
          style: maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: maps.ControlPosition.RIGHT_CENTER,
          mapTypeIds: [
            maps.MapTypeId.ROADMAP,
            maps.MapTypeId.SATELLITE,
            maps.MapTypeId.HYBRID,
          ],
        },
        zoomControl: true,
        clickableIcons: false,
        getCurrentPosition: true,
      };
    }

    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "3rem",
            alignItems: "center",
            width: "min-content",
            padding: "2rem",
            zIndex: "99",
          }}
        >
          <Search
            searchHandler={this.searchHandler}
            style={{ position: "absolute" }}
          />
        </div>
        <div style={{ height: "97.2vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAiTqUoIPktHrM66nIC7fRevgXvj7BzN-A",
              language: "he",
              region: "il",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={getMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          >
            <PopUp
              product={product}
              images={images}
              users={users}
              isModelOpen={isModelOpen}
              setIsModelOpen={this.modalHandler}
              navigate={navigate}
              wazeNavigate={wazeNavigate}
            />
            {products &&
              products.map((product, i) => {
                // console.log(locations.find((x) => x.id === product._id));
                return (
                  <Marker
                    lat={
                      locations.some((x) => x.id === product.name)
                        ? locations.find((x) => x.id === product.name).lat
                        : null
                    }
                    lng={
                      locations.some((x) => x.id === product.name)
                        ? locations.find((x) => x.id === product.name).lng
                        : null
                    }
                    product={product}
                    images={images}
                    users={users}
                    key={i}
                    setIsModelOpen={this.modalHandler}
                    setData={this.productHandler}
                  />
                );
              })}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}
