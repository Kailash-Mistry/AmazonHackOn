import { staticPlaylists } from './playlistData';

// Example filter functions
function isHolidaySpecial(show, ctx) {
  return show.title.toLowerCase().includes('holiday') || (ctx.season === 'winter' && show.moods && show.moods.includes('joy'));
}

function isRainyComfort(show, ctx) {
  return ctx.isRaining && (show.genres.includes('Drama') || show.genres.includes('Family'));
}

function isMorningQuick(show, ctx) {
  return ctx.isMorning && (parseInt(show.duration) < 30 || show.genres.includes('Comedy'));
}

function isFridayNight(show, ctx) {
  return ctx.dayOfWeek === 5 && (show.genres.includes('Action') || show.genres.includes('Thriller'));
}

function isSeasonSpecial(show, ctx) {
  return show.genres.includes('Adventure') && ctx.season === 'summer';
}

function isWeekendRelax(show, ctx) {
  return ctx.isWeekend && (show.genres.includes('Comedy') || show.genres.includes('Family'));
}

function isEveningDrama(show, ctx) {
  return ctx.isEvening && show.genres.includes('Drama');
}

const filterMap = {
  isHolidaySpecial,
  isRainyComfort,
  isMorningQuick,
  isFridayNight,
  isSeasonSpecial,
  isWeekendRelax,
  isEveningDrama,
};

export function getPlaylists(ctx, shows) {
  return staticPlaylists.map(pl => ({
    ...pl,
    shows: shows.filter(show => filterMap[pl.filter](show, ctx)),
  })).filter(pl => pl.shows.length > 0);
} 