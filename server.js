
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));


// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


// db.getConnection((err, connection) => {

//     if (err) {
//         console.error("Database connection failed:", err.message);
//     } else {
//         console.log("Connected to MySQL");
//         connection.release();
//     }

// });


// /* =========================
//    REGISTER USER
// ========================= */

// app.post("/register", (req, res) => {

//     const { name, email, phone } = req.body;

//     const sql = `
//         INSERT INTO users (name, email, phone)
//         VALUES (?, ?, ?)
//     `;

//     db.query(sql, [name, email, phone], (err) => {

//         if (err) {
//             console.error(err);
//             return res.status(500).send("Database error");
//         }

//         res.send(`
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Registration Successful</title>

//                 <style>

//                     body {
//                         font-family: Arial, sans-serif;
//                         background: linear-gradient(135deg, #667eea, #764ba2);
//                         height: 100vh;
//                         display: flex;
//                         justify-content: center;
//                         align-items: center;
//                         margin: 0;
//                     }

//                     .success-card {
//                         background: white;
//                         padding: 50px;
//                         border-radius: 20px;
//                         text-align: center;
//                         box-shadow: 0 20px 50px rgba(0,0,0,0.3);
//                         animation: popup 0.6s ease;
//                     }

//                     @keyframes popup {
//                         from {
//                             opacity: 0;
//                             transform: scale(0.7);
//                         }

//                         to {
//                             opacity: 1;
//                             transform: scale(1);
//                         }
//                     }

//                     h1 {
//                         color: #22c55e;
//                     }

//                     a {
//                         display: inline-block;
//                         margin: 10px;
//                         padding: 12px 20px;
//                         text-decoration: none;
//                         color: white;
//                         background: #667eea;
//                         border-radius: 8px;
//                     }

//                     a:hover {
//                         transform: translateY(-3px);
//                     }

//                 </style>

//             </head>

//             <body>

//                 <div class="success-card">

//                     <h1>✓ Registration Successful</h1>

//                     <p><b>Name:</b> ${name}</p>
//                     <p><b>Email:</b> ${email}</p>
//                     <p><b>Phone:</b> ${phone}</p>

//                     <br>

//                     <a href="/">Register Another User</a>

//                     <a href="/users">View All Users</a>

//                 </div>

//             </body>
//             </html>
//         `);

//     });

// });


// /* =========================
//    DISPLAY ALL USERS
// ========================= */

// app.get("/users", (req, res) => {

//     const sql = `
//         SELECT *
//         FROM users
//         ORDER BY id DESC
//     `;

//     db.query(sql, (err, users) => {

//         if (err) {
//             console.error(err);
//             return res.status(500).send("Database error");
//         }

//         let userRows = "";

//         users.forEach((user, index) => {

//             const initial = user.name
//                 ? user.name.charAt(0).toUpperCase()
//                 : "U";

//             userRows += `
//                 <tr style="animation-delay: ${index * 0.1}s">

//                     <td>
//                         <span class="id-badge">
//                             #${user.id}
//                         </span>
//                     </td>

//                     <td>
//                         <div class="user-info">

//                             <div class="avatar">
//                                 ${initial}
//                             </div>

//                             <b>${user.name}</b>

//                         </div>
//                     </td>

//                     <td>${user.email}</td>

//                     <td>${user.phone}</td>

//                     <td>
//                         ${new Date(user.created_at).toLocaleString()}
//                     </td>

//                 </tr>
//             `;

//         });


//         res.send(`

//             <!DOCTYPE html>

//             <html>

//             <head>

//                 <title>Registered Users</title>

//                 <meta name="viewport"
//                       content="width=device-width, initial-scale=1.0">

//                 <style>

//                     * {
//                         box-sizing: border-box;
//                     }

//                     body {
//                         margin: 0;
//                         font-family: Arial, sans-serif;
//                         color: white;

//                         background:
//                             linear-gradient(
//                                 135deg,
//                                 #0f172a,
//                                 #1e293b,
//                                 #312e81
//                             );

//                         min-height: 100vh;
//                     }


//                     .container {
//                         width: 92%;
//                         max-width: 1200px;

