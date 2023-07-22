import { nanoid } from 'nanoid'
export function getOrderId() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let nanid = nanoid();
    let orderId = `${year}${month}${day}${minutes}${seconds}${nanid}`;
    return orderId;
}