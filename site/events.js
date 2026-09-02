/* =========================================================
   Three Cities Social - Events Data
   Single source of truth. Edit this file to update the
   homepage "What's on the calendar" and the full Events page.
   Times are 24-hour for sorting; rendered as 12-hour on page.
   ========================================================= */

window.TCS_EVENTS = [
  // === SEPTEMBER 2026 ===
  { date: "2026-09-02", time: "16:00", title: "Office Hours w/ Dr. Kortney Peagram", location: "Three Cities · Wicker Park", access: "Members Only", pillar: "Talk" },
  { date: "2026-09-02", time: "18:00", title: "Page & Pour", location: "Three Cities · River North", access: "Open to Public", pillar: "Talk" },
  { date: "2026-09-04", time: "17:30", title: "Happy Hour: Open Bar", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-04", time: "19:00", title: "New Member Mixer", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-05", time: "15:00", title: "Adult Field Day", location: "Cricket Hill · Lincoln Park", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-06", time: "09:30", title: "Mahjong Mornings", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-06", time: "12:00", title: "Pickleball: Lincoln Park SPF", location: "Lincoln Park SPF", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-09", time: "14:30", title: "Midday Ditch: River Cruise", location: "FBC · Streeterville", access: "Members Only", pillar: "Social" },
  { date: "2026-09-13", time: "12:00", title: "NFL Kickoff - Sunday Ticket + Bears", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-15", time: "19:00", title: "Pilates with Rosie", location: "Three Cities · River North", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-16", time: "18:00", title: "Flow with Chloe", location: "Three Cities · River North", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-16", time: "19:00", title: "Trivia Night", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-17", time: "19:00", title: "Side A: Nirvana Unplugged in New York", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-17", time: "19:00", title: "The Hidden Table", location: "TBD", access: "Members Only", pillar: "Social" },
  { date: "2026-09-18", time: "19:30", title: "The Traitors: Season Premiere Watch Party", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-18", time: "21:00", title: "Broadway Rave (Tickets Included)", location: "Subterranean", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-20", time: "09:30", title: "Mahjong Mornings", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-20", time: "12:00", title: "Pickleball: Lincoln Park SPF", location: "Lincoln Park SPF", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-21", time: "18:00", title: "Mahjong Evenings: The Wash", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-23", time: "19:00", title: "Trivia Night", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-24", time: "19:00", title: "Sipping North of the Equator: Wine Tasting", location: "Three Cities · River North", access: "Open to Public", pillar: "Talk" },
  { date: "2026-09-24", time: "19:00", title: "Book Club: Demon Copperhead", location: "Three Cities · River North", access: "Open to Public", pillar: "Talk" },
  { date: "2026-09-25", time: "18:00", title: "Happy Hour Karaoke Night", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-26", time: "11:00", title: "Come Back to Life: Introducing SUCO at Three Cities Social", location: "Three Cities · River North", access: "Members Only", pillar: "Talk" },
  { date: "2026-09-26", time: "19:00", title: "Lemonade: Film Watch Party", location: "Three Cities · River North", access: "Open to Public", pillar: "Social" },
  { date: "2026-09-27", time: "12:00", title: "Together We Roam - Rogers Park", location: "Jarvis Beach", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-28", time: "18:00", title: "Mahjong Evenings: The Wash", location: "Three Cities · River North", access: "Open to Public", pillar: "Play" },
  { date: "2026-09-28", time: "18:30", title: "Spin Class at Spynergy Wicker Park", location: "1632b W. Division St.", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-29", time: "18:30", title: "No Book, Book Club: Can AI Actually Connect With Us?", location: "Three Cities · River North", access: "Open to Public", pillar: "Talk" },
  { date: "2026-09-29", time: "19:00", title: "Pilates with Rosie", location: "Three Cities · River North", access: "Open to Public", pillar: "Move" },
  { date: "2026-09-30", time: "18:30", title: "Dating Detox: A Short History of Dating and What Happened to Us", location: "Three Cities · River North", access: "Open to Public", pillar: "Talk" },
];

// === Helpers exported for the renderers ===
window.TCS_EVENT_HELPERS = {
  formatTime: function (t24) {
    var p = t24.split(':');
    var h = parseInt(p[0], 10), m = parseInt(p[1], 10);
    var period = h >= 12 ? 'p.m.' : 'a.m.';
    var h12 = h % 12 || 12;
    return m === 0 ? (h12 + ' ' + period) : (h12 + ':' + String(m).padStart(2, '0') + ' ' + period);
  },
  parseDate: function (e) {
    return new Date(e.date + 'T' + e.time + ':00');
  },
  dayName: function (d) {
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  },
  shortDay: function (d) {
    return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
  },
  monthName: function (d) {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];
  },
  // Pick a curated set for the homepage: up to N upcoming events, prefer
  // diversity across pillars within the next 14 days.
  pickHomepage: function (now, count) {
    var H = window.TCS_EVENT_HELPERS;
    count = count || 3;
    var future = window.TCS_EVENTS
      .filter(function (e) { return H.parseDate(e) >= now; })
      .sort(function (a, b) { return H.parseDate(a) - H.parseDate(b); });

    var picked = [];
    var seen = new Set();
    var horizon = new Date(now.getTime() + 14 * 86400000);
    // First pass: events in next 14 days, one per pillar.
    for (var i = 0; i < future.length && picked.length < count; i++) {
      var e = future[i];
      if (H.parseDate(e) > horizon) break;
      if (seen.has(e.pillar)) continue;
      picked.push(e); seen.add(e.pillar);
    }
    // Second pass: fill from any upcoming events to reach count.
    for (var j = 0; j < future.length && picked.length < count; j++) {
      if (picked.indexOf(future[j]) === -1) picked.push(future[j]);
    }
    return picked;
  }
};
