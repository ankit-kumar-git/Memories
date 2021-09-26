import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //Checking the validity of token for user whether the token is expired or not so that user can perform operation like delete like etc.
    const token = req.headers.authorization.split(" ")[1];

    // Now token can be of google-auth or of our own, If length of token >500 then it is of google-auth
    const isCustomToken = token.length < 500;

    let decodedData;

    if (token && isCustomToken) {
      decodedData = jwt.verify(token, "test");
      //Now decodedData contains user'S name and id.
      req.userId = decodedData?.id;
    } else {
      //For google token
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
