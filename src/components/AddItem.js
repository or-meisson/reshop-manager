import React, { useState } from 'react';
import Button from './Button';
import QRCode from 'qrcode.react';
import { db } from '../firebaseConfig';
import { collection, addDoc,serverTimestamp  } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link, useNavigate  } from 'react-router-dom';
import "./AddItem.css"

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
  const navigator = useNavigate()


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
      const docRef = await addDoc(collection(db, 'items'), {...item,timestamp: serverTimestamp()});
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
    isDone ? (
      <div className="flex flex-col justify-end items-end m-4 gap-3">
        <QRCode
          value={`https://reshop-manager.web.app/item/${item.id}`}
          className=" mx-auto text-center cursor-pointer "
          onClick={() => {
            navigator.clipboard.writeText(`https://reshop-manager.web.app/item/${item.id}`);
          }}
        />
        <Button
          className="bg-mint-green w-full max-w-md mx-auto text-center"
          onClick={() => {
            setItem({
              name: '',
              size: '',
              price: '',
              owner: '',
              phone: '',
              sold: false,
            });
            setIsDone(false);
          }}
        >
          הוספת פריט נוסף
        </Button>
        <Link to="/" className="btn btn-active btn-secondary w-full max-w-md text-center mx-auto">
          {' '}
          חזרה למסך הבית
        </Link>
      </div>
    ) : (
      <div className=" text-right flex flex-col justify-center items-center mx-auto ">
        <h2 className="text-2xl font-heebo mt-2 mb-6">הוספת פריט חדש</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block mb-1 " >תיאור</label>
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 border border-gray-300 rounded">
             {item.size ? item.size : ""} מידה 
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 border border-gray-300 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <div href={null}onClick={() => handleSizeSelect('XXS')}>XXS</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('XS')}>XS</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('S')}>S</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('M')}>M</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('L')}>L</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('XL')}>XL</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('XXL')}>XXL</div>
              </li>
              <li>
                <div href={null}onClick={() => handleSizeSelect('XXXL')}>XXXL</div>
              </li>
              {[...Array(28)].map((_, index) => (
                <li key={index}>
                  <div href={null}onClick={() => handleSizeSelect(25 + index)}>{25 + index}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label className="block mb-1">מחיר</label>
            <input
              type="number"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="price"
              value={item.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-1">שם מוכר/ת</label>
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="owner"
              value={item.owner}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-1">טלפון מוכר/ת</label>
            <input
              type="text"
              className="form-control w-full max-w-md px-2 py-1 border border-gray-300 rounded"
              name="phone"
              value={item.phone}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
          <label className="block mb-1">תמונה</label>
          <input type="file" className="form-control-file w-full max-w-md px-2 py-1 border border-gray-300 rounded" name="picture" onChange={handleChange} accept="image/*" />
        </div> */}
          <div className="form-group form-check flex items-center">
            <input
              type="checkbox"
              className="form-check-input h-4 w-4 border border-gray-300 rounded mr-2"
              name="sold"
              checked={item.sold}
              onChange={handleChange}
            />
            <label className="form-check-label">נמכר</label>
          </div>
          <Button type="submit" className="w-full max-w-md mx-auto text-centers bg-mint-green text-black ">
            הוספת פריט
          </Button>
          <Button
        className="bg-secondary w-full max-w-md mx-auto text-center text-white"
        onClick={()=>navigator("/")}
      >
        חזרה למסך הבית
        </Button>
        </form>
      </div>
    )
  );
};

export default AddItem;
