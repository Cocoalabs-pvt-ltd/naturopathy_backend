const User = require("../models/User");

/**
 * Function to store user details.
 * Since the user is already created during the signup process we only need to
 * find the user using userId and update the user document
 */

const store_user_details = (req, res, next) => {
  const userId = req.params.userId;

  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateOfBirth;
  const height = req.body.height;
  const weight = req.body.weight;
  const location = req.body.location;
  const haveAllergies = req.body.haveAllergies;
  const allergies = req.body.allergies;
  const takesMedication = req.body.takesMedication;
  const nameOfMedication = req.body.nameOfMedication;
  const hadInjuries = req.body.hadInjuries;
  const hadChronicIllnesses = req.body.hadChronicIllnesses;
  const hadHospitalized = req.body.hadHospitalized;
  const hadSurgeries = req.body.hadSurgeries;
  const surgery = req.body.surgery;
  const familyHealth = req.body.familyHealth;
  const occupation = req.body.occupation;
  const workout = req.body.workout;

  User.findByIdAndUpdate(userId)
    .then((user) => {
      const saveUser = User({
        phoneNumber: phoneNumber,
        gender: gender,
        dateOfBirth: dateOfBirth,
        height: height,
        weight: weight,
        location: location,
        haveAllergies: haveAllergies,
        allergies: allergies,
        takesMedication: takesMedication,
        nameOfMedication: nameOfMedication,
        hadInjuries: hadInjuries,
        hadChronicIllnesses: hadChronicIllnesses,
        hadHospitalized: hadHospitalized,
        hadSurgeries: hadSurgeries,
        surgery: surgery,
        familyHealth: familyHealth,
        occupation: occupation,
        workout: workout,
      });

      saveUser.save();
      res.status(201).json({
        message: "User details saved successfully",
        result: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Function to get the user details

const get_user_details = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      const userDetails = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        height: user.height,
        weight: user.weight,
        location: user.location,
        haveAllergies: user.haveAllergies,
        allergies: user.allergies,
        takesMedication: user.takesMedication,
        nameOfMedication: user.nameOfMedication,
        hadInjuries: user.hadInjuries,
        hadChronicIllnesses: user.hadChronicIllnesses,
        hadHospitalized: user.hadHospitalized,
        hadSurgeries: user.hadSurgeries,
        surgery: user.surgery,
        familyHealth: user.familyHealth,
        occupation: user.occupation,
        workout: user.workout,
      };

      res.status(201).json({
        message: "User retrieved",
        result: userDetails,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Function to get all the appointment details

const get_all_user_appointment_details = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate("appointments")
    .then((docs) => {
      res.status(200).json({
        message: "appointments retrieved",
        appointments: docs.map((doc) => {
          return {
            _id: doc._id,
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

// Function to get the details of an appointment using id

const get_user_appointment_details = (req, res, next) => {
  const userId = req.params.userId;
  const appointmentId = req.params.appointmentId;

  User.findById(userId)
    .populate({
      path: "appointments",
      populate: "_id",
      model: "Doctor",
    })
    .then((appointment) => {
      if (appointment._id == appointmentId) {
        return res.status(200).json({
          message: "Appointment details",
          result: appointment,
        });
      } else {
        return res.status(404).json({
          message: "Appointment details not found",
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

// Function to get all order details

const get_all_order_details = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate({
      path: "orders",
      populate: "product._id",
      model: "Product",
    })
    .then((docs) => {
      res.status(200).json({
        message: "Orders retrieved",
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            address: doc.address,
            quantity: doc.quantity,
            totalPrice: doc.totalPrice,
            products: doc.products,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Function to get the details of an order using the order Id

const get_order_details = (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.params.userId;

  User.findById(userId)
    .populate({
      path: "orders",
      populate: "product._id",
      model: "Product",
    })
    .then((order) => {
      if (order._id == orderId) {
        return res.status(200).json({
          message: "Order details",
          order: order,
        });
      } else {
        return res.status(404).json({
          message: "Order details not found",
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

// Function to get all the joined campaigns

const get_all_joined_campaigns = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate("joinedCampaigns")
    .then((docs) => {
      res.status(201).json({
        message: "All joined campaigns",
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

// Function to get one joined campaign using id
const get_joined_campaign_details = (req, res, next) => {
  const userId = req.params.userId;
  const joinedCampaignId = req.params.joinedCampaignId;

  User.findById(userId)
    .populate("joinedCampaigns")
    .then((joinedCampaign) => {
      if (joinedCampaign._id == joinedCampaignId) {
        return res.status(201).json({
          message: "Campaign details",
          result: joinedCampaign,
        });
      } else {
        return res.status(404).json({
          message: "Campaign not found",
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

module.exports = {
  get_user_details,
  store_user_details,
  get_all_user_appointment_details,
  get_user_appointment_details,
  get_all_order_details,
  get_order_details,
  get_all_joined_campaigns,
  get_joined_campaign_details,
};
