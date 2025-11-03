# atm-system-mvp
MVP for an ATM system with an admin dashboard using Node.js, Express, and MongoDB. Supports core operations like balance inquiry, withdrawal (max 1000 units), deposit, and PIN change, with JWT-based authentication and transaction logging

## User Stories Diagram

<image-card alt="User Stories" src="diagrams/user-stories-diagram.png" ></image-card>

## Database Design (ER Diagram)

<image-card alt="ER Diagram" src="diagrams/er-diagram.png" ></image-card>

- Users: حسابات مع رصيد ودور.
- Transactions: سجل المعاملات مرتبط بـ User.


## Updated ER Diagram (with Email Notifications)

<image-card alt="ER with Email" src="diagrams/er-diagram-with-email.png" ></image-card>


## API Flow Diagram

<image-card alt="API Flow" src="diagrams/api-flow-diagram.png" ></image-card>

- RESTful endpoints مع JWT protection.
- Email notifications on balance changes.