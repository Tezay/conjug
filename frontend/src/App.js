import { useState } from 'react';

function App() {
    //state (état, données)
    const [compteur, setCompteur] = useState(1);

    // components
    const handleclick = () => {
        setCompteur(compteur + 1);
    }

    // affichage (render)

    return (
        <div className="App">
            <h1>{compteur}</h1>
            <button onClick={handleclick}>+</button>
        </div>
    );

}


export default App;
