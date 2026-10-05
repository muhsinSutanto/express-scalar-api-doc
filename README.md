# Express Scalar API

REST API Express dengan dokumentasi interaktif [Scalar](https://scalar.com/products/api-references/integrations/express).

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000/docs](http://localhost:3000/docs).

| URL | Fungsi |
| --- | --- |
| `/` | Dialihkan ke dokumentasi |
| `/docs` | UI Scalar (bisa dicoba langsung dari browser) |
| `/openapi.json` | Spesifikasi OpenAPI 3.1 |

Port bisa diubah dengan variabel `PORT`.

## Endpoint

- `GET /health`
- `GET /users?q=`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

Data pengguna disimpan di memori dan kembali ke data awal setiap server dijalankan ulang. Spesifikasi ada di `src/openapi.js`; implementasi route ada di `src/routes`.
