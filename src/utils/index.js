export function getModulus(num){
    if(num >= 0) return num
    else return num * -1
}

export function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

export function getTimestamp () {
    return Math.floor(Date.now())
}