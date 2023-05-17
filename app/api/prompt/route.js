import { connectToDatabase } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
    try {
        await connectToDatabase()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        console.log('GETprompt: ' + err)
        return new Response('Failed to fetch prompts', { status: 500 })
    }
}