//                         margin: auto;

//                         padding: 50px 0;

//                         animation: pageEnter 0.7s ease;
//                     }


//                     @keyframes pageEnter {

//                         from {
//                             opacity: 0;
//                             transform: translateY(30px);
//                         }

//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }

//                     }


//                     .header {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;

//                         margin-bottom: 30px;
//                     }


//                     h1 {
//                         margin-bottom: 5px;
//                     }


//                     .header p {
//                         color: #cbd5e1;
//                     }


//                     .btn {
//                         text-decoration: none;
//                         color: white;

//                         padding: 13px 20px;

//                         border-radius: 10px;

//                         background:
//                             linear-gradient(
//                                 135deg,
//                                 #6366f1,
//                                 #8b5cf6
//                             );

//                         transition: 0.3s;
//                     }


//                     .btn:hover {
//                         transform: translateY(-4px);

//                         box-shadow:
//                             0 10px 25px
//                             rgba(99,102,241,0.5);
//                     }


//                     .stats {
//                         display: flex;
//                         gap: 20px;

//                         margin-bottom: 30px;

//                         flex-wrap: wrap;
//                     }


//                     .stat-card {

//                         background:
//                             rgba(255,255,255,0.1);

//                         backdrop-filter:
//                             blur(15px);

//                         padding: 25px;

//                         border-radius: 15px;

//                         min-width: 200px;

//                         border:
//                             1px solid
//                             rgba(255,255,255,0.15);

//                         animation:
//                             cardEnter 0.8s ease;
//                     }


//                     @keyframes cardEnter {

//                         from {
//                             opacity: 0;
//                             transform: translateY(30px);
//                         }

//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }

//                     }


//                     .stat-card h2 {
//                         color: #a5b4fc;
//                         font-size: 35px;
//                     }


//                     .table-card {

//                         background:
//                             rgba(255,255,255,0.08);

//                         backdrop-filter:
//                             blur(15px);

//                         padding: 10px;

//                         border-radius: 20px;

//                         overflow-x: auto;

//                         box-shadow:
//                             0 20px 50px
//                             rgba(0,0,0,0.3);
//                     }


//                     table {
//                         width: 100%;

//                         border-collapse: collapse;

//                         min-width: 800px;
//                     }


//                     th {
//                         text-align: left;

//                         padding: 20px;

//                         color: #a5b4fc;

//                         border-bottom:
//                             1px solid
//                             rgba(255,255,255,0.1);
//                     }


//                     td {
//                         padding: 18px;

//                         border-bottom:
//                             1px solid
//                             rgba(255,255,255,0.08);
//                     }


//                     tbody tr {

//                         opacity: 0;

//                         animation:
//                             rowEnter 0.6s ease forwards;

//                         transition: 0.3s;
//                     }


//                     tbody tr:hover {

//                         background:
//                             rgba(99,102,241,0.2);

//                         transform:
//                             scale(1.01);
//                     }


//                     @keyframes rowEnter {

//                         from {
//                             opacity: 0;
//                             transform: translateX(-30px);
//                         }

//                         to {
//                             opacity: 1;
//                             transform: translateX(0);
//                         }

//                     }


//                     .user-info {

//                         display: flex;

//                         align-items: center;

//                         gap: 12px;
//                     }


//                     .avatar {

//                         width: 42px;
//                         height: 42px;

//                         border-radius: 50%;

//                         display: flex;

//                         justify-content: center;
//                         align-items: center;

//                         font-weight: bold;

//                         background:
//                             linear-gradient(
//                                 135deg,
//                                 #6366f1,
//                                 #ec4899
//                             );
//                     }


//                     .id-badge {

//                         background:
//                             rgba(99,102,241,0.2);

//                         padding: 7px 12px;

//                         border-radius: 20px;

//                         color: #a5b4fc;
//                     }


//                     .empty {

//                         text-align: center;

//                         padding: 80px;
//                     }


//                     @media(max-width: 600px) {

//                         .header {
//                             flex-direction: column;
//                             align-items: flex-start;
//                             gap: 20px;
//                         }

//                     }

//                 </style>

//             </head>


//             <body>

//                 <div class="container">

