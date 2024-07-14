import React, { useState } from 'react';
import Button from './Button';
import QRCode from 'qrcode.react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [item, setItem] = useState({
    name: '',
    size: '',
    price: '',
    owner: '',
    phone: '',
    sold: false,
  });
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setItem((prevItem) => ({
        ...prevItem,
        picture: files[0], // Assuming single file upload
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'items'), { ...item, timestamp: serverTimestamp() });
      setItem((prevItem) => ({ ...prevItem, id: docRef.id }));
      Swal.fire({
        icon: 'success',
        title: 'פריט נוסף בהצלחה',
        showCloseButton: true,
      });
      setIsDone(true);
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'הוספת הפריט נכשלה',
        showCloseButton: true,
      });
    }
  };

  const handleSizeSelect = (size) => {
    setItem((prevItem) => ({
      ...prevItem,
      size: size,
    }));
  };

  return (
    <div className="px-2 font-heebo w-full text-right">
      <div className="flex justify-between max-w-[1000px] mx-auto items-center mb-3 mt-3">
        <Button
          className="bg-secondary text-white mt-3 mb-3"
          onClick={() => navigate("/")}
        >
          חזרה למסך הבית
        </Button>
        <h2 className="text-2xl font-bold mb-0 text-right">הוספת פריט חדש</h2>
      </div>
      <div className="bg-white shadow-md rounded p-6 mb-4 max-w-[1000px] mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group flex items-center">
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
            />
            <label className="block font-semibold text-right flex-grow">:תיאור</label>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 border border-gray-300 rounded">
              {item.size ? item.size : "בחר מידה"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 border border-gray-300 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <div href={null} onClick={() => handleSizeSelect('XXS')}>XXS</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('XS')}>XS</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('S')}>S</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('M')}>M</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('L')}>L</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('XL')}>XL</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('XXL')}>XXL</div>
              </li>
              <li>
                <div href={null} onClick={() => handleSizeSelect('XXXL')}>XXXL</div>
              </li>
              {[...Array(28)].map((_, index) => (
                <li key={index}>
                  <div href={null} onClick={() => handleSizeSelect(25 + index)}>{25 + index}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group flex items-center">
            <input
              type="number"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="price"
              value={item.price}
              onChange={handleChange}
              required
            />
            <label className="block font-semibold text-right flex-grow">:מחיר</label>
          </div>
          <div className="form-group flex items-center">
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="owner"
              value={item.owner}
              onChange={handleChange}
              required
            />
            <label className="  block font-semibold text-right flex-grow">:שם מוכר/ת</label>
          </div>
          <div className="form-group flex items-center">
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="phone"
              value={item.phone}
              onChange={handleChange}
              required
            />
          <label className="block font-semibold text-right flex-grow">:טלפון מוכר/ת</label>
          </div>
          <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="sold"
            className="checkbox  -mb-1 mx-2"
            checked={item.sold}
            onChange={() => setItem({ ...item, sold: !item.sold })}
          />
          <span className="text-right mr-2">{item.sold ? 'כן' : 'לא'}</span>
          <label className="  block font-semibold text-right flex-grow">:נמכר</label>
        </div>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <Button type="submit" className="bg-mint-green w-[30%] text-center" onClick={handleSubmit}>
          הוספת פריט
        </Button>
      </div>
    </div>
  );
};

export default AddItem;
