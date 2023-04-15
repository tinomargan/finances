import React from "react";
import edit_icon from "../images/edit-icon.png";
import EditModal from "./EditModal";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import AreYouSureModal from "./AreYouSureModal";

export default function Content() {
    const [itemList, setItemList] = React.useState([]);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showAreYouSureModal, setShowAreYouSureModal] = React.useState(false);

    const handleOdustani = () => {
        setShowAreYouSureModal(false);
        setShowEditModal(false);
    };

    const handleNemojOdustati = () => {
        setShowAreYouSureModal(false);
    };

    /* DOHVAĆANJE STAVKI IZ BAZE */

    const itemCollectionReference = collection(db, "item");

    React.useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemCollectionReference);
                const filteredData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setItemList(filteredData);
            } catch (error) {
                console.error(error);
            }
        };
        getItemList();
    }, []);

    return (
        <div className="content--wrapper">
            {showEditModal && (
                <EditModal
                    show={showEditModal}
                    close={() => setShowEditModal(false)}
                    selectedItem={selectedItem}
                    /* ask={() => setShowAreYouSureModal(true)} */
                />
            )}
            <AreYouSureModal
                show={showAreYouSureModal}
                odustani={() => handleOdustani()}
                nemojOdustati={() => handleNemojOdustati()}
            />
            {itemList.map(item => (
                <div className="content--item" key={item.id}>
                    <div className="content--item-desc">{item.desc}</div>
                    <div className="content--item-eventDate-text">
                        {item.eventDate !== null ? "Datum događaja" : null}
                    </div>
                    <div className="content--item-eventDate">
                        {item.eventDate !== null
                            ? (item.eventDateForEditModal = new Date(
                                  item.eventDate.seconds * 1000
                              ).toLocaleDateString("en-ca"))
                            : null}
                    </div>
                    <div className="content--item-paidDate-text">
                        {item.paidDate !== null ? "Plaćeno" : null}
                    </div>
                    <div className="content--item-paidDate">
                        {item.paidDate !== null
                            ? (item.paidDateForEditModal = new Date(
                                  item.paidDate.seconds * 1000
                              ).toLocaleDateString("en-ca"))
                            : null}
                        {/* { new Date(item.paidDate.seconds*1000).toLocaleDateString('en-ca') } */}
                    </div>
                    <div
                        className="content--item-amount-eur"
                        style={
                            item.incomeExpense === "prihod"
                                ? { color: "green" }
                                : { color: "darkred" }
                        }
                    >
                        {item.amount.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        })}{" "}
                        €
                    </div>
                    <div className="content--item-amount-hrk">
                        {(item.amount * 7.5345).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        })}{" "}
                        HRK
                    </div>
                    <div className="content--item-cash-card">
                        {item.paymentType !== null
                            ? item.paymentType.charAt(0).toUpperCase() +
                              item.paymentType.slice(1)
                            : "/"}
                    </div>
                    <div className="content--item-edit">
                        <img
                            src={edit_icon}
                            alt="edit"
                            className="content--item-edit-img"
                            onClick={() => {
                                setShowEditModal(true);
                                setSelectedItem(item);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
