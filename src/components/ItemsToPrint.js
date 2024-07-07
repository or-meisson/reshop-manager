import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs,orderBy    } from 'firebase/firestore';
// import { MdDelete } from "react-icons/md";
import dayjs from 'dayjs';
import Button from './Button'
import "./AddItem.css"
import { useNavigate } from 'react-router-dom';



const ItemsToPrint = () => {
    const [items, setItems] = useState([]);
    const [itemsToPrint, setItemsToPrint] = useState({});
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "items"), orderBy('timstamp', 'desc'));
          const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setItems(itemsData);
        } catch (error) {
          console.error('Error fetching items: ', error);
        }
      };
  
      fetchItems();
    }, []);


    const groupedItems = items.reduce((acc, item) => {
        const date = dayjs(item.timestamp.toDate()).format('YYYY-MM-DD');
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {});


      const handleDateCheckboxChange = (date) => {
        const allSelected = groupedItems[date].every(item => itemsToPrint[item.id]);
        const newItemsToPrint = { ...itemsToPrint };
    
        groupedItems[date].forEach(item => {
          if (allSelected) {
            delete newItemsToPrint[item.id];
          } else {
            newItemsToPrint[item.id] = true;
          }
        });
    
        setItemsToPrint(newItemsToPrint);
      };
    
  
    

      const handlePrintClick = () => {
        const selectedItems = items.filter(item => itemsToPrint[item.id]);
        navigate('/print', { state: { items: selectedItems } });
      };
  
    return (
      <div className="container font-heebo mx-auto">
        <h2 className="text-right mb-3 mt-3">פריטים להדפסה</h2>
        <ul className="list-group ">
          {items.map((item, index) =>
         { 
            const currentDate = dayjs(item.timestamp.toDate()).format('YYYY-MM-DD');
            const previousDate = index > 0 ? dayjs(items[index - 1].timestamp.toDate()).format('YYYY-MM-DD') : null;
  
            return (
                <>
                 {currentDate !== previousDate && (

                <li className="list-group-item text-center flex bg-gray-200 ">
                  {dayjs(item.timestamp.toDate()).format('DD/MM/YYYY')}
                  <input
                className="checkbox -mb-1 mx-2"
                type="checkbox"
                checked={groupedItems[currentDate].every(item => itemsToPrint[item.id])}
                onChange={() => handleDateCheckboxChange(currentDate)}
              />
                </li>
              )}
            <li key={item.id} className="list-group-item flex justify-between items-center">
                {/* <MdDelete className=" w-8 h-8 cursor-pointer" onClick={() => handleDelete(item.id)} /> */}
                {/* <button className= "btn btn-danger mr-4 mt-2" onClick={() => handleDelete(item.id)}>Delete</button> */}
                <div className="flex-grow text-right">
              <h5 className="mb-3">{item.name}</h5>
              <p>{item.size} :מידה</p>
              <p>₪{item.price} :מחיר</p>
              <p>מוכר/ת: {item.owner}</p>
              <p>{item.phone} :טלפון </p>
              <p>נמכר: {item.sold ? 'כן' : 'לא'}</p>
              <div className="flex gap-2">
                    <div className="text-right">Add to print:</div>
              <input
              className="checkbox"
              type="checkbox" checked={!!itemsToPrint[item.id]} onChange={() => {
                setItemsToPrint((prevItemsToPrint) => ({ ...prevItemsToPrint, [item.id]: !prevItemsToPrint[item.id] }));
              }} />
              </div>

            </div>
            </li>
            </>

          )})}
        </ul>
        <Button
        className="bg-mint-green w-full max-w-md mx-auto text-center flex justify-center mt-3 mb-3"
        onClick={handlePrintClick}
      >
       להדפסת הפריטים המסומנים
      </Button>
        {/* <button className="btn btn-primary mt-4" onClick={handlePrintClick}></button> */}
      </div>
    );
  };
  
export default ItemsToPrint;
