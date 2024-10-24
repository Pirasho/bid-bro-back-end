import asyncHandler from "express-async-handler";
import md5 from "crypto-js/md5.js"

// Dynamically import crypto-js
const payHereHash = asyncHandler(async (req, res) => {
    const { amount, orderId } = req.body;
    
    // Dynamically load md5 from crypto-js
    // const md5 = (await import("crypto-js/md5")).default;

    let merchantSecret  = "MjkyNTQ3NTgwNDE3ODUwMjI5MTMxNDU2NDI1NDI0MzQzMTc0MzgzOQ==";
    let merchantId      = 1227920;
    let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    let amountFormatted  = parseFloat(amount).toFixed(2);
    let currency        = 'LKR';
    let hash            = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();

    res.send(hash);
});

export { payHereHash };
