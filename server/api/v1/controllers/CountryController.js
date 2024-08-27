const axios = require("axios");
class CountryController {
  // GET /v1/country/provinces
  async provinces(req, res) {
    try {
      const result = await axios.get("https://vapi.vnappmob.com/api/province");
      res.json(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  // GET /v1/country/districts/:provinceId
  async districts(req, res) {
    const { provinceId } = req.params;
    try {
      const result = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      res.json(result.data);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CountryController();
