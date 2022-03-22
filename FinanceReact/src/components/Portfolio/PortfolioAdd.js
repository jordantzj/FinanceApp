import PortfolioForm from "./PortfolioForm"
import Button from '../UI/Button';
import Modal from '../UI/Modal';

function PortfolioAdd(props) {
    async function onSaveStockDataHandler(stockData){
         await fetch('http://127.0.0.1:8000/api/stock-create/',{
            method: 'POST',
            body: JSON.stringify(stockData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        props.onClose()
        props.onRefresh()
        
    }
    
    return (
        <Modal onClose={props.onClose}>
            <PortfolioForm onSaveStockData={onSaveStockDataHandler} />
            <Button onClick={props.onClose}>Cancel</Button>
        </Modal>

    )
};

export default PortfolioAdd