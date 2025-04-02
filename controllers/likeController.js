const Like = require("../models/Like");
const Journal=require("../models/TravelJournal");
const User = require("../models/User");

exports.likeJournal = async (req, res) => {
    try {
        const { user_id, journal_id } = req.body;

        if (!user_id || !journal_id) {
            return res.status(400).json({ error: "user_id and journal_id are required" });
        }

        // Check if the like already exists
        const existingLike = await Like.findOne({ where: { user_id, journal_id } });
        if (existingLike) {
            return res.status(400).json({ error: "You already liked this journal" });
        }

        // Create a new like
        const like = await Like.create({ user_id, journal_id });
        res.status(201).json({ message: "Journal liked successfully", like });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.unlikeJournal = async (req, res) => {
    try {
        const { user_id, journal_id } = req.body; // Read from body

        if (!user_id || !journal_id) {
            return res.status(400).json({ error: "user_id and journal_id are required" });
        }

        const like = await Like.findOne({ where: { user_id, journal_id } });
        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }

        await Like.destroy({ where: { user_id, journal_id } });
        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLikedUsers=async(req,res)=>{
    try{
        const {id}=req.params
        const likedrecords=await Like.findAll({
            where:{
                journal_id:id
            }
        })
        const likedids=likedrecords.map(record=>record.user_id)
        const users=await User.findAll({
            where:{
                id:likedids
            }
        })
        res.status(200).json(users)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getLikeCount=async(req,res)=>{
    try{
        const {id}=req.params
        const likedrecords=await Like.count({
            where:{
                journal_id:id
            }
        })
        res.status(200).json(likedrecords)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getLinkedJournals=async(req,res)=>{
    try{
        const {id}=req.params
        const likedrecords=await Like.findAll({
            where:{
                user_id:id
            }
        })
        const likedids=likedrecords.map(record=>record.journal_id)
        const likedjournals=await Journal.findAll({
            where:{
                id:likedids
            }
        })
        res.status(200).json(likedjournals)
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
}
