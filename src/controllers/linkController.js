import Link from "../models/Link.js";

export async function getLink(req,res,next){
    try {
        const links = await Link.find({user: req.user._id}).sort({createdAt: -1});
        return res.status(200).json({links});;
    } catch (error) {
        next(error);
    }
}

export async function createLink(req,res,next){
    try {
        const {name,url} = req.body;
        const link = await Link.create({user:req.user._id,name,url});
        return res.status(200).json({message:"Link created successfully",link});
    } catch (error) {
        next(error);
    }
}

export async function deleteLink(req,res,next){
    try {
        const {id} = req.params;
        //only delete if link belongs to user
        //prevent deletion of other users' links
        const link = await Link.findOneAndDelete({_id:id,user:req.user_id});
        if(!link){
            return res.status(404).json({message:"Link is not found"});
        }
    } catch (error) {
        next(error);
    }
}

export async function updateLink(req,res,next){
    try {
        const {id} = req.params;
        const {name,url} = req.body;
        const link = await Link.findOneAndUpdate({
            _id:id,
            user:req.user_id,
        },
        {name,url},
        {new:true}
    );
    if(!link){
        return res.status(404).json({message:"Link is not found"});
    }
    return res.status(200).json({message:"Link updated successfully",link});
    } catch (error) {
        next(error);
    }
}