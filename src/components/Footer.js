import React from "react";
import all_icon from "../images/all-icon.png";
import dots_icon from "../images/dots-icon.png";
import expenses_icon from "../images/expenses-icon.png";
import filter_icon from "../images/filter-icon.png";
import income_icon from "../images/income-icon.png";
import search_icon from "../images/search-icon.png";
import NewItemModal from "./NewItemModal";

function Avatar(props) {
    return(
        console.log(props.id)
    )
}

export default function Footer() {
    const [showNewItemModal, setShowNewItemModal] = React.useState(false);

    /* DROPDOWN MENU */
    
    const [isOpen, setIsOpen] = React.useState(false);
    
    const handleIsOpen = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    /* const handleClose = () => {
        setIsOpen(false);
    } */
    
    const handleNovaStavka = () => {
        console.log("Nova stavka");
        setIsOpen(false);
        setShowNewItemModal(true);
    };
    
    const handlePretraga = () => {
        console.log("Pretraga");
        setIsOpen(false);
    };
    
    const handleFilter = () => {
        console.log("Filter");
        setIsOpen(false);
    };
    
    /* CLOSE THE DROPDOWN MENU ON OUTSIDE CLICK */



    /* */

    return(
        <div className={"footer--wrapper"}>
            <NewItemModal
                show={showNewItemModal}
                close={() => setShowNewItemModal(false)}
            />
            {/* <div className="footer--item-1">
                <img src={all_icon} className="footer--item-1-img"/>
                </div>
                <div className="footer--item-2">
                <img src={income_icon} className="footer--item-2-img"/>
                </div>
                <div className="footer--item-3">
                <img src={expenses_icon} className="footer--item-3-img"/>
                </div>
                <div className="footer--item-4">
                <img src={dots_icon} className="footer--item-4-img"/>
            </div> */}
            <div className="footer--item-1" onClick={Avatar}>
                SVE
            </div>
            <div className="footer--item-2">
                PRIHODI
            </div>
            <div className="footer--item-3">
                TROŠKOVI
            </div>
            <div className="footer--item-4" onClick={handleIsOpen} /* ref={dropdownRef} */>
                <img src={dots_icon} className="footer--item-4-img"/>
            </div>
            <div className="footer--dropdown" /* ref={dropdownRef} */>
                {isOpen ? (
                    <ul className="footer--dropdown-list">
                        <li className="footer--dropdown-list-item" onClick={handleNovaStavka}>Nova stavka</li>
                        <li className="footer--dropdown-list-item" onClick={handlePretraga}>Pretraga</li>
                        <li className="footer--dropdown-list-item" onClick={handleFilter}>Filter</li>
                    </ul>
                ) : null}
            </div>
        </div>
    )
}