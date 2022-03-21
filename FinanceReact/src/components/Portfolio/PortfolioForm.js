import classes from './PortfolioForm.module.css'
import Button from '../UI/Button';
import { React, useState, Fragment, useEffect } from 'react';
import axios from 'axios';


function PortfolioForm(props) {
    const [enteredStock, setEnteredStock] = useState('');
    const [enteredTicker, setEnteredTicker] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredMark, setEnteredMark] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    //const [error, setError] = useState('');

    const tickerChangeHandler = (event) => {
        setEnteredTicker(event.target.value);
    };
    
    useEffect(()=>{
        const APIKEY = 'GCtknMw46M8sqfHfm639066y2xmvr95t5A16rhkx'
            var stockName = {
                method: 'GET',
                url: 'https://yfapi.net/v6/finance/quote?symbols=' + enteredTicker,
                params: { modules: 'defaultKeyStatistics,assetProfile' },
                headers: {
                    "x-api-key": APIKEY
                }
            };
            axios.request(stockName).then(function (response) {
                const stockName = response.data.quoteResponse.result[0].displayName
                setEnteredStock(stockName)
            }).catch(function (error) {
                console.error(error)
            })

    },[enteredTicker]);

    const stockChangeHandler = (event) => {

        setEnteredStock(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };
    const markChangeHandler = (event) => {
        setEnteredMark(event.target.value);
    };


    const addStockHandler = (event) => {
        event.preventDefault();

        const stockData = {
            ticker: enteredTicker,
            name: enteredStock,
            amount: enteredAmount,
            mark: enteredMark
        };



        props.onSaveStockData(stockData);
        setEnteredTicker('');
        setEnteredStock('');
        setEnteredAmount('');
        setEnteredMark('');


    };



    useEffect(() => {
        let arr1 = [
        enteredAmount.trim().length !== 0,
        enteredMark.trim().length !== 0,
        enteredAmount > 0,
        enteredMark > 0];

        let checker = arr => arr.every(v => v === true);
        if (checker(arr1)) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [enteredTicker, enteredAmount, enteredMark]);

    // useEffect(() => {
    //     let arr1 = [enteredStock.trim().length !== 0,
    //     enteredAmount.trim().length !== 0,
    //     enteredMark.trim().length !== 0,
    //     enteredAmount > 0,
    //     enteredMark > 0];

    //     let checker = arr => arr.every(v => v === true);
    //     if (checker(arr1)) {
    //         setFormIsValid(true)
    //     } else {
    //         setFormIsValid(false)
    //     }
    // }, [enteredStock, enteredAmount, enteredMark]);

    return (
        <Fragment>
            <form onSubmit={addStockHandler}>
                <label htmlFor="name">ticker</label>
                <input id="ticker" type="text" value={enteredTicker} onChange={tickerChangeHandler}></input>
                <label htmlFor="name">Stock Name</label>
                <input id="name" type="text" value={enteredStock} onChange={stockChangeHandler}></input>
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="number" value={enteredAmount} onChange={amountChangeHandler}></input>
                <label htmlFor="mark">Mark</label>
                <input id="mark" type="number" value={enteredMark} onChange={markChangeHandler}></input>
                {!formIsValid && <button className={classes.invalid} disabled={!formIsValid}>Confirm</button>}
                {formIsValid && <Button type="submit" > Confirm</Button>}
            </form>
        </Fragment>
    )
};

export default PortfolioForm;