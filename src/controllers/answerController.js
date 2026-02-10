import Answer from "../models/Answer.js";

export async function getAnswers(req,res,next){
    try {
        const answers = await Answer.find({user:req.user._id}).sort({createdAt:-1});
        return res.status(200).json({answers});
    } catch (error) {
        next(error);
    }
}

export async function createAnswer(req,res,next){
    try {
        const {title,content} = req.body;
        const answer = await Answer.create({user:req.user._id,title,content});
        return res.status(200).json({message:"Content saved successfully!",answer});
    } catch (error) {
        next(error);
    }
}

export async function updateAnswer(req,res,next){
    try {
        const {id} = req.params;
        const {title,content} = req.body;
        const answer = await Answer.findOneAndUpdate({
            _id:id,
            user:req.user_id,
        },
        {title,content},
        {new:true}
    );
    if(!answer){
        return res.status(404).json({message:"Content is not found"});
    }
    return res.status(200).json({message:"Content updated successfully",answer});
    } catch (error) {
        next(error);
    }
}

export async function deleteAnswer(req,res,next){
    try {
        const {id} = req.params;
        const answer = await Answer.findOneAndDelete({_id:id,user:req.user_id});
        if(!answer){
            return res.status(404).json({message:"Content is not found"});
        }
        return res.status(200).json({message:"Content deleted successfully"});
    } catch (error) {
        next(error);
    }
}