import { encodeBase64 } from "@std/encoding/base64";

/** The PLAINTEXT signature method. */
export const PLAINTEXT = {
  name: "PLAINTEXT",
  sign: (_message: string, key: string): Promise<string> =>
    Promise.resolve(key),
};

/** The HMAC-SHA1 signature method. */
export const HMAC_SHA1 = {
  name: "HMAC-SHA1",

  sign: async (message: string, key: string): Promise<string> => {
    const keyData = new TextEncoder().encode(key || "\0");
    const messageData = new TextEncoder().encode(message);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
    return encodeBase64(signature);
  },

  hash: async (message: string): Promise<string> => {
    const messageData = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", messageData);
    return encodeBase64(hashBuffer);
  },
};

/** The HMAC-SHA256 signature method. */
export const HMAC_SHA256 = {
  name: "HMAC-SHA256",

  sign: async (message: string, key: string): Promise<string> => {
    const keyData = new TextEncoder().encode(key || "\0");
    const messageData = new TextEncoder().encode(message);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
    return encodeBase64(signature);
  },

  hash: async (message: string): Promise<string> => {
    const messageData = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", messageData);
    return encodeBase64(hashBuffer);
  },
};
