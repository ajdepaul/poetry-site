# Poetry Site

![Preview Image](/readme/admin-page.png)

(not yet live)  
[poetrysite.com](https://example.com)  
[Write Up](https://example.com)

A simple website to publish a list of poems sorted first by date and then by an assigned precedence value. Admin
authentication is provided through [Kinde](https://kinde.com/). Admins can create, read, update, and delete poems stored
on a [PostgreSQL](https://www.postgresql.org/) database. Poem content supports
[Markdown](https://en.wikipedia.org/wiki/Markdown).

Dev: `npm run dev`

Update oss attribution: `npx oss-attribution-generator generate-attribution`

Environment Variables:
- PostgresSQL DB
  - `DATABASE_URL`
- Kinde Auth
  - `KINDE_CLIENT_ID`
  - `KINDE_CLIENT_SECRET`
  - `KINDE_ISSUER_URL`
  - `KINDE_SITE_URL`
  - `KINDE_POST_LOGOUT_REDIRECT_URL`
  - `KINDE_POST_LOGIN_REDIRECT_URL`

Deploy:
``` sh
npm install
npx oss-attribution-generator generate-attribution
npm run build
npm run start
```
