import React, { useState, useEffect } from 'react'  //7.2K (gzipped: 3K)

function App() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("home").then((res) =>
            res.json().then((data) => {
                setData({
                    username: data.username,
                });
//                console.log(data)
            })
        );
    }, [])

    return (
        <div className="App">
            <p>{data.username}</p>
        </div>
    );
}

export default App;
