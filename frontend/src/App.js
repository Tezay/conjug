import React, { useState, useEffect } from 'react';

function App() {
    //state (état, données)
    const [data, setdata] = useState({
        username: ""
    });

    // components
    useEffect(() => {
        fetch('/home').then((res) =>
            res.json().then((data) => {
                setdata({
                    username: data.username,
                });
//                alert("Success")
            })
        );
    }, []);

    // affichage (render)

    return (
        <div className="App">
            <h1>The pseudo is {data.username}</h1>
        </div>
    );
}

export default App;
