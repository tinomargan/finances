import React from "react";
import all_icon from "../images/all-icon.png";
import dots_icon from "../images/dots-icon.png";
import expenses_icon from "../images/expenses-icon.png";
import filter_icon from "../images/filter-icon.png";
import income_icon from "../images/income-icon.png";
import search_icon from "../images/search-icon.png";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import AreYouSureModal from "./AreYouSureModal";
import NewItemModal from "./NewItemModal";
import NewCategoryModal from "./NewCategoryModal";
import CategoriesListModal from "./Categories";

export default function Footer() {

    const [showNewItemModal, setShowNewItemModal] = React.useState(false);
    const [showAreYouSureModal, setShowAreYouSureModal] = React.useState(false);
    const [showNewCategoryModal, setShowNewCategoryModal] = React.useState(false);
    const [showCategoriesListModal, setShowCategoriesListModal] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);

    const handleNewItemModalAsk = () => {
        setShowAreYouSureModal(true);
    };

    const handleNewItemModalClose = () => {
        setShowNewItemModal(false);
    };

    const handleOdustani = () => {
        setShowAreYouSureModal(false);
        handleNewItemModalClose();
    };

    const handleNemojOdustati = () => {
        setShowAreYouSureModal(false);
    };


    /* RELOAD CONTENT */

    const reload = () => window.location.reload();

    /* const reloadCategoryList = async () => {
        try {
            // Fetch the latest category list from the database
            const firestoreInstance = getFirestore();
            const categoryCollectionReference = collection(firestoreInstance, "category");
            const sortedCategories = query(categoryCollectionReference, orderBy("name", "asc"));
            const data = await getDocs(sortedCategories);
            const updatedCategoryList = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setCategoryList(updatedCategoryList);

            console.log("Category list reloaded:", updatedCategoryList); // Add this log
        } catch (error) {
            console.error(error);
        }
    }; */

    /* DROPDOWN MENU */

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const handleToggleOpen = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        } else {
            setIsDropdownOpen(true);
        }
    };

    const handleNovaStavka = () => {
        console.log("Nova stavka");
        setIsDropdownOpen(false);
        setShowNewItemModal(true);
    };

    const handleKategorije = () => {
        console.log("Kategorije");
        setIsDropdownOpen(false);
        setShowCategoriesListModal(true);
    };

    const handlePretraga = () => {
        console.log("Pretraga");
        setIsDropdownOpen(false);
    };

    const handleSortiraj = () => {
        console.log("Sortiraj");
        setIsDropdownOpen(false);
    };

    /* CLOSE THE DROPDOWN MENU ON OUTSIDE CLICK */

    const useOutsideClick = callback => {
        const dropdownRef = React.useRef();

        React.useEffect(() => {
            const handleClick = event => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target)
                ) {
                    callback();
                }
            };

            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            };
        }, [dropdownRef]);

        return dropdownRef;
    };

    const handleClickOutside = () => {
        setIsDropdownOpen(false);
    };

    const dropdownRef = useOutsideClick(handleClickOutside);

    return (
        <div className={"footer--wrapper"}>
            <NewItemModal
                show={showNewItemModal}
                ask={() => handleNewItemModalAsk()}
                close={() => handleNewItemModalClose()}
                newCategory={() => setShowNewCategoryModal(true)}
                reload={reload}
                /* reloadCategoryList={reloadCategoryList} */
                categoryList={categoryList}
            />
            <AreYouSureModal
                show={showAreYouSureModal}
                odustani={() => handleOdustani()}
                nemojOdustati={() => handleNemojOdustati()}
            />
            <NewCategoryModal
                show={showNewCategoryModal}
                close={() => setShowNewCategoryModal(false)}
                reload={reload}
            /* reloadCategoryList={reloadCategoryList} */
            />
            <CategoriesListModal
                show={showCategoriesListModal}
                close={() => setShowCategoriesListModal(false)}
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
            <div className="footer--item-1">SVE</div>
            <div className="footer--item-2">PRIHODI</div>
            <div className="footer--item-3">TROŠKOVI</div>
            <div
                className="footer--item-4"
                onClick={handleToggleOpen}
                ref={dropdownRef}
            >
                <img src={dots_icon} className="footer--item-4-img" />
            </div>
            <div className="footer--dropdown">
                {isDropdownOpen ? (
                    <ul className="footer--dropdown-list">
                        <li
                            className="footer--dropdown-list-item"
                            onClick={handleNovaStavka}
                        >
                            Nova stavka
                        </li>
                        <li
                            className="footer--dropdown-list-item"
                            onClick={handleKategorije}
                        >
                            Kategorije
                        </li>
                        <li
                            className="footer--dropdown-list-item"
                            onClick={handlePretraga}
                        >
                            Pretraga
                        </li>
                        <li
                            className="footer--dropdown-list-item"
                            onClick={handleSortiraj}
                        >
                            Sortiraj
                        </li>
                    </ul>
                ) : null}
            </div>
        </div>
    );
}
