# Excuze Backend
Backend for the Excuze site

## Install
```
npm install
```

## Running
create a `.env` file in the root of the backend. This file contains the application's secrets.
```.env
BACKEND_SECRET=changeme         # Password used to sign JWT tokens
PRINT_MODE=pdf                  # 'print' or 'pdf'
PRINTER_NAME=Ticket_Printer     # The network printer name, only used when PRINT_MODE=print
```

```
npm run
```

**Default login**
- username: admin
- password: admin123

### Development server
```
npm run dev
```
