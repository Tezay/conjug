import { useState, useEffect } from 'react';

function App() {
    //state (état, données)
    const [dataHome, setDataHome] = useState([{}])

    // components
    useEffect(() => {
        alert("Please")
        fetch('/home').then(
            res => res.json()
        ).then(
            dataHome => {
                setDataHome(dataHome)
                console.log(dataHome)
            }
        )
    }, [])

    // affichage (render)

    return (
        <div className="App">
            <h1>{dataHome}</h1>
        </div>
    );

}

export default App;
