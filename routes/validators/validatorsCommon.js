export function NumberArrayValidation(array) {
    if (!Array.isArray(array)) {
        return 'Wrong input: must be array'
    } else {
        for (let elem of array) {
            if (!Number.isInteger(elem)) {
                return 'Wrong array input: elements must be Number'
            } else if (parseInt(elem) < 0) {
                return 'Wrong array input: elements must be positive Number'
            }
        }
    }
}

export function IsPositiveNumber(parameter) {
    let parsedParameter = parseInt(parameter)
    if (!Number.isInteger(parsedParameter) || parsedParameter < 0 || parsedParameter != parameter) {
        return  'Wrong input: must be positive Number'
    }
}

export function DateValidation(dateString) {
    const regDate = "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
    if (!dateString.match(regDate) || dateString.length !== 10) {
        return 'Wrong date input'
    }
}
