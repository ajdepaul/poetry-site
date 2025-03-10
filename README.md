# Poetry Site

![Preview Image](/readme/admin-page.png)

(not yet live)  
[poetrysite.com](https://example.com)  
[Write Up](https://example.com)

A simple website to publish a list of poems sorted first by date and then by an assigned precedence value. Admin
authentication is provided through [Auth.js](https://authjs.dev/) and [Kinde](https://kinde.com/). Admins can create,
read, update, and delete poems stored on a [PostgreSQL](https://www.postgresql.org/) database. Poem content supports
[Markdown](https://en.wikipedia.org/wiki/Markdown).

Dev: `npm run dev`

Update oss attribution: `npx oss-attribution-generator generate-attribution`

Environment Variables:
- PostgresSQL DB
  - `DATABASE_URL`
- Auth.js
  - `AUTH_SECRET`: random value generated by `npx auth secret`
- Kinde
  - `AUTH_KINDE_ID`
  - `AUTH_KINDE_SECRET`
  - `AUTH_KINDE_ISSUER`

Deploy:
``` sh
npm install
npx prisma generate
npx oss-attribution-generator generate-attribution
npm run build
npm run start
```
