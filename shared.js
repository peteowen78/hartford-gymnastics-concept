/* Class data taken from hartfordgymnastics.com/classes-times on 20 Nov 2026.
   One copy, used by all three homepage mockups. */
window.HSG = {
  email: 'info@hartfordgymnastics.com',
  groups: [
    { id: 'pre', label: 'Pre-school', ages: 'Age 3+', price: '£6.50 a session, pay as you go',
      sessions: [{ d: 'Friday', t: '1:45 – 2:30pm' }] },
    { id: 'rec', label: 'Reception to 7', ages: 'Ages 4 – 7', price: '£9 – £10 a session',
      sessions: [
        { d: 'Monday', t: '4:00 – 5:05pm' },
        { d: 'Tuesday', t: '4:00 – 5:05pm', full: true },
        { d: 'Wednesday', t: '4:00 – 5:05pm' },
        { d: 'Thursday', t: '4:00 – 5:05pm' },
        { d: 'Friday', t: '4:00 – 5:05pm', full: true },
        { d: 'Saturday', t: '11:50am – 12:50pm', note: 'Reception to 6' }
      ] },
    { id: 'jun', label: '8 and over', ages: 'Ages 8 – 16', price: '£9 – £10 a session',
      sessions: [
        { d: 'Tuesday', t: '5:15 – 6:30pm', full: true },
        { d: 'Thursday', t: '5:15 – 6:30pm', full: true },
        { d: 'Friday', t: '5:15 – 6:30pm', full: true },
        { d: 'Saturday', t: '10:25 – 11:40am', note: 'Age 7+' }
      ] },
    { id: 'adu', label: 'Adults', ages: '16+', price: '£6.50 a session, any ability',
      sessions: [
        { d: 'Tuesday', t: '1:30 – 2:30pm' },
        { d: 'Wednesday', t: '8:15 – 9:15pm' }
      ] }
  ]
};

(function () {
  var root = document.querySelector('[data-finder]');
  if (!root) return;
  var G = window.HSG.groups;
  var tabs = document.createElement('div');
  tabs.className = 'finder-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Choose an age group');
  var panel = document.createElement('div');
  panel.className = 'finder-panel';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-live', 'polite');

  function mail(g, s) {
    var subject = (s.full ? 'Waiting list: ' : 'A place in ') + g.label + ', ' + s.d + ' ' + s.t;
    return 'mailto:' + window.HSG.email + '?subject=' + encodeURIComponent(subject);
  }

  function show(i) {
    var g = G[i];
    [].forEach.call(tabs.children, function (b, n) {
      b.setAttribute('aria-selected', n === i ? 'true' : 'false');
      b.tabIndex = n === i ? 0 : -1;
    });
    var open = g.sessions.filter(function (s) { return !s.full; }).length;
    var html = '<p class="finder-meta"><strong>' + g.label + '</strong> <span>' + g.price + '</span> <span class="finder-count">' +
      (open ? open + ' of ' + g.sessions.length + ' sessions have places' : 'All sessions full') + '</span></p><ul class="sessions">';
    g.sessions.forEach(function (s) {
      html += '<li class="session' + (s.full ? ' is-full' : '') + '">' +
        '<span class="s-day">' + s.d + '</span>' +
        '<span class="s-time">' + s.t + (s.note ? ' <em>' + s.note + '</em>' : '') + '</span>' +
        '<span class="s-status">' + (s.full ? 'Full' : 'Places') + '</span>' +
        '<a class="s-act" href="' + mail(g, s) + '">' + (s.full ? 'Join waiting list' : 'Ask for a place') + '</a></li>';
    });
    panel.innerHTML = html + '</ul>';
    panel.classList.remove('swap');
    void panel.offsetWidth;
    panel.classList.add('swap');
  }

  G.forEach(function (g, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'finder-tab tab-' + g.id;
    b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="t-label">' + g.label + '</span><span class="t-ages">' + g.ages + '</span>';
    b.addEventListener('click', function () { show(i); });
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = (i + d + G.length) % G.length;
      show(n);
      tabs.children[n].focus();
    });
    tabs.appendChild(b);
  });
  root.appendChild(tabs);
  root.appendChild(panel);
  show(1);
})();
