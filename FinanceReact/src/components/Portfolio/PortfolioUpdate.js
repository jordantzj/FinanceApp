import PortfolioForm from "./PortfolioForm"
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import FetchContext from "../../Store/FetchContext";
import {useContext, useState, useEffect} from 'react';

function PortfolioUpdate(props) {
    const ctx = useContext(FetchContext);
    const [isRefreshed, setIsRefreshed] = useState(false)

    async function onUpdateStockDataHandler(stockData){
        setIsRefreshed(true)
         await fetch('http://127.0.0.1:8000/stock-update/' + props.id + '/',{
            method: 'POST',
            body: JSON.stringify(stockData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        setIsRefreshed(false)
        props.onClose()
    }
    

    useEffect(() => {
        ctx.onFetchStockList();
    }, [isRefreshed]);
    
    return (
        <Modal onClose={props.onClose}>
            <PortfolioForm onSaveStockData={onUpdateStockDataHandler} />
            <Button onClick={props.onClose}>Cancel</Button>
        </Modal>

    )
};

export default PortfolioUpdate
