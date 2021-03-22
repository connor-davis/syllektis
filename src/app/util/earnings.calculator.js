export let calculateEarnings = ({ materials, material, mass }) => {
    let current = materials.filter((_) => _.name === material)[0]
    return `${current.value * mass}`
}
