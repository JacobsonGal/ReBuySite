import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const ReBuyMarker = ({ text }) => <div>{text}</div>;
export default class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 31.96996095111596,
      lng: 34.77278720495645,
    },
    zoom: 15,
    city: "Tel-Aviv",
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100%", padingBottom: "-10px" }}>
        <iframe
          style={{ height: "100vh", width: "100%" }}
          loading="eager"
          allowFullScreen={true}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCuGRHOd6Z6oEASHyw6DFDQWr0Jlhbf8TQ&q=Space+Needle,${this.props.city}`}
          title={"ReBuy"}
        />
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAiTqUoIPktHrM66nIC7fRevgXvj7BzN-A" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <ReBuyMarker
            lat={this.props.center.lat}
            lng={this.props.center.lat}
            text="ReBuy"
          />
        </GoogleMapReact> */}
      </div>
    );
  }
}
