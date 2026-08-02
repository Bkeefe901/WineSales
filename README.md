# Wine Sales Backend

A REST API for tracking wine sales — user accounts, sale records, and
AI-assisted invoice parsing. Built with Express and MongoDB.

## Tech Stack

- **Runtime:** Node.js + Express 5
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (`jsonwebtoken`) + bcrypt password hashing
- **Validation:** express-validator
- **File uploads:** multer (in-memory, for invoice PDFs)
- **AI:** Anthropic SDK (Claude Haiku 4.5) for extracting structured data
  from invoice PDFs

## Getting Started

### Prerequisites

- Node.js
- A MongoDB connection string (local or Atlas)
- An Anthropic API key (only needed for the invoice-parsing endpoint)

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=3001
mongoURI=<your MongoDB connection string>
jwtSecret=<any long random string>
```


### Run

```bash
npm run dev    # nodemon, auto-restarts on changes
npm start      # plain node
```

The server starts on `PORT` (default `3001`) and connects to MongoDB on boot.

## Project Structure

```
├── server.mjs            # App entry point — middleware & route wiring
├── db/
│   └── conn.mjs          # Mongoose connection
├── models/
│   ├── userSchema.mjs
│   └── saleSchema.mjs
├── controllers/
│   ├── userController.mjs
│   ├── saleController.mjs
│   └── invoiceController.mjs
├── routes/
│   ├── authRoutes.mjs
│   ├── userRoutes.mjs
│   ├── saleRoutes.mjs
│   └── invoiceRoutes.mjs
└── middleware/
    ├── basicAuth.mjs      # JWT verification
    └── middleware.mjs     # Request logging + global error handler
```

## Authentication

Protected routes require a JWT in the `x-auth-token` header. Tokens are
issued on register/login and expire after 6 hours.

```
x-auth-token: <token>
```

## API Reference

### User

| Method | Route          | Access  | Description   |
| ------ | -------------- | ------- | ------------- |
| POST   | `/api/user`    | Public  | Register a new user |

### Auth

| Method | Route          | Access  | Description   |
| ------ | -------------- | ------- | ------------- |
| POST   | `/api/auth`    | Public  | Log in, returns a JWT |
| GET    | `/api/auth`    | Private | Get the logged-in user's profile |

### Sales

| Method | Route                  | Access  | Description   |
| ------ | ----------------------- | ------- | ------------- |
| POST   | `/api/sale`             | Private | Create a new sale |
| GET    | `/api/sale/user/:id`    | Private | Get all sales for a user |
| PUT    | `/api/sale/:id`         | Private | Update a sale |
| DELETE | `/api/sale/:id`         | Private | Delete a sale |

### Invoice

| Method | Route               | Access  | Description   |
| ------ | -------------------- | ------- | ------------- |
| POST   | `/api/invoice/parse` | Private | Upload a PDF (`multipart/form-data`, field `pdf`), extracts matching invoices via Claude and returns `[{ invoiceId, saleDate, shopName, total }]` |

The invoice endpoint accepts an optional `initials` field in the request
body (defaults to `"TK"`) — only pages whose PO Number matches those
initials are extracted.


