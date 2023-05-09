import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "teogreg@gmail.com", // Your email where you'll receive emails
      from: "crow@yescrow.io", // your website email address here
      subject: `A request to escrow ${req.body.amount} to ${req.body.accounts}`,
      html: `<div>Here is their message to you: "${req.body.message}"</div>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;