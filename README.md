# ATM System MVP

MVP for an ATM system with an admin dashboard using Node.js, Express, and MongoDB. Supports core operations like balance inquiry, withdrawal (max 1000 units), deposit, and PIN change, with JWT-based authentication and transaction logging.

## User Stories Diagram

![User Stories](diagrams/user-stories-diagram.png)

## Database Design (ER Diagram)

![ER Diagram](diagrams/er-diagram.png)

- Users: حسابات مع رصيد ودور.
- Transactions: سجل المعاملات مرتبط بـ User.

## Updated ER Diagram (with Email Notifications)

![ER with Email](diagrams/er-diagram-with-email.png)

## API Flow Diagram

![API Flow](diagrams/api-flow-diagram.png)

- RESTful endpoints مع JWT protection.
- Email notifications on balance changes.

## Sequence Diagram: Withdrawal Flow (with Email)

![Sequence Withdraw](diagrams/sequence-withdraw-diagram.png)

- يشمل تحقق JWT، DB transaction، وإرسال email.