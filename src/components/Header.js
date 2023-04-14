import React from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Header() {
    const [itemsList, setItemsList] = React.useState([]);

    const itemsCollectionReference = collection(db, "items");

    React.useEffect(() => {
        const getItemsList = async () => {
            try {
                const data = await getDocs(itemsCollectionReference);
                const filteredData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setItemsList(filteredData);
            } catch (error) {
                console.error(error);
            }
        };
        getItemsList();
    }, []);

    var totalCurrent = 0;
    var totalCurrentPlus = 0;
    var totalCurrentMinus = 0;
    var totalGotovina = 0;
    var totalGotovinaPlus = 0;
    var totalGotovinaMinus = 0;
    var totalKartica = 0;
    var totalKarticaPlus = 0;
    var totalKarticaMinus = 0;
    var totalUkupno = 0;
    var totalUkupnoPlus = 0;
    var totalUkupnoMinus = 0;

    /* IZRAČUN - UKUPNO */

    function getCurrentSum() {
        itemsList.map(items => {
            if (items.incomeExpense === "prihod" && items.paidDate != null) {
                totalCurrentPlus =
                    parseFloat(totalCurrentPlus) + parseFloat(items.amount);
            } else if (
                items.incomeExpense === "trosak" &&
                items.paidDate != null
            ) {
                totalCurrentMinus =
                    parseFloat(totalCurrentMinus) + parseFloat(items.amount);
            }
            totalCurrent = (
                parseFloat(totalCurrentPlus) - parseFloat(totalCurrentMinus)
            ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            });
        });
        return totalCurrent;
    }

    /* IZRAČUN - GOTOVINA */

    function getCashSum() {
        itemsList.map(items => {
            if (
                items.incomeExpense === "prihod" &&
                items.paymentType === "gotovina" &&
                items.paidDate != null
            ) {
                totalGotovinaPlus =
                    parseFloat(totalGotovinaPlus) + parseFloat(items.amount);
            } else if (
                items.incomeExpense === "trosak" &&
                items.paymentType === "gotovina" &&
                items.paidDate != null
            ) {
                totalGotovinaMinus =
                    parseFloat(totalGotovinaMinus) + parseFloat(items.amount);
            }
            totalGotovina = (
                parseFloat(totalGotovinaPlus) - parseFloat(totalGotovinaMinus)
            ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            });
        });
        return totalGotovina;
    }

    /* IZRAČUN - KARTICA */

    function getCardSum() {
        itemsList.map(items => {
            if (
                items.incomeExpense === "prihod" &&
                items.paymentType === "kartica" &&
                items.paidDate != null
            ) {
                totalKarticaPlus =
                    parseFloat(totalKarticaPlus) + parseFloat(items.amount);
            } else if (
                items.incomeExpense === "trosak" &&
                items.paymentType === "kartica" &&
                items.paidDate != null
            ) {
                totalKarticaMinus =
                    parseFloat(totalKarticaMinus) + parseFloat(items.amount);
            }
            totalKartica = (
                parseFloat(totalKarticaPlus) - parseFloat(totalKarticaMinus)
            ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            });
        });
        return totalKartica;
    }

    /* IZRAČUN - BUDUĆE STANJE */

    function getTotalSum() {
        itemsList.map(items => {
            if (items.incomeExpense === "prihod") {
                totalUkupnoPlus =
                    parseFloat(totalUkupnoPlus) + parseFloat(items.amount);
            } else {
                totalUkupnoMinus =
                    parseFloat(totalUkupnoMinus) + parseFloat(items.amount);
            }
            totalUkupno = (
                parseFloat(totalUkupnoPlus) - parseFloat(totalUkupnoMinus)
            ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            });
        });
        return totalUkupno;
    }

    return (
        <div className="header--wrapper">
            <div className="header--item-1-text">Trenutno stanje</div>
            <div className="header--item-1-content">{getCurrentSum()} €</div>
            <div className="header--item-2-text">Gotovina</div>
            <div className="header--item-2-content">{getCashSum()} €</div>
            <div className="header--item-3-text">Kartica</div>
            <div className="header--item-3-content">{getCardSum()} €</div>
            <div className="header--item-4-text">Buduće stanje</div>
            <div className="header--item-4-content">{getTotalSum()} €</div>
        </div>
    );
}
