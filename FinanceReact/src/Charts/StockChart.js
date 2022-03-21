import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Fragment, React } from 'react';
import classes from '../components/UI/Header.module.css';

function StockChart(props) {
    const stockLists = props.stockLists
    let dataList = []
    let labelList = []
    stockLists.map(stock => {
        const stockValue = stock.props.amount * stock.props.mark
        dataList.push(stockValue)
        labelList.push(stock.props.name)

    })

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: labelList,
        datasets: [
            {
                label: 'stocks',
                data: dataList,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true
            }
        },
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'TEST',
        }

    }
    return (
        <Fragment>
            <h1 className={classes.header}>Portfolio Allocation</h1>
            <div width="50%">
                <Pie
                    data={data}
                    width={500}
                    height={500}
                    options={options}
                />
            </div>
        </Fragment>
    )
}

export default StockChart