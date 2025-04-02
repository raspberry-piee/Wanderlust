const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// create aka new
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Show
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing you requested for does not exist!!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// create aka new
module.exports.createListing = async (req, res) => {
  let images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  console.log(req.files);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = images;
  await newListing.save();
  req.flash("success", "New listing created!!");
  res.redirect("/listings");
};

// Edit

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  let existingImagesCount = listing.image.length;
  let newImagesCount = req.files ? req.files.length : 0;

  if (existingImagesCount + newImagesCount > 3) {
    req.flash("error", "You cannot have more than 3 images in a listing!");
    return res.redirect(`/listings/${id}/edit`);
  }

  // ✅ Handle new images if uploaded
  if (req.files && req.files.length > 0) {
    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    listing.image.push(...images);
    await listing.save();
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

// Delete
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  console.log(listing);
  req.flash("success", "Listing is deleted!");
  res.redirect("/listings");
};
