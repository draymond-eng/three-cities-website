/* =========================================================
   Three Cities Social — Events Data
   Single source of truth. Edit this file to update the
   homepage "What's on the calendar" and the full Events page.
   Times are 24-hour for sorting; rendered as 12-hour on page.
   ========================================================= */

window.TCS_EVENTS = [
  // === JULY 2026 ===
  { date: "2026-07-01", time: "17:00", title: "Blue Line Social Group",                           location: "Easy Bar · Damen",             access: "Members Only", pillar: "Social" },
  { date: "2026-07-07", time: "18:30", title: "Better Than Small Talk: A Conversation-Driven Dinner", location: "Three Cities · River North", access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-08", time: "18:00", title: "Recharge Your Energy: The Nutrition Habits That Help You Thrive", location: "Three Cities · River North", access: "Members Only", pillar: "Talk" },
  { date: "2026-07-10", time: "17:15", title: "Art & Culture Outing: Martin Wong, Chinatown USA", location: "Wrightwood 659",               access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-10", time: "19:00", title: "Game Night",                                       location: "Three Cities · River North",   access: "Members Only", pillar: "Play"   },
  { date: "2026-07-11", time: "10:00", title: "Volunteer Day at Homan Rails Farm",                location: "Homan Rails Farm",             access: "Members Only", pillar: "Serve"  },
  { date: "2026-07-11", time: "14:30", title: "Yacht Outing on Lake Michigan",                    location: "Lake Michigan",                access: "Members Only", pillar: "Social" },
  { date: "2026-07-12", time: "08:30", title: "Bike Club: North Branch Trail",                    location: "North Branch Trail",           access: "Members Only", pillar: "Move"   },
  { date: "2026-07-12", time: "10:00", title: "Mahjong Mornings",                                 location: "Three Cities · River North",   access: "Members Only", pillar: "Play"   },
  { date: "2026-07-13", time: "13:00", title: "Connection, Conversation and Community for Writers", location: "Three Cities · River North",  access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-13", time: "19:00", title: "Blood on the Clocktower, New Players Welcome",     location: "Three Cities · Wicker Park",   access: "Members Only", pillar: "Play"   },
  { date: "2026-07-16", time: "17:30", title: "HEATED Reformer Pilates at Onyx",                  location: "Onyx · Wicker Park",           access: "Members Only", pillar: "Move"   },
  { date: "2026-07-16", time: "18:30", title: "Fuckup Nights Chicago",                            location: "Three Cities · River North",   access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-17", time: "19:00", title: "Yacht Outing on Lake Michigan",                    location: "Lake Michigan",                access: "Members Only", pillar: "Social" },
  { date: "2026-07-18", time: "08:00", title: "Three Dune Challenge, Indiana Dunes State Park",   location: "Indiana Dunes State Park",     access: "Members Only", pillar: "Move"   },
  { date: "2026-07-18", time: "13:00", title: "Tours With Mike: Jackson Park Walking Tour",       location: "Jackson Park",                 access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-23", time: "18:00", title: "Sunset Nights at Homan Rails Farm: Volunteer",     location: "Homan Rails Farm",             access: "Members Only", pillar: "Serve"  },
  { date: "2026-07-23", time: "18:00", title: "Fundraising for the Rest of Us: Chicago Tech Week", location: "Three Cities · River North",   access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-23", time: "19:00", title: "Let's Get Bubbly: Sparkling Wine Tasting",         location: "Three Cities · River North",   access: "Members Only", pillar: "Talk"   },
  { date: "2026-07-25", time: "12:00", title: "Ride, Shop and Drink: The 606 Local Crawl",        location: "The 606 Trail",                access: "Members Only", pillar: "Social" },
  { date: "2026-07-25", time: "14:30", title: "Yacht Outing on Lake Michigan",                    location: "Lake Michigan",                access: "Members Only", pillar: "Social" },
  { date: "2026-07-25", time: "19:00", title: "Poker Night",                                      location: "Three Cities · River North",   access: "Members Only", pillar: "Play"   },
  { date: "2026-07-29", time: "18:30", title: "Side A: Good Kid, M.A.A.D City",                   location: "Three Cities · River North",   access: "Members Only", pillar: "Social" },
  { date: "2026-07-30", time: "18:00", title: "AI in Practice: A Hands-On Workshop",              location: "Three Cities · River North",   access: "Members Only", pillar: "Talk"   },

  // === AUGUST 2026 ===
  { date: "2026-08-01", time: "15:00", title: "Adult Field Day",                                  location: "Cricket Hill · Lincoln Park",  access: "Members Only", pillar: "Play"   },
  { date: "2026-08-16", time: "10:00", title: "Yacht Outing on Lake Michigan: Air and Water Show", location: "Lake Michigan",               access: "Members Only", pillar: "Social" }
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
