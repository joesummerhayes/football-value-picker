import React from 'react';
import photo from '../images/homeImg2.jpeg';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <img src={photo} style={{width: "-webkit-fill-available"}} />
            </div>
        )
    }
}

export default HomePage;