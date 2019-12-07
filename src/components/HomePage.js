import React from 'react';
import photo from '../images/homeImg2.jpeg';
import WebsiteInfo from './WebsiteInfo'
import './homePage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <WebsiteInfo />
                <img src={photo} className="home-hero" />
            </div>
        )
    }
}

export default HomePage;