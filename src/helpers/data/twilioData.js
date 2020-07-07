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
    sendNumber: smsNum,
    message,
  },
});

const sendMultipleSMS = (smsNum, message) => axios.all(smsNum.map((num) => sendSMS(num, message)))
  .then(axios.spread((...res) => console.log(res)));


// Promise.all(smsNum.map((num) => sendSMS(num, message)))
//   .then((response) => console.log('the response', response));

export default { sendSMS, sendMultipleSMS };
