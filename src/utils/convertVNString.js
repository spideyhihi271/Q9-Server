const convertToLowerCaseVN = function (text) {
    const lowerCaseMapping = {
        A: 'a',
        Á: 'á',
        À: 'à',
        Ả: 'ả',
        Ã: 'ã',
        Ạ: 'ạ',
        Â: 'â',
        Ấ: 'ấ',
        Ầ: 'ầ',
        Ẩ: 'ẩ',
        Ẫ: 'ẫ',
        Ậ: 'ậ',
        Ă: 'ă',
        Ắ: 'ắ',
        Ằ: 'ằ',
        Ẳ: 'ẳ',
        Ẵ: 'ẵ',
        Ặ: 'ặ',
        B: 'b',
        C: 'c',
        D: 'd',
        Đ: 'đ',
        E: 'e',
        É: 'é',
        È: 'è',
        Ẻ: 'ẻ',
        Ẽ: 'ẽ',
        Ẹ: 'ẹ',
        Ê: 'ê',
        Ế: 'ế',
        Ề: 'ề',
        Ể: 'ể',
        Ễ: 'ễ',
        Ệ: 'ệ',
        F: 'f',
        G: 'g',
        H: 'h',
        I: 'i',
        Í: 'í',
        Ì: 'ì',
        Ỉ: 'ỉ',
        Ĩ: 'ĩ',
        Ị: 'ị',
        J: 'j',
        K: 'k',
        L: 'l',
        M: 'm',
        N: 'n',
        O: 'o',
        Ó: 'ó',
        Ò: 'ò',
        Ỏ: 'ỏ',
        Õ: 'õ',
        Ọ: 'ọ',
        Ô: 'ô',
        Ố: 'ố',
        Ồ: 'ồ',
        Ổ: 'ổ',
        Ỗ: 'ỗ',
        Ộ: 'ộ',
        Ơ: 'ơ',
        Ớ: 'ớ',
        Ờ: 'ờ',
        Ở: 'ở',
        Ỡ: 'ỡ',
        Ợ: 'ợ',
        P: 'p',
        Q: 'q',
        R: 'r',
        S: 's',
        T: 't',
        U: 'u',
        Ú: 'ú',
        Ù: 'ù',
        Ủ: 'ủ',
        Ũ: 'ũ',
        Ụ: 'ụ',
        Ư: 'ư',
        Ứ: 'ứ',
        Ừ: 'ừ',
        Ử: 'ử',
        Ữ: 'ữ',
        Ự: 'ự',
        V: 'v',
        W: 'w',
        X: 'x',
        Y: 'y',
        Ý: 'ý',
        Ỳ: 'ỳ',
        Ỷ: 'ỷ',
        Ỹ: 'ỹ',
        Ỵ: 'ỵ',
        Z: 'z',
    };

    return text
        .split('')
        .map((char) => lowerCaseMapping[char] || char)
        .join('');
};

module.exports = convertToLowerCaseVN;
