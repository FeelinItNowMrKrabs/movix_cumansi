import React, { useState, useEffect } from 'react';
import Main from './mainRouter'

function App() {
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        fetch('/test')
            .then(res => res.json())
            .then(data => {
                setCurrentTime(data.time)
            })
    }, [])
    return (<div className="App" >
        <Main />
    </div>
    );
}

export default App;