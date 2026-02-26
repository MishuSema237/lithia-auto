import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this agent.'],
    },
    role: {
        type: String,
        required: [true, 'Please provide a role for this agent.'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL or upload an image.'],
    },
    cloudinaryId: {
        type: String,
    },
    phone: {
        type: String,
    },
}, { timestamps: true });

if (mongoose.models.Agent) {
    delete mongoose.models.Agent;
}

export default mongoose.model('Agent', agentSchema);
