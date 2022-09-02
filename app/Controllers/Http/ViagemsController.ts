import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Viegems from 'App/Models/Viagems'
import ViagemsValidator from 'App/Validators/ViagemsValidator'
import authConfig from '../../../config/auth'

export default class ViagemsController {

    public async index({ }: HttpContextContract) {
        const topic = await Viagems.query().preload('user').orderBy('id')
        return topic
    }

    public async store({ request }: HttpContextContract) {
    const data = await request.validate(ViagemsValidator)
    const topic = await Viagems.create({...data, userId: authConfig.user?.id })
    return topic
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const topic = await Viagems.findOrFail(params.id)
            return topic
        } catch (error) {
            response.status(400).send("Viagem não encontrada!!!")
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        const { lugar, Viagems } = await request.validate(ViagemsValidator)
        try {
            const topic = await Viagems.findOrFail(params.id)
            topic.lugar = lugar
            await topic.save()
            return topic 

        } catch (error) {
            response.status(400).send("Viagem não encontrada!!!")
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const topic = await Viagems.findOrFail(params.id)
            await topic.delete()
            return topic
        } catch (error) {
            response.status(400).send("Tópico não encontrada!!!")
        }
    }
}