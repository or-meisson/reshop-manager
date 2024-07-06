import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Failed to fetch item');
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'items', id);
      await updateDoc(docRef, item);
      Swal.fire({
        icon: "success",
        title: "Your item has been saved",
        showCloseButton: true,
      });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
      Swal.fire({
        icon: "error",
        title: "Your item has not been saved",
        showCloseButton: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container text-right rtl p-4 font-heebo">
      <h2 className="text-2xl mb-6">עריכת פריט</h2>
      <div className="bg-white shadow-md rounded p-6 mb-4">
        <div className="mb-4">
          <label className="block font-semibold">:תיאור</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">:מידה</label>
          <input
            type="text"
            name="size"
            value={item.size}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">:מחיר</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">:שם מוכר/ת</label>
          <input
            type="text"
            name="owner"
            value={item.owner}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">:טלפון מוכר/ת</label>
          <input
            type="text"
            name="phone"
            value={item.phone}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">:נמכר</label>
          <input
            type="checkbox"
            name="sold"
                            className="checkbox -mb-1 mx-2"
            checked={item.sold}
            onChange={() => setItem({ ...item, sold: !item.sold })}
          />
          <span>{item.sold ? 'כן' : 'לא'}</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Button
          className="bg-mint-green w-full max-w-md mx-auto text-center"
          onClick={handleSave}
        >
          שמירת שינויים
        </Button>
        <Button
          className="bg-secondary w-full max-w-md mx-auto text-center text-white"
          onClick={() => navigate("/")}
        >
          חזרה למסך הבית
        </Button>
      </div>
    </div>
  );
};

export default Item;
