import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { SECRET } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor() { }

  encrypt(plainText: string) {
    const key = CryptoJS.enc.Utf8.parse(SECRET);
    const iv = CryptoJS.enc.Utf8.parse(SECRET);
    const val = CryptoJS.enc.Utf8.parse(plainText.toString());
    const encryptedText = CryptoJS.AES.encrypt(val, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encryptedText.toString();
  }

  decrypt(cipherText: string) {
    const key = CryptoJS.enc.Utf8.parse(SECRET);
    const iv = CryptoJS.enc.Utf8.parse(SECRET);
    const decryptedText = CryptoJS.AES.decrypt(cipherText, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decryptedText.toString(CryptoJS.enc.Utf8);
  }
}
