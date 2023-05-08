// ==============nodemailer - send OTP to email=================
const nodemailer = require("nodemailer");
const { NOREPLY_EMAIL_PASSWORD } = require("../env")

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "noreply@theweekdays.live",
        pass: NOREPLY_EMAIL_PASSWORD,
    },
    tls: {
        ciphers: "SSLv3",
    },
});

// Email objects
const FROM = "The Weekdays <noreply@theweekdays.live>";
const WELCOME_SUBJECT = "Welcome to The Weekdays";
const NEW_ADMIN_CREATED_SUBJECT = "[The Weekdays] New admin created";

// Send welcome email
function sendEmailConfirmCreateAdmin(email, username) {
    const mailOptions = {
        from: FROM,
        to: ['noreply@theweekdays.live', email],
        subject: NEW_ADMIN_CREATED_SUBJECT,
        text: 'This is email for new admin registration at Fashion Website - The Weekdays',
        html: welcomeEmail(username)
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Send email welcome new customer
function sendEmailWelcomeCustomer(email, username) {
    const mailOptions = {
        from: FROM,
        to: email,
        subject: WELCOME_SUBJECT,
        text: 'This is email for new customer registration at Fashion Website - The Weekdays',
        html: welcomeEmail(username)
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
    });
}

function welcomeEmail(username) {
    return `<!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    
    <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css" /><!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:700px) {
    
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .fullMobileWidth,
                .image_block img.big,
                .row-content {
                    width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
    
                .reverse {
                    display: table;
                    width: 100%;
                }
    
                .reverse .column.first {
                    display: table-footer-group !important;
                }
    
                .reverse .column.last {
                    display: table-header-group !important;
                }
    
                .row-12 td.column.first .border {
                    padding: 20px 30px 30px;
                    border-top: 0;
                    border-right: 0px;
                    border-bottom: 0;
                    border-left: 0;
                }
    
                .row-12 td.column.last .border {
                    padding: 25px 30px 30px;
                    border-top: 0;
                    border-right: 0px;
                    border-bottom: 0;
                    border-left: 0;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #f5f5f5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
            <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                            role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="66.66666666666667%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="icons_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: left;">
                                                                    <table align="left" cellpadding="0" cellspacing="0"
                                                                        class="alignment" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td
                                                                                style="vertical-align: middle; text-align: center; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px;">
                                                                                <img align="center" class="icon" height="80"
                                                                                    src="https://i.pinimg.com/564x/4f/03/2e/4f032e57c19780eac680c3ca6e7d2019.jpg"
                                                                                    style="display: block; height: auto; margin: 0 auto; border: 0;"
                                                                                    width="80" /></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <div class="spacer_block block-1"
                                                            style="height:40px;line-height:40px;font-size:1px;"> </div>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 25.5px;">
                                                                                <span class="tinyMce-placeholder"
                                                                                    style="font-size:17px;">${new
            Date().toLocaleDateString('vi-VN')}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0452ee; background-image: url('images/heasder-bg.png'); background-repeat: no-repeat; background-size: cover; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block block-1"
                                                            style="height:70px;line-height:70px;font-size:1px;"> </div>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:30px;padding-top:30px;text-align:center;width:100%;">
                                                                    <h1
                                                                        style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        Welcome, ${username}!</h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-3"
                                                            style="height:70px;line-height:70px;font-size:1px;"> </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Contacts"
                                                                            class="fullMobileWidth"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/contacts_no-bg.gif"
                                                                            style="display: block; height: auto; border: 0; width: 646px; max-width: 100%;"
                                                                            title="Contacts" width="646" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        <span class="tinyMce-placeholder">We're thrilled to
                                                                            have you on the team.</span></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="20" cellspacing="0"
                                                            class="divider_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="15%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 3px solid #0452EE;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 30px;">
                                                                                <span class="tinyMce-placeholder"
                                                                                    style="font-size:20px;">Here’s some
                                                                                    important information about our company
                                                                                    and your new role.</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #edeff4; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 15px solid #FFFFFF; border-left: 15px solid #FFFFFF; border-right: 15px solid #FFFFFF; border-top: 15px solid #FFFFFF; padding-bottom: 40px; padding-left: 40px; padding-right: 40px; padding-top: 40px; vertical-align: top;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #0452ee; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 39px;">
                                                                                <span style="font-size:26px;"><span
                                                                                        class="tinyMce-placeholder"
                                                                                        style=""><span
                                                                                            class="tinyMce-placeholder"
                                                                                            style="">Start
                                                                                            date</span></span></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span style="font-size:18px;">25 May,
                                                                                    2022</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-3"
                                                            style="height:15px;line-height:15px;font-size:1px;"> </div>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-4" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #0452ee; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 39px;">
                                                                                <span style="font-size:26px;"><span
                                                                                        class="tinyMce-placeholder"
                                                                                        style=""><span
                                                                                            class="tinyMce-placeholder"
                                                                                            style="">Location</span></span></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-5" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span
                                                                                    style="font-size:18px;">Headquarters</span>
                                                                            </p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span style="font-size:18px;">Madison St,
                                                                                    12th, NY</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-6"
                                                            style="height:26px;line-height:26px;font-size:1px;"> </div>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 15px solid #FFFFFF; border-left: 15px solid #FFFFFF; border-right: 15px solid #FFFFFF; border-top: 15px solid #FFFFFF; padding-bottom: 40px; padding-left: 40px; padding-right: 40px; padding-top: 40px; vertical-align: top;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #0452ee; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 39px;">
                                                                                <span style="font-size:26px;"><span
                                                                                        class="tinyMce-placeholder"
                                                                                        style=""><span
                                                                                            class="tinyMce-placeholder"
                                                                                            style="">Must
                                                                                            knows</span></span></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span style="font-size:18px;">- Working
                                                                                    hours</span></p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 21px;">
                                                                                09 AM - 05PM</p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 18px;">
                                                                                 </p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span style="font-size:18px;">-
                                                                                    Parking</span></p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 21px;">
                                                                                Ground Level</p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 18px;">
                                                                                 </p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 27px;">
                                                                                <span style="font-size:18px;">-
                                                                                    Transportation</span></p>
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 21px;">
                                                                                Free Shuttle to the metro station</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-left: 50px; padding-right: 50px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        <strong><span class="tinyMce-placeholder">Teams &
                                                                                Managers</span></strong></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="20" cellspacing="0"
                                                            class="divider_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="15%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 3px solid #0452EE;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #020b22; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span
                                                                                    style="font-size:20px;">Marketing<br />&
                                                                                    Sales</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="15" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Person"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/person2_2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 131px; max-width: 100%;"
                                                                            title="Person" width="131" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #2d2d2d; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;"><span
                                                                                        style="font-size:18px;">Laura
                                                                                        Smith</span><br /><span
                                                                                        style="font-size:13px;color:#8c8c8c;">laura.smith@mail.com</span><br /></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #020b22; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;">Research
                                                                                    &<br />Development</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="15" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Person"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/person1_2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 131px; max-width: 100%;"
                                                                            title="Person" width="131" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #2d2d2d; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;"><span
                                                                                        style="font-size:18px;">Peter
                                                                                        Scott</span><br /><span
                                                                                        style="font-size:13px;color:#8c8c8c;">peter.scott@mail.com</span><br /></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-3"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #020b22; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span
                                                                                    style="font-size:20px;">Customer<br />Success</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="15" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Person"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/person3_2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 131px; max-width: 100%;"
                                                                            title="Person" width="131" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #2d2d2d; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;"><span
                                                                                        style="font-size:18px;">Anne
                                                                                        Trudy</span><br /><span
                                                                                        style="font-size:13px;color:#8c8c8c;">anne.trudy@mail.com</span><br /></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-left: 40px; padding-right: 40px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;">
                                                                        <strong><span class="tinyMce-placeholder">Meeting
                                                                                rooms</span></strong></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-2"
                                                            style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #2d2d2d; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;">
                                                                                <span style="font-size:16px;">Lorem ipsum
                                                                                    dolor sit amet, consectetur adipiscing
                                                                                    elit, sed do eiusmod tempor incididunt
                                                                                    ut labore et dolore magna aliqua. Ut
                                                                                    enim ad minim veniam, quis
                                                                                    nostrud.</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Meeting Room"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/meeting-rooms_no-bg.gif"
                                                                            style="display: block; height: auto; border: 0; width: 340px; max-width: 100%;"
                                                                            title="Meeting Room" width="340" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 50px; padding-right: 50px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        <strong><span
                                                                                class="tinyMce-placeholder">Contacts</span></strong>
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="20" cellspacing="0"
                                                            class="divider_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="15%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 3px solid #0452EE;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 30px;">
                                                                                <span class="tinyMce-placeholder"
                                                                                    style="font-size:20px;">If you need any
                                                                                    assistance, these are the
                                                                                    persons<br />that will help you.</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-left: 15px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="16.666666666666668%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Person"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/person4_2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 89px; max-width: 100%;"
                                                                            title="Person" width="89" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:5px;padding-left:15px;padding-right:15px;padding-top:15px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #0452ee; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; text-align: left; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:20px;">HR</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:5px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #2d2d2d; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;"><span
                                                                                        style="font-size:18px;">Lana
                                                                                        Scott</span><br /><span
                                                                                        style="font-size:13px;color:#8c8c8c;">lana.scott@mail.com<br />Ext.
                                                                                        005</span></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-3"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-left: 15px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="16.666666666666668%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Person"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/person5_2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 89px; max-width: 100%;"
                                                                            title="Person" width="89" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-4"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="33.333333333333336%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:5px;padding-left:15px;padding-right:15px;padding-top:15px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #0452ee; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; text-align: left; mso-line-height-alt: 14.399999999999999px;">
                                                                                <span style="font-size:20px;">Finance</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:5px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #2d2d2d; line-height: 1.2;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:20px;"><span
                                                                                        style="font-size:18px;">John
                                                                                        Williams</span><br /><span
                                                                                        style="font-size:13px;color:#8c8c8c;">john.williams@mail.com<br />Ext.
                                                                                        009</span><br /></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <div class="spacer_block block-1"
                                                            style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img class="big"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/footer-bg.png"
                                                                            style="display: block; height: auto; border: 0; width: 680px; max-width: 100%;"
                                                                            width="680" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fafafa; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr class="reverse">
                                                    <td class="column column-1 first"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-left: 30px; padding-right: 30px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <div class="border">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="heading_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                                        <h3
                                                                            style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                            <strong><span class="tinyMce-placeholder">Any
                                                                                    question?</span></strong></h3>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td class="column column-2 last"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-left: 30px; padding-right: 30px; padding-top: 25px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <div class="border">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="button_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad" style="text-align:center;">
                                                                        <div align="center" class="alignment">
                                                                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:46px;width:183px;v-text-anchor:middle;" arcsize="66%" strokeweight="1.5pt" strokecolor="#0452EE" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#2d2d2d; font-family:Arial, sans-serif; font-size:14px"><![endif]-->
                                                                            <div
                                                                                style="text-decoration:none;display:inline-block;color:#2d2d2d;background-color:transparent;border-radius:30px;width:auto;border-top:2px solid #0452EE;font-weight:400;border-right:2px solid #0452EE;border-bottom:2px solid #0452EE;border-left:2px solid #0452EE;padding-top:5px;padding-bottom:5px;font-family:Poppins, Arial, Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                                                <span
                                                                                    style="padding-left:30px;padding-right:30px;font-size:14px;display:inline-block;letter-spacing:normal;"><span
                                                                                        style="word-break:break-word;"><span
                                                                                            class="tinyMce-placeholder"
                                                                                            data-mce-style=""
                                                                                            style="line-height: 28px;">Send
                                                                                            an email</span></span></span>
                                                                            </div>
                                                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <div class="spacer_block block-2"
                                                                style="height:20px;line-height:20px;font-size:1px;"> </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0452ee; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 25px; padding-top: 25px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:25px;padding-top:15px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        <strong><span class="tinyMce-placeholder">Don’t
                                                                                forget to follow us!</span></strong></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="social_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            class="social-table" role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;"
                                                                            width="108px">
                                                                            <tr>
                                                                                <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.youtube.com/"
                                                                                        target="_blank"><img alt="youtube"
                                                                                            height="32"
                                                                                            src="https://todoist.doist-emails.com/_next/static/images/youtube@2x_385831e3cd7a35a98971a4b9cf04b134.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="youtube"
                                                                                            width="32" /></a></td>
                                                                                <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.instagram.com/"
                                                                                        target="_blank"><img alt="Twitter"
                                                                                            height="32"
                                                                                            src="https://todoist.doist-emails.com/_next/static/images/linkedin@2x_c0f1a7074985df3308f3c6298c65e739.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="instagram"
                                                                                            width="32" /></a></td>
                                                                                <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.linkedin.com/"
                                                                                        target="_blank"><img alt="Linkedin"
                                                                                            height="32"
                                                                                            src="https://todoist.doist-emails.com/_next/static/images/linkedin@2x_c0f1a7074985df3308f3c6298c65e739.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="linkedin"
                                                                                            width="32" /></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="20" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #fafafa; line-height: 1.5;">
                                                                            <p
                                                                                style="margin: 0; font-size: 10px; text-align: center; mso-line-height-alt: 15px;">
                                                                                <span style="font-size:10px;"><span
                                                                                        style="">© 2023
                                                                                        The Weekdays. </span></span><span
                                                                                    style="font-size:10px;"><span style="">
                                                                                        All Rights Reserved.</span></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>`
}

module.exports = { sendEmailConfirmCreateAdmin, sendEmailWelcomeCustomer }