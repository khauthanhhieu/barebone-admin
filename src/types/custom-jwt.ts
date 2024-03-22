import { JWT } from "next-auth/jwt";

type CustomJWT = JWT & { id: number }

export default CustomJWT;