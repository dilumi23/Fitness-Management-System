const express = require("express");
const cors = require("cors");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { json } = require("express");
let Notices = require("../../models/Notices");

router.use(cors());


router.get("/", async (req, res) => {
  Notices.find()
  .then((notices) => res.json(notices))
  .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/",async (req, res) => {
    var data=req.body;
    try {
      let Notice = new Notices({

        NoticeTitle:data.NoticeTitle,
        NoticeDescriprion:data.NoticeDescriprion,
        Date:data.Date
  
      });
      await Notice.save();
      res.json(Notice);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  Notices.find()
  .then((notices) => res.json(notices))
  .catch((err) => res.status(400).json("Error: " + err));
});


router.get("/:id", async (req, res) => {
  let id = req.params.id;
  Notices.findById(id)
  .then((notice) => res.json(notice))
  .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id",async (req, res) => {
    var data=req.body;
      try {
        let notice = {
          NoticeTitle:data.NoticeTitle,
          NoticeDescriprion:data.NoticeDescriprion,
          Date:data.Date
    
        };
        let id = req.params.id;
        await Notices.findByIdAndUpdate({_id: id},notice);
        res.json(notice);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    
   
  }
);

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  Notices.findByIdAndDelete(id)
  .then((notice) => res.json(notice))
  .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;