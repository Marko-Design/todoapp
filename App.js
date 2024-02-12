import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Event from "./components/event.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      events: [
        {
          id: 1,
          time: "09:00",
          title: "Sastanak sa direktorom",
          location: "Kragujevac",
          description: "Vrlo bitan sastanak",
        },
        {
          id: 2,
          time: "10:00",
          title: "Sastanak sa timom",
          location: "Kragujevac",
          description: "Prenos informacija",
        },
        {
          id: 3,
          time: "11:00",
          title: "Sastanak sa klijentom",
          location: "",
          description: "",
        },
      ],
      time: "",
      title: "",
      location: "",
      description: "",
    };
  }

  handleInputChange = (inputName) => (event) => {
    const nextValue = event.target.value;
    this.setState({
      [inputName]: nextValue,
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  addEvent = () => {
    const { time, title, location, description } = this.state;
    const newEvent = {
      id: this.state.events.length
        ? this.state.events[this.state.events.length - 1].id + 1
        : 1,
      time,
      title,
      location,
      description,
    };
    this.setState((prevState) => ({
      events: [...prevState.events, newEvent],
      time: "",
      title: "",
      location: "",
      description: "",
      modal: false,
    }));
  };

  handleDelete = (eventId) => {
    const filteredEvents = this.state.events.filter(
      (event) => event.id !== eventId
    );
    this.setState({
      events: filteredEvents,
    });
  };

  render() {
    const { events, modal, time, title, location, description } = this.state;
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="9">
              {events.map((event) => (
                <Event
                  key={event.id}
                  id={event.id}
                  time={event.time}
                  title={event.title}
                  location={event.location}
                  description={event.description}
                  onDelete={this.handleDelete}
                />
              ))}
              <h1 className="my-3">
                <MDBRow className="mb-4">
                  <MDBCol xs="3" md="6" className="mx-auto text-center">
                    <button
                      className="btn btn-info rounded"
                      onClick={this.toggleModal}
                    >
                      Add Event
                    </button>
                  </MDBCol>
                </MDBRow>
              </h1>
            </MDBCol>
            <MDBCol md="3">
              <h3 className="text-uppercase my-3">Schedule</h3>
              <h6 className="my-3">
                {" "}
                It's going to be busy today. You have <b>
                  {events.length}
                </b>{" "}
                events today.
              </h6>
              <h1 className="my-3">
                <MDBRow>
                  <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="sun" fixed />
                  </MDBCol>
                  <MDBCol xs="9">Sunny</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="thermometer-three-quarters" fixed />
                  </MDBCol>
                  <MDBCol xs="9">23°</MDBCol>
                </MDBRow>
              </h1>
              <p>
                Don't forget your sunglasses. Today will be dry and sunny,
                becoming warm in the afternoon with temperatures between 20 and
                25 degrees.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Add new event
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 gray-text">
              <MDBInput
                name="time"
                label="Time"
                icon="clock"
                hint="12:30"
                group
                type="text"
                value={time}
                onChange={this.handleInputChange("time")}
              />
              <MDBInput
                name="title"
                label="Title"
                icon="edit"
                hint="Briefing"
                group
                type="text"
                value={title}
                onChange={this.handleInputChange("title")}
              />
              <MDBInput
                name="location"
                label="Location(optional)"
                icon="map"
                hint="12:30"
                group
                type="text"
                value={location}
                onChange={this.handleInputChange("location")}
              />
              <MDBInput
                name="description"
                label="Description(optional)"
                icon="sticky-note"
                hint="12:30"
                group
                type="text"
                value={description}
                onChange={this.handleInputChange("description")}
              />
              <button
                type="button"
                className="btn btn-info rounded"
                onClick={() => {
                  this.addEvent();
                }}
              >
                Add Event
              </button>
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center"></MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}

export default App;
