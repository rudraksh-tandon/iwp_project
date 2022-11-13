const Booking = require("../models/Booking");
const express = require("express");
const router = new express.Router();
const { ensureAuthenticated } = require("../auth");
const Train = require("../models/train");
const nodemailer = require("nodemailer");

router.get("/login/train_details", async (req, res) => {
  const take = req.query;
  const day = get(take.date);
  const train = await Train.find({
    start: take.start,
    end: take.end,
    "runsOn.days": day,
  });
  for (var i = 0; i < train.length; i++) {
    var obj = train[i];
    Object.assign(obj, { date: take.date });
  }
  try {
    res.render("booking", {
      train,
    });
  } catch (e) {
    res.render(e);
  }
});

router.post("/login/book", ensureAuthenticated, async (req, res) => {
  console.log("body", req.body);
  const book = new Booking({
    ...req.body,
    owner: req.user._id,
  });
  console.log(book);
  try {
    await book.save();
    const mailOptions = {
      from: `Admin railways_22@outlook.com`,

      to: req.user.email,
      subject: "Booking confirm",
      html: `<p>Your booking is confirmed with booking id <strong>${book._id}</strong> </p>`,
    };
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "railways_22@outlook.com",
        pass: "R@ilways",
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error",
        });
      }
    });
    console.log("Email sent: " + transporter.response);

    res.render("book", {
      book,
    });
  } catch (e) {
    res.send(e);
  }
});

const get = (date) => {
  const dayGet = new Date(date.toString());
  const day = dayGet.getDay();
  if (day === 0) {
    return "Sunday";
  } else if (day === 1) {
    return "Monday";
  } else if (day === 2) {
    return "Tuesday";
  } else if (day === 3) {
    return "Wednesday";
  } else if (day === 4) {
    return "Thursday";
  } else if (day === 5) {
    return "Friday";
  } else if (day === 6) {
    return "Saturday";
  }
};

module.exports = router;

// railways_22@outlook.com
// R@ilways
