import React from "react";
import edit_icon from "../images/edit-icon.png";
import EditModal from "./EditModal";
import { db } from "../config/firebase";
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import AreYouSureModal from "./AreYouSureModal";


export default function Content(props) {
    const [itemsList, setItemsList] = React.useState([]);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);



    /* DOHVAĆANJE STAVKI IZ BAZE */

    const itemsCollectionReference = collection(db, "items")

    React.useEffect(() => {
        const getItemsList = async () => {
            try {
                const data = await getDocs(itemsCollectionReference)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setItemsList(filteredData);
            } catch (error) {
                console.error(error);
            }
        }
        getItemsList()
    }, [])

    

    return(
        <div className="content--wrapper">
            {showEditModal && <EditModal
                show={showEditModal}
                close={() => setShowEditModal(false)}
                selectedItem={selectedItem}
            />}
            {itemsList.map((items) => (
                <div className="content--item" key={items.id}>
                    <div className="content--item-desc">
                        { items.desc }
                    </div>
                    <div className="content--item-eventDate-text">
                        {items.eventDate != null
                        ? "Datum događaja"
                        : null}
                    </div>
                    <div className="content--item-eventDate">
                        {items.eventDate != null
                        ? new Date(items.eventDate.seconds*1000).toLocaleDateString('en-ca')
                        : null
                        }
                    </div>
                    <div className="content--item-paidDate-text">
                        {items.paidDate != null
                        ? "Plaćeno"
                        : null}
                    </div>
                    <div className="content--item-paidDate">
                        {items.paidDate != null
                        ? new Date(items.paidDate.seconds*1000).toLocaleDateString('en-ca')
                        : null}
                        {/* { new Date(items.paidDate.seconds*1000).toLocaleDateString('en-ca') } */}
                    </div>
                    <div className="content--item-amount-eur" style={items.incomeExpense === "prihod" ? {color:"green"} : {color:"darkred"}}>
                        { (items.amount).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        }) } €
                    </div>
                    <div className="content--item-amount-hrk">
                        { (((items.amount)*7.5345).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        })) } HRK
                    </div>
                    <div className="content--item-cash-card">
                        { items.paymentType != null
                            ? ((items.paymentType).charAt(0)).toUpperCase() + (items.paymentType).slice(1) 
                            : "/"
                        }
                    </div>
                    <div className="content--item-edit">
                        <img src={edit_icon} className="content--item-edit-img" onClick={() => {
                            setShowEditModal(true);
                            setSelectedItem(items);
                            }}/>
                    </div>
                </div>
            ))}
        </div>
    )
}