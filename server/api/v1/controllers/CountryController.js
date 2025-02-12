const axios = require("axios");
class CountryController {
  // GET /v1/country/provinces
  async provinces(req, res) {
    try {
      const result = await axios.get("https://provinces.open-api.vn/api/p/");
      res.json(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  // GET /v1/country/districts/:provinceId
  async districts(req, res) {
    try {
      const { provinceId } = req.params;
      console.log(provinceId);
      const result = await axios.get(`https://provinces.open-api.vn/api/d/`);
      const districts = result.data;
      const filterDistrict = districts.filter((district) => {
        return district.province_code == provinceId;
      });
      res.json(filterDistrict);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CountryController();
