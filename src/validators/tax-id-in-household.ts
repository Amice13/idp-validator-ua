const checkTaxIdInHousehold = (taxId: string, taxIds: string[]) => {
  if (!taxIds.includes(taxId)) throw new Error('Цей РНОКПП не зазначений серед номерів членів родин')
  return true
}

export default checkTaxIdInHousehold
