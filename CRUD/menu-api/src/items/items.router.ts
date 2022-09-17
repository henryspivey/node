/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'
import * as ItemService from "./items.service"
import { BaseItem, Item } from './item.interface'

//permissions code
import { checkJwt } from "../middleware/authz.middleware";
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from './item-permission';

/**
 * Router Definition
 */
export const itemsRouter = express.Router()
/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll()
        res.status(200).send(items)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

// GET items/:id


itemsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const item: Item = await ItemService.find(id)
        if (item) {
            return res.status(200).send(item)
        }
        res.status(404).send("item not found")
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

itemsRouter.use(checkJwt);

// POST items

itemsRouter.post('/', checkPermissions(ItemPermission.CreateItems),
    async (req: Request, res: Response) => {
        try {
            const item: BaseItem = req.body
            const newItem = await ItemService.create(item)
            res.status(201).json(newItem)
        } catch (e: any) {
            res.status(500).send(e.message)
        }
    })

// PUT items/:id

itemsRouter.put('/:id', checkPermissions(ItemPermission.UpdateItems), async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    const updateItem: Item = req.body
    try {
        const item: Item = await ItemService.find(id)
        if (item) {
            await ItemService.update(id, updateItem)
            return res.status(200).json(updateItem)
        }
        const newItem = await ItemService.create(updateItem)
        res.status(201).json(newItem)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

// DELETE items/:id


itemsRouter.delete('/:id', checkPermissions(ItemPermission.DeleteItems), async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        await ItemService.remove(id)
        res.status(204).send("item deleted")
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})
