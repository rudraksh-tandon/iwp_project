const Booking = require('../models/Booking')
const express = require('express')
const router = new express.Router
const { ensureAuthenticated } = require('../auth')
const Train = require('../models/train')
const nodemailer = require('nodemailer')

router.get('/login/train_details', async (req, res) => {
    const take = req.query
    const day = get(take.date)
    const train = await Train.find({ start: take.start, end: take.end, 'runsOn.days': day })
    for (var i = 0; i < train.length; i++) {
        var obj = train[i]
        Object.assign(obj, { date: take.date });
    }
    try {
        res.render('booking', {
            train
        })
    } catch (e) {
        res.render(e)
    }
})

router.post('/login/book', ensureAuthenticated, async (req, res) => {
    console.log(req.user);
    const book = new Booking({
        ...req.body,
        owner: req.user._id
    })
    try {
        await book.save()
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'railways_22@outlook.com', // generated ethereal user
              pass: 'R@ilways', // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: 'Admin', // sender address
            to: req.user.email, // list of receivers
            subject: "Ticket Booked Succedfully!" , // Subject line
            text: `Your booking is generated successfully, booking id: ${book._id}`
          });
          console.log("Message sent: %s", info.messageId);
        res.render('book',{
            book
        })
    } catch (e) {
        res.send(e)
    }
})

const get = (date) => {
    const dayGet = new Date(date.toString());
    const day = dayGet.getDay();
    if (day === 0) {
        return 'Sunday'
    }
    else if (day === 1) {
        return 'Monday'
    }
    else if (day === 2) {
        return 'Tuesday'
    }
    else if (day === 3) {
        return 'Wednesday'
    }
    else if (day === 4) {
        return 'Thursday'
    }
    else if (day === 5) {
        return 'Friday'
    }
    else if (day === 6) {
        return 'Saturday'
    }
}

module.exports = router


// railways_22@outlook.com
// R@ilways