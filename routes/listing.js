const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.array("listing[image]", 3),
    validateListing,
    wrapAsync(listingController.createListing)
  ); // (CREATE AKA NEW)

//new
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //Show
  .put(
    isLoggedIn,
    isOwner,
    upload.array("listing[image]", 3),
    validateListing,
    wrapAsync(listingController.editListing) //Edit
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); //Delete

//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,

  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
