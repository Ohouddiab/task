const { query } = require('@feathersjs/express');
const { Service } = require('feathers-mongoose');
const { Query } = require('mongoose');
const { param } = require('../../app');
const DAY_MS = 24 * 60 * 60 * 1000;

exports.TopVisitedClients = class TopVisitedClients extends Service {
    async find(params) {
let to=params.query.to;
let from =params.query.from;
let result  = await super.Model.aggregate(
[
    {
      $match: {
        company_namespace: ["demosv"],
        time: { $gte: Number(from), $lte: Number(to) },
      },
    },
    {
      $group: {
        _id: { user: "$user", client: "$client" },
        count: { $sum: 1 },
        client_name: { $last: "$client_name" },
        user_name: { $last: "$user_name" },
      },
    },
    { $sort: { "_id.user": 1, count: -1 } },
    {
       $group: {
        _id: { _id: "$_id.user", name: "$user_name" },
        clients: {
          $push: {
            _id: "$_id.client",
            count: "$count",
            name: "$client_name",
          },
        },
      },
    },
    {
      $project: {
        _id: false,
        rep: "$_id",
        clients: { $slice: ["$clients", 3] },
      },
    }, 
  ]);

  return result;
    }
}
