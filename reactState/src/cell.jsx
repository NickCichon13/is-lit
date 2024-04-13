import React from "react";
import "./cell.css";


function Cell({flipCellsAroundMe, isLit = fasle}){
    const claseses = `cell ${isLit ? "cell-lit" : ""}`
    return <td className={classes} onClick={flipCellsAroundMe} role="button"/>

}

export default Cell;