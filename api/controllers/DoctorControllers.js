const Doctor = require("../models/Doctor");

// View all the doctors

const view_all_doctors = (req, res, next) => {
  Doctor.find()
    .then((docs) => {
      res.status(200).json({
        message: "All doctors",
        doctors: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Filter all the doctor using the keyword
const view_all_filtered_doctors = (req, res, next) => {
  const speciality = req.body.speciality;

  Doctor.find({
    speciality: speciality,
  })
    .then((docs) => {
      res.status(200).json({
        message: "All doctors",
        result: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const view_doctor_by_id = (req, res, next) => {
  const doctorId = req.params.doctorId;

  Doctor.findById(doctorId)
    .then((doc) => {
      res.status(201).json({
        message: "Doctor details",
        result: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// create doctor account

const create_doctor_account = (req, res, next) => {
  const doctorId = req.params.doctorId;
  const doctorName = req.body.doctorName;
  const doctorSpeciality = req.body.doctorSpeciality;
  const doctorEmail = req.body.doctorEmail;
  const doctorPhoneNumber = req.body.doctorPhoneNumber;
  const doctorPassword = req.body.doctorPassword;
  const doctorRegistrationNo = req.body.doctorRegistrationNo;
  const doctorRegistrationYear = req.body.doctorRegistrationYear;
  const doctorLocation = req.body.doctorLocation;
  const doctorQualification = req.body.doctorQualification;
  const doctorCollege = req.body.doctorCollege;
  const doctorPassingYear = req.body.doctorPassingYear;
  const doctorImageUrl = req.body.doctorImageUrl;

  Doctor.findByIdAndUpdate(doctorId)
    .then((doctor) => {
      const doctor_account = new Doctor({
        name: doctorName,
        speciality: doctorSpeciality,
        email: doctorEmail,
        phoneNumber: doctorPhoneNumber,
        password: doctorPassword,
        registrationNo: doctorRegistrationNo,
        registrationYear: doctorRegistrationYear,
        location: doctorLocation,
        qualification: doctorQualification,
        college: doctorCollege,
        passingYear: doctorPassingYear,
        imageUrl: doctorImageUrl,
      });

      doctor_account.save().then((result) => {
        res
          .status(201)
          .json({
            message: "Doctor created Successfully",
            result: result,
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
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

// View all accepted appointments

const view_saved_appointments = (req, res, next) => {
  const doctorId = req.params.doctorId;

  Doctor.findById(doctorId)
    .populate("appointments")
    .then((docs) => {
      res.status(200).json({
        message: "appointments",
        appointments: docs.map((doc) => {
          return {
            _id: doc.id,
            doctorId: doc.doctorId,
            userId: doc.userId,
            appointmentDate: doc.appointmentDate,
            appointmentTime: doc.appointmentTime,
            modeOfAppointment: doc.modeOfAppointment,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// view appointments by id

const view_appointments_by_id = (req, res, next) => {
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;

  Doctor.findById(doctorId)
    .populate({
      path: "appointments",
      populate: "_id",
      model: "User",
    })
    .then((appointment) => {
      if (appointment._id == appointmentId) {
        return res.status(201).json({
          message: "Appointment details",
          result: appointment,
        });
      } else {
        return res.status(404).json({
          message: "Document not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// view all the campaigns
const get_all_campaigns = (req, res, next) => {
  const doctorId = req.params.doctorId;

  Doctor.findById(doctorId)
    .populate("campaigns")
    .then((docs) => {
      res.status(200).json({
        message: "All campaigns",
        result: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            content: doc.content,
            description: doc.description,
            joinedPeople: doc.joinedPeople.length,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// view campaign by id
const get_campaign_by_id = (req, res, next) => {
  const doctorId = req.params.doctorId;
  const campaignId = req.params.campaignId;

  Doctor.findById(doctorId)
    .populate("campaigns")
    .then((campaign) => {
      if (campaign._id == campaignId) {
        return res.status(201).json({
          message: "Campaign details",
          result: campaign,
        });
      } else {
        return res.status(404).json({
          message: "Campaign not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  view_all_doctors,
  view_all_filtered_doctors,
  view_doctor_by_id,
  create_doctor_account,
  get_all_campaigns,
  get_campaign_by_id,
  view_appointments_by_id,
  view_saved_appointments,
};
