import React from "react";
import all_icon from "../images/all-icon.png";
import dots_icon from "../images/dots-icon.png";
import expenses_icon from "../images/expenses-icon.png";
import filter_icon from "../images/filter-icon.png";
import income_icon from "../images/income-icon.png";
import search_icon from "../images/search-icon.png";
import AreYouSureModal from "./AreYouSureModal";
import NewItemModal from "./NewItemModal";

export default function Footer(props) {
    const [showNewItemModal, setShowNewItemModal] = React.useState(false);
    const [showAreYouSureModal, setShowAreYouSureModal] = React.useState(false)

    const handleNewItemModalAsk = () => {
        setShowAreYouSureModal(true);
    }

    const handleNewItemModalClose = () => {
        setShowNewItemModal(false);
    }

    const handleOdustani = () => {
        handleNewItemModalClose();
        setShowAreYouSureModal(false);
    }

    const handleNemojOdustati = () => {
        setShowAreYouSureModal(false);
    }



    /* DROPDOWN MENU */

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    
    const handleIsOpen = () => {
        setIsDropdownOpen(!isDropdownOpen);
        console.log(isDropdownOpen);
    }
    
    const handleNovaStavka = () => {
        console.log("Nova stavka");
        setIsDropdownOpen(false);
        setShowNewItemModal(true);
    };
    
    const handlePretraga = () => {
        console.log("Pretraga");
        setIsDropdownOpen(false);
    };
    
    const handleFilter = () => {
        console.log("Filter");
        setIsDropdownOpen(false);
    };
    


    /* CLOSE THE DROPDOWN MENU ON OUTSIDE CLICK */

    

    /* */

    return(
        <div className={"footer--wrapper"}>
            <NewItemModal
                show={showNewItemModal}
                ask={() => handleNewItemModalAsk()}
                close={() => handleNewItemModalClose()}
            />
            <AreYouSureModal
                show={showAreYouSureModal}
                odustani={() => handleOdustani()}
                nemojOdustati={() => handleNemojOdustati()}
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
            <div className="footer--item-1">
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
                {isDropdownOpen ? (
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