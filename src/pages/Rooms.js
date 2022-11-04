import React from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import bg from "../images/background.jpg";
import logo from "../images/airbnb.jpg";
import img1 from "../images/img1.webp";
import img2 from "../images/img2.webp";
import img3 from "../images/img3.webp";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import {
  ConnectButton,
  Icon,
  Button,
  useNotification,
  TabList,
  Tab,
} from "web3uikit";

const Rooms = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradinet"></div>
      </div> */}

      {/* footer started */}

      <div className="topBanne">
        <div>
          <img className="logo" src={logo} alt="logo"></img>
        </div>
        <div>
          <Button text="Home" onClick={() => navigate("/")}  size="large" />
        </div>
      </div>
      <hr className="line" />
      <div className="main">
        <div>
          <img className="image1" src={img1} alt="img1"></img>
        </div>
        <div className="second">
          <div>
            <img className="image2" src={img2} alt="img1"></img>
          </div>
          <div>
            <img className="image3" src={img3} alt="img1"></img>
          </div>
          <div>
            <img className="image4" src={img4} alt="img1"></img>
          </div>
          <div>
            <img className="image5" src={img5} alt="img1"></img>
          </div>
        </div>

        <div>
          <TabList
            defaultActiveKey={1}
            onChange={function noRefCheck() {}}
            tabStyle="bar"
          >
            <Tab
              tabKey={1}
              tabName={
                <div style={{ display: "flex" }}>
                  {/* <SvgMessageCircle fill="black" fontSize={22} />{" "} */}
                  <span style={{ paddingLeft: "4px" }}>Overview</span>
                </div>
              }
            >
              <div className="tabscolor">
                <h4 className="heading">Rove At The Park</h4>
                <p>⭐⭐⭐⭐</p>
                <h3 style={{ marginTop: "5%" }}>4/5 Wonderful</h3>
                <h4 style={{ marginTop: "5%" }}>
                  Guests rated this property 4.8/5 for cleanliness.
                </h4>
                <h4>Popular amenities</h4>
                <div className="roomdetails">
                  <div className="aling">
                    <span class="material-symbols-outlined">wifi</span> Free
                    WiFi
                  </div>
                  <div className="aling">
                    <span class="material-symbols-outlined">garage_home</span>
                    Parking included
                  </div>
                  <div className="aling">
                    <span class="material-symbols-outlined">air_freshener</span>
                    Air conditioning
                  </div>
                  <div className="aling">
                    <span class="material-symbols-outlined">
                      local_laundry_service
                    </span>
                    Laundry
                  </div>
                  <div className="aling">
                    <span class="material-symbols-outlined">
                      self_improvement
                    </span>
                    Spa
                  </div>
                  <div className="aling">
                    <span class="material-symbols-outlined">pool</span>Pool
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              tabKey={2}
              tabName={
                <div style={{ display: "flex" }}>
                  {/* <SvgBell fill="black" fontSize={22} /> */}
                  <span style={{ paddingLeft: "4px" }}>Alerts </span>
                </div>
              }
            >
              <Button
                // icon={<SvgPlus fontSize={16} />}
                onClick={function noRefCheck() {}}
                text="Add New Alert"
                theme="primary"
                type="button"
              />
            </Tab>
          </TabList>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Rooms;
