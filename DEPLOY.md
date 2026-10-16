# Hostinger par deploy karna

Ye project **ek hi Node.js app** ki tarah deploy hota hai: build ke waqt React client
`server/dist` mein ban jata hai, aur Express server wahi se site + `/api` dono chalata hai.
Isliye Hostinger par frontend aur backend alag deploy karne ki zaroorat nahi.

> Zaroori: aapka Hostinger plan **Node.js Web Apps** support kare (Business / Cloud plans).
> Single / Premium shared plan par Node.js nahi chalta. VPS ho to neeche "VPS" section dekho.

## Root folder ki commands

| Command | Kya karta hai |
|---|---|
| `npm run build` | client + server dependencies install karta hai, phir client ko `server/dist` mein build karta hai |
| `npm start` | `node server/index.js` chalata hai (site + API) |

## Option A: GitHub se deploy (recommended)

1. hPanel -> **Websites** -> **Add Website** -> **Node.js Apps** -> **Import Git Repository**.
2. GitHub authorize karo aur repo `shubham2095/New_Max` (branch `main`) chuno.
3. Settings:
   - **Framework**: Express / Other
   - **Node version**: 20 (ya 18+)
   - **Root directory**: `./` (repo ka root)
   - **Build command**: `npm run build`
   - **Start command**: `npm start`
   - **Entry file** poocha jaye to: `server/index.js`
4. **Environment variables** mein ye add karo (ye `.env` ki jagah hain, `.env` GitHub par nahi hai):

   | Name | Value |
   |---|---|
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_USER` | aapka Gmail address |
   | `SMTP_PASS` | Gmail **App Password** (16 characters) |
   | `MAIL_TO` | jahan enquiry email chahiye |

   `PORT` mat set karo, Hostinger khud deta hai.
5. **Deploy** dabao. Baad mein domain ko is app se connect karo (Domains section).
6. Aage ke updates: code GitHub par `git push` karo, Hostinger par **Redeploy** dabao
   (ya auto-deploy on karo).

## Option B: ZIP upload

1. Apne PC par `npm run build` chalao (isse `server/dist` ban jata hai).
2. Ye **zip mein daalo**: `server/` folder (dist ke saath) -- `node_modules` aur `.env` mat daalo.
3. hPanel -> Node.js App -> **Upload your website files**, Node 20 chuno,
   start/entry file `index.js` rakho, aur upar wale environment variables bharo.
4. **NPM install** chalao, phir app start karo.

## VPS (agar Hostinger VPS hai)

```bash
git clone https://github.com/shubham2095/New_Max.git && cd New_Max
npm run build
# server/.env banao (server/.env.example copy karke)
npm i -g pm2
PORT=5000 pm2 start server/index.js --name newmax
pm2 save && pm2 startup
```
Phir Nginx se domain ko `localhost:5000` par proxy karo aur Let's Encrypt SSL lagao.

## Dhyan dene wali baatein

- **Gmail email abhi kaam nahi karega**: local test mein Gmail ne `535 BadCredentials` diya.
  Google Account -> Security -> 2-Step Verification on karo -> **App passwords** se naya
  16-character password banao, aur wahi `SMTP_PASS` mein daalo.
  (Is dauran forms ka data fir bhi `server/data/*.json` mein save hota hai.)
- **Form data redeploy par ud sakta hai**: quote/contact submissions `server/data/` mein
  save hote hain. Naye deploy par ye folder reset ho sakta hai, isliye email hi asli
  record maano ya time-time par us folder ko download karo.
- Naya build chahiye to hamesha `npm run build` (ya Hostinger par Redeploy) chalao,
  `server/dist` GitHub par nahi jata (`.gitignore` mein hai).
- Pehle ke zip files (`New-max-server.zip`) purane build ke hain, unhe deploy mat karna.
