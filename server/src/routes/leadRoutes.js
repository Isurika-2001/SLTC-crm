const express = require('express')
const leadController = require('../controllers/leadController')

const router = express.Router()

router.get('/leads', leadController.getLeads)
router.post('/leads', leadController.addLead)
router.get('/leads/:id', leadController.getLead)
router.patch('/leads/:id', leadController.updateLead)
router.get('/leads-details', leadController.getLeadsSummaryDetails)
router.get('/checkLead', leadController.checkForDuplicate)

module.exports = router