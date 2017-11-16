import parse from 'csv-parse/lib/sync'

export const parseClientCSV = (csv) => {
  let rows = parse(csv)
  // get rid of heading rows.
  rows.shift()
  rows.shift()
  return rows.map(row => {
    const client = {}
    client.name = row[9]
    let street = row[12] ? `${row[11]}, ${row[12]}` : row[11]
    client.address = `${street}, ${row[13]}, ${row[14]}, ${row[15]}`
    client.email = row[17]
    client.phone = row[18]
    client.social = `${row[19]} ${row[20]}`
    client.emergency = {
      name: row[23],
      phone: row[32]
    }
    client.dogs = makeDogArray(row)
    let vstreet = row[86] ? `${row[85]}, ${row[86]}` : row[85]
    client.vet = {
      practice: row[83],
      name: row[84],
      address: `${vstreet}, ${row[87]}, ${row[88]}, ${row[89]}`,
      phone: row[92]
    }
    return client
  })
}

function makeDogArray (row, a, i) {
  a = a || []
  i = i || 33
  let dog = {
    name: row[i],
    dob: new Date(row[i + 1]),
    breed: row[i + 2],
    gender: row[i + 3],
    recall: row[i + 4],
    issues: row[i + 6],
    desexed: row[i + 7] === 'Yes',
    vaccinated: row[i + 8] === 'Yes',
    vacdate: row[i + 9],
    allergies: row[i + 10],
    medications: row[i + 11],
    existinginjury: row[i + 12],
    insurance: row[i + 13] === 'Yes',
    insurer: row[i + 14],
    notes: row[i + 15]
  }
  a.push(dog)
  if (row[i + 17] !== '' && (i + 17) < 70) makeDogArray(row, a, i + 17)
  return a
}
  /*
  lines
  9: name (first technically, but full)
  10: surname (unused)
  11: street1
  12: street2
  13: suburb
  14: state
  15: postcode
  16: country
  17: email addr
  18: mobile
  19: insta
  20: twitter
  21: how did you find us
  22: referral (if referred)
  23: Emergency contact name
  32: Emergency contact number
  33, 50, 67: dog name
  34: dog dob (ideally, some people put in their own birthday...)
  35: breed
  36: sex
  37: recall
  38: issues around dogs y/n
  39: issues (if yes)
  40: Desexed
  41: Vaccinated
  42: Date of last vaccination
  43: Allergies
  44: Medications
  45: Pre-existing injuries
  46: Pet insurance y/n
  47: Insurance company
  48, 65, 82: Additional info
  49: another dog?
  50 -> 82 2 more sets of dog questions.
  83: Vet practice
  84: Vet name
  85: Vet street 1
  86: Vet street 2
  87: Vet suburb
  88: Vet state
  89: Vet postcode
  90: Vet country (unused)
  91: Vet email
  92: Vet phone
  */
