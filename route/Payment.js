const express = require("express");

const router = express.Router();

router.post("/split-payments/compute", async (req, res) => {
  const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;
  try {
    if (ID && Amount && Currency && CustomerEmail && SplitInfo) {
      let response = {
        ID: ID,
        Balance: Amount,
        SplitBreakdown: [],
      };

      // sorting the split info according to splittype
      let arrFlat = SplitInfo.filter((record) => record.SplitType === "FLAT");
      let arrPercent = SplitInfo.filter(
        (record) => record.SplitType === "PERCENTAGE"
      );
      let arrRatio = SplitInfo.filter((record) => record.SplitType === "RATIO");
      const SortedSplitInfo = [...arrFlat, ...arrPercent, ...arrRatio];
      let totalRatio = 0;
      for (let elem of arrRatio) {
        totalRatio += elem.SplitValue;
      }
      // split Amount computation
      SortedSplitInfo.forEach((payment) => {
        const { SplitType, SplitValue, SplitEntityId } = payment;

        if (SplitType === "FLAT") {
          if (response.Balance <= SplitValue && SplitValue > 0) {
            throw new Error(
              "Split value must be greater than 0 and less than Balance!"
            );
          }
          response.Balance -= SplitValue;
          response.SplitBreakdown.push({ SplitEntityId, Amount: SplitValue });
        } else if (SplitType === "PERCENTAGE") {
          const perAmount = (SplitValue / 100) * response.Balance;
          if (response.Balance <= perAmount && perAmount > 0) {
            throw new Error(
              "Split value must be greater than 0 and less than Balance!"
            );
          }

          response.Balance -= perAmount;
          response.SplitBreakdown.push({ SplitEntityId, Amount: perAmount });
        } else if (SplitType === "RATIO") {
          const RatioAmount = (SplitValue / totalRatio) * response.Balance;
          if (response.Balance <= RatioAmount && RatioAmount > 0) {
            throw new Error(
              "Split value must be greater than 0 and less than Balance!"
            );
          }

          response.Balance -= RatioAmount;
          response.SplitBreakdown.push({ SplitEntityId, Amount: RatioAmount });
        }
        if (response.Balance <= 0) {
          throw new Error("Balance must not be less than zero");
        }

        return response;
      });

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});
module.exports = router;
