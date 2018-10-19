var logic = {
  devMode: false,
  selectors: ['#wrapper', '#mainContainer'],
  els: {},
  inventory: [],

  init: function() {
    this.setupEls();
    // this.handleResize();
    // this.setListeners();

    this.inventory = inventory;

    this.showInventory();


    if(this.devMode) {
      document.querySelector('body').classList.add('devMode');
    }
  },

  setupEls: function() {
    this.selectors.forEach(function(selector) {
      var pattern = new RegExp(/[.#\s]/g);
      var key = selector.replace(pattern, '');
      var selected = document.querySelectorAll(selector);
      
      if (selected.length < 1) {
        logic.els[key] = selected;
      } else {
        logic.els[key] = selected[0];
      }
    });
  },

  showInventory: function() {
    var table = '<table>';
      table += '<tr>';
        table += '<th>ID</th>';
        table += '<th>Name</th>';
        table += '<th>Stars</th>';
        table += '<th>Faction</th>';
        table += '<th>Quantity</th>';
      table += '<tr>';
    this.inventory.forEach(function(entry) {
      table += '<tr>';
        table += '<td>' + entry.id + '</td>';
        table += '<td>' + entry.name + '</td>';
        table += '<td>' + entry.stars + '</td>';
        table += '<td>' + entry.faction + '</td>';
        table += '<td>' + entry.quantity + '</td>';
      table += '</tr>';
    });
    table += '</table>';


    
    this.els.mainContainer.insertAdjacentHTML('beforeend', table);
  },

  setListeners: function() {},

  parseUrl:function(url) {
    var queries = decodeURIComponent(url).split('?')[1];
    if (queries && queries.length > 0) {
      queries.split('&').map(function(c) {
        var kv = c.split('=');
        var curVt = this.vt[kv[0]];
        if (curVt) {
          this.vt[kv[0]].value = kv[1];
        }
      }, this);
    }
  },

  handleResize: function() {
    if(!logic.resizing) {
      logic.resizing = true;
      setTimeout(function() {
        logic.resizing = false;
        // logic.doResize();
      }, 500);
    }
  },

  // doResize: function() {
  //   logic.bounds.h = logic.els.wrapper.offsetHeight;
  //   logic.bounds.w = logic.els.wrapper.offsetWidth;
  //   logic.mid = logic.bounds.w / 2;
  // },

  getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
