import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { InvoiceForm } from "../components/invoiceForm";
import { useState } from "react";
import { useToast } from "../context/toastContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const AddInvoice = () => {
  const { user } = useAuth();
  const { setOpen, setMessage } = useToast();
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({
    invoiceNr: "",
    placeOfIssue: "",
    dateOfIssue: dayjs(),
    deadlinePayments: dayjs(),
    paymentMethod: "",
    saleDate: dayjs(),
    accountNumber: "",
  });
  const [seller, setSeller] = useState({
    compnayName: user.company.compnayName,
    nip: user.company.nip,
    street: user.company.street,
    city: user.company.city,
    code: user.company.code,
  });
  const [buyer, setBuyer] = useState({
    compnayName: "",
    nip: "",
    street: "",
    city: "",
    code: "",
  });
  const [items, setItems] = useState([
    {
      itemName: "",
      quantity: 1,
      netPrice: "",
      netValue: 0,
      vat: 23,
      vatSum: 0,
      grossValue: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const handleChangesBasicInfo = (e, name) => {
    const value = e.target.value;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleDatePicker = (value, name) => {
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangesSeller = (e, name) => {
    const value = e.target.value;
    setSeller((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangesBuyer = (e, name) => {
    const value = e.target.value;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        itemName: "",
        quantity: 1,
        netPrice: "",
        netValue: 0,
        vat: 23,
        vatSum: 0,
        grossValue: 0,
      },
    ]);
  };
  const deleteItem = (i) => {
    if (items.length === 1) {
      return;
    }
    const filterItemsToDelet = items.filter((_, index) => {
      return index !== i;
    });
    setItems(filterItemsToDelet);
  };
  const handleChangesItems = (e, i, n) => {
    const value = e.target.value;
    const updatedItem = {
      itemName: n === "itemName" ? value : items[i].itemName,
      quantity: n === "quantity" ? value : items[i].quantity,
      netPrice: n === "netPrice" ? value : items[i].netPrice,
      netValue: items[i].netValue,
      vat: n === "vat" ? value : items[i].vat,
      vatSum: items[i].netValue,
      grossValue: items[i].grossValue,
    };
    const updatedItemDisabled = {
      itemName: updatedItem.itemName,
      quantity: updatedItem.quantity,
      netPrice: updatedItem.netPrice,
      netValue: updatedItem.quantity * updatedItem.netPrice,
      vat: updatedItem.vat,
      vatSum:
        (updatedItem.vat / 100) * updatedItem.quantity * updatedItem.netPrice,
      grossValue:
        (updatedItem.vat / 100) * updatedItem.quantity * updatedItem.netPrice +
        updatedItem.quantity * updatedItem.netPrice,
    };
    const newTabel = items.map((item, index) => {
      if (i === index) {
        return updatedItemDisabled;
      }
      return item;
    });
    setItems(newTabel);
  };
  const totalNetValue = items.reduce((total, curr) => {
    return total + curr.netValue;
  }, 0);
  const totalVatSum = items.reduce((total, curr) => {
    return total + curr.vatSum;
  }, 0);
  const totalGrossValue = items.reduce((total, curr) => {
    return total + curr.grossValue;
  }, 0);
  const saveInvoice = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      const itemsArrForDB = items.map((item) => {
        return {
          itemName: item.itemName,
          quantity: item.quantity ? item.quantity : 1,
          price: item.netPrice ? item.netPrice : 0,
          vat: item.vat,
        };
      });
      try {
        const raw = JSON.stringify({
          invoiceNr: basicInfo.invoiceNr,
          placeOfIssue: basicInfo.placeOfIssue,
          dateOfIssue: new Date(basicInfo.dateOfIssue),
          deadlinePayments: new Date(basicInfo.deadlinePayments),
          paymentMethod: basicInfo.paymentMethod,
          saleDate: new Date(basicInfo.saleDate),
          accountNumber: basicInfo.accountNumber,
          buyer: {
            compnayName: buyer.compnayName,
            nip: buyer.nip,
            street: buyer.street,
            city: buyer.city,
            code: buyer.code,
          },
          seller: {
            compnayName: seller.compnayName,
            nip: seller.nip,
            street: seller.street,
            city: seller.city,
            code: seller.code,
          },
          items: itemsArrForDB,
        });
        const res = await fetch("/api/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
          redirect: "follow",
        });

        const data = await res.json();
        if (data?.message) {
          setOpen(true);
          setMessage(data.message);
        } else {
          setOpen(true);
          setMessage("Successfully created invoice");
          navigate(`/invoice/${data._id}`);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setOpen(true);
        setMessage(error.message);
      }
    }
  };

  return (
    <Card sx={{ marginTop: 3, padding: 3 }} variant="outlined">
      <Typography variant="h5" component="div">
        Create Invoice
      </Typography>
      <Typography variant="body2" marginTop={1}>
        File out form in order to create invoice.
      </Typography>
      <InvoiceForm
        basicInfo={basicInfo}
        seller={seller}
        buyer={buyer}
        items={items}
        saveInvoice={saveInvoice}
        handleChangesBasicInfo={handleChangesBasicInfo}
        handleDatePicker={handleDatePicker}
        handleChangesSeller={handleChangesSeller}
        handleChangesBuyer={handleChangesBuyer}
        handleChangesItems={handleChangesItems}
        deleteItem={deleteItem}
        addItem={addItem}
        totalNetValue={totalNetValue}
        totalVatSum={totalVatSum}
        totalGrossValue={totalGrossValue}
        loading={loading}
      />
    </Card>
  );
};
