import React from 'react';
import './ResultsTable.css'


//breaking it because loading up a game that hasn't happened yet so stats returning undefined.
//need to make sure we only get games that have taken place

class ResultsTable extends React.Component {
    render() {
        const resultsArray = this.props.results

        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Dangerous Attacks</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Dangerous Attacks</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsArray.map(item => {
                        const dangAttack = item.statistics.filter((stat) => {
                            return stat.type === 'Dangerous Attacks'
                        })
                        return (
                            <tr className="fixture-row">
                                <td data-label="Dangerous Attacks Home">{dangAttack[0].home ? dangAttack[0].home : 'na'}</td>
                                {/* <td data-label="Dangerous Attacks Home">{'cant get'}</td> */}
                                <td data-label="Home Team">{item.match_hometeam_name}</td>
                                <td data-label="Away Team">{item.match_awayteam_name}</td>
                                <td data-label="Dangerous Attacks Away">{dangAttack[0].away ? dangAttack[0].away : 'na'}</td>
                                {/* <td data-label="Dangerous Attacks Away">{'cant get'}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default ResultsTable;
