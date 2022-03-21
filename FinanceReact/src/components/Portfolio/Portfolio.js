import { React, useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import PortfolioItem from './PortfolioItem';
import classes from './Portfolio.module.css';
import PortfolioAdd from './PortfolioAdd';
import Button from '../UI/Button';
import PortfolioHeader from './PortfolioHeader'
import FetchContext from '../../Store/FetchContext';
import StockChart from '../../Charts/StockChart';



function Portfolio(props) {
    const [stockLists, setStockLists] = useState([])


    const fetchStocklist = useCallback(async () => {
        const response = await fetch('http://127.0.0.1:8000/stock-list/')
        const data = await response.json();

        setStockLists(data)

    }, []);

    useEffect(() => {
        fetchStocklist();
    }, [fetchStocklist]);


    const [showModal, setShowModal] = useState();

    const showModalHandler = (props) => {
        setShowModal(true)
    }
    const hideModalHandler = (props) => {
        setShowModal(false)
    }
    const ProcessedStockLists = stockLists.map(stock =>
        <PortfolioItem
            key={stock.id}
            id={stock.id}
            ticker={stock.ticker}
            name={stock.name}
            amount={stock.amount}
            mark={stock.mark}
        />
    );


    return (
        <FetchContext.Provider
            value={{
                onFetchStockList: fetchStocklist,
                onHideModal: hideModalHandler,
                onShowModal: showModalHandler,
                showModal: showModal
            }}>
            <Card>
                <table className={classes.table}>
                    <tbody>
                        <PortfolioHeader></PortfolioHeader>
                        {ProcessedStockLists}
                    </tbody>
                </table>
                <Button onClick={showModalHandler}>ADD</Button>
                {showModal && <PortfolioAdd onClose={hideModalHandler} onRefresh={fetchStocklist}></PortfolioAdd>}

            </Card>
            <Card>
                <StockChart stockLists={ProcessedStockLists}/>
            </Card>
        </FetchContext.Provider>


    )
};

export default Portfolio;