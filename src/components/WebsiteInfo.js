import React from 'react';
import './homePage.css';

export default function websiteInfo() {
    return (
        <div className="ui cards home-info">
        <div className="card">
            <div className="content">
                <div className="header">
                    Football betting value finder
                </div>
                <div className="description">
                    This app compares real life bookmaker odds with my interpretation of what the odds should be to highlight value bets.
                    I cover Premier League, Championship, League 1, and League 2 fixtures. Enjoy!
                </div>
            </div>
        </div>
        </div>
    )
};