//                     <div class="header">

//                         <div>

//                             <h1>Registered Users</h1>

//                             <p>
//                                 View all users registered in MySQL
//                             </p>

//                         </div>

//                         <a href="/" class="btn">
//                             + Add User
//                         </a>

//                     </div>


//                     <div class="stats">

//                         <div class="stat-card">

//                             <p>Total Registered Users</p>

//                             <h2>${users.length}</h2>

//                         </div>

//                     </div>


//                     <div class="table-card">

//                         ${users.length === 0
//                             ? `
//                                 <div class="empty">

//                                     <h2>No Users Found</h2>

//                                     <p>
//                                         Register your first user.
//                                     </p>

//                                 </div>
//                             `
//                             : `
//                                 <table>

//                                     <thead>

//                                         <tr>
//                                             <th>ID</th>
//                                             <th>User</th>
//                                             <th>Email</th>
//                                             <th>Phone</th>
//                                             <th>Registered At</th>
//                                         </tr>

//                                     </thead>

//                                     <tbody>

//                                         ${userRows}

//                                     </tbody>

//                                 </table>
//                             `
//                         }

//                     </div>

//                 </div>

//             </body>

//             </html>

//         `);

//     });

// });


// /* =========================
//    HEALTH CHECK
// ========================= */

// app.get("/health", (req, res) => {
//     res.send("Application is healthy");
// });


// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
/*

docker run -d \
  --name registration-test \
  -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  -e DB_USER=root \
  -e DB_PASSWORD=jagdish \
  -e DB_NAME=registration_db \
  registration-app:v1
*/

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/* =========================
   MYSQL RDS CONNECTION
========================= */

const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

db.getConnection((err, connection) => {

    if (err) {

        console.error(
            "Database connection failed:",
            err.message
        );

    } else {

        console.log("Connected to MySQL RDS");

        connection.release();

    }

});

/* =========================
   EMAIL CONFIGURATION
========================= */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASSWORD

    }

});


/* =========================
   REGISTER STUDENT
========================= */

