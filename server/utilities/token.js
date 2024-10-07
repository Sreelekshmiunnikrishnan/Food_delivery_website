import jwt from 'jsonwebtoken';

export const generateToken = (id,role) =>{
  const token = jwt.sign({id:id, role:role || 'User'},process.env.JWT_SECRET_KEY);
return token;
};
