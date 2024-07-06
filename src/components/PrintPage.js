import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Button from './Button'
import { Link, useNavigate  } from 'react-router-dom';



const PrintPage = () => {
  const location = useLocation();
  const { items } = location.state;
  const navigate= useNavigate()


  return (
    <div className="container font-heebo">
      <h2 className="text-center mb-3 mt-3">פריטים להדפסה</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="p-4 border border-gray-200">
            <p className="text-center mb-2">{item.size} :מידה</p>
            <p className="text-center mb-2">₪{item.price} :מחיר</p>
            <QRCode
              value={`http://localhost:3000/item/${item.id}`}
              className="mx-auto cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`http://localhost:3000/item/${item.id}`);
              }}
            />
          </div>
        ))}
      </div >



      <div className="flex flex-col items-center space-y-4">
      <Button
        className="bg-mint-green w-full max-w-md mx-auto text-center mt-3"
        onClick={() => window.print()}
      >
        להדפסה
      </Button>
      <Button
        className="bg-secondary w-full max-w-md mx-auto text-center text-white"
        onClick={()=>navigate("/")}
      >
        חזרה למסך הבית
        </Button>
      
      
    </div>
      {/* <div className="flex justify-center">
        <Button className="bg-mint-green w-full max-w-md text-center mt-3 text-black" onClick={() => window.print()}>
          להדפסה
        </Button>

        
      </div> */}

    </div>
  );
};

export default PrintPage;
