const Clarifai = require("clarifai");

// Don't expose API key to publicly, use environment variables
const app = new Clarifai.App({
  apiKey: "1d820886e1dd460791983686e7d9dabf",
});

const handleApiCall = (db) => (req, res) => {
  const { input } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (db) => (req, res) => {
  const { id, input } = req.body;

  db.from("smartbrain-schema.users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("*")
    .then((response) => res.json(response[0]))
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
