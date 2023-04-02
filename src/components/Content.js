import React from "react";
import edit_icon from "../images/edit-icon.png";
import EditModal from "./EditModal";
import { db } from "../config/firebase";
import {getDocs, collection} from 'firebase/firestore'

export default function Content(props) {
    const [showEditModal, setShowEditModal] = React.useState(false);

    const [itemsList, setItemsList] = React.useState([])

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

    /* if (items.paidDate != null) {
        let paidDate = new Date(items.paidDate.seconds*1000).toLocaleDateString('en-ca')
    } */
    
    return(
        <div className="content--wrapper">
            <EditModal
                show={showEditModal}
                close={() => setShowEditModal(false)} 
            />
            {itemsList.map((items) => (
                <div className="content--item" key={items.id}>
                    <div className="content--item-desc">
                        { items.desc }
                    </div>
                    <div className="content--item-eventDate-text">
                        Datum događaja
                    </div>
                    <div className="content--item-eventDate">
                        { new Date(items.eventDate.seconds*1000).toLocaleDateString('en-ca') }
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
                        { ((items.paymentType).charAt(0)).toUpperCase() + (items.paymentType).slice(1) }
                    </div>
                    <div className="content--item-edit">
                        <img src={edit_icon} className="content--item-edit-img" onClick={() => setShowEditModal(true)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}