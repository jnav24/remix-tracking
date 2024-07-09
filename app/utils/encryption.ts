import CryptoJS from 'crypto-js';
import { getEnv } from '~/utils/env';

const key = getEnv('HASH_KEY');
const secret = getEnv('ENCRYPT_SECRET');

export function decryptAES(encryption: string) {
    const bytes = CryptoJS.AES.decrypt(encryption, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptWithAES(value: string) {
    return CryptoJS.AES.encrypt(value, secret).toString();
}

export function hashWithSha256(message: string) {
    return CryptoJS.SHA256(`${message}|${key}`).toString();
}

export function hashHmac256(message: string) {
    return CryptoJS.HmacSHA256(message, key).toString();
}
