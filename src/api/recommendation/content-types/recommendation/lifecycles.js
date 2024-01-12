module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    console.log(data.date)
    
    if(!data.date) data.date = new Date().toISOString().substring(0, 10);
  },
  beforeUpdate(event) {
    const { data } = event.params;
    console.log(data.date)
    
    if(!data.date) data.date = new Date().toISOString().substring(0, 10);
  },
};
