/* Manager/Supervisor - Controller Will Interact With The User and Handle Redirections:
    - Manages the incoming work HTTP requests
    - Decides which worker (service) should do the work
    - Splits up the work into sizable units
    - Does some checking/validation to figure out to which service(s) should the data from the request be sent to
    - Passes that work the necessary data from the HTTP requests off to the service(s)
    - But does not do the work himself/herself (the controller shouldn't be doing the entire work)
*/

const productService = require("../services/productService");

// // create new term
exports.createProduct = async (req, res) => {
  const product = await productService.createProduct(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};