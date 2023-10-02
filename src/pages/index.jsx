import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, use } from "react";

import axios from "axios";
import GroupSelect from "../components/group/GroupSelect";
import { Home } from "./Home";
import { Debt } from "./Debt";
import { Goals } from "./Goals";

const BASE_URL = "http://localhost:3000";

export default function Landing() {
  const [activeComponent, setActiveComponent] = useState();
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  const handleNavButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  let contentToShow = <p> activecomploading... </p>;

  if (activeComponent === "home") {
    contentToShow = (
      <Home group={userData.group} deletePurchase={deletePurchase} />
    );
  } else if (activeComponent === "debt") {
    contentToShow = <Debt group={userData.group} />;
  } else if (activeComponent === "goals") {
    contentToShow = <Goals />;
  }
  
  function activeGroup(group) {
    setUserData({
      ...userData,
      group,
    });
    setActiveComponent("home");
  }


  async function deletePurchase(id) {
    await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`);
  }
  async function createUser() {
    const data = {
      name: session.user.name,
      email: session.user.email,
    };
    await axios.post(`${BASE_URL}/api/users`, data);
    return;
  }
  useEffect(() => {
    async function fetchUserData() {
      if (!session) {
        return;
      }

      try {
        // see if a user exists based on session information... if not create a new user
        const user = await axios
          .get(`${BASE_URL}/api/users/${session.user.email}`)
          .then((res) => res.data);

        setUserData({
          ...userData,
          user,
        });
      } catch (e) {
        if (e.request.status === 400) createUser();
        return;
      }

      try {
        const group = await axios
          .get(`${BASE_URL}/api/groups/${user.id}`)
          .then((res) => res.data);

        setUserData({
          ...userData,
          group,
        });
        return;
      } catch (e) {
        console.error(e);
      }

      try {
        const group = await axios.get(`${BASE_URL}/api/groups/${user.id}`);
      } catch (e) {}

    }

    fetchUserData();
  }, [session]);


  if (!session) {
    return (
      <div className="signin-card">
        <div className="signin-text">Please sign in to access the app.</div>
        <button className="signin-button" onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  if (userData && userData?.group == undefined) {
    return (
      <div className="index">
        <GroupSelect userData={userData.user} activeGroup={activeGroup} />
      </div>
    );
  }
  if (userData?.group) {
    return (
      <>
        <nav className="nav">
          <button
            className={activeComponent === "home" ? "nav-item active-nav-item" : "nav-item"}
            onClick={() => handleNavButtonClick("home")}
          >
            Home
          </button>
          <button
             className={activeComponent === "debt" ? "nav-item active-nav-item" : "nav-item"}
            onClick={() => handleNavButtonClick("debt")}
          >
            Debt
          </button>
          
          <button className="nav-item" 
          onClick={() => signOut()}>
            Sign Out
          </button>
        </nav>
        {contentToShow}
      </>
    );
  }
  return (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  )
}