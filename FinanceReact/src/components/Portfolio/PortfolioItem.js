import classes from './PortfolioItem.module.css';
import { useContext, useEffect, useState, Fragment } from 'react';
import ButtonDelete from '../UI/ButtonDelete';
import FetchContext from '../../Store/FetchContext';
import ButtonUpdate from '../UI/ButtonUpdate';
import PortfolioUpdate from './PortfolioUpdate';
var axios = require("axios").default;


function PortfolioItem(props) {
    const ctx = useContext(FetchContext);
    const [showModal, setShowModal] = useState(false)
    const [isRefreshed, setIsRefreshed] = useState(false)
    const [stockPrice, setStockPrice] = useState()

    async function onDeleteStockHandler() {
        setIsRefreshed(true)
        await fetch('http://127.0.0.1:8000/api/stock-delete/' + props.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setIsRefreshed(false)
    }

    useEffect(() => {
        ctx.onFetchStockList();
    }, [isRefreshed]);

    const onShowModalHandler = () => {
        setShowModal(true);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }


    useEffect(() => {
        const APIKEY = 'GCtknMw46M8sqfHfm639066y2xmvr95t5A16rhkx'

        const timer = setTimeout(() => {
            var stockPrice = {
                method: 'GET',
                url: 'https://yfapi.net/v6/finance/quote?symbols=' + props.ticker,
                params: { modules: 'defaultKeyStatistics,assetProfile' },
                headers: {
                    "x-api-key": APIKEY
                }
            };
            axios.request(stockPrice).then(function (response) {
                const stockBid = response.data.quoteResponse.result[0].bid
                const stockAsk = response.data.quoteResponse.result[0].ask
                const currentPrice = ((stockAsk + stockBid) / 2).toFixed(2)

                setStockPrice(currentPrice)

            }).catch(function (error) {
                console.error(error)
            })

        }, 1000)

        return () => clearTimeout(timer);

    }, [])


    return (
        <Fragment>

            <tr>
                <td className={classes.td}>{props.ticker} </td>
                <td className={classes.td}>{props.name} </td>
                <td className={classes.td}>{stockPrice} </td>
                <td className={classes.td_amount}>{props.amount}</td>
                <td className={classes.td}> ${props.mark}</td>
                <td className={classes.td}> ${props.mark*props.amount}</td>
                <td className={classes.td}> ${(props.amount*stockPrice).toFixed(2)}</td>
                <td className={classes.td}> ${(props.amount*stockPrice-props.mark*props.amount).toFixed(2)}</td>
                <td><ButtonDelete onClick={onDeleteStockHandler}>DELETE</ButtonDelete></td>
                <td><ButtonUpdate onClick={onShowModalHandler} >UPDATE</ButtonUpdate></td>
                {showModal && <PortfolioUpdate onClose={hideModalHandler} id={props.id} />}

            </tr>

        </Fragment>
    )
}

export default PortfolioItem;