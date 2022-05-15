const express = require('express')
const router = express.Router()
// router.use(express.json())

const Razorpay = require('razorpay')
const instance = new Razorpay({
    key_id:'rzp_test_woj80rKkwTndjo'
    ,
    key_secret:'hizbgrTJtJrgy0uKeEhR5oWa'
})

router.post('/order',(req,res)=>{
    try {
        
        const {amt} = req.body

        const options = {

            amount: amt * 100 ,   // format in paise 
            currency: 'INR',
            // reciept: 'receipt#1',
            payment_capture: 0 

        };

        instance.orders.create(options,
            async function (err, order) {
                if(err){
                     res.status(500).json({
                        message: err
                    });
                }
                else{
                // return
                res.status(200).json(order);
                }
            });

    } catch (error) {
         res.status(500).json({
            message : error
        })   
    }
})

router.post("/capture/:paymentId", (req, res) => {  try { 
    const {amt} = req.body
    return request(     {
    method: "POST",
    url: `https://rzp_test_woj80rKkwTndjo:hizbgrTJtJrgy0uKeEhR5oWa@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
    form: {
       amount: amt * 100, // // Same As Order amount
       currency: "INR",
     },
   },   async function (err, response, body) {
    if (err) {
      res.status(500).json({
        message: err,
      }); 
    }      console.log("Status:", response.statusCode);
     console.log("Headers:", JSON.stringify(response.headers));
     console.log("Response:", body);
      res.status(200).json(body);    });  
    } 
    catch (err) {
    res.status(500).json({
     message: err,
  });
  }});

  module.exports = router