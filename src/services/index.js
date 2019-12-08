import axios from 'axios';
import GeneralService from './general';
import ShipsService from './ships';

const generalHttpClient = axios.create({
  baseURL: 'https://falaai-api.azurewebsites.net/',
});

export default {
  general: GeneralService(generalHttpClient),
  ships: ShipsService(generalHttpClient),
};
