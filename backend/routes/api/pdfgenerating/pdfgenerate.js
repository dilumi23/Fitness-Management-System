const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");


//path localhost:5000/api/pdfgenerate/generateuserrequests
// @desc generate pdf

router.post("/generateinstructorlist", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const InstructorList = req.body.instructorList;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=instructorlist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Instructor Information.", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: ["Name", "Date Of Birth", "Gender", "Phone", "Email"],
    rows: [],
  };

  for (const insList of InstructorList) {
    table.rows.push([
      insList.name,
      insList.dob,
      insList.gender,
      insList.phone,
      insList.email,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateworkoutplan
// @desc generate pdf

router.post("/generatemealschedule", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const mealList = req.body.DailyMealList;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=mealschedule.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Meal Schedule Information.", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: ["Date", "Meal Name", "Calories", "Proteins", "Fat"],
    rows: [],
  };

  for (const meal of mealList) {
    table.rows.push([
      meal.date,
      meal.mealName,
      meal.calories,
      meal.proteins,
      meal.fat,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateworkoutplan
// @desc generate pdf

router.post("/generateworkoutplan", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // Load the exericise

  const ExerciseList = req.body.completedExerciseList;
  //  Create The PDF document

  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const mealList = req.body.DailyMealList;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=workoutschedule_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Workout Schedule Information.", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: [
      "Date",
      "Weight",
      "Height",
      "Exercise",
      "Duration",
      "Burned Calories",
    ],
    rows: [],
  };

  for (const exercise of ExerciseList) {
    table.rows.push([
      exercise.date,
      exercise.weight,
      exercise.height,
      exercise.exercise,
      exercise.time,
      exercise.calories,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateusergymtime
// @desc generate pdf

router.post("/generateusergymtime", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const gymTime = req.body.gymTime;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=gymusertimelist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Gym User Information.", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: ["Date", "In Time", "Out Time"],
    rows: [],
  };

  for (const insList of gymTime) {
    table.rows.push([insList.date, insList.inTime, insList.outTime]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateinventorylist
// @desc generate pdf

router.post("/generateinventorylist", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const inventory = req.body.inventory;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=inventorylist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Inventory Information.", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: [
      "id",
      "serialNum",
      "ItemType",
      "ItemBrand",
      "ManufacturelDate",
      "PurchasedDate",
      "Warranty",
      "ServiceDate",
    ],
    rows: [],
  };

  for (const insList of inventory) {
    table.rows.push([
      insList._id,
      insList.serialNum,
      insList.ItemType,
      insList.ItemBrand,
      insList.ManufacturelDate,
      insList.PurchasedDate,
      insList.Warranty,
      insList.ServiceDate,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateinventorylist
// @desc generate pdf

router.post("/generatfeedbacks", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const feedbacks = req.body.feedbacks;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=feedbacklist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Feedback Report", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();


  const table = {
    headers: [
      "Feedback ID",
      "Gym Appearance",
      "Quality of Activities",
      " Quality Of Staff",
      " Overall Satisfaction",
    ],
    rows: [],
  };

  for (const insList of feedbacks) {
    table.rows.push([
      insList._id,
      insList.GymAppearance,
      insList.ActivitiesQuality,
      insList.QualityOfStaff,
      insList.Overall,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generatecompletedorderlist
// @desc generate pdf

router.post("/generatecompletedorderlist", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const orders = req.body.orders;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=completedorderhistory_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Completed Order Report", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: [
      "Order ID",
      "Order Date",
      "Order Completed Date",
      "Items",
      "Amount",
      "Name",
      "Email",
      "Address",
      "PaymentStatus",
    ],
    rows: [],
  };

  for (const insList of orders) {
    if (insList.paymentStatus == "completed") {
      table.rows.push([
        insList.OrderID,
        insList.createdAt,
        insList.updatedAt,
        insList.items,
        insList.amount,
        insList.firstName + " " + insList.lastName,
        insList.email,
        insList.address,
        insList.paymentStatus,
      ]);
    }
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generatecompletedorderlist
// @desc generate pdf

router.post("/generateuserrequestlist", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const userRequestList = req.body.userRequestList;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=userrequestlist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("User Request List Report", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: ["User Name", "Weight", "Height", "Gender", "Requirement"],
    rows: [],
  };

  for (const insList of userRequestList) {
    table.rows.push([
      insList.userName,
      insList.weight,
      insList.height,
      insList.gender,
      insList.requirement,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});


//path localhost:5000/api/pdfgenerate/generateincompletedgymorderlist
// @desc generate pdf

router.post("/generateincompletedgymorderlist", async (req, res) => {
  //load cuurent time
  var currentDate = new Date();

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var timestamp =
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

  // // Load the exericise

  const userGymPackageVerifyRequest = req.body.userGymPackageVerifyRequest;
  // // Create The PDF document

  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=incompleteorderlist_${timestamp}.pdf`,
      })
      .end(pdfData);
  });

  //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  myDoc
    .fillColor("#444444")
    .fontSize(20)
    .text("Gym Package Order List Report", 110, 57)
    .fontSize(10)
    .text("Fitness Club", 200, 50, { align: "right" })
    .text("291/B,Galle Road", 200, 65, { align: "right" })
    .text("Moratuwa", 200, 80, { align: "right" })
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: ["User Name", "Package", "Peroid", "Subscription Date"],
    rows: [],
  };

  for (const insList of userGymPackageVerifyRequest) {
    table.rows.push([
      insList.user.firstName + " " + insList.user.lastName,
      insList.package,
      insList.packagePeriod,
      insList.subscriptionDate,
    ]);
  }

  // Draw the table
  myDoc.moveDown().table(table, 10, 125, { width: 590 });
  myDoc.end();

  //res.json("Generated Success");
});

module.exports = router;
