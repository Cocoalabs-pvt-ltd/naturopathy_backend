const { default: mongoose } = require("mongoose");
const Campaign = require("../models/Campaign");
const Doctor = require("../models/Doctor");
// create campaign

const create_campaign = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const description = req.body.description;

  const newCampaign = new Campaign({
    _id: mongoose.Types.ObjectId,
    title: title,
    content: content,
    description: description,
  });

  newCampaign
    .save()
    .then((campaign) => {
      res.status(201).json({
        message: "Campaign created",
        result: campaign,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// save the campaign on doctor's doc

const save_campaign_on_doctor_doc = (req, res, next) => {
  const doctorId = req.params.doctorId;
  const campaignId = req.params.campaignId;

  Doctor.findByIdAndUpdate(doctorId)
    .then((doctor) => {
      const newCampaign = doctor.campaigns[0].push(campaignId);

      newCampaign
        .save()
        .then((campaign) => {
          res.status(200).json({
            message: "Campaign saved",
            result: campaign,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  create_campaign,
  save_campaign_on_doctor_doc,
};
