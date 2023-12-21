const express = require("express");
const cors = require("cors");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { json } = require("express");

router.use(cors());

//@route  GET api/profile/me
//@desc   Get current users profile
//@access Private
//to protect auth add as the second parameter
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", [
      "firstName",
      "lastName",
      "gender",
      "email",
      "mobileNo",
      "profImage",
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST api/profile
//@desc   Create or Update a User Profile (Select a gym package package)
//@access Private


router.post(
  "/",

  [auth, [check("package", "package is required").not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors });
    }

    //subscription Date
    //load cuurent time
    var currentDate = new Date();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var subscriptionDate =
      year +
      "-" +
      (month + 1) +
      "-" +
      date +
      "-" +
      hours +
      "-" +
      minutes +
      "-" +
      seconds;

    const { package, packagePeriod, verify } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (package) profileFields.package = package;
    if (packagePeriod) profileFields.packagePeriod = packagePeriod;
    if (verify == "yes") {
      if (subscriptionDate) profileFields.subscriptionDate = subscriptionDate;
    } else {
      if (subscriptionDate) profileFields.subscriptionDate = null;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //UPDATE
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile); //return the profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  POST api/profile/verifygympayment/:profileid
//@desc   Update a User Profile (verify a gym package package by admin)
//@access Private


router.post("/verifygympayment/:profileid", async (req, res) => {
  //subscription Date
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var subscriptionDate =
    year +
    "-" +
    (month + 1) +
    "-" +
    date +
    "-" +
    hours +
    "-" +
    minutes +
    "-" +
    seconds;

  const { verify } = req.body;

  //build profile object
  const profileFields = {};

  if (verify == "yes") {
    if (subscriptionDate) profileFields.subscriptionDate = subscriptionDate;
  } else {
    if (subscriptionDate) profileFields.subscriptionDate = null;
  }

  try {
    let profile = await Profile.findById(req.params.profileid);

    if (profile) {
      //UPDATE
      profile = await Profile.findOneAndUpdate(
        { _id: req.params.profileid },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile); //return the profile
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// //@route  GET  api/profile
// //@desc  GET All Profile
// //@access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
      "gender",
      "email",
      "mobileNo",
      "profImage",
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// //@route  GET  api/profile/user/:user_id
// //@desc  GET  Profile by user id
// //@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.user_id).populate(
      "user",
      ["firstName", "lastName", "gender", "email", "mobileNo", "profImage"]
    );

    if (!profile) return res.status(400).json({ msg: "Profile Not Found" });
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE api/profile
//@desc  Delete profile,user & posts
//@access Private
//@author Dilumi

router.delete("/", auth, async (req, res) => {
  try {
    //todo - remove users posts
    //Remove Profile

    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    //await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Profile Deleted" });
    //res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  PUT  api/profile/addmeallist
//@desc  Add daily meallist
//@access private
//@author Dilumi

router.put(
  "/addmeallist",
  [
    auth,

    [
      check("mealName", "mealName is required").not().isEmpty(),
      check("calories", "calories is required").not().isEmpty(),
      check("proteins", "proteins  is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mealName, calories, proteins, fat, date } = req.body;

    const newMealList = {
      mealName,
      calories,
      proteins,
      fat,
      date,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.dailymeallist.unshift(newMealList);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE  api/profile/dailymeallist/:dailymeal_id
//@desc  delete profile daily meal item
//@access private
//@author Dilumi

router.delete("/dailymeallist/:dailymeal_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //GET remove index

    const removeIndex = profile.dailymeallist
      .map((item) => item.id)
      .indexOf(req.params.dailymeal_id);

    profile.dailymeallist.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST  api/profile/addcurrentweightheight
//@desc  Add Current Weight Height
//@access private
//@author Dilumi

router.post(
  "/addcurrentweightheight",
  [
    auth,

    [
      check("weight", "mealName is required").not().isEmpty(),
      check("height", "height is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id }).then(
        (weightheight) => {
          (weightheight.currentWeight = req.body.weight),
            (weightheight.currentHeight = req.body.height),
            weightheight
              .save()
              .then(() => res.json(profile))
              .catch((error) => res.status(400).json("Error :" + error));
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  POST  api/profile/assigninstructor
//@desc  Assign instructor
//@access private
//@author Dilumi

router.post("/assigninstructor", async (req, res) => {
  try {
    console.log(req.body.userid);
    const profile = await Profile.findById(req.body.userid).then(
      (assigninstructor) => {
        (assigninstructor.instructor = req.body.instructorid),
          assigninstructor
            .save()
            .then(() => res.json(profile), console.log("Success"))
            .catch((error) => res.status(400).json("Error :" + error));
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  PUT  api/profile/addmeallist
//@desc  Add daily meallist
//@access private
//@author Dilumi

router.put(
  "/addcompletedexerciselist",
  [
    auth,

    [
      check("weight", "mealName is required").not().isEmpty(),
      check("height", "calories is required").not().isEmpty(),
      check("exercise", "proteins  is required").not().isEmpty(),
      check("time", "proteins  is required").not().isEmpty(),
      check("calories", "proteins  is required").not().isEmpty(),
      check("date", "proteins  is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { weight, height, exercise, time, calories, date } = req.body;

    const newCompletedExerciseList = {
      weight,
      height,
      exercise,
      time,
      calories,
      date,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.completedWorkoutList.unshift(newCompletedExerciseList);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE  api/profile/dailyexerciselist/:dailyexercise_id
//@desc  Add profile completed Workout
//@access private
//@author Dilumi

router.delete(
  "/dailyexerciselist/:dailyexercise_id",
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //GET remove index

      const removeIndex = profile.completedWorkoutList
        .map((item) => item.id)
        .indexOf(req.params.dailyexercise_id);

      profile.completedWorkoutList.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE  api/profile/dailymeallist/:dailymeal_id
//@desc  delete profile daily meal item
//@access private
//@author Dilumi

router.delete("/workoutplan/:userid/:workoutid", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userid);

    //GET remove index

    const removeIndex = profile.workoutplan
      .map((item) => item.id)
      .indexOf(req.params.workoutid);

    profile.workoutplan.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE  api/profile/dailymeallist/:dailymeal_id
//@desc  delete profile daily meal item
//@access private
//@author Dilumi

router.delete("/mealplan/:userid/:mealid", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userid);

    //GET remove index

    const removeIndex = profile.mealplan
      .map((item) => item.id)
      .indexOf(req.params.mealid);

    profile.mealplan.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST  api/profile/updateweightheight
//@desc  update profile current weight and height
//@access private
//@author Dilumi

router.post("/updateweightheight", auth, async (req, res) => {
  Profile.findOneAndUpdate({ user: req.user.id })
    .then((profile) => {
      profile.currentHeight = req.body.currentHeight;
      profile.currentWeight = req.body.currentWeight;

      profile
        .save()
        .then(() => res.json("Profile Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  POST  api/profile/unassigninstructor
//@desc  unassign instructor
//@access private
//@author Dilumi

router.post("/unassigninstructor", auth, async (req, res) => {
  Profile.findOneAndUpdate({ user: req.user.id })
    .then((profile) => {
      profile.instructor = req.body.instructor;

      profile
        .save()
        .then(() => res.json("Profile Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
