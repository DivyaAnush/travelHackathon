import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/background.jpg";
import logo from "../images/airbnb.jpg";
import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";
import { useState } from "react";
import User from "../components/User";
import {useMoralis} from "react-moralis";
// import Card from 'react-bootstrap/Card';


const Home = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("Bangalore");
  const [guests, setGuests] = useState(2);
  const { Moralis, account } = useMoralis();

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradinet"></div>
      </div>

      <div>
        <marquee behavior="scroll" direction="Left"><h1>World's first 100% Web3 Enabled Hotel Reservation System!</h1></marquee>
      </div>
      
      {/* footer started */ }
      
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo"></img>
          <div><em><h1>Decentra Inn</h1></em></div>
        </div>

        
       
        <div className="tabs">
          <div className="selected"><em>Hotels</em></div>
          <div><em>Home Stayes</em></div>
          <div><em>Flights</em></div>
          <div><em>Holiday packages</em></div>
          <div><em>Things To do</em></div>
        </div>
        <div className="lrContainers">
        {account &&
          <User account={account} />
        }
          <ConnectButton />
        </div>
      </div>
      <div className="tabContent">
       <div className="searchFields">
         <div className="inputs">
           Going to
          <Select
              defaultOptionIndex={0}
              onChange={(data) => setDestination(data.label)}
              options={[
                {
                  id: "blore",
                  label: "Banglore",
                },
                {
                  id: "lGoa",
                  label: "Goa",
                },
                {
                  id: "db",
                  label: "Dubai",
                },
                {
                  id: "la",
                  label: "Los Angeles",
                },
              ]}
            />
          </div>

          <div className="vl" />
          <div className="inputs">
            Check In
            <DatePicker
              id="CheckIn"
              onChange={(event) => setCheckIn(event.date)}
            />
          </div>
          <div className="vl" />
          <div className="inputs">
            Check Out
            <DatePicker
              id="CheckOut"
              onChange={(event) => setCheckOut(event.date)}
            />
          </div>
          <div className="vl" />
          <div className="inputs">
            Rooms&guests
            <Input
              value={2}
              name="AddGuests"
              type="number"
              onChange={(event) => setGuests(Number(event.target.value))}
            />
          </div>
          <Link to={"/rentals"} state={{
            destination: destination,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests
          }}>
          <div className="searchButton">
            <Icon fill="#ffffff" size={24} svg="search" />
          </div>
          </Link>
        </div>
        
      </div>
      <div className="randomLocation">
        <div className="title"><h6>Welcome to Decentra-Inn, a 100% Web3 Enabled Website</h6></div>
        <div className="text">
          Now we accept Cryptocurrencies for hotel reservations
        </div>
        
         {/* <Button
          //text="Explore A Location"
          onClick={() => console.log(checkOut)}
        /> */}
        <div>
  
        {/* <div >
           <img class="bottom-right" src ="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=" width="450" height="250"/> 
          <img class ="bottom-left" src ="https://media.istockphoto.com/photos/couple-and-receptionist-at-counter-in-hotel-wearing-medical-masks-as-picture-id1224155565?k=20&m=1224155565&s=612x612&w=0&h=qQXBF6Se3RCPptZBHcJraj14e6PAfeP5BXG03q7KzeI=" width="450" height="250"/>
          <img class ="centered" src ="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80" width="450" height="250"/>
        </div> */}

        <div class="uk-card uk-card-default">
            <div class="uk-card-media-top">
                <img class = "bottom-right" src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=" width="330" height="250" alt=""/>
                <img class ="centered" src ="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80" width="330" height="250"/>
                <img class ="bottom-left" src ="https://media.istockphoto.com/photos/couple-and-receptionist-at-counter-in-hotel-wearing-medical-masks-as-picture-id1224155565?k=20&m=1224155565&s=612x612&w=0&h=qQXBF6Se3RCPptZBHcJraj14e6PAfeP5BXG03q7KzeI=" width="330" height="250"/>
            </div>
            {/* <div class="uk-card-body">
              <h3 class="uk-card-title">Earn rewards easily and quickly with our innovative tokenised incentive programs including Smart discounts, Invite, Loyalty and Givebacks.</h3></div> */}
        </div>

        
        
          
        </div>

      </div>
    </>
  );
};

export default Home;