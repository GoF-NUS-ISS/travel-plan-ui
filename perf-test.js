import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '1m',
  vus: 20,
};

export default function () {
  const res = http.get('https://travel-plan-manager.com/user/login');
  sleep(1);
}
