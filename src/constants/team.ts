interface NumericIndexedStr {
    [index: number]: string; // 这里定义了数字索引签名
}

const teamStatusEnum: NumericIndexedStr= {
    0: '公开',
    1: '私有',
    2: '加密'
}

export {
    teamStatusEnum
}