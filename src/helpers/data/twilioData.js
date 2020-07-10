import axios from 'axios';
import apiKeys from '../apiKeys.json';

const twilioBaseUrl = apiKeys.twilioApi.baseUrl;

const sendSMS = (smsNum, message) => axios({
  method: 'post',
  url: `${twilioBaseUrl}/sms`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    sendNumbers: smsNum,
    message,
  },
});

// const sendMultipleSMS = (smsNum, message) => smsNum.forEach((num) => {
//   console.log('num', num);
//   // sendSMS(num, message);
// });

export default { sendSMS };
