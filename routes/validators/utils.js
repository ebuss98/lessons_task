function filterObject(errors) {
    errors = Object.entries(errors).reduce((acc, [key, value]) => {
        if (value) acc[key] = value
        return acc
    }, {})
    if (Object.keys(errors).length > 0) return errors
}

export default filterObject