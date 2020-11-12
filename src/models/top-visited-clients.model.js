// top-visited-clients-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get("mongooseClient");
  const mongoose = require("mongoose");
  const { Schema } = mongooseClient;
  var ObjectId = mongoose.Schema.Types.ObjectId;
  const GeoTag = new mongoose.Schema({
    lat: Number,
    lng: Number,
    formatted_address: String,
    extra: {},
  });
  const noteItem = new Schema(
    {
      admin_name: String,
      note: String,
      admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      time: Number,
    },
    { _id: false }
  );
  const reviewed = new Schema(
    {
      admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },
      time: Number,
    },
    { _id: false }
  );
  const VisitSchema = new mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      start_geo_tag: {
        type: GeoTag,
        default: { lat: 0, lng: 0, formatted_address: "" },
      },
      end_geo_tag: {
        type: GeoTag,
        default: { lat: 0, lng: 0, formatted_address: "" },
      },
      route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sv.routes",
        required: false,
      },
      time: Number,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Representative" },
      tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
      client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      client_name: String,
      client_location_verified: Boolean,
      user_name: String,
      visit_id: { type: String, unique: true },
      sync_id: String,
      start_time: { type: Number, default: 0 },
      end_time: { type: Number, default: 0 },
      total_time: { type: Number, default: 0 },
      journey_id: {
        type: Schema.Types.ObjectId,
        ref: "Journey",
        default: null,
      },
      platform: String,
      version_name: String,
      battery_level: Number,
      type: { type: String, default: "visit" },
      activity_id: { type: mongoose.Schema.Types.ObjectId },
      notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
      photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
      tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
      forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "FormResult" }],
      sales_orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder" },
      ],
      cash_orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cashorder" }],
      returns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Returns" }],
      payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
      audits: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuditResult" }],
      team: { type: Schema.Types.ObjectId, ref: "Team", default: null },
      network_state: Number,
      reviewed_by: [reviewed],
      admin_notes: [noteItem],
      client_geo_location: {
        type: Object,
        default: null,
        lat: Number,
        lng: Number,
      },
      closed_by_system: { type: Boolean, required: false },
      availability: [],

      company_namespace: {
        type: [],
        required: true,
        validate: {
          validator: (array) => array.length > 0,
          message: "{VALUE} must has at least one name_space",
        },
      },
    },
    { strict: false, timestamps: true, collection: "visits" }
  );

  //);
  //const representatives = mongooseClient.model("representatives", repSchema);

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model("visits");
  } catch (e) {
    return mongooseClient.model("visits", VisitSchema);
  }
};

