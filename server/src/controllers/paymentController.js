import axios from 'axios';
import md5 from 'md5';
import qs from 'qs'

const generateSignature = ({ merchantId, securedKey, basketId, transAmount, currencyCode }) => {
  const rawString = `${merchantId}${basketId}${securedKey}${transAmount}${currencyCode}`;
  const signature = md5(rawString);
  console.log(`Generated Signature: ${signature}`);
  return signature;
};

// Controller to get access token
export const getAccessToken = async (req, res) => {
  try {
    const { merchantId, securedKey, basketId, transAmount, currencyCode } = req.body;

    if (!merchantId || !securedKey || !basketId || !transAmount || !currencyCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const signature = generateSignature({
      merchantId,
      securedKey,
      basketId,
      transAmount,
      currencyCode
    });

    console.log('Sending Request:', {
      MERCHANT_ID: merchantId,
      SECURED_KEY: securedKey,
      BASKET_ID: basketId,
      TXNAMT: transAmount,
      CURRENCY_CODE: currencyCode,
    });

    //  Post request as x-www-form-urlencoded
    const response = await axios.post(
      'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken',
      qs.stringify({
        MERCHANT_ID: merchantId,
        SECURED_KEY: securedKey,
        BASKET_ID: basketId,
        TXNAMT: transAmount,
        CURRENCY_CODE: currencyCode,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json({
      ACCESS_TOKEN: response.data.ACCESS_TOKEN,
      SIGNATURE: signature,
    });

  } catch (error) {
    console.error('Error fetching token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get token' });
  }
};

// Controller to verify transaction
export const verifyTransaction = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ error: 'Token is required for verification' });
    }
    console.log("token: ",token)

    const response = await axios.post(
      'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetTransactionResult',
      qs.stringify({ TOKEN: token }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error verifying transaction:', error.response?.data || error.message);
    res.status(500).json({ error: 'Verification failed' });
  }
};
