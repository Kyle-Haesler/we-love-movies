const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

// add critics category
const addCriticsCategory = mapProperties({
    critic_id: "critics.critic_id",
  preferred_name: "critics.preferred_name",
  surname: "critics.surname",
  organization_name: "critics.organization_name",
  created_at: "critics.created_at",
  updated_at: "critics.updated_at"
})



function destroy(reviewId){
    return knex("reviews").where({review_id: reviewId}).del()
}

function read(reviewId){
    return knex("reviews").select("*").where({review_id: reviewId}).first()
}

function update(updatedReview){
    return knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id").select("*").update(updatedReview, "*").where({"r.review_id": updatedReview.review_id}).then((createdRecords) => createdRecords[0]).then(addCriticsCategory)
}
function getAllCriticsData(){
    return knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id").select("*").then(addCriticsCategory)
}




module.exports = {
    destroy,
    read,
    update,
    getAllCriticsData
}