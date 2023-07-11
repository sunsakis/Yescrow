import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const admin = "escrow@yescrow.io";

export default async function sendEmail(req, res) {
    const { sender, receiver } = req.body;
    const msg = {
      to: admin,
      from: admin,
      subject: `Deposit Request`,
      html: `<div>Sender: ${sender}</div><div>Receiver: ${receiver}</div>`,
    };
    await sendgrid.send(msg);
    res.json({success: true});
    }

//     await sendgrid.sendMultiple({
//       to: admin,
//       from: admin,
//       subject: `HI`,
//       html: `<div>HI</div>`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(error.statusCode || 500).json({ error: error.message });
//   }
// }

// async function sendEmail(req, res) {
//   try {
//     console.log("REQ.BODY", req.body);
    
//     await sendgrid.sendMultiple({
//       to: admin,
//       from: admin,
//       subject: `Escrowed ${req.body.amount} ${req.body.ticker} to ${req.body.receiver}`,
//       html: `<div>Your escrow ID number is <i>${BigNumber.from(req.body.escrowID)}</i>.<br>
//             Type it in to <a href='https://yescrow.io/release'>release the escrow</a>.<br/><br/>
//             txAddress: <a href="https://etherscan.io/tx/${req.body.txHash}">${req.body.txHash}</a>.<br/><br/>
//             Yours Truly, <br/>
//             The Yes Crow`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(error.statusCode || 500).json({ error: error.message });
//   }

//   return res.status(200).json({ error: "" });
// }

// export default sendEmail;