import { getDbDateFormat } from "./getDbDateFormat";

export function getCurrentDate() {
    return getDbDateFormat(new Date());
}