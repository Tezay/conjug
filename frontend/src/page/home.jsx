import React, { useEffect, useState } from "react";
import Header from "./components/header";
import "../static/css/style.css";

const Home = () => {

    //state

    const [dataHome, setdataHome] = useState({
        username: ""
    });

    // components

    useEffect(() => {
        fetch('/home').then((res) =>
            res.json().then((data) => {
                setdataHome({
                    username: data.username,
                });
            })
        );
    }, []);


    return (
        <Header
         dataHome={dataHome}/>
    )
}

export default Home;