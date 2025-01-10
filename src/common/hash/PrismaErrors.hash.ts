import { PrismaErrors } from "../enums/PrismaErrors.enum";
import { PrismaClientError } from "../Errors/types/PrismaClientError.type";
import { UniqueConstraintError } from "../Errors/types/UniqueConstraintError";

let error: PrismaClientError;

const map = new Map();

map.set(PrismaErrors.UniqueConstraintFail, new UniqueConstraintError(error));