import React from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/airbnbred.jpg";
import { ConnectButton, Icon, Button, useNotification, TabList, Tab } from "web3uikit";
import RentalsMap from "../components/RentalsMap";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import User from "../components/User";
import bg from "../images/background.jpg";

const Rentals = () => {
  const { state: searchFilters } = useLocation();
  const [highLight, setHighLight] = useState();
  const { Moralis, account } = useMoralis();
  const [rentalsList, setRentalsList] = useState();
  const [coOrdinates, setCoOrdinates] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  const handleSuccess= () => {
    dispatch({
      type: "success",
      message: `Nice! You are going to ${searchFilters.destination}!!`,
      title: "Booking Succesful",
      position: "topL",
    });
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message:"Already Booked For Requested Date",
      title: "Booking Failed",
      position: "topL",
    });
  };

  const handleNoAccount= () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL",
    });
  };


  useEffect(() => {
    async function fetchRentalsList() {
      const Rentals = Moralis.Object.extend("Rentals");
      const query = new Moralis.Query(Rentals);
      query.equalTo("city", searchFilters.destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", searchFilters.guests);

      const result = await query.find();

      let cords = [];
      result.forEach((e) => {
        cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
      });

      setCoOrdinates(cords);
      setRentalsList(result);
    }

    fetchRentalsList();
  }, [searchFilters]);


  const bookRental = async function (start, end, id, dayPrice) {
    
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().slice(0, 10)); // yyyy-mm-dd
    }

    let options = {
      contractAddress: "0x137022Fb1fE6e2B0B6939C0d500fA97CEED8Aef7",
      functionName: "addDatesBooked",
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "newBookings",
              "type": "string[]"
            }
          ],
          "name": "addDatesBooked",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ],
      params: {
        id: id,
        newBookings: arr,
      },
      msgValue: Moralis.Units.ETH(dayPrice * arr.length),
    }
    console.log(arr);

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        handleError(error.data.message)
      }
    });

  }


  return (
    <>

      <div className="container">
        <div className="containerGradinet"></div>
      </div>

      <div className="topBanner">
        <div className="logoclass" >
          <Link to="/">
            <img className="logo" src={logo} alt="logo"></img>
            <h2 className="logotext">Decentra Inn</h2>
          </Link>
        </div>
        <div className="scrolltext">
        <marquee behavior="scroll" direction="Left"><h1>World's first 100% Web3 Enabled Hotel Reservation System!</h1></marquee>
      </div>

        <div className="lrContainers">
          {account &&
          <User account={account} />
        }
          <ConnectButton />
        </div>
      </div>
      
      <div className="searchReminder">
          <div className="filter">{searchFilters.destination}</div>
          <div className="vl"/>
          <div className="filter">
            {`
           ${searchFilters.checkIn.toLocaleString("default", {
             month: "short",
           })} 
           ${searchFilters.checkIn.toLocaleString("default", {
             day: "2-digit",
           })} 
           - 
           ${searchFilters.checkOut.toLocaleString("default", {
             month: "short",
           })} 
           ${searchFilters.checkOut.toLocaleString("default", {
             day: "2-digit",
           })}
          `}
          </div>
          <div className="vl" />
          <div className="filter">{searchFilters.guests} Guest</div>
          <div className="searchFiltersIcon">
            <Icon fill="#ffffff" size={20} svg="search" />
          </div>
        </div>

      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stays Available For Your Destination
          {rentalsList &&
            rentalsList.map((e, i) => {
              return (
                <>
                  <hr className="line2" />
                  <div className={highLight == i ? "rentalDivH " : "rentalDiv"}>
                    <img className="rentalImg" src={e.attributes.imgUrl} ></img>
                    <div className="rentalInfo">
                      <div className="rentalTitle"><Link to={"/rooms"}>{e.attributes.name}</Link></div>
                      <div className="rentalDesc">
                        {e.attributes.unoDescription}
                      </div>
                      <div className="rentalDesc">
                        {e.attributes.dosDescription}
                      </div>
                      <div className="bottomButton">
                        <Button 
                        onClick={() => {
                          if(account){
                          bookRental(
                            searchFilters.checkIn,
                            searchFilters.checkOut,
                            e.attributes.uid_decimal.value.$numberDecimal,
                            Number(e.attributes.pricePerDay_decimal.value.$numberDecimal)
                          )}else{
                            handleNoAccount()
                          }
                        }
                        }
                        text="Book now" />
                        <div className="price">
                          <Icon fill="#090909" size={10} svg="matic" />{" "}
                          {e.attributes.pricePerDay} / Day 
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="rentalsContentR">
          <RentalsMap locations={coOrdinates} setHighLight={setHighLight} />
        </div>
      </div>
    </>
  );
};

export default Rentals;