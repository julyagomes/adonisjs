import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Viagems from 'App/Models/Viagem'
import ViagemsValidator from 'App/Validators/ViagemValidator'


export default class ViagemsController {

    public async index({ }: HttpContextContract) {
        const topic = await Viagems.all()
        return topic
    }

    public async store({ request }: HttpContextContract) {
    const data = await request.validate(ViagemsValidator)
    const topic = await Viagems.create({...data })
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
        const { lugar, valor, nome } = await request.validate(ViagemsValidator)
        try {
            const topic = await Viagems.findOrFail(params.id)
            topic.lugar = lugar
            topic.valor = valor
            topic.nome = nome
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