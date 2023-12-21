const express = require("express");
const cors = require("cors");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

const { json } = require("express");

router.use(cors());
//@route  POST api/users
//@desc   add time
//@access Public

router.put("/addgymusertime", auth, async (req, res) => {
  const { inTime, outTime, date } = req.body;

  const newUserGymTime = {
    inTime,
    outTime,
    date,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.time.unshift(newUserGymTime);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
