import { useEffect, useState } from "react";

import Header from "./components/header";
import WelcomeArea from "./components/home/welcomeArea";
import Card from "./components/home/card";
import Carrousel from "./components/home/carrousel";
import Footer from "./components/home/footerHome";

import "../static/css/style.css";
//import "../static/css/home/bootstrap.min.css";
//import "../static/css/home/flex-slider.css"
//import "../static/css/home/owl-carousel.css";
//import "../static/css/home/homeNew.css";

//import "../static/js/home/custom.js";
//import "../static/js/home/imgfix.min.js";
//import "../static/js/home/jquery-2.1.0.min.js";
//import "../static/js/home/owl-carousel.js";
//import "../static/js/home/scrollreveal.min.js";


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
    <>
        <Header
         dataHeader={dataHome}/>

            <WelcomeArea/>

            <Card />

                <div class="left-image-decor"></div>

                <div class="right-image-decor"></div>


            <Carrousel/>

        <Footer />

   </>
  )
};

export default Home;