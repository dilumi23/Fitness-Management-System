const express = require("express");
const fileUpload = require("express-fileupload"); //image uploading
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const path = require("path"); //for image seting path
const dirPath = path.join(
  __dirname,
  "../../../frontend/fitness-club/public/uploads/users"
); //for image seting path

const app = express();
const cors = require("cors");
router.use(cors());

app.use(fileUpload()); //for image uploading

//@route GET api/userprofile/me
//@desc Get current users profile
//@access Private


router.get("/", auth, async (req, res) => {
  try {
    const userprofile = await User.findOne({ _id: req.user.id }).then(
      "firstName",
      "lastName",
      "email",
      "mobileNo",
      "address",
      "gender",
      "password",
      "password2"
    );

    if (!userprofile) {
      return res
        .status(400)
        .json({ msg: "There is no profile details for this user" });
    }

    res.json(userprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/userprofile
//@desc  update user profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("firstName", "Frst name is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userName,
      firstName,
      lastName,
      email,
      mobileNo,
      address,
      gender,
      password,
      password2,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (userName) profileFields.userName = userName;
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (email) profileFields.email = email;
    if (address) profileFields.address = address;
    if (mobileNo) profileFields.mobileNo = mobileNo;
    if (gender) profileFields.gender = gender;
    if (password) profileFields.password = password;
    if (password2) profileFields.password2 = password2;

    try {
      let profile = User.findOne({ _id: req.user.id });

      if (profile) {
        //update

        profile = await User.findByIdAndUpdate(
          { _id: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      res.send("Hello");
      //create

      profile = new User(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route POST api/userprofile/user/:user_id
//@desc Get profile by user ID
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await userprofile
      .findOne({
        user: req.params.user_id,
      })
      .populate("user", ["name"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Proflie not found" });
    }
    res.status(500).send("server Error");
  }
});
//@route DELETE api/userprofile
//@desc Delete profile & users
//@access Private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove profile

    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {}
});

//@route  POST api/changeprofilepic/
//@desc   Add profile pic into the database
//@access Private
//to protect auth add as the second parameter
router.patch("/updateimage/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    //if there is no image
    if (req.body.imageURL == null) {
      User.findByIdAndUpdate(req.params.id)
        .then((profile) => {
          profile.profImage =
            "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg";

          profile
            .save()
            .then(() => res.json("profile updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
    //if there is a image
    else {
      User.findByIdAndUpdate(req.params.id)
        .then((profile) => {
          profile.profImage = req.body.imageURL;

          profile
            .save()
            .then(() => res.json("profImage updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
