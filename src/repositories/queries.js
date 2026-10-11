function addRowLockOnFlights() {
    return "SELECT id FROM flights WHERE id = :flightId FOR UPDATE";
}


module.exports = {
  addRowLockOnFlights
};
