import parse from 'csv-parse/lib/sync'

export const parseClientCSV = (csv) => {
  let rows = parse(csv)
  // get rid of heading rows.
  rows.shift()
  rows.shift()
  return rows.map(row => {
    console.log('\n\nROW\n', row)
    const client = {}
    client.name = row[9]
    let street = row[12] ? `${row[11]}, ${row[12]}` : row[11]
    client.address = `${street}, ${row[13]}, ${row[14]}, ${row[15]}`
    client.email = row[17]
    client.phone = row[18]
    client.social = `${row[19]}`
    client.emergency = {
      name: row[22],
      phone: row[31]
    }
    client.dogs = makeDogArray(row)
    let vstreet = row[85] ? `${row[84]}, ${row[85]}` : row[84]
    client.vet = {
      practice: row[82],
      name: row[83],
      address: `${vstreet}, ${row[86]}, ${row[87]}, ${row[88]}`,
      phone: row[91]
    }
    client.access = {
      type: row[92],
      info: row[93]
    }
    return client
  })
}

function makeDogArray (row, a, i) {
  a = a || []
  i = i || 32
  let dog = {
    name: row[i],
    dob: new Date(row[i + 1]),
    breed: row[i + 2],
    gender: row[i + 3],
    recall: row[i + 4],
    issues: row[i + 5] === 'Yes' ? row[i + 6] : 'None',
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
  32, 49, 66: dog name
  33: dog dob (ideally, some people put in their own birthday...)
  34: breed
  35: sex
  36: recall
  37: issues around dogs y/n
  38: issues (if yes)
  39: Desexed
  40: Vaccinated
  41: Date of last vaccination
  42: Allergies
  43: Medications
  44: Pre-existing injuries
  45: Pet insurance y/n
  46: Insurance company
  47, 64, 81: Additional info
  48: another dog?
  49 -> 81 2 more sets of dog questions.
  82: Vet practice
  83: Vet name
  84: Vet street 1
  85: Vet street 2
  86: Vet suburb
  87: Vet state
  88: Vet postcode
  89: Vet country (unused)
  90: Vet email
  91: Vet phone
  92: Access type
  93: Access More info
  94: Mailing List YN
  95: ToC Agree
  96: Signature
  */
