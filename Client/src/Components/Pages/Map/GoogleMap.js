import React, { Component } from "react";
import api from "../../../API/API";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Geocode from "react-geocode";
import Search from "../Home/Search";
Geocode.setApiKey("AIzaSyDzTw-IhXNRYDH1QpvVVNp_ix9AzFC0McM");
Geocode.setLanguage("He");
Geocode.setRegion("Il");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: [],
      locations: [{}],
      center: {
        lat: 31.96996095111596,
        lng: 34.77278720495645,
      },
      zoom: 10,
    };
  }

  componentDidMount = async () => {
    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
      });
      await api.getAllImages().then((image) => {
        this.setState({
          images: image.data.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
    this.state.products.map(
      (p, i) =>
        p["address"] &&
        Geocode.fromAddress(p["address"]).then(
          // Geocode.fromAddress("RISHON-LE-ZION").then(
          (response) => {
            var { lat, lng } = response.results[0].geometry.location;
            lat = lat + i * 0.005;
            lng = lng + i * 0.005;
            this.setState({
              locations: this.state.locations.concat([{ lat, lng }]),
            });
            // console.log(this.state.locations);
          },
          (error) => {
            console.error(error);
          }
        )
    );
    this.setState((state) => {
      const [first, ...rest] = state.locations;
      return {
        locations: rest,
      };
    });
    this.props.setLoading(false);
  };
  searchHandler = (products) => {
    this.setState({
      products,
    });
  };
  render() {
    const { products, images, center, zoom, locations } = this.state;
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
      };
    }

    return (
      <>
        <Search searchHandler={this.searchHandler} />
        <div style={{ height: "96vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAiTqUoIPktHrM66nIC7fRevgXvj7BzN-A",
              language: "he",
              region: "il",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={getMapOptions}
          >
            {products.map((product, i) => {
              return (
                <Marker
                  lat={locations[i] ? locations[i].lat : null}
                  lng={locations[i] ? locations[i].lng : null}
                  product={product}
                  images={images}
                  key={product["name"]}
                />
              );
            })}
          </GoogleMapReact>
        </div>
        )
      </>
    );
  }
}
