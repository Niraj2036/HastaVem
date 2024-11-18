import express from 'express';
import { getArtisanById, getTotalArtisans} from '../controllers/artisanController.js';

const router = express.Router();
router.get('/count', getTotalArtisans);
// Route to get a single product by name
router.get('/:id', getArtisanById);



export default router;