app.post("/register", (req, res) => {

    const {

        name,
        email,
        phone,
        gender,
        dob,
        course,
        college,
        address,
        city,
        state,
        pincode

    } = req.body;


    const sql = `

        INSERT INTO users
        (
            name,
            email,
            phone,
            gender,
            dob,
            course,
            college,
            address,
            city,
            state,
            pincode
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;


    db.query(

        sql,

        [
            name,
            email,
            phone,
            gender,
            dob,
            course,
            college,
            address,
            city,
            state,
            pincode
        ],

        async (err, result) => {

            if (err) {

                console.error(
                    "Database insert error:",
                    err
                );

                return res
                    .status(500)
                    .send("Database error");

            }


            /* =========================
               REGISTRATION ID
            ========================= */

            const registrationId =
                result.insertId;


            /* =========================
               SEND EMAIL TO REGISTERED
               STUDENT EMAIL
            ========================= */

            let emailSent = false;

            try {

                await transporter.sendMail({

                    from:
                        `"Student Registration System" <${process.env.EMAIL_USER}>`,

                    // IMPORTANT:
                    // Email entered by student
                    to: email,

                    subject:
                        `Registration Successful - ID #${registrationId}`,

                    html: `

                        <!DOCTYPE html>

                        <html>

                        <body style="
                            margin:0;
                            padding:30px;
                            background:#f1f5f9;
                            font-family:Arial,sans-serif;
                        ">

                            <div style="
                                max-width:650px;
                                margin:auto;
                                background:white;
                                border-radius:20px;
                                overflow:hidden;
                                box-shadow:0 10px 30px
                                rgba(0,0,0,0.15);
                            ">

                                <!-- HEADER -->

                                <div style="
                                    padding:35px;
                                    text-align:center;
                                    color:white;
                                    background:
                                    linear-gradient(
                                        135deg,
                                        #4f46e5,
                                        #7c3aed
                                    );
                                ">

                                    <div style="
                                        font-size:50px;
                                    ">
                                        🎓
                                    </div>

                                    <h1>
                                        Registration Successful
                                    </h1>

                                    <p>
                                        Welcome to our
                                        Student Registration System
                                    </p>

                                </div>


                                <!-- CONTENT -->

                                <div style="
                                    padding:35px;
                                ">

                                    <h2 style="
                                        color:#1e293b;
                                    ">
                                        Hello ${name}! 👋
                                    </h2>

                                    <p style="
                                        color:#64748b;
                                        line-height:1.6;
                                    ">
                                        Your student registration
                                        has been completed successfully.
                                        Below are your registration details.
                                    </p>


                                    <!-- REGISTRATION ID -->

                                    <div style="
                                        margin:25px 0;
                                        padding:20px;
                                        text-align:center;
                                        background:#eef2ff;
                                        border-radius:12px;
                                    ">

                                        <p style="
                                            margin:0;
                                            color:#64748b;
                                        ">
                                            Registration ID
                                        </p>

                                        <h2 style="
                                            margin:8px 0;
                                            color:#4f46e5;
                                        ">
                                            #${registrationId}
                                        </h2>

                                    </div>


                                    <!-- DETAILS -->

                                    <table style="
                                        width:100%;
                                        border-collapse:collapse;
                                    ">

                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Name
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${name}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Email
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${email}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Phone
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${phone}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Gender
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${gender || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Date of Birth
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${dob || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Course
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${course || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                College
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${college || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Address
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${address || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                City
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${city || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                State
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${state || "-"}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td style="
                                                padding:10px;
                                                font-weight:bold;
                                            ">
                                                Pincode
                                            </td>

                                            <td style="
                                                padding:10px;
                                            ">
                                                ${pincode || "-"}
                                            </td>
                                        </tr>

                                    </table>


                                    <!-- MESSAGE -->

                                    <div style="
                                        margin-top:30px;
                                        padding:20px;
                                        background:#ecfdf5;
                                        border-radius:12px;
                                        color:#047857;
                                    ">

                                        ✅ Your registration has
                                        been successfully completed.

                                        <br><br>

                                        Please keep your
                                        <b>Registration ID
                                        #${registrationId}</b>
                                        for future reference.

                                    </div>

                                </div>


                                <!-- FOOTER -->

                                <div style="
                                    padding:20px;
                                    text-align:center;
                                    background:#f8fafc;
                                    color:#64748b;
                                    font-size:13px;
                                ">

                                    © 2026 Student Registration System

                                </div>

                            </div>

                        </body>

                        </html>

                    `

                });


                emailSent = true;

                console.log(
                    "Confirmation email sent to:",
                    email
                );


            } catch (emailError) {

                console.error(
                    "Email sending failed:",
                    emailError.message
                );

            }


            /* =========================
               SUCCESS PAGE
            ========================= */

            res.send(`

                <!DOCTYPE html>

                <html>

                <head>

                    <title>
                        Registration Successful
                    </title>

                    <meta
                        name="viewport"
                        content="width=device-width,
                        initial-scale=1.0"
                    >

                    <style>

                        * {
                            box-sizing:border-box;
                        }

                        body {

                            margin:0;

                            min-height:100vh;

                            display:flex;

                            justify-content:center;

                            align-items:center;

                            font-family:Arial,sans-serif;

                            padding:20px;

                            background:
                                linear-gradient(
                                    135deg,
                                    #4f46e5,
                                    #7c3aed,
                                    #ec4899
                                );

                        }


                        .card {

                            width:100%;

                            max-width:650px;

                            background:white;

                            padding:45px;

                            border-radius:25px;

                            text-align:center;

                            box-shadow:
                                0 25px 60px
                                rgba(0,0,0,0.3);

                            animation:
                                popup 0.6s ease;

                        }


                        @keyframes popup {

                            from {
                                opacity:0;
                                transform:scale(0.7);
                            }

                            to {
                                opacity:1;
                                transform:scale(1);
                            }

                        }


                        .success {

                            width:90px;
                            height:90px;

                            margin:auto;

                            border-radius:50%;

                            display:flex;

                            justify-content:center;

                            align-items:center;

                            font-size:45px;

                            background:#dcfce7;

                            color:#16a34a;

                        }


                        h1 {

                            color:#16a34a;

                            margin-top:20px;

                        }


                        .registration-id {

                            margin:25px 0;

                            padding:18px;

                            border-radius:12px;

                            background:#eef2ff;

                            color:#4f46e5;

                            font-size:23px;

                            font-weight:bold;

                        }


                        .details {

                            text-align:left;

                            background:#f8fafc;

                            padding:25px;

                            border-radius:15px;

                            line-height:1.8;

                        }


                        .email-success {

                            margin-top:20px;

                            padding:16px;

                            background:#ecfdf5;

                            color:#047857;

                            border-radius:12px;

                        }


                        .email-failed {

                            margin-top:20px;

                            padding:16px;

                            background:#fff7ed;

                            color:#c2410c;

                            border-radius:12px;

                        }


                        .buttons {

                            margin-top:25px;

                        }


                        a {

                            display:inline-block;

                            margin:5px;

                            padding:13px 20px;

                            border-radius:10px;

                            text-decoration:none;

                            color:white;

                            background:
                                linear-gradient(
                                    135deg,
                                    #667eea,
                                    #764ba2
                                );

                        }


                        a:hover {

                            transform:translateY(-2px);

                        }

                    </style>

                </head>


                <body>

                    <div class="card">

                        <div class="success">
                            ✓
                        </div>


                        <h1>
                            Registration Successful!
                        </h1>


                        <p>
                            Welcome,
                            <b>${name}</b> 🎓
                        </p>


                        <div class="registration-id">

                            Registration ID:
                            #${registrationId}

                        </div>


                        <div class="details">

                            <p>
                                <b>Name:</b>
                                ${name}
                            </p>

                            <p>
                                <b>Email:</b>
                                ${email}
                            </p>

                            <p>
                                <b>Phone:</b>
                                ${phone}
                            </p>

                            <p>
                                <b>Gender:</b>
                                ${gender || "-"}
                            </p>

                            <p>
                                <b>Date of Birth:</b>
                                ${dob || "-"}
                            </p>

                            <p>
                                <b>Course:</b>
                                ${course || "-"}
                            </p>

                            <p>
                                <b>College:</b>
                                ${college || "-"}
                            </p>

                            <p>
                                <b>Address:</b>
                                ${address || "-"}
                            </p>

                            <p>
                                <b>City:</b>
                                ${city || "-"}
                            </p>

                            <p>
                                <b>State:</b>
                                ${state || "-"}
                            </p>

                            <p>
                                <b>Pincode:</b>
                                ${pincode || "-"}
                            </p>

                        </div>


                        ${
                            emailSent

                            ?

                            `
                            <div class="email-success">

                                📧 Confirmation email sent
                                successfully to

                                <b>${email}</b>

                            </div>
                            `

                            :

                            `
                            <div class="email-failed">

                                ⚠️ Registration was successful,
                                but the confirmation email
                                could not be sent.

                                <br>

                                Please check the email
                                configuration.

                            </div>
                            `
                        }


                        <div class="buttons">

                            <a href="/">
                                Register Another Student
                            </a>

                            <a href="/users">
                                View All Students
                            </a>

                        </div>

                    </div>

                </body>

                </html>

            `);

        }

    );

});


