const Follow = require("../models/Follow");
const User=require("../models/User")

exports.followUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Both follower_id and following_id are required" });
        }

        if (follower_id === following_id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const follow = await Follow.create({ follower_id, following_id });
        res.status(201).json(follow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Both follower_id and following_id are required" });
        }

        const deleted = await Follow.destroy({ where: { follower_id, following_id } });

        if (deleted) {
            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            res.status(404).json({ error: "Follow relationship not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFollowingUsers=async(req,res)=>{
    try{
        const {id}= req.params
        const followersrecords=await Follow.findAll({
            where:{
                follower_id:id
            },
        })
        const followingids=followersrecords.map(record=>record.following_id)
        const followingUsers=await User.findAll({
            where:{
                id:followingids
            }
        })
        res.status(200).json(followingUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
}
