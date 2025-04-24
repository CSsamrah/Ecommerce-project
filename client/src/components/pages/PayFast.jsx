import React, { useState } from 'react';
import axios from 'axios';

const PayFastForm = () => {
  const [token, setToken] = useState('');
  const [signature, setSignature] = useState('');

  const [formData, setFormData] = useState({
    CURRENCY_CODE: 'PKR',
    MERCHANT_ID: '102',
    MERCHANT_NAME: 'PC Parts Picker',
    BASKET_ID: 'ITEM-AZ13',
    TXNAMT: '150',
    ORDER_DATE: new Date().toISOString(),
    SUCCESS_URL: 'http://localhost:5173/success',
    FAILURE_URL: 'http://localhost:5173/cancel',
    CHECKOUT_URL: 'https://merchant-site-example.com',
    EMAIL_ADDRESS: 'some-email@example.com',
    MOBILE_NO: '03212007013',
    VERSION: 'MERCHANT-CART-0.1',
    TXNDESC: 'Item Purchased from Cart',
    PROCCODE: '00',
    TRAN_TYPE: 'ECOMM_PURCHASE',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getToken = async () => {
    const payload = {
      merchantId: formData.MERCHANT_ID,
      securedKey: 'zWHjBp2AlttNu1sK',
      basketId: formData.BASKET_ID,
      transAmount: formData.TXNAMT,
      currencyCode: formData.CURRENCY_CODE,
    };

    try {
      const res = await axios.post('http://localhost:3000/api/payfast/get-token', payload);
      setToken(res.data.ACCESS_TOKEN);
      setSignature(res.data.SIGNATURE);
      console.log('response from backend:', res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Proceed to Payment</h2>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={getToken}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Generate Access Token
        </button>
      </div>

      <form method="post" action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor={key} style={{ marginBottom: '5px', fontWeight: 'bold' }}>{key.replace(/_/g, ' ')}</label>
              <input
                type="text"
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                readOnly
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="TOKEN" style={{ marginBottom: '5px', fontWeight: 'bold' }}>TOKEN</label>
            <input type="text" name="TOKEN" id="TOKEN" value={token} readOnly style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f1f1f1' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="SIGNATURE" style={{ marginBottom: '5px', fontWeight: 'bold' }}>SIGNATURE</label>
            <input type="text" name="SIGNATURE" id="SIGNATURE" value={signature} readOnly style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f1f1f1' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            type="submit"
            disabled={!token}
            style={{
              padding: '12px 30px',
              backgroundColor: token ? '#28a745' : '#aaa',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: token ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayFastForm;
