const process = require("../src/process");
const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
    let groupsParam = req.body.groups;
    let responseObj = { sizes: 'There are no groups to process.'};

    if (groupsParam) {
        let groups = groupsParam.split(",").map(Number);
        let processObj = new process(groups);
        let responseSizes = processObj.getResponse();
        responseObj = { sizes: responseSizes.toString() };
    }
    res.json(responseObj);
});

module.exports = router;