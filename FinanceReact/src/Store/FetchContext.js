import React from "react";

    const FetchContext = React.createContext(
        {
            onFetchStockList: ()=>{},
            onHideModal: ()=>{},
            onShowModal: ()=>{},
            showModal: true,
          }
    );

export default FetchContext;