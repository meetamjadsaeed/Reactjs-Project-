import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/navbar.css";

import AppService from "../services/appServices";

import { Input } from "antd";

const { Search } = Input;

const NavBar = () => {
  const [searchedQuery, setSearchedQuery] = useState("");

  const navigate = useNavigate();

  const getSearchQuery = (query) => {
    // setSearchedQuery(query);
    // navigate("/search");
    navigate(`/search`, { state: { querySearch: query } });
    // console.log(query, "query");
  };

  return (
    <>
      <div className="navbar">
        <a className="active" href="/">
          Home
        </a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a>
          <Search
            placeholder="search "
            onSearch={getSearchQuery}
            style={{ width: 200 }}
          />
        </a>
      </div>
    </>
  );
};

export default NavBar;
