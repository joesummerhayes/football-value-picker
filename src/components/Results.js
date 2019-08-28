import React from 'react';
import Request from 'superagent';
import ResultsTable from './ResultsTable';


class Results extends React.Component {
    state = {
        results: []
    }

    componentDidMount() {
        //  new Date().toISOString().slice(0,10)
        //change


        const today = new Date();
        const toDateData = today.toDateString()

        const fromDateData = new Date(today.getTime() - 604800000).toDateString();



        const formatDate = (date) => {
            const array = date.split(' ');

            const monthToFind = array[1];
            
            const months = [
                {month: 'Jan', key: '01'},
                {month: 'Feb', key: '02'},
                {month: 'Mar', key: '03'},
                {month: 'Apr', key: '04'},
                {month: 'May', key: '05'},
                {month: 'Jun', key: '06'},
                {month: 'Jul', key: '07'},
                {month: 'Aug', key: '08'},
                {month: 'Sep', key: '09'},
                {month: 'Oct', key: '10'},
                {month: 'Nov', key: '11'},
                {month: 'Dec', key: '12'}
            ];

            const monthData = months.find((month) => month.month === monthToFind)
            const yearData = array[3];
            const dayData = array[2];

            return `${yearData}-${monthData.key}-${dayData}`
        }

        const fromDate = formatDate(fromDateData);
        const toDate = formatDate(toDateData);

         console.log(fromDate)
         console.log(toDate)

        // 2019-08-12



        
            const statsApiKey = '7af2d7e9641bd0322a09b5d94e4c03dd81da28e216f60929aa790d6236ed5e30';
            const statsSearch =
            `https://apiv2.apifootball.com/?action=get_events&from=${fromDate}&to=${toDate}&league_id=148&APIkey=${statsApiKey}`;

                Request.get(statsSearch).then((response) =>{
                const resultsArray = response.body;
                this.setState({
                    results: resultsArray
                });
        })
    }


    render() {
        return (
            <div>
                <ResultsTable
                results = {this.state.results}
                />
            </div>
        )
    }
}


export default Results;