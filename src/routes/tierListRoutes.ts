import { Router } from 'express';
import TierListController from '../controllers/tierListController';
import TierListService from '../services/tierListService';

const router = Router();
const tierListService = new TierListService();
const tierListController = new TierListController(tierListService);

router.get('/tier-lists', (req, res) => tierListController.getTierLists(req, res));
router.post('/tier-lists', (req, res) => tierListController.createTierList(req, res));
router.put('/tier-lists/:id', (req, res) => tierListController.updateTierList(req, res));
router.delete('/tier-lists/:id', (req, res) => tierListController.deleteTierList(req, res));

export default router;