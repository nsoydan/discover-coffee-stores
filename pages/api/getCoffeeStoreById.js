import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const record = await findRecordByFilter(id);
      if (record.length !== 0) {
        res.json(record);
        res.status(200);
      }
      res.json({ message: "No record with this Id" });
    } else {
      res.json({ message: "Id is missing" });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.json({ error });
  }
};

export default getCoffeeStoreById;
