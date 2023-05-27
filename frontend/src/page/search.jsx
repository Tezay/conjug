import { useEffect, useState } from "react";    

import Header from "./components/header"
import Footer from "./components/footer"
import SearchBar from "./components/searchbar"
import UserList from "./components/search/userList"

//import "../static/css/searchBar.css"

const Search = () => {

    const [dataSearch, setdataSearch] = useState({
        username:"",
        utilisateurs: "",
    });

    useEffect(() => {
        fetch('/search').then((res) =>
            res.json().then((data) => {
                setdataSearch({
                    username:data.username,
                    utilisateurs: data.utilisateurs,
                });
            })
        );
    }, []);

    return (
        <>
            <Header
             dataHeader={dataSearch}/>

                <SearchBar />

                <UserList
                 dataSearch = {dataSearch} />

            <Footer />

        </>
    )
};

export default Search;