const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0dqb3ZKMVVyQ1JzRmJSNjd6eERkb2hORFhnbEx5VVNHSXBPMVZLYURHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0pqMmlBTlVnVFdRNmZTSFpGOG12K2FmU0NBempmL29QS2JDNDhHd0psYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS1NhaUZSUnBTYjBibG9EVUVTam1UeERxYnBRcjUySFRLN2hRNGRLUmtRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOMUJzN1c4Uk83T1VHWmF1MTZOcE9wMm96dSs1L0MvY0JVa1lUNFdpZEIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdEQjZ0Y05KeXphMGw2aEVwQnpwdk54a05nTzhEWEtydkh3UDB2dXhjRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVWVHR0aDhMY1hpeWhFNS9qdkIvMFVNU1dHSjBEKzBGSzMyckJRSFUwMFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUtvNTZyUjV6b0ZHUWtYZzNDVmJmQVY5WHFZd0tTZ1RzUVc3LzVZWC9Icz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVTE2ekNWRkRoTWxTZDd5VEs2d1BSMkYxcTNFRVNHbU9YY1NETGJPTzkwVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh2cGN4dXdlbWV6bXRmd2NFVXBhSlI1QnJCVnV6RThGdmlXMktWaDRLVW02UHI5MzNiVlluNWppL0s5VjhNWklXMHIvUm94QnlTNXdjYWpGR29ZR2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJ5WnNyWFRaYVk1RE9BTStUZ2ZiOEFhdmVYUkFBb3ZvMG1JM25yOEQ1enZNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc3ODMzMTA2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxMjQ5MkE2NTYyNjg5OEFFNDAxQ0MzNjI4NkYwQkQyRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM0OTg3NjY2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3NzgzMzEwNjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREI2NUJCRDhFMEI3QTE4MjVFRUE3NzY5MURGMDZCNTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDk4NzY2N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRE9fSDBCeTNRSFNVSE5Lekd0Wl9MdyIsInBob25lSWQiOiJiNDI1OWRiNS1kOGE4LTQyNWYtYTNjOC1kZmViN2E2ZTVhOTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXM3elpIbDZEN2c3THlxYUhZU29VdWNZd2VjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZnV1NsaC9ubFhnUlpqZmtwNGZIMnQ4QjROcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI5TDlEVFJBSyIsIm1lIjp7ImlkIjoiMjYzNzc4MzMxMDY4OjE0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkV4IEJveWZyaWVuZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmYvcVowQ0VJR2ZwN3NHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYVhIUGFabzFNV0JoOVNWeTZRcjNMbHROc2s2dFNhRFdLRS9TbEQ3ZUF5QT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMXB4NDY2NjlWSmdwdFRYYmtoc1Z3cnZRcnU1VTRoU2Q3YzN6ZExBM1B5VU5UZkp1UHgrMVZTK0xoT3MvQW9BTFZsWUtNMmFOK2VnQVZ5UVRyYUw4QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IlVoMmVZbWJIZHQwQXhKNDdSQWtGTTgzY1JSSnZFOWE3MzVJeXl1NlpXUzhaR01sS2lHOE1IUlMrYm8vaVllbFZ0cWdIQnZhL0RLTzd5SFhhNm8rRWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc4MzMxMDY4OjE0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldseHoybWFOVEZnWWZVbGN1a0s5eTViVGJKT3JVbWcxaWhQMHBRKzNnTWcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ5ODc2NjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT2JlIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Dulla",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255716945971",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Dulla Md ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcaaa16f7b556d84093f7.jpg,https://telegra.ph/file/de85851cc494331f47b3f.jpg,https://telegra.ph/file/f0f8ef25b35b76be901a7.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
