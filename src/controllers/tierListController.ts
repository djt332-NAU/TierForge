import { Request, Response } from 'express';
import TierListService from '../services/tierListService'; // Ensure correct import

class TierListController {
    private tierListService: TierListService;

    constructor(tierListService: TierListService) {
        this.tierListService = tierListService;
    }

    public async createTierList(req: Request, res: Response): Promise<void> {
        try {
            const tierListData = req.body;
            const newTierList = await this.tierListService.createTierList(tierListData);
            res.status(201).json(newTierList);
        } catch (error) {
            res.status(500).json({ message: 'Error creating tier list', error });
        }
    }

    public async getTierLists(req: Request, res: Response): Promise<void> {
        try {
            const tierLists = await this.tierListService.getAll();
            res.status(200).json(tierLists);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tier lists', error });
        }
    }

    public async updateTierList(req: Request, res: Response): Promise<void> {
        try {
            const tierListId = parseInt(req.params.id, 10);
            const tierListData = req.body;
            const updatedTierList = await this.tierListService.updateTierList(tierListId, tierListData);
            if (updatedTierList) {
                res.status(200).json(updatedTierList);
            } else {
                res.status(404).json({ message: 'Tier list not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating tier list', error });
        }
    }

    public async deleteTierList(req: Request, res: Response): Promise<void> {
        try {
            const tierListId = parseInt(req.params.id, 10);
            const deleted = await this.tierListService.deleteTierList(tierListId);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Tier list not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting tier list', error });
        }
    }
}

export default TierListController;