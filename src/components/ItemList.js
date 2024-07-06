import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc,doc    } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Button from './Button'
import { Link, useNavigate  } from 'react-router-dom';






const ItemList = () => {
    const [items, setItems] = useState([]);
  const navigator = useNavigate()

  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "items"));
          const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setItems(itemsData);
        } catch (error) {
          console.error('Error fetching items: ', error);
        }
      };
  
      fetchItems();
    }, []);
  
    const handleDelete = async (itemId) => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          });
    
          if (result.isConfirmed) {
            await deleteDoc(doc(db, 'items', itemId));
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success"
            });
          }
        } catch (error) {
          console.error('Error deleting item: ', error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete the item.",
            icon: "error"
          });
        }
      };
  
    return (
      <div className="container font-heebo">
        <div className="flex justify-between items-center mb-3 mt-3">
        
        <Button
        className="bg-secondary text-white mt-3 mb-3"
        onClick={()=>navigator("/")}
      >
        חזרה למסך הבית
        </Button>
        <h2 className="text-right mb-0">כל הפריטים</h2>
        </div>
        <ul className="list-group ">
          {items.map(item => (
            <li key={item.id} className="list-group-item flex justify-between items-center">
                <div className="flex items-center space-x-4">
              <MdDelete className="text-black w-6 h-6 cursor-pointer" onClick={() => handleDelete(item.id)} />
              <MdEdit className="text-black w-6 h-6 cursor-pointer" onClick={() => navigator(`/item/${item.id}`)} />
              <div className="flex-grow text-right">
                <h5 className="mb-1">{item.name}</h5>
                <p className="text-sm">{item.size} :מידה</p>
                <p className="text-sm">₪{item.price} :מחיר</p>
                <p className="text-sm">מוכר/ת: {item.owner}</p>
                <p className="text-sm">{item.phone} :טלפון </p>
                <p className="text-sm">נמכר: {item.sold ? 'כן' : 'לא'}</p>
              </div>
            </div>
            </li>
          ))}
 
        </ul>

      </div>
    );
  };
  
export default ItemList;
