# وثيقة المتطلبات - نظام ATM مع لوحة إدارية (MVP)

## نظرة عامة

- **المشروع**: Backend لنظام ATM يدعم عمليات أساسية ولوحة إدارية.
- **النطاق**: MVP لـ 100 مستخدم، اختبار بـ Postman (بدون frontend كامل).
- **التاريخ**: November 03, 2025.

## المستخدمون

- **مستخدم ATM**: يحتاج رقم حساب + PIN (4 أرقام).
- **إداري**: صلاحيات عبر JWT للوحة الإدارة.

## وظائف ATM (User)

- تسجيل دخول بـ PIN (يعيد JWT token).
- استعلام رصيد (GET /account/balance).
- سحب: مبلغ ≤ 1000، تحقق رصيد (POST /account/withdraw).
- إيداع: إضافة مبلغ (POST /account/deposit).
- تغيير PIN (POST /account/change-pin، يتطلب PIN قديم).

## وظائف إدارية (Admin)

- إدارة حسابات: CRUD (GET/POST/PUT/DELETE /admin/users).
- سجل معاملات: عرض مع فلترة (GET /admin/transactions).
- إدارة حدود: تعديل حد السحب (PUT /admin/limits).
- تقارير: إجمالي معاملات/رصيد (GET /admin/reports).

## القيود

- 100 مستخدم كحد أقصى.
- عملة واحدة (افتراضي: دولار).
- لا تكامل خارجي (مثل بنوك حقيقية).

## التقنيات

- Server: Node.js + Express.
- Database: MongoDB + Mongoose.
- أمان: JWT (توثيق)، bcrypt (هاش PIN).
- أخرى: dotenv (.env)، cors، helmet.
- إشعارات: Nodemailer لإرسال emails عند تغيير الرصيد.

## User Stories

| Story | وصف | أولوية |
|-------|------|--------|
| As a user, I want to login with PIN so I can access my account. | POST /auth/login | عالية |
| As a user, I want to check balance so I can see my funds. | GET /account/balance | عالية |
| As a user, I want to withdraw money so I can get cash. | POST /account/withdraw | عالية |
| As an admin, I want to view transactions so I can monitor activity. | GET /admin/transactions | عالية |

## المخاطر وإدارتها

- **أمان (Injection)**: استخدم Mongoose validation.
- **أخطاء رصيد**: MongoDB transactions للمعاملات الذرية.
- **أداء**: Indexing على accountNumber و timestamp.

## الأهداف الأسبوعية

- أسبوع 1: Auth + ATM functions.
- أسبوع 2: Admin + Tests + Deploy.