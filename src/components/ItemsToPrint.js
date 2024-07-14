import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import dayjs from 'dayjs';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import "./AddItem.css";

const ItemsToPrint = () => {
  const [items, setItems] = useState([]);
  const [itemsToPrint, setItemsToPrint] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"), orderBy('timestamp', 'desc'));
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
    navigator('/print', { state: { items: selectedItems } });
  };

  return (
    <div className="px-2 font-heebo w-full">
      <div className="flex justify-between max-w-[1000px] mx-auto items-center mb-3 mt-3">
        <Button
          className="bg-secondary text-white mt-3 mb-3"
          onClick={() => navigator("/")}
        >
          חזרה למסך הבית
        </Button>
        <h2 className="text-right mb-0">פריטים להדפסה</h2>
      </div>
      <ul className="list-group max-w-[1000px] mx-auto">
        {Object.keys(groupedItems).map(date => (
          <React.Fragment key={date}>
            <li className="list-group-item text-center flex bg-gray-200">
              {dayjs(date).format('DD/MM/YYYY')}
              <input
                className="checkbox -mb-1 mx-2"
                type="checkbox"
                checked={groupedItems[date].every(item => itemsToPrint[item.id])}
                onChange={() => handleDateCheckboxChange(date)}
              />
            </li>
            {groupedItems[date].map(item => (
              <li key={item.id} className="list-group-item flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex-grow text-right">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-sm">{item.size} :מידה</p>
                    <p className="text-sm">₪{item.price} :מחיר</p>
                    <p className="text-sm">מוכר/ת: {item.owner}</p>
                    <p className="text-sm">{item.phone} :טלפון</p>
                    <p className="text-sm">נמכר: {item.sold ? 'כן' : 'לא'}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-right">Add to print:</div>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={!!itemsToPrint[item.id]}
                      onChange={() => {
                        setItemsToPrint(prevItemsToPrint => ({ ...prevItemsToPrint, [item.id]: !prevItemsToPrint[item.id] }));
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <Button
        className="bg-mint-green w-full max-w-md mx-auto text-center flex justify-center mt-3 mb-3"
        onClick={handlePrintClick}
      >
        להדפסת הפריטים המסומנים
      </Button>
    </div>
  );
};

export default ItemsToPrint;