/* =========================
   DISPLAY ALL USERS
========================= */

app.get("/users", (req, res) => {

    const sql = `
        SELECT *
        FROM users
        ORDER BY id DESC
    `;


    db.query(sql, (err, users) => {

        if (err) {

            console.error(err);

            return res
                .status(500)
                .send("Database error");

        }


        let userRows = "";


        users.forEach((user) => {

            const initial = user.name
                ? user.name.charAt(0).toUpperCase()
                : "U";


            userRows += `

                <tr>

                    <td>
                        #${user.id}
                    </td>


                    <td>

                        <div class="user">

                            <div class="avatar">
                                ${initial}
                            </div>

                            ${user.name}

                        </div>

                    </td>


                    <td>
                        ${user.email}
                    </td>


                    <td>
                        ${user.phone}
                    </td>


                    <td>
                        ${user.course || "-"}
                    </td>


                    <td>
                        ${user.college || "-"}
                    </td>


                    <td>
                        ${user.city || "-"}
                    </td>


                    <td>
                        ${user.state || "-"}
                    </td>


                    <td>
                        ${
                            user.created_at
                            ? new Date(
                                user.created_at
                              ).toLocaleString()
                            : "-"
                        }
                    </td>

                </tr>

            `;

        });


        res.send(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    Registered Students
                </title>

                <meta
                    name="viewport"
                    content="width=device-width,
                    initial-scale=1.0"
                >

                <style>

                    * {
                        box-sizing:border-box;
                    }


                    body {

                        margin:0;

                        font-family:Arial,sans-serif;

                        color:white;

                        min-height:100vh;

                        background:
                            linear-gradient(
                                135deg,
                                #0f172a,
                                #1e293b,
                                #312e81
                            );

                        padding:40px 20px;

                    }


                    .container {

                        max-width:1500px;

                        margin:auto;

                    }


                    .header {

                        display:flex;

                        justify-content:
                            space-between;

                        align-items:center;

                        margin-bottom:30px;

                    }


                    h1 {

                        margin:0 0 8px;

                    }


                    .header p {

                        color:#cbd5e1;

                    }


                    .btn {

                        padding:13px 20px;

                        color:white;

                        text-decoration:none;

                        border-radius:10px;

                        background:
                            linear-gradient(
                                135deg,
                                #667eea,
                                #764ba2
                            );

                    }


                    .stat {

                        display:inline-block;

                        padding:25px;

                        margin-bottom:25px;

                        border-radius:15px;

                        background:
                            rgba(255,255,255,0.1);

                        backdrop-filter:blur(15px);

                    }


                    .stat h2 {

                        font-size:35px;

                        color:#a5b4fc;

                        margin:10px 0 0;

                    }


                    .table-card {

                        overflow-x:auto;

                        padding:15px;

                        border-radius:20px;

                        background:
                            rgba(255,255,255,0.08);

                        box-shadow:
                            0 20px 50px
                            rgba(0,0,0,0.3);

                    }


                    table {

                        width:100%;

                        min-width:1300px;

                        border-collapse:collapse;

                    }


                    th {

                        padding:18px;

                        text-align:left;

                        color:#a5b4fc;

                        border-bottom:
                            1px solid
                            rgba(255,255,255,0.15);

                    }


                    td {

                        padding:16px;

                        border-bottom:
                            1px solid
                            rgba(255,255,255,0.08);

                    }


                    tr:hover {

                        background:
                            rgba(99,102,241,0.2);

                    }


                    .user {

                        display:flex;

                        align-items:center;

                        gap:10px;

                    }


                    .avatar {

                        width:40px;

                        height:40px;

                        border-radius:50%;

                        display:flex;

                        justify-content:center;

                        align-items:center;

                        font-weight:bold;

                        background:
                            linear-gradient(
                                135deg,
                                #6366f1,
                                #ec4899
                            );

                    }

                </style>

            </head>


            <body>

                <div class="container">


                    <div class="header">

                        <div>

                            <h1>
                                👨‍🎓 Registered Students
                            </h1>

                            <p>
                                Students stored in
                                AWS RDS MySQL
                            </p>

                        </div>


                        <a
                            href="/"
                            class="btn"
                        >
                            + Add Student
                        </a>

                    </div>


                    <div class="stat">

                        <p>
                            Total Students
                        </p>

                        <h2>
                            ${users.length}
                        </h2>

                    </div>


                    <div class="table-card">

                        ${
                            users.length === 0

                            ?

                            `
                            <div style="
                                padding:80px;
                                text-align:center;
                            ">

                                <h2>
                                    No Students Found
                                </h2>

                                <p>
                                    Register the first student.
                                </p>

                            </div>
                            `

                            :

                            `

                            <table>

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Student</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Course</th>

                                        <th>College</th>

                                        <th>City</th>

                                        <th>State</th>

                                        <th>Registered At</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${userRows}

                                </tbody>

                            </table>

                            `

                        }

                    </div>

                </div>

            </body>

            </html>

        `);

    });

});


/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {

    res.send(
        "Application is healthy"
    );

});


/* =========================
   START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});