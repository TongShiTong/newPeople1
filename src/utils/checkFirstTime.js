let firstTimeEnter = true;

export default {
  getFirstTimeEnter: function() {
    return firstTimeEnter;
  },
  setEnter: function() {
    firstTimeEnter = false;
  },
};
